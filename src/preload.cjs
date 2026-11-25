const {contextBridge,ipcRenderer}=require('electron');
const invoke=(name,...args)=>ipcRenderer.invoke(name,...args);
contextBridge.exposeInMainWorld('beStill',{
  session:()=>invoke('session'),scripture:ref=>invoke('scripture',ref),models:()=>invoke('models'),
  save:settings=>invoke('settings',settings),briefing:()=>invoke('briefing'),seen:()=>invoke('briefing-seen'),
  chooseTrack:()=>invoke('choose-track'),track:()=>invoke('track'),open:url=>invoke('open-link',url),finish:()=>invoke('finish')
});
