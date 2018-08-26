import 'reflect-metadata';
import { join as joinPath } from 'path';
import express = require('express');
import { createConnection, useContainer as useContainerOrm } from 'typeorm';
import { useExpressServer, useContainer as useContainerRouting } from 'routing-controllers';
import { Container } from 'typedi';

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

    useExpressServer(app, {
        controllers: [
            __dirname + '/**/*.ctrl.ts',
        ],
    });

    app.listen(8080, () => console.log('Ready on 8080'));

})();
