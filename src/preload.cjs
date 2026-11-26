const {contextBridge,ipcRenderer}=require('electron');
const invoke=(name,...args)=>ipcRenderer.invoke(name,...args);
contextBridge.exposeInMainWorld('beStill',{
  readerOpen:url=>invoke('reader-open',url),readerClose:()=>invoke('reader-close'),onReaderState:fn=>ipcRenderer.on('reader-state',(_event,state)=>fn(state)),session:()=>invoke('session'),fullscreen:()=>invoke('fullscreen'),saveEsvKey:value=>invoke('esv-key',value),smokeReady:ok=>invoke('smoke-ready',ok),scripture:(ref,numbered=false)=>invoke('scripture',ref,numbered===true),commentary:ref=>invoke('commentary',ref),models:()=>invoke('models'),
  save:settings=>invoke('settings',settings),briefing:(force=false)=>invoke('briefing',force),briefingStatus:()=>invoke('briefing-status'),seen:()=>invoke('briefing-seen'),
  excludeSound:id=>invoke('exclude-sound',id),resetExclusions:()=>invoke('reset-exclusions'),audioInventory:()=>invoke('audio-inventory'),libraryTrack:index=>invoke('library-track',index),chooseLibrary:()=>invoke('choose-library'),clearLibrary:()=>invoke('clear-library'),recording:id=>invoke('recording',id),installRecording:id=>invoke('install-recording',id),chooseTrack:()=>invoke('choose-track'),track:()=>invoke('track'),open:url=>invoke('open-link',url),finish:()=>invoke('finish')
});
