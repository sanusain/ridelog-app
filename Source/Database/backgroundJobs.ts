import { db } from "."
import { firebase } from "../Config/firebase"
import { vehicleInfo } from "../Screens/Dashboard/types"
import { ActionRemoveVehicle, ActionSetVehicles } from "./Actions"

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
                    (txn, rs) => {
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
                  }
                )
              },
              (error) => {
                console.log("Insert failed:", error)
              },
              () => {
                //sucess callback
                hydrateVehiclesInfo(dispatch)
              }
            )
          })
        })
    }
  })
}
