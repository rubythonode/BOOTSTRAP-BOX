OVERRIDE({origin:COPY_DATA,func:function(){"use strict";global.COPY_DATA=METHOD({run:function(n,e){var t=function(n){var e,A,C;if(CHECK_IS_DATA(n)===!0){e={};for(C in n)n.hasOwnProperty(C)===!0&&(A=n[C],e[C]=A instanceof Date==!0?new Date(A.getTime()):CHECK_IS_DATA(A)===!0?t(A):CHECK_IS_ARRAY(A)===!0?t(A):A)}else if(CHECK_IS_ARRAY(n)===!0)for(e=[],C=0;C<n.length;C+=1)A=n[C],e.push(A instanceof Date==!0?new Date(A.getTime()):CHECK_IS_DATA(A)===!0?t(A):CHECK_IS_ARRAY(A)===!0?t(A):A);return e};return t(e)}})}});