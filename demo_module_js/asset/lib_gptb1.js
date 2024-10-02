'use strict';

let lib = {};
export function set_lib(L) { lib = L; }
const api = 'api.aspx';

function make_form() {
	var html = `<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-lg">
                <div class="card-header text-center bg-primary text-white">
                    <h4>Giải phương trình bậc 1</h4>
                </div>
                <div class="card-body">
                    <form id="form-gptb1">
                        <div class="mb-3">
                            <label for="inputA" class="form-label">Hệ số a</label>
                            <div class="input-group">
                                <span class="input-group-text">a =</span>
                                <input type="number" class="form-control" id="inputA" placeholder="Hãy nhập a" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="inputB" class="form-label">Hệ số b</label>
                            <div class="input-group">
                                <span class="input-group-text">b =</span>
                                <input type="number" class="form-control" id="inputB" placeholder="Hãy nhập b" required>
                            </div>
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-success btn-lg">Giải ngay và luôn</button>
                        </div>
                    </form>
                    <div class="mt-3" id="ketqua_ptb1"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;
	$('#form_gptb1').html(html);

	//đăng ký sự kiện
	$('#form-gptb1').submit(function () {
		var a = $('#inputA').val();
		var b = $('#inputB').val();
		giai_ptb1(a, b);
		return false;  //ngăn form gửi đi như html thông thươngf
	});
}

export function xuly_giai_ptb1(hsa, hsb, callback) {
	$.post(api,
		{
			action: 'giai_ptb1',
			a: hsa,
			b: hsb
		},
		function (json) {
			callback(json)
		},
		'json');
}
function giai_ptb1(hsa, hsb, taget_id = "#ketqua_ptb1") {

	xuly_giai_ptb1(hsa, hsb, function (json) {
		if (json.ok) {
			var loi_giai =  json.msg;
			$(taget_id).html(loi_giai);
		} else {
			var bao_loi = 'Lỗi rồi: ' + json.msg;
			$(taget_id).html(bao_loi);
		}
	});
	
}
export function main() {
	//khởi tạo những thứ dành riêng cho gptb1
	console.log('khởi những thứ cho gptb1')
	make_form();
}