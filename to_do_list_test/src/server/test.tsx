console.log('bruh');

import { DatabaseManager } from "./DatabaseManager.tsx";

const dbm = new DatabaseManager("src/server/db/test_database_file.db");

dbm.connectToDB();

// const columns : {[key: string]: string} = {};

// columns["name0"] = "TEXT"
// columns["name1"] = "TEXT"
// columns["name2"] = "TEXT"
// columns["name3"] = "TEXT"
// columns["name4"] = "TEXT"

// dbm.createTable("testTable", columns);
// console.log(dbm.viewAllTables());
// console.log("break---------------------------------------")

// console.log(dbm.viewTable("testTable"));
console.log(dbm.db?.pragma("table_info(testTable)"))
dbm.closeDB();