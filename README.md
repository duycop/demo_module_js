# demo_module_js

ở bài tập 3, thầy cũng làm cùng thời gian với cả lớp, nhưng tách các thư viện thành độc lập

quy trình độc lập đó ở **sulution này** vì thời gian quá ngắn nên chỉ độc lập đc phần js và api

## các bước xây dựng:
1. [index.html](demo_module_js/index.html) khai báo main.js dạng **module** tại dòng 27 : <script type="module" src="asset/main.js"></script>
2. [main.js](demo_module_js/asset/main.js) sẽ load 2 thư viện vào: lib_gptb1.js và lib_gptb2.js tại dòng 16 và 17. 2 module này là 2 thuộc tính trong đối tượng lib (khai báo lib ở dòng 5, lib đc bổ xung thêm thuộc tính ở dòng 10)
3. mỗi thư viện [lib_gptb1.js](demo_module_js/asset/lib_gptb1.js) và [lib_gptb2.js](demo_module_js/asset/lib_gptb2.js)  đều có cấu trúc 4 dòng đầu giống nhau (theo mẫu)
4. lib_gptb1.js sẽ tự tạo giao diện, chỉ cần xin #form_gptb1 ở index.html, ở đây là <div class="col-6" id="form_gptb1"> tại dòng 36 của index.html
5. lib_gptb2.js sẽ tự tạo giao diện, chỉ cần xin #form_gptb2 ở index.html, ở đây là <div class="col-6" id="form_gptb2"> tại dòng 39 của index.html
6. lib_gptb1.js tự đăng ký sự kiện form submit và bắt lấy inputA,inputB => gửi api => nhận lại lời giải, và đưa lời giải lên #ketqua_ptb1, id này được khai báo tại dòng 37 của file lib_gptb1.js  : <div class="mt-3" id="ketqua_ptb1"></div>
7. api nhận action="giai_ptb1" và gọi DLL tương ứng để giải, xem api.aspx.cs đã gọi dll như nào tại dòng 18..52 of [api.aspx.cs](demo_module_js/api.aspx.cs)
7. tương tự với [lib_gptb2.js](demo_module_js/asset/lib_gptb2.js), tuy nhiên DLL chưa làm (thể hiện sự chưa làm này tại dòng 57 của [api.aspx.cs](demo_module_js/api.aspx.cs)), nhưng ở lib_gptb2.js có thể bắt lấy sự kiện khi hệ số A=0 thì ko cần DLL2, mà gọi chéo sang DLL1 để nhờ giải => Tính độc lập nhưng vẫn share bằng cách **export hàm** cho thư viện khác dùng được. đoạn js ké này ở dòng 69 của lib_gptb2.js: lib.gptb1.xuly_giai_ptb1(data.b, data.c, function (json) {...

# review lại quá trình xây dựng các thư viện độc lập ở bài tập 3

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
