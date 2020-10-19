import { fetchRefuelLogs, fetchVehicles } from "./backgroundJobs"
import { db } from "./dbconfig"

export function printLog(log: string) {
  if (__DEV__) console.log("dbLog:", log)
  return
}

export function InitDB(dispatch: any) {
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
      console.log("txn failed", error)
    },
    () => {
      fetchVehicles(dispatch)
      fetchRefuelLogs(dispatch)
    }
  )
}
