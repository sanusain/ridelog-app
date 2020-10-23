import AsyncStorage from "@react-native-community/async-storage"
import { firebase } from "../Config/firebase"
import { RefuelData, vehicleInfo } from "../Screens/Dashboard/types"
import {
  ActionSetFetchingVehicle,
  ActionSetRefuelLog,
  ActionSetSelectedVehicle,
} from "./Actions"
import { db } from "./dbconfig"

//setting selected vehicle when taking userinput for vcallsign

export async function hydrateAllState(dispatch: any) {
  await hydrateSelectedVehicle(dispatch)
  await hydrateRefuelLogs(dispatch)
}

export function hydrateSelectedVehicle(dispatch: any) {
  console.log("++++++Hydrating selected vehicle+++++++++")

  return new Promise(async (resolve, reject) => {
    db.transaction(
      (txn) => {
        txn.executeSql(
          `select * from vehicles`,
          [],
          (txn, selectedVehicleFromDB) => {
            if (selectedVehicleFromDB.rows.length) {
              const vehicle: vehicleInfo = {
                vcallsign: selectedVehicleFromDB.rows.item(0).vcallsign,
                maker: selectedVehicleFromDB.rows.item(0).maker,
                model: selectedVehicleFromDB.rows.item(0).maker,
                odo: selectedVehicleFromDB.rows.item(0).odo,
                plate: selectedVehicleFromDB.rows.item(0).plate,
                vin: selectedVehicleFromDB.rows.item(0).plate,
                year: selectedVehicleFromDB.rows.item(0).year,
                images: [
                  selectedVehicleFromDB.rows.item(0).image1,
                  selectedVehicleFromDB.rows.item(0).image2,
                  selectedVehicleFromDB.rows.item(0).image3,
                  selectedVehicleFromDB.rows.item(0).image4,
                  selectedVehicleFromDB.rows.item(0).image5,
                ],
                refuelData: [],
                serviceData: [],
              }
              dispatch(new ActionSetSelectedVehicle(vehicle))
            } else console.log("No rows in db")
          }
        )
      },
      (error) => {
        console.log("Selected Vehicle txn failed", error)
        reject()
      },
      () => {
        console.log("vehicle hydration done")
        resolve()
      }
    )
  })
}

export function fetchVehicles(dispatch: any) {
  dispatch(new ActionSetFetchingVehicle(true))
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("vehicleInfo")
          .doc(user?.uid)
          .collection("vehicles")
          .onSnapshot((collections) => {
            collections.forEach((collectionData) => {
              db.transaction(
                (txn) => {
                  txn.executeSql(
                    `REPLACE INTO vehicles(userUid,vcallsign,maker,model,plate,odo,vin,year,image1,image2,image3,image4,image5) 
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [
                      user.uid,
                      collectionData.data().vcallsign,
                      collectionData.data().maker,
                      collectionData.data().model,
                      collectionData.data().plate,
                      collectionData.data().odo,
                      collectionData.data().vin,
                      collectionData.data().year,
                      collectionData.data().images[0],
                      collectionData.data().images[1],
                      collectionData.data().images[2],
                      collectionData.data().images[3],
                      collectionData.data().images[4],
                    ],
                    async (tx, resultSet) => {
                      await AsyncStorage.setItem(
                        "selectedVehicle",
                        collectionData.data().vcallsign
                      )
                      console.log(collectionData.data().vcallsign, " inserted")
                    }
                  )
                },
                (error) => {
                  console.log("Insert failed:", error)
                  reject()
                },
                () => {
                  resolve()
                }
              )
            })
            dispatch(new ActionSetFetchingVehicle(false))
          })
      }
    })
  })
}

export function hydrateRefuelLogs(dispatch: any) {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (txn) => {
        txn.executeSql("select * from refuelLogs", [], (tx, refuelLogs) => {
          for (let i = 0; i < refuelLogs.rows.length; i++) {
            const refuelLogMapping: RefuelData = {
              uid: refuelLogs.rows.item(i).logUuid,
              date: refuelLogs.rows.item(i).refuelDate,
              odo: refuelLogs.rows.item(i).odo,
              quantity: refuelLogs.rows.item(i).quantity,
              cost: refuelLogs.rows.item(i).cost,
              images: [
                refuelLogs.rows.item(i).image1,
                refuelLogs.rows.item(i).image2,
              ],
            }
            dispatch(new ActionSetRefuelLog(refuelLogMapping))
          }
        })
      },
      (error) => {
        reject()
      },
      () => {
        resolve()
      }
    )
  })
}

export function fetchRefuelLogs(dispatch: any) {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("vehicleInfo")
          .doc(user.uid)
          .collection("vehicles")
          .onSnapshot((collections) => {
            collections.forEach(async (collectionData) => {
              const vcallsign: string = collectionData.data().vcallsign
              const refuelLogsData: Array<RefuelData> = collectionData.data()
                .refuelData
              refuelLogsData.forEach((item) => {
                db.transaction(
                  (txn) => {
                    txn.executeSql(
                      `REPLACE INTO refuelLogs(userUid,vcallsign,logUuid,odo,quantity,refuelDate,cost,image1,image2)
                VALUES(?,?,?,?,?,?,?,?,?)`,
                      [
                        user.uid,
                        vcallsign,
                        item.uid,
                        item.odo,
                        item.quantity,
                        item.date,
                        item.cost,
                        item.images[0],
                        item.images[1],
                      ],
                      (tx, rs) => {}
                    )
                  },
                  (error) => {
                    reject()
                  },
                  () => {
                    resolve()
                  }
                )
              })
            })
          })
      }
    })
  })
}
