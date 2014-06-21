global.NODE_CONFIG=NODE_CONFIG={},global.CPU_CLUSTERING=CPU_CLUSTERING=METHOD({run:function(o,t){"use strict";var e=require("cluster");RUN(e.isMaster?function(){var o=function(){var o=e.fork();o.on("message",function(t){EACH(e.workers,function(e){e!==o&&e.send(t)})})};REPEAT(require("os").cpus().length,function(){o()}),e.on("exit",function(t,e,E){console.log("[UPPERCASE.JS-CLUSTERING] WORKER #"+t.id+" (PID:"+t.process.pid+") died. ("+(void 0!==E?E:e)+"). restarting..."),o()})}:function(){var E={},n=function(o,t){E[o]=t};process.on("message",function(o){var t=o.methodName,e=o.data,n=E[t];void 0!==n&&n(e)}),n("__SHARED_STORE_SAVE",SHARED_STORE.save),n("__SHARED_STORE_REMOVE",SHARED_STORE.remove),t({id:e.worker.id,pid:e.worker.process.pid},n,o.broadcast=function(o){process.send(o)})})}}),global.SERVER_CLUSTERING=SERVER_CLUSTERING=METHOD({run:function(o,t,e){"use strict";var E,n,r,i=require("os"),a=t.hosts,R=t.port,S=i.networkInterfaces(),u=[],c={},s={};EACH(S,function(o){return EACH(o,function(o){var t=o.address;return"IPv4"===o.family&&o.internal===!1&&(u.push(t),CHECK_IS_EXISTS({data:a,value:t})===!0)?(E=t,!1):void 0})}),void 0===E?console.log("[UPPERCASE.JS-SERVER_CLUSTERING] NOT EXISTS MY HOST. (CLUSTER SERVER HOSTS:",a,", THIS SERVER HOSTS:",u):(n=function(o){CONNECT_TO_SOCKET_SERVER({host:o,port:R},function(t,e){console.log("[UPPERCASE.JS-SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (HOST:"+o+")"),e({methodName:"__BOOTED",data:{host:E}}),s[o]=function(o){var t=o.methodName,E=o.data;e({methodName:"SERVER_CLUSTERING."+t,data:E})},t("__DISCONNECTED",function(){delete s[o]})})},EACH(a,function(o){o!==E&&n(o)}),SOCKET_SERVER(R,function(o,t){t("__BOOTED",function(o){var t=o.host;void 0===s[t]&&n(t)}),EACH(c,function(o,e){t("SERVER_CLUSTERING."+e,o)})}),r=function(o,t){c[o]=t},r("__SHARED_STORE_SAVE",function(o){SHARED_STORE.save(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:o})}),r("__SHARED_STORE_REMOVE",function(o){SHARED_STORE.remove(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:o})}),e(E,r,o.broadcast=function(o){EACH(s,function(t){t(o)})}),console.log("[UPPERCASE.JS-SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER HOST:"+E+", PORT:"+R+")"))}}),global.SHARED_STORE=SHARED_STORE=CLASS({statics:function(o){"use strict";var t={},e={};o.save=function(o,E){var n=o.fullKey,r=o.value,i=o.removeAfterSeconds,a=o.isWaitRemove;t[n]=r,a===!0&&void 0!==e[n]&&(e[n].remove(),delete e[n]),void 0!==i&&(e[n]=DELAY(i,E))},o.get=function(o){return t[o]},o.remove=function(o){delete t[o],void 0!==e[o]&&(e[o].remove(),delete e[o])}},init:function(o,t,e,E){"use strict";var n,r,i,a;n=function(o){return E+"."+o},e.save=r=function(t){var e=t.key,E=n(e),r=t.value,i=t.removeAfterSeconds;o.save({fullKey:E,value:r,removeAfterSeconds:i},function(){a(e)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullKey:E,value:r,isWaitRemove:void 0!==i}}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullKey:E,value:r,isWaitRemove:void 0!==i}})},e.get=i=function(t){return o.get(n(t))},e.remove=a=function(t){var e=n(t);o.remove(e),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:e}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:e})}}}),global.CONNECT_TO_SOCKET_SERVER=CONNECT_TO_SOCKET_SERVER=METHOD({run:function(o,t,e){"use strict";var E,n,r,i,a,R=t.host,S=t.port,u=require("net"),c={},s="";CHECK_IS_DATA(e)!==!0?E=e:(E=e.success,n=e.error),a=function(o,t){var e=c[o];void 0!==e&&EACH(e,function(o){o(t,function(){REMOVE({data:e,value:o})})})},r=u.connect({host:R,port:S},function(){i=!0,E(function(o,t){var e=c[o];void 0===e&&(e=c[o]=[]),e.push(t)},function(o){r.write(STRINGIFY(o)+"\n")})}),r.on("data",function(o){var t,e,E;for(s+=o.toString();-1!==(e=s.indexOf("\n"));)t=s.substring(0,e),E=PARSE_STR(t),void 0!==E&&a(E.methodName,E.data),s=s.substring(e+1)}),r.on("close",function(){a("__DISCONNECTED")}),r.on("error",function(o){i!==!0?(console.log("[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED:",o),void 0!==n&&n(o)):a("__ERROR",o)})}}),global.SHA1=SHA1=METHOD({run:function(o,t){"use strict";var e=t.key,E=t.password,n=require("crypto");return n.createHmac("sha1",e).update(E).digest("hex")}}),global.DELETE=DELETE=METHOD({run:function(o,t,e){"use strict";REQUEST(COMBINE_DATA({origin:t,extend:{method:"DELETE"}}),e)}}),global.GET=GET=METHOD({run:function(o,t,e){"use strict";REQUEST(COMBINE_DATA({origin:t,extend:{method:"GET"}}),e)}}),global.POST=POST=METHOD({run:function(o,t,e){"use strict";REQUEST(COMBINE_DATA({origin:t,extend:{method:"POST"}}),e)}}),global.PUT=PUT=METHOD({run:function(o,t,e){"use strict";REQUEST(COMBINE_DATA({origin:t,extend:{method:"PUT"}}),e)}}),global.REQUEST=REQUEST=METHOD({run:function(o,t,e){"use strict";var E,n=require("http"),r=void 0===t.host?"localhost":t.host,i=void 0===t.port?80:t.port,a=t.uri,R=void 0!==t.data?"data="+encodeURIComponent(STRINGIFY(t.data)):t.paramStr,S=t.method;R=(void 0===R?"":R+"&")+Date.now(),S=S.toUpperCase(),"GET"===S?E=n.get({hostname:r,port:i,path:"/"+a+"?"+R},function(o){o.setEncoding("utf-8"),o.on("data",function(o){e(o)})}):(E=n.request({hostname:r,port:i,path:"/"+a,method:S},function(o){o.setEncoding("utf-8"),o.on("data",function(o){e(o)})}),E.write(R),E.end()),E.on("error",function(o){console.log("[UPPERCASE.JS-NODE] REQUEST FAILED:",t,o)})}}),global.SOCKET_SERVER=SOCKET_SERVER=METHOD({run:function(o,t,e){"use strict";var E=require("net"),n=E.createServer(function(o){var t={},E="",n=function(o,e){var E=t[o];void 0!==E&&EACH(E,function(o){o(e,function(){REMOVE({data:E,value:o})})})};o.on("data",function(o){var t,e,r;for(E+=o.toString();-1!==(e=E.indexOf("\n"));)t=E.substring(0,e),r=PARSE_STR(t),void 0!==r&&n(r.methodName,r.data),E=E.substring(e+1)}),o.on("close",function(){n("__DISCONNECTED")}),o.on("error",function(o){n("__ERROR",o)}),e({ip:o.remoteAddress,port:o.remotePort},function(o,e){var E=t[o];void 0===E&&(E=t[o]=[]),E.push(e)},function(t){o.write(STRINGIFY(t)+"\n")})});n.listen(t),console.log("[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:"+t+")")}}),global.WEB_SERVER=WEB_SERVER=METHOD({run:function(o,t,e){"use strict";var E=require("http");require("https"),E.createServer(function(o,t){var E=o.headers,n=E["X-Forwarded-For"];void 0===n&&(n=o.connection.remoteAddress),e({ip:n,cookies:PARSE_COOKIE_STR(E.cookie),headers:E,nativeReq:o},function(o){var e=void 0===o.statusCode?200:o.statusCode,E=void 0===o.headers?{}:o.headers,n=o.contentType,r=o.content,i=void 0===o.encoding?"utf-8":i,a=o.cacheTime;void 0!==n&&(E["Content-Type"]=contentTypes),void 0!==a&&(E.ETag=a,E["Last-Modified"]=new Date(a).toUTCString()),t.writeHead(e,E),t.end(r)})}).listen(t),console.log("[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER... (PORT:"+t+")")}}),global.PARSE_COOKIE_STR=PARSE_COOKIE_STR=METHOD({run:function(o,t){"use strict";var e,E={};return void 0!==t&&(e=t.split(";"),EACH(e,function(o){var t=o.split("=");E[t[0].trim()]=decodeURIComponent(t[1])})),E}}),global.CREATE_COOKIE_STR_ARRAY=CREATE_COOKIE_STR_ARRAY=METHOD({run:function(o,t){"use strict";var e=[];return EACH(t,function(o,t){e.push(t+"="+encodeURIComponent(o))}),e}});