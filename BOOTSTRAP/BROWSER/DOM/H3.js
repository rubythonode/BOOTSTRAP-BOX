BOOTSTRAP.H3 = CLASS({

	preset : function() {'use strict';
		return H3;
	},

	init : function(cls, inner, self, params) {'use strict';
		BOOTSTRAP.inject({
			inner : inner,
			params : params
		});
	}
});