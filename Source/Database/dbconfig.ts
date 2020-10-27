import * as SQLite from "expo-sqlite"

const dbConsts = {
  name: "ridelogg.db",
  version: "1.0.0",
}

export const db = SQLite.openDatabase(dbConsts.name, dbConsts.version)
