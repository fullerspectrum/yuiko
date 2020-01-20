const os = require('os');
const path = require('path');
const fs = require('fs');
const { app, BrowserWindow } = require('electron');
const { join } = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${join(__dirname, '../build/index.html')}`,
  );

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log('yuiko dev version running');
    // add react dev tools to electron, for linux devs, if available
    if (os.platform() === 'linux') {
      const devToolsFolderPath = path.join(
        os.homedir(),
        `/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/`,
      );
      const devToolsFolderContent = fs.readdirSync(devToolsFolderPath);

      if (devToolsFolderContent)
        BrowserWindow.addDevToolsExtension(devToolsFolderPath.concat(devToolsFolderContent.pop()));
    }
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
