BOOTSTRAP.DIV = CLASS({

	preset : function() {'use strict';
		return DIV;
	},

	init : function(cls, inner, self, params) {'use strict';
		BOOTSTRAP.inject({
			inner : inner,
			params : params
		});
	}
});