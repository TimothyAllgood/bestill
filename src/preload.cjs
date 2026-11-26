const {contextBridge,ipcRenderer}=require('electron');
const invoke=(name,...args)=>ipcRenderer.invoke(name,...args);
contextBridge.exposeInMainWorld('beStill',{
  session:()=>invoke('session'),fullscreen:()=>invoke('fullscreen'),saveEsvKey:value=>invoke('esv-key',value),smokeReady:()=>invoke('smoke-ready'),scripture:ref=>invoke('scripture',ref),commentary:ref=>invoke('commentary',ref),models:()=>invoke('models'),
  save:settings=>invoke('settings',settings),briefing:(force=false)=>invoke('briefing',force),briefingStatus:()=>invoke('briefing-status'),seen:()=>invoke('briefing-seen'),
  recording:id=>invoke('recording',id),installRecording:id=>invoke('install-recording',id),chooseTrack:()=>invoke('choose-track'),track:()=>invoke('track'),open:url=>invoke('open-link',url),finish:()=>invoke('finish')
});
