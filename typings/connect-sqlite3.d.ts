declare module 'connect-sqlite3' {

    import session = require('express-session');

    interface SQLiteStoreOptions {
        table: string;
        db: string;
        dir: string;
        concurrentDB: string;
    }

    type SQLiteStore = new (opts?: Partial<SQLiteStoreOptions>) => session.Store;

    function createStore(ses: typeof session): SQLiteStore;

    export = createStore;
}
