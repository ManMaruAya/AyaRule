const scriptName = 'BiliBili';
 let magicJS = MagicJS(scriptName, 'INFO');
 ;(() => {
   let body = null;
   if (magicJS.isResponse){
     switch (true){
       case /^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test(magicJS.request.url):
         try{
           const tabList = new Set([39, 40, 41, 42, 151]);
           const bottomList = new Set([177, 178, 179, 181]);
           let obj = JSON.parse(magicJS.response.body);
           if (obj['data']['tab']){
             let tab = obj['data']['tab'].filter((e) =>{return tabList.has(e.id);});
             obj['data']['tab'] = tab;
           }
           if (obj['data']['top']){
             let top = obj['data']['top'].filter((e) =>{
               return topList.has(e.id);
             });
             obj['data']['top'] = top;
           }
           if (obj['data']['bottom']){
             let bottom = obj['data']['bottom'].filter((e) =>{return bottomList.has(e.id);});
             obj['data']['bottom'] = bottom;
           }
           body = JSON.stringify(obj);
         }
         catch (err){
           magicJS.logError(`标签页处理出现异常：${err}`);
         }
         break;
     }
   }
   else{
     magicJS.logWarning('触发意外的请求处理，请确认脚本或复写配置正常。');
   }
   if (body){
     magicJS.done({body});
   }
   else{
     magicJS.done();
   }
 })();
