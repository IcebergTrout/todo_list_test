import Database, { Database as SQLiteDatabase } from 'better-sqlite3';

export class DatabaseManager {
    dbPath: string;
    db: SQLiteDatabase | undefined;
    constructor(dbPath?: string) {
        this.dbPath = dbPath ? dbPath : "src/server/db/test_database.db";
    }

    connectToDB() {
        this.db = new Database(this.dbPath);
    }

    closeDB() {
        if (this.db) 
            this.db.close();
    }

    createTable(tableName: string, columns: { [key: string]: string }) {
        if (!this.db) {
            console.log("failed to run");
            return;
        }
        const columnDefinitions = Object.entries(columns)
            .map(([columnName, columnType]) => {
            // Sanitize the column name
            const sanitizedColumnName = columnName;
            // Sanitize the column type (basic validation for this example, but should be more robust in real cases)
            if (!['TEXT', 'INTEGER', 'REAL', 'BLOB', 'NULL'].includes(columnType.toUpperCase())) {
                throw new Error(`Invalid column type: "${columnType}". Must be one of TEXT, INTEGER, REAL, BLOB, or NULL.`);
            }
            return `${sanitizedColumnName} ${columnType.toUpperCase()}`;
            })
            .join(', ');
        const command = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`;
        if (this.db) {
            const statement = this.db.prepare(command);
            statement.run();
        }
    }

    updateTable(params: {tableName: string, columns: string[], values: any[], condition?: string}) {
        if (!this.db) {
            console.log("failed to run");
            return;
        }
        const { tableName, columns, values, condition } = params;
        let sql = `UPDATE ${tableName} SET `;
        sql += columns.map((col) => `${col} = ?`).join(', ');

        // Add WHERE condition if provided
        if (condition) {
            sql += ` WHERE ${condition}`;
        }

        // Prepare and execute the statement
        const stmt = this.db.prepare(sql);
        stmt.run(...values);
    }

    viewTable(tableName: string) {
        if (!this.db) {
            console.log("failed to run");
            return;
        }
        const statement = this.db.prepare(`SELECT * FROM ${tableName}`);
        const result = statement.all();
        console.log(result);
        return result;
    }

    viewAllTables() {
        if (!this.db) {
            console.log("failed to run");
            return;
        }
        const statement = this.db.prepare("PRAGMA table_list");
        const tables = statement.all();
        console.log(tables);
        return tables;
    }

    // insertIntoTable() {
        //TODO
    // }

    // createManagerTable() {
        //TODO
    // }

    // createTreeTable() {
        //TODO
    // }
}

export default DatabaseManager;
