BOOTSTRAP.FORM = CLASS({

    preset : function() {'use strict';
        return FORM;
    },

    init : function(cls, inner, self, params) {'use strict';
        BOOTSTRAP.inject({
            inner : inner,
            params : params
        });
    }
});