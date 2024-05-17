//import React, { useEffect } from "react";

//import { database } from "../SQLite/UnitOfWorks";

//export default function useDatabase() {
//  const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);

//  useEffect(() => {
//    async function loadDataAsync() {
//      try {
//        await database.dropDatabaseTablesAsync();
//        await database.setupDatabaseAsync();
//        await database.setupUsersAsync();
//        setIsLoadingComplete(true);
//      } catch (e) {
//        console.warn(e);
//      }
//    }

//    loadDataAsync();
//  }, []);

//  return [isLoadingComplete];
//}
