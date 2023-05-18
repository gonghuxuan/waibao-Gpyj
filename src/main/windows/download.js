const { ipcMain, dialog, shell } = require("electron");
const path = require("path");

exports.initDownload = function (win) {
    let downloadObj = {
        downloadPath: "", // 要下载的链接或文件
        fileName: "", // 要保存的文件名，需要带文件后缀名
        savedPath: "", // 要保存的路径
    };
    function resetDownloadObj() {
        downloadObj = {
            downloadPath: "",
            fileName: "",
            savedPath: "",
        };
    }
    // 监听渲染进程发出的download事件
    ipcMain.on("download", (evt, args) => {
        downloadObj.downloadPath = args.downloadPath;
        downloadObj.fileName = args.fileName;
        console.log(downloadObj.fileName);
        let ext = path.extname(downloadObj.fileName);
        let filters = [{ name: "全部文件", extensions: ["*"] }];
        if (ext && ext !== ".") {
            filters.unshift({
                name: "",
                extensions: [ext.match(/[a-zA-Z]+$/)[0]],
            });
        }
        // 弹出另存为弹框，用于获取保存路径
        dialog
            .showSaveDialog(win, {
                filters,
                defaultPath: downloadObj.fileName,
            })
            .then((result) => {
                downloadObj.savedPath = result.filePath;
                console.log("downloadObj.savedPath", downloadObj.savedPath);
                if (downloadObj.savedPath) {
                    console.log(
                        "downloadObj.savedPath innnnnnnnnnnnnnn",
                        downloadObj.savedPath
                    );
                    win.webContents.downloadURL({
                        url: downloadUrl,
                        headers: {
                            authorization: `6a77f97d9d59212af69fcdb4b12b3b78`,
                        },
                    }); // 触发will-download事件
                    console.log(
                        "downloadObj.overrrrrrrrrrrrrrrrr innnnnnnnnnnnnnn",
                        downloadObj.savedPath
                    );
                }
            })
            .catch(() => {
                console.log("errrrrrrrrrrrrrr");
            });
    });

    win.webContents.session.on("will-download", (event, item) => {
        console.log("innnnnnnnnnnnnn willllllllll");
        //设置文件存放位置
        item.setSavePath(downloadObj.savedPath);
        item.on("updated", (event, state) => {
            if (state === "interrupted") {
                console.log("Download is interrupted but can be resumed");
            } else if (state === "progressing") {
                if (item.isPaused()) {
                    console.log("Download is paused");
                } else {
                    console.log(`Received bytes: ${item.getReceivedBytes()}`);
                }
            }
        });
        item.once("done", (event, state) => {
            if (state === "completed") {
                console.log("Download successfully");
                shell.showItemInFolder(downloadObj.savedPath); // 下载成功后打开文件所在文件夹
            } else {
                console.log(`Download failed: ${state}`);
            }
            resetDownloadObj();
        });
    });
};
