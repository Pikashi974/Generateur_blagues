const { app } = require("electron");
const { NewWindow } = require("./src/js/main");

require("electron-reload")(__dirname);

app.allowRendererProcessReuse = true;
app.whenReady().then(NewWindow);
