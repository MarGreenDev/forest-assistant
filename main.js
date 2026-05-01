const { app, BrowserWindow, shell } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 600,
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

