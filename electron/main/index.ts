//@ts-nocheck
import { app, BrowserWindow, shell, ipcMain, dialog,Menu } from 'electron'
import { release } from 'os'
import { join } from 'path'
const WebSocket = require("ws");
// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL as string
const indexHtml = join(ROOT_PATH.dist, 'index.html')


//webSocket 服务端地址


async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    // fullscreen:true,
    icon: join(ROOT_PATH.public, 'favicon.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  Menu.setApplicationMenu(null);

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    childWindow.loadURL(`${url}/#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})

let ws = null;
let wsTime = 10; // 重连次数
const wsUrl = "ws://114.55.172.48:8002/websocket/box";
let flag=true;
function wsInit() {
  ws.onopen = function () {
    wsHeart.reStart();
  };
  ws.onmessage = function (e) {
    wsHeart.reStart();
    if (e.data === "pong") {
      console.log(666.909, "pong");
    } else {
      // 处理正常消息的地方
      win.webContents.send('init_win_id', '123');
    }
  };
  ws.onclose = function () {
    if (wsTime > 0) {
      wsHeart.reConnect();
    } else {
      wsHeart.reClose();
    }
  };
  ws.onerror = function () {
    console.log("jj")
    if (wsTime > 0) {
      wsHeart.reConnect();
    } else {
      wsHeart.reClose();
    }
  };

  window.onbeforeunload = function () {
    wsHeart.reClose();
  };
}

var wsHeart = {
  timeout: 3000, // 心跳延迟时间
  timeoutObj: null,
  serverTimeoutObj: null,
  connectTimeoutObj: null,
  lockConnect: false,
  lockConnectTimeout: 2000, // 重连延迟时间
  reSet: function () {
    wsTime = 10;
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    clearTimeout(this.connectTimeoutObj);
    this.timeoutObj = null;
    this.serverTimeoutObj = null;
    this.connectTimeoutObj = null;
  },
  reClose: function () {
    this.reSet();
    ws.close();
  },
  reStart: function () {
    this.reSet();
    this.reCheck();
  },
  reCheck: function () {
    this.timeoutObj = setTimeout(() => {
      try {
        ws.send("ping");
      }catch (e) {
        let flag=false;
        let interval = setInterval(function () {
          ws.close();
          wsHeart.newWs();
        },2000);
        if (flag){
          clearInterval(interval);
          interval=null;
        }
      }

      this.serverTimeoutObj = setTimeout(() => {
        this.reClose();
      }, this.timeout);
    }, this.timeout);
  },
  reConnect: function () {
    if (!this.lockConnect) {
      console.log(this.lockConnect)
      wsTime--;
      this.lockConnect = true;
      this.connectTimeoutObj = setTimeout(() => {
        this.newWs();
        this.lockConnect = false;
      }, this.lockConnectTimeout);
    }
  },
  newWs: function () {
    try {
      ws = new WebSocket(wsUrl);
      wsInit();
      flag=true;
    } catch (e) {
      this.reConnect();
    }
  },
};

wsHeart.newWs();
