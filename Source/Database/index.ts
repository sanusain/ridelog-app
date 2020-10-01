import { firebase } from "../Config/firebase"
import { ActionInitializeVehicleInfo, ActionSetVehicles } from "./Actions"

export function hydrateVehiclesInfo(dispatch: any) {
  dispatch(new ActionInitializeVehicleInfo())
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .firestore()
        .collection("vehicleInfo")
        .doc(user?.uid)
        .collection("vehicles")
        .get()
        .then((collections) => {
          collections.forEach((collectionData) => {
            //@ts-ignore
            dispatch(new ActionSetVehicles(collectionData.data()))
          })
        })
    }
  })
}
