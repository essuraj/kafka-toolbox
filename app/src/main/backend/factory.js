import {
    ipcMain
} from 'electron'
var kafka = require('kafka-node');
var Client = kafka.Client;

export var client;
ipcMain.on('test', function (event, url) {
    client = new Client(url);
    try {
        client.once('connect', function () {

            client.loadMetadataForTopics([], function (error, results) {
                if (error) {
                    console.error(error);
                    event.returnValue = {
                        success: false,
                        message: "Connect Error",
                        data: error
                    };
                } else {
                    console.info(results)
                    event.returnValue = {
                        success: true,
                        message: "Connect Success",
                        data: results
                    };
                }
                client.close();
            });
        });
    } catch (err) {
        console.error(err)
    }
});