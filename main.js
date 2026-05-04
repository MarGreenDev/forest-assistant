const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 600,
        icon: path.join(__dirname, 'favicon.ico'),
        resizable: false,

        alwaysOnTop: true,

        frame: false,
        transparent: false,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');

    win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
});
}

app.whenReady().then(() => {
    createWindow();
});

