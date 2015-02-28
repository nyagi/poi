(function(){var debug,debug2,fs,gui,hide,menu,proxy,quit,settings,settingsWin,show,tray,ui,win;fs=require("fs");gui=window.require("nw.gui");if(process.platform==="darwin"){global.appDataPath=fs.realpathSync(gui.App.dataPath+"/..")+"/poi"}else{global.appDataPath=fs.realpathSync(process.execPath+"/..")}global.$=window.$;global.Notification=window.Notification;global.Notification.requestPermission();global.win=win=gui.Window.get();global.settingsWin=settingsWin=gui.Window.open("settings.html",{show:false,position:"center",toolbar:false,resizable:false,width:600,height:725});win.setAlwaysOnTop(true);settingsWin.setAlwaysOnTop(true);tray=null;if(process.platform!=="darwin"){tray=new gui.Tray({icon:"icon.png"})}else{tray=new gui.Tray({icon:"icon_16x16.png"})}menu=new gui.Menu;tray.on("click",function(){return win.show()});show=new gui.MenuItem({type:"normal",label:"显示",click:function(){return win.show()}});hide=new gui.MenuItem({type:"normal",label:"隐藏",click:function(){return win.hide()}});settings=new gui.MenuItem({type:"normal",label:"设置",click:function(){win.setAlwaysOnTop(false);return settingsWin.show()}});debug=new gui.MenuItem({type:"normal",label:"调试",click:function(){return win.showDevTools()}});debug2=new gui.MenuItem({type:"normal",label:"调试Settings",click:function(){return settingsWin.showDevTools()}});quit=new gui.MenuItem({type:"normal",label:"退出",click:function(){settingsWin.close(true);return win.close(true)}});menu.append(show);menu.append(hide);menu.append(settings);menu.append(quit);tray.menu=menu;window.tray=tray;win.on("minimize",function(){return this.hide()});win.on("close",function(quit){if(!quit){return this.hide()}else{return this.close(true)}});settingsWin.on("close",function(quit){win.setAlwaysOnTop(true);if(!quit){return this.hide()}else{return this.close(true)}});require("./modules/config").loadConfig();ui=require("./modules/ui");ui.api_start2_loadDefault();require("./modules/cache").initCache();proxy=require("./modules/proxy");proxy.createShadowsocksServer();proxy.createServer()}).call(this);