# electron例子
本项目学习electron的使用。   
每一个分支是一个例子。分支格式是demo01, demo02。后面的分支是基于前面分支的。

# demo01
学会"hello world"。   
electron最基本的文件有三个`package.json`, `index.html`, `main.js`。   
想要运行代码，需要安装`electron-prebuilt`模块。通过`electron`来运行。   
如果安装在全局只需要运行: `electron .`；如果安装在本地需要运行：`./node_modules/.bin/electron .`。   

## 主进程与渲染进程
electron中，由`package.json`中的main脚本跑出来的进程为主进程(main process)。当主进程可以创建GUI界面用于显示web页面。
electron由Chromium负责页面的显示。所以当显示一个页面时，就会有一个对应的渲染进程(renderer process)。
主进程通过创建`BrowserWindow`来创建web显示页面。一个`BrowserWindow`运行在他自己的渲染进程中。当`BrowserWindow`被销毁时，对应的渲染进程也会终止。 
主进程管理着所有的web页面和其对应的渲染进程。与GUI相关的原生接口是不能被渲染进程所调用的。渲染进程通过与主进程通信来获得GUI原生接口的操作。渲染进程与主进程的通信可以使用`ipcRenderr`和`ipcMain`两个模块进行通信。



实现多个页面，以及页面间的消息通讯
  管理子窗口
菜单如何创建，以及页面与菜单间的通讯
页面与系统功能的交互
main process & render process
全局快捷键