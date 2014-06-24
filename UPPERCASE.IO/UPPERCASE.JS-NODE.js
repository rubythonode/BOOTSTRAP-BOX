global.NODE_CONFIG=NODE_CONFIG={},global.CPU_CLUSTERING=CPU_CLUSTERING=METHOD(function(o){"use strict";return{run:function(n){var t=require("cluster");RUN(t.isMaster?function(){var o=function(){var o=t.fork();o.on("message",function(n){EACH(t.workers,function(t){t!==o&&t.send(n)})})};REPEAT(require("os").cpus().length,function(){o()}),t.on("exit",function(n,t,e){console.log("[UPPERCASE.JS-CPU_CLUSTERING] WORKER #"+n.id+" (PID:"+n.process.pid+") died. ("+(void 0!==e?e:t)+"). restarting..."),o()})}:function(){var e,E={},i=function(o,n){var t=E[o];void 0!==t&&EACH(t,function(o){o(n,function(){REMOVE({data:t,value:o})})})};process.on("message",function(o){void 0!==o&&i(o.methodName,o.data)}),e=function(o,n){var t=E[o];void 0===t&&(t=E[o]=[]),t.push(n)},e("__SHARED_STORE_SAVE",SHARED_STORE.save),e("__SHARED_STORE_REMOVE",SHARED_STORE.remove),n({id:t.worker.id,pid:t.worker.process.pid},o.on=e,o.broadcast=function(o){process.send(o)})})}}}),global.SERVER_CLUSTERING=SERVER_CLUSTERING=METHOD(function(o){"use strict";return{run:function(n,t){var e,E,i,r=require("os"),a=n.hosts,R=n.port,u=r.networkInterfaces(),S=[],c={},d={};EACH(u,function(o){return EACH(o,function(o){var n=o.address;return"IPv4"===o.family&&o.internal===!1&&(S.push(n),CHECK_IS_EXISTS({data:a,value:n})===!0)?(e=n,!1):void 0})}),void 0===e?console.log("[UPPERCASE.JS-SERVER_CLUSTERING] NOT EXISTS MY HOST. (CLUSTER SERVER HOSTS:",a,", THIS SERVER HOSTS:",S):(E=function(o){CONNECT_TO_SOCKET_SERVER({host:o,port:R},function(n,t){console.log("[UPPERCASE.JS-SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (HOST:"+o+")"),t({methodName:"__BOOTED",data:{host:e}}),d[o]=function(o){var n=o.methodName,e=o.data;t({methodName:"SERVER_CLUSTERING."+n,data:e})},n("__DISCONNECTED",function(){delete d[o]})})},EACH(a,function(o){o!==e&&E(o)}),SOCKET_SERVER(R,function(o,n){n("__BOOTED",function(o){var n=o.host;void 0===d[n]&&E(n)}),EACH(c,function(o,t){EACH(o,function(o){n("SERVER_CLUSTERING."+t,o)})})}),i=function(o){var n=c[o];void 0===n&&(n=c[o]=[]),n.push(method)},i("__SHARED_STORE_SAVE",function(o){SHARED_STORE.save(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:o})}),i("__SHARED_STORE_REMOVE",function(o){SHARED_STORE.remove(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:o})}),t(e,o.on=i,o.broadcast=function(o){EACH(d,function(n){n(o)})}),console.log("[UPPERCASE.JS-SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER HOST:"+e+", PORT:"+R+")"))}}}),global.SHARED_STORE=SHARED_STORE=CLASS(function(o){"use strict";var n,t,e,E={},i={};return o.save=n=function(o,n){var t=o.fullKey,e=o.value,r=o.removeAfterSeconds,a=o.isWaitRemove;E[t]=e,a===!0&&void 0!==i[t]&&(i[t].remove(),delete i[t]),void 0!==r&&(i[t]=DELAY(r,n))},o.get=t=function(o){return E[o]},o.remove=e=function(o){delete E[o],void 0!==i[o]&&(i[o].remove(),delete i[o])},{init:function(o,n,t){var e,E,i,r;e=function(o){return t+"."+o},n.save=E=function(o){var n=o.key,t=e(n),i=o.value,a=o.removeAfterSeconds;E({fullKey:t,value:i,removeAfterSeconds:a},function(){r(n)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullKey:t,value:i,isWaitRemove:void 0!==a}}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullKey:t,value:i,isWaitRemove:void 0!==a}})},n.get=i=function(o){return i(e(o))},n.remove=r=function(o){var n=e(o);r(n),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n})}}}}),global.CONNECT_TO_SOCKET_SERVER=CONNECT_TO_SOCKET_SERVER=METHOD({run:function(o,n){"use strict";var t,e,E,i,r,a,R=o.host,u=o.port,S=require("net"),c={},d="";CHECK_IS_DATA(n)!==!0?t=n:(t=n.success,e=n.error),a=function(o,n){var t=c[o];void 0!==t&&EACH(t,function(o){o(n,function(){REMOVE({data:t,value:o})})})},E=S.connect({host:R,port:u},function(){i=!0,t(function(o,n){var t=c[o];void 0===t&&(t=c[o]=[]),t.push(n)},function(o){E.write(STRINGIFY(o)+"\n")},function(){r=!0,E.end()})}),E.on("data",function(o){var n,t,e;for(d+=o.toString();-1!==(t=d.indexOf("\n"));)n=d.substring(0,t),e=PARSE_STR(n),void 0!==e&&a(e.methodName,e.data),d=d.substring(t+1)}),E.on("close",function(){r!==!0&&a("__DISCONNECTED")}),E.on("error",function(o){i!==!0?(console.log("[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED:",o),void 0!==e&&e(o)):a("__ERROR",o)})}}),global.SHA1=SHA1=METHOD({run:function(o){"use strict";var n=o.key,t=o.password,e=require("crypto");return e.createHmac("sha1",n).update(t).digest("hex")}}),global.DELETE=DELETE=METHOD({run:function(o,n){"use strict";REQUEST(COMBINE_DATA({origin:o,extend:{method:"DELETE"}}),n)}}),global.GET=GET=METHOD({run:function(o,n){"use strict";REQUEST(COMBINE_DATA({origin:o,extend:{method:"GET"}}),n)}}),global.POST=POST=METHOD({run:function(o,n){"use strict";REQUEST(COMBINE_DATA({origin:o,extend:{method:"POST"}}),n)}}),global.PUT=PUT=METHOD({run:function(o,n){"use strict";REQUEST(COMBINE_DATA({origin:o,extend:{method:"PUT"}}),n)}}),global.REQUEST=REQUEST=METHOD({run:function(o,n){"use strict";var t,e,E,i=require("http"),r=void 0===o.host?"localhost":o.host,a=void 0===o.port?80:o.port,R=o.method,u=o.uri,S=void 0!==o.data?"data="+encodeURIComponent(STRINGIFY(o.data)):o.paramStr;CHECK_IS_DATA(n)!==!0?t=n:(t=n.success,e=n.error),S=(void 0===S?"":S+"&")+Date.now(),R=R.toUpperCase(),"GET"===R?E=i.get({hostname:r,port:a,path:"/"+u+"?"+S},function(o){o.setEncoding("utf-8"),o.on("data",function(o){t(o)})}):(E=i.request({hostname:r,port:a,path:"/"+u,method:R},function(o){o.setEncoding("utf-8"),o.on("data",function(o){t(o)})}),E.write(S),E.end()),E.on("error",function(n){console.log("[UPPERCASE.JS-NODE] REQUEST FAILED:",o,n),void 0!==e&&e(n)})}}),global.SOCKET_SERVER=SOCKET_SERVER=METHOD({run:function(o,n){"use strict";var t=require("net"),e=t.createServer(function(o){var t,e={},E="",i=function(o,n){var t=e[o];void 0!==t&&EACH(t,function(o){o(n,function(){REMOVE({data:t,value:o})})})};o.on("data",function(o){var n,t,e;for(E+=o.toString();-1!==(t=E.indexOf("\n"));)n=E.substring(0,t),e=PARSE_STR(n),void 0!==e&&i(e.methodName,e.data),E=E.substring(t+1)}),o.on("close",function(){t!==!0&&i("__DISCONNECTED")}),o.on("error",function(o){i("__ERROR",o)}),n({ip:o.remoteAddress},function(o,n){var t=e[o];void 0===t&&(t=e[o]=[]),t.push(n)},function(n){o.write(STRINGIFY(n)+"\n")},function(){t=!0,o.end()})});e.listen(o),console.log("[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:"+o+")")}}),global.WEB_SERVER=WEB_SERVER=METHOD({run:function(o,n){"use strict";var t=require("http");require("https"),t.createServer(function(o,t){var e,E=o.headers,i=o.url,r=o.method.toUpperCase(),a=E["X-Forwarded-For"],R=[];void 0===a&&(a=o.connection.remoteAddress),-1!=i.indexOf("?")&&(e=i.substring(i.indexOf("?")+1),i=i.substring(0,i.indexOf("?"))),i=i.substring(1),NEXT([function(n){"GET"===r?n():(o.on("data",function(o){void 0===e&&(e=""),e+=o}),o.on("end",function(){n()}))},function(){return function(){n({headers:E,uri:i,method:r,ip:a,cookies:PARSE_COOKIE_STR(E.cookie),nativeReq:o},function(o){var n=void 0===o.statusCode?200:o.statusCode,e=void 0===o.headers?{}:o.headers,E=o.contentType,i=o.content,r=void 0===o.encoding?"utf-8":r,a=o.cacheTime;void 0!==E&&(e["Content-Type"]=contentTypes),void 0!==a&&(e.ETag=a,e["Last-Modified"]=new Date(a).toUTCString()),t.writeHead(n,e),t.end(i)},function(o){R.push(o)})}}]),o.on("close",function(){EACH(R,function(o){o()})})}).listen(o),console.log("[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER... (PORT:"+o+")")}}),global.PARSE_COOKIE_STR=PARSE_COOKIE_STR=METHOD({run:function(o){"use strict";var n,t={};return void 0!==o&&(n=o.split(";"),EACH(n,function(o){var n=o.split("=");t[n[0].trim()]=decodeURIComponent(n[1])})),t}}),global.CREATE_COOKIE_STR_ARRAY=CREATE_COOKIE_STR_ARRAY=METHOD({run:function(o){"use strict";var n=[];return EACH(o,function(o,t){n.push(t+"="+encodeURIComponent(o))}),n}});