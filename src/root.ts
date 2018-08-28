import 'reflect-metadata';
import { join as joinPath } from 'path';
import express = require('express');
import { createConnection, useContainer as useContainerOrm } from 'typeorm';
import { useExpressServer, useContainer as useContainerRouting } from 'routing-controllers';
import { Container } from 'typedi';
import session = require('express-session')
import createStore = require('connect-sqlite3');

const SQLiteStore = createStore(session);

/*
.ctrl.ts = controller
.surv.ts = survice
.enti.ts = entity
*/

(async () => {

    useContainerOrm(Container);
    useContainerRouting(Container);

    await createConnection({
        type: 'sqlite',
        database: joinPath(__dirname, '../.data/database.sqlite'),
        synchronize: true,
        entities: [
            __dirname + '/**/*.enti.ts',
        ],
    });

    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', __dirname);

    app.use(session({
        store: new SQLiteStore({
            table: 'sessions',
            dir: joinPath(__dirname, '../.data'),
        }),
        name: 'session_uid',
        secret: 'somerandonstuffs',
        resave: false,
        saveUninitialized: true,
    }));

    useExpressServer(app, {
        controllers: [
            __dirname + '/**/*.ctrl.ts',
        ],
    });

    app.listen(8080, () => console.log('Ready on 8080'));

})();
