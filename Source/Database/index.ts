import Realm from 'realm'
import {
  ImageSpecSchema,
  RefuelLogSchema,
  UserSchema,
  VehicleSchema,
} from './schema'

export const schemas: Array<Realm.Configuration> = [
  {
    schemaVersion: 0,
    path: Realm.defaultPath,
    schema: [UserSchema, VehicleSchema, ImageSpecSchema, RefuelLogSchema],
  },
  //   {
  //     schemaVersion: 1,
  //     path: Realm.defaultPath,
  //     schema: [personSchema, carSchema, petSchema],
  //     migration: (oldRealm: Realm, newRealm: Realm) => {
  //       const oldRealmInstance = oldRealm.objects('Car')
  //       const newRealmInstance = newRealm.objects('Car')

  //       for (let i = 0; i < oldRealmInstance.length; i++) {
  //         // objects (data) created  earlier
  //         //@ts-ignore
  //         newRealmInstance[i].average = newRealmInstance[i].miles / 12
  //       }
  //     },
  //   },
]

export function getRealmInstance(): Realm {
  let schemaIndex = Realm.schemaVersion(Realm.defaultPath)
  if (schemaIndex !== -1) {
    while (schemaIndex < schemas.length) {
      const migratedRealm = new Realm(schemas[schemaIndex++])
      //   migratedRealm.close()
    }
  }
  const realm = new Realm(schemas[schemas.length - 1])
  // realm.addListener('change', (arg, event) => {
  //   console.log(
  //     '============================Sync Started================================',
  //   )
  //   console.log('@@@@@@@@@@@@@@@@@@@arg', arg)
  //   // await startSync()
  //   console.log(
  //     '============================Sync finished===============================',
  //   )
  // })
  return realm
}

// realm mf isnot returning an obejct with change event, need the event for logging changes
