# demo_module_js

ở bài tập 3, thầy cũng làm cùng thời gian với cả lớp, nhưng tách các thư viện thành độc lập

quy trình độc lập đó ở sulution này vì thời gian quá ngắn nên chỉ độc lập đc phần js và api

Quy trình độc lập gồm: xem full code tại [đây](https://github.com/duycop/monitor_tnut/tree/bai_tap_3)
1. xây dựng table riêng: ở đây có user, log, phong
2. xây dựng sp riêng: có sp_user, sp_log, sp_phong xem thêm file [db_last.sql](https://github.com/duycop/monitor_tnut/blob/bai_tap_3/web_monitor_tnut/db/db_last.sql)
3. xây dựng main.js để load các thư viện khác khi cần
4. trong index3.html thì main.js được khai báo dạng module : <script type="module" src="/asset/main.js"></script>
5. trong main.js có nội dung như sau (nên làm thế) để có thể chứa được các thư viện khác, truyền thư viện này cho mọi thư viện khác dùng ké.
ví dụ:
> 
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

  xem chi tiết tại [main.js](https://github.com/duycop/monitor_tnut/blob/bai_tap_3/web_monitor_tnut/asset/main.js)

6. các thư viện được main.js load vào đều có 4 dòng đầu như sau:
  > 
    ﻿'use strict';
    let lib = {};
    export function set_lib(L) { lib = L; }
    export function main() {/*code khởi tạo thư viện này*/}
> 
Xem chi tiết tại các file lib_user.js, lib_table.js, lib_log.js ...
