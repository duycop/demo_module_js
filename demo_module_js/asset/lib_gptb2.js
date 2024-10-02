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
                    <h4>Giải phương trình bậc 2</h4>
                </div>
                <div class="card-body">
                    <form id="form-gptb2">
                        <div class="mb-3">
                            <label for="inputA" class="form-label">Hệ số a</label>
                            <div class="input-group">
                                <span class="input-group-text">a =</span>
                                <input type="number" class="form-control inputA" placeholder="Hãy nhập a" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="inputB" class="form-label">Hệ số b</label>
                            <div class="input-group">
                                <span class="input-group-text">b =</span>
                                <input type="number" class="form-control inputB" placeholder="Hãy nhập b" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="inputB" class="form-label">Hệ số c</label>
                            <div class="input-group">
                                <span class="input-group-text">c =</span>
                                <input type="number" class="form-control inputC" placeholder="Hãy nhập c" required>
                            </div>
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-success btn-lg">Giải ngay và luôn</button>
                        </div>
                    </form>
                    <div class="mt-3" id="ketqua_ptb2"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;
	$('#form_gptb2').html(html);

	//đăng ký sự kiện
	$('#form-gptb2').submit(function () {
		giai_ptb2();
		return false;  //ngăn form gửi đi như html thông thươngf
	});
}
function giai_ptb2() {
	var data = {
		action: 'giai_ptb2',
		a: $('.inputA').val(),
		b: $('.inputB').val(),
		c: $('.inputC').val(),
    };
    if (data.a == 0) {
        //đây là pbt1
        //lib.gptb1.giai_ptb1(data.b, data.c,'#ketqua_ptb2');
        lib.gptb1.xuly_giai_ptb1(data.b, data.c, function (json) {
            if (json.ok) {
                var loi_giai = "PTB2 biến thành " + json.msg;
                $('#ketqua_ptb2').html(loi_giai);
            } else {
                var bao_loi = 'Lỗi rồi: ' + json.msg;
                $('#ketqua_ptb2').html(bao_loi);
            }
        });
        return;//ko chạy bên dưới
    }
	$.post(api,
		{
			action: 'giai_ptb2',
			a: $('.inputA').val(),
			b: $('.inputB').val(),
			c: $('.inputC').val(),
		},
		function (json) {
			if (json.ok) {
				var loi_giai = "" + json.msg;
				$('#ketqua_ptb2').html(loi_giai);
			} else {
				var bao_loi = 'Lỗi rồi: ' + json.msg;
				$('#ketqua_ptb2').html(bao_loi);
			}
		},
		'json');
}
export function main() {
	//khởi tạo những thứ dành riêng cho gptb2
	console.log('khởi những thứ cho gptb2')
	make_form();
}