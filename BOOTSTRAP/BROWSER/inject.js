BOOTSTRAP.inject = METHOD({

	run : function(m, params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.inner
		//REQUIRED: params.params
		//OPTIONAL: params.params.c
		//OPTIONAL: params.params.data

		var
		// inner
		inner = params.inner,

		// params2
		params2 = params.params,

		// c
		c = params2 === undefined ? undefined : params2.c,

		// data
		data = params2 === undefined ? undefined : params2.data;

		if (c !== undefined) {
			inner.setAttr({
				name : 'class',
				value : c
			});
		}

		if (data !== undefined) {
			EACH(data, function(value, name) {
				inner.setAttr({
					name : 'data-' + name,
					value : value
				});
			});
		}

	}
});