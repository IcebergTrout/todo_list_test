import { Database } from "sqlite3";

class DatabaseManager {
    db: Database;

    constructor(dbPath: string) {
        this.db = new Database(dbPath, (err) => {
            if (err) {
                console.error('Error creating database:', err.message);
            } else {
                console.log('Database created successfully.');
            }
        });
    }

    accessDB() {
        return this.db;
    }

    /**
     * Adds a Tree to storage
     * @param treeId id of the Tree to be added
     * @param treeName name of the Tree to be added
     */
    async addTree(treeId: string, treeName: string) {
        // Adds Tree into 'Trees' table
        console.log(treeName);
        await new Promise<void>((resolve, reject) => {
            this.db.run(`INSERT INTO todo_list_trees (id, name)
                     VALUES( '${treeId}', '${treeName}');`,
                (err) => {
                    if (err) {
                        console.error('Error:', err.message);
                        reject();
                    } else {
                        console.log(`Successfully added ${treeId} to Trees table.`);
                        resolve();
                    }
                }
            );
        });


        // Creates the table for that tree based on the id
        await new Promise<void>((resolve, reject) => {
            this.db.run(`CREATE TABLE IF NOT EXISTS todo_list_${treeId} (
                    id TEXT PRIMARY KEY UNIQUE NOT NULL,
                    value TEXT,
                    checked INTEGER,
                    parent TEXT)`,
                (err) => {
                    if (err) {
                        console.error('Error:', err.message);
                        reject();
                    } else {
                        console.log(`Successfully created todo_list_${treeId} table.`);
                        resolve();
                    }
                }
            );
        });

    }

    /**
     * Removes a tree from storage using its id
     * @param treeId id of the Tree to be removed from storage
     */
    deleteTree(treeId: string) {
        this.db.run(`DELETE FROM Trees WHERE id = ${treeId}`, (err) => {
            if (err) {
                console.error('Error:', err.message);
            } else {
                console.log(`Successfully removed ${treeId} from Trees table.`)
            }
        });

        this.db.run(`DROP TABLE IF EXISTS todo_list_${treeId}`, (err) => {
            if (err) {
                console.error(`Drop tree-${treeId} Error:`, err.message);
            } else {
                console.log(`Successfully dropped todo_list_${treeId} table.`)
            }
        });
    }

    updateTree() {

    }
}

export default DatabaseManager;