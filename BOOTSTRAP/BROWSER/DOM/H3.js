BOOTSTRAP.H3 = CLASS({

	preset : function() {'use strict';
		return H3;
	},

	init : function(inner, self, params) {'use strict';
		BOOTSTRAP.inject({
			inner : inner,
			self : self,
			params : params
		});
	}
});
