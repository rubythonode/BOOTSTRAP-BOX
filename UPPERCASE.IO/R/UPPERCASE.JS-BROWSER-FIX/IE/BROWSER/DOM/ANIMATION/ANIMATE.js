OVERRIDE(ANIMATE,function(){"use strict";global.ANIMATE=ANIMATE=METHOD({run:function(t,n){var o=t.node,i=t.keyframes,e=(t.duration,void 0===t.iterationCount?"":t.iterationCount);o.getDom().addStyle(i.getFinalStyle()),void 0===n||""!==e&&1!==e||DELAY(function(){n(o)})}})});