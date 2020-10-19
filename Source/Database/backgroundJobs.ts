import { firebase } from "../Config/firebase"
import { RefuelData, vehicleInfo } from "../Screens/Dashboard/types"
import {
  ActionRemoveVehicle,
  ActionSetRefuelLog,
  ActionSetVehicles,
} from "./Actions"
import { db } from "./dbconfig"

export function hydrateVehiclesInfo(dispatch: any) {
  db.transaction((txn) => {
    txn.executeSql(`select * from vehicles`, [], (txn, resultSet) => {
      let allVehicles = []
      for (let i = 0; i < resultSet.rows.length; i++) {
        allVehicles.push(resultSet.rows.item(i))
      }
      allVehicles.forEach((item) => {
        const vehicle: vehicleInfo = {
          vcallsign: item.vcallsign,
          maker: item.maker,
          model: item.maker,
          odo: item.odo,
          plate: item.plate,
          vin: item.plate,
          year: item.year,
          images: [
            item.image1,
            item.image2,
            item.image3,
            item.image4,
            item.image5,
          ],
          refuelData: [],
          serviceData: [],
        }
        dispatch(new ActionSetVehicles(vehicle))
      })
    })
  })
}

export function fetchVehicles(dispatch: any) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .firestore()
        .collection("vehicleInfo")
        .doc(user?.uid)
        .collection("vehicles")
        .onSnapshot((collections) => {
          let vehiclesInServer: Array<string> = []
          collections.forEach((collectionData) => {
            vehiclesInServer.push(collectionData.data().vcallsign)
          })

          db.transaction((txn) => {
            txn.executeSql(`select * from vehicles`, [], (txn, resultSet) => {
              for (let i = 0; i < resultSet.rows.length; i++) {
                if (
                  !vehiclesInServer.includes(resultSet.rows.item(i).vcallsign)
                ) {
                  txn.executeSql(
                    `DELETE FROM vehicles WHERE vcallsign=?`,
                    [resultSet.rows.item(i).vcallsign],
                    (_txn, rs) => {
                      console.log("rs.rowsAffected", rs.rowsAffected)
                      dispatch(
                        new ActionRemoveVehicle(
                          resultSet.rows.item(i).vcallsign
                        )
                      )
                    }
                  )
                }
              }
            })
          })

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
                  (tx, resultSet) => {
                    console.log(
                      collectionData.data().vcallsign,
                      " inserted in SQLITE"
                    )
                    if (resultSet.rowsAffected) hydrateVehiclesInfo(dispatch)
                  }
                )
              },
              (error) => {
                console.log("Insert failed:", error)
              },
              () => {
                //sucess callback
              }
            )
          })
        })
    }
  })
}

export function hydrateRefuelLogs(dispatch: any, vcallsign: "Storm0171") {
  db.transaction((txn) => {
    txn.executeSql(
      "select * from refuelLogs where vcallsign=?",
      [vcallsign],
      (tx, refuelLogs) => {
        let allRefuelLogs = []
        for (let i = 0; i < refuelLogs.rows.length; i++) {
          allRefuelLogs.push(refuelLogs.rows.item(i))
        }

        allRefuelLogs.forEach((dblog) => {
          const refuelLogMapping: RefuelData = {
            uid: dblog.logUuid,
            date: dblog.refuelDate,
            odo: dblog.odo,
            quantity: dblog.quantity,
            cost: dblog.cost,
            images: [dblog.image1, dblog.image2],
          }
          dispatch(new ActionSetRefuelLog(refuelLogMapping))
        })
      },
      //@ts-ignore
      (error) => {}
    )
  })
}

export function fetchRefuelLogs(dispatch: any) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .firestore()
        .collection("vehicleInfo")
        .doc(user.uid)
        .collection("vehicles")
        .onSnapshot((collections) => {
          collections.forEach((collectionData) => {
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
                    ]
                  )
                },
                (error) => {},
                //@ts-ignore
                (success) => {
                  console.log("transaction executed")
                  hydrateRefuelLogs(dispatch, "Storm0171")
                }
              )
            })
          })
        })
    }
  })
}
