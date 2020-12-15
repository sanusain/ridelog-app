import ObjectID from 'bson-objectid'
import {firebase} from '../../Config/firebase'
import {ActionResetUploadProgress, ActionSetUploadProgress} from './actions'
import {ImageSpecs} from './types'

export function uploadImages(
  uid: string,
  vcallsign: string,
  logType: string,
  imagesList: Array<ImageSpecs>,
  date: Date,
  dispatch: any,
): Promise<Array<ImageSpecs>> {
  return new Promise(async (resolve, reject) => {
    try {
      if (firebase.auth().currentUser) {
        const storageRef = firebase
          .storage()
          .ref('images')
          .child(uid)
          .child(vcallsign)
          .child(logType)
          .child(date.toISOString())

        let uploadedImagesURLs: Array<ImageSpecs> = []

        for (const image of imagesList) {
          const blob: Blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = function () {
              resolve(xhr.response)
            }
            xhr.onerror = function (e) {
              console.log(e)
              reject(new TypeError('Network request failed'))
            }
            xhr.responseType = 'blob'
            xhr.open('GET', image.url, true)
            xhr.send(null)
          })

          let uploadTask = storageRef
            .child(new ObjectID().str, +'.jpg')
            .put(blob, {
              customMetadata: {
                height: image.height.toString(),
                width: image.width.toString(),
                uid: image.uid,
              },
            })

          const imageURL = (
            singleUploadTask: firebase.storage.UploadTask,
          ): Promise<string> => {
            return new Promise<string>((resolve, reject) => {
              let oldUploadProgress = 0
              singleUploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: {bytesTransferred: number; totalBytes: number}) => {
                  const currentUploadProgress =
                    ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) /
                    imagesList.length
                  dispatch(
                    new ActionSetUploadProgress(
                      currentUploadProgress - oldUploadProgress,
                    ),
                  )
                  oldUploadProgress = currentUploadProgress
                },
                (error: any) => {
                  reject(error)
                },
                () => {
                  singleUploadTask.snapshot.ref
                    .getDownloadURL()
                    .then((url: string | PromiseLike<string> | undefined) => {
                      resolve(url)
                    })
                },
              )
            })
          }

          uploadedImagesURLs.push({
            uid: image.uid,
            url: await imageURL(uploadTask),
            height: image.height,
            width: image.width,
          })
        }
        resolve(uploadedImagesURLs)
        dispatch(new ActionResetUploadProgress())
      }
    } catch (error) {
      reject(error)
    }
  })
}
