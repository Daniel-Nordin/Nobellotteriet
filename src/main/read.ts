import { ipcMain, ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';
ipcMain.handle('readFile', async (_, args) => {
  fs.readFile(args, (error, data) => {
    if (error) throw error;

    // Send result back to renderer process
    return data;
  });
});
