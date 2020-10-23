import AsyncStorage from "@react-native-community/async-storage"
import { firebase } from "../Config/firebase"
import {
  fetchRefuelLogs,
  fetchVehicles,
  hydrateAllState,
  hydrateRefuelLogs,
  hydrateSelectedVehicle,
} from "./backgroundJobs"
import { db } from "./dbconfig"

export function printLog(log: string) {
  if (__DEV__) console.log("Log:", log)
  return
}

export function InitDB(dispatch: any) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (txn) => {
        txn.executeSql(
          `create TABLE if not EXISTS vehicles (
            userUid varchar(200) not NULL,
            vcallsign varchar(20) not NULL PRIMARY KEY,
            maker varchar(200) not NULL,
            model varchar(30) not null,
            plate varchar(30) not null,
            odo varchar(30) not null,
            vin varchar(50) not null,
            year varchar(5) not null,
            image1 varchar(200),
            image2 varchar(200),
            image3 varchar(200),
            image4 varchar(200),
            image5 varchar(200)
          )`,
          [],
          () => {
            printLog("table vehicles created")
          }
        )
        txn.executeSql(
          `create TABLE if not EXISTS refuelLogs (
          userUid varchar(200) not NULL,
          vcallsign varchar(20) not NULL,
          logUuid varchar(200) not NULL PRIMARY KEY,
          odo varchar(30) not null,
          quantity varchar(10) not null,
          refuelDate varchar(30) not null,
          cost varchar(10) not null,
          image1 varchar(200),
          image2 varchar(200)
        )`,
          [],
          () => {
            printLog("table refuelLog created")
          }
        )
      },
      (error) => {
        console.log("DB init txn failed", error)
        reject()
      },
      async () => {
        let isFirstAppLaunch
        try {
          isFirstAppLaunch = await AsyncStorage.getItem("isFirstAppLaunch")
        } catch (error) {
          console.log("Could not fetch first app launch status", error)
        }

        //checking if first time app is launched, if yes
        // then fetch data from cloud, else hydrate from db
        if (isFirstAppLaunch == null) {
          // null means the app is launched first time
          firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
              await fetchVehicles(dispatch).then(async () => {
                await hydrateSelectedVehicle(dispatch)
              })
              await fetchRefuelLogs(dispatch).then(async () => {
                await hydrateRefuelLogs(dispatch)
              })
            } else console.log("No user")
          })
          AsyncStorage.setItem("isFirstAppLaunch", "false")
        } else {
          await hydrateAllState(dispatch)
        }

        resolve()
      }
    )
  })
}
