import {User} from '../../Contexts/AuthProvider'
import {RefuelData} from '../Dashboard/types'

export function removeLogFromDB(
  dispatch: any,
  user: User,
  refuelData: RefuelData,
  selectedVehicle: string,
) {
  /**
   * deletion in 3 steps
   * 1. delete it from local db
   * 2. from firestore
   * 3. delte images in storage
   */
  //   let selectedVehicle: string | null

  if (selectedVehicle) {
    const vehicleInfoRef = firebase
      .firestore()
      .collection('vehicleInfo')
      .doc(user?.uid)
      .collection('vehicles')
      .doc(selectedVehicle)

    vehicleInfoRef
      .update('refuelData', firestore.FieldValue.arrayRemove(refuelData))
      .then(() => {
        const storageRef = firebase
          .storage()
          .ref('images')
          .child(user ? user.uid : '')
          .child(selectedVehicle || '')
          .child('refuelLog')
          .child(refuelData.date)

        storageRef
          .listAll()
          .then((allImages) => {
            allImages.items.forEach((image) => {
              image
                .delete()
                .then(() => {
                  // Image deleted from firebase storage
                })
                .catch((error) => {
                  console.log('Couldnt delete Image', error)
                })
            })
          })
          .catch((error) => {
            console.log('Listing all images error', error)
          })
      })
      .then(() => {
        db.transaction(
          (txn) => {
            txn.executeSql(
              'Delete from refuelLogs where logUuid=?',
              [refuelData.uid],
              (tx, deletedLog) => {
                console.log('deletedLog.rowsAffected', deletedLog.rowsAffected)
              },
              // @ts-ignore
              (tx, error) => {
                console.log('Couldnt delete log', error)
              },
            )
          },
          (error) => {
            console.log('Delete log txn failed', error)
          },
          () => {
            // Txn sucessful
          },
        )
      })
      .catch((error) => {
        console.log('Firebase refuellog delete failed', error)
      })
      .finally(() => {
        hydrateRefuelLogs(dispatch)
      })
  }
}
