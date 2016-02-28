(function () {
    'use strict';

    var app = require('app');
    var BrowserWindow = require('browser-window');

    var mainWindow = null;

    app.on('window-all-closed', function () {
        app.quit();

    });

    app.on('ready', function () {

        mainWindow = new BrowserWindow({
            width: 900,
            height: 700,
            "min-width": 900,
            "min-height": 700,
            center: true,
            resizable: true,
            show: false
        });

        mainWindow.loadURL('file:// ' + __dirname + '/index.html');

        mainWindow.show();
    });
})();