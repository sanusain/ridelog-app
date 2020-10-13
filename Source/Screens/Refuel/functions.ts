import uuid from "react-native-uuid"
import { firebase } from "../../Config/firebase"
import { ActionResetUploadProgress, ActionSetUploadProgress } from "./actions"
import { ImageSpecs } from "./types"

export function uploadImages(
  uid: string,
  vcallsign: string,
  logType: string,
  imagesList: Array<ImageSpecs>,
  date: Date,
  dispatch: any
) {
  dispatch(new ActionResetUploadProgress())
  if (firebase.auth().currentUser) {
    const storageRef = firebase
      .storage()
      .ref("images")
      .child(uid)
      .child(vcallsign)
      .child(logType)
      .child(date.getTime().toString())

    imagesList.forEach(async (item, index, array) => {
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
          resolve(xhr.response)
        }
        xhr.onerror = function (e) {
          console.log(e)
          reject(new TypeError("Network request failed"))
        }
        xhr.responseType = "blob"
        xhr.open("GET", item.uri, true)
        xhr.send(null)
      })

      let uploadTask = storageRef.child(uuid.v4() + ".jpg").put(blob, {
        customMetadata: {
          height: item.height.toString(),
          width: item.width.toString(),
          uid: item.uid,
        },
      })

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        if (index === array.length - 1) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          dispatch(new ActionSetUploadProgress(progress))
        }
      })
    })
  }
}
