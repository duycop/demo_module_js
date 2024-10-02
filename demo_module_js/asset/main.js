//load các js độc lập khác vào để dùng

'use strict';

let lib = {};
window.lib = lib;
function load(name, callback = null) {
	import('/asset/lib_' + name + '.js?x=xxx').then(module => {
		lib = lib || {};
		lib[name] = module;
		module.set_lib(lib);
		module.main();
		if (callback != null) callback();
	});
}
load('gptb1', function () {
	load('gptb2');
});