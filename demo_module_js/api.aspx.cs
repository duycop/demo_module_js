using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Policy;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace demo_module_js
{
    public partial class api : System.Web.UI.Page
    {
        class PhanHoi
        {
            public int ok;
            public string msg;
        }
        void giai_ptb1()
        {
            PhanHoi ph = new PhanHoi();
            string json = "";
            try
            {
                //pha1: get input gửi lên
                double a = double.Parse(this.Request.Form["a"]);
                double b = double.Parse(this.Request.Form["b"]);

                //pha2: gọi DLL độc lập để giải quyết vấn đề
                lib_toan.Pbt1 p1 = new lib_toan.Pbt1();
                p1.a = a;
                p1.b = b;
                p1.giai();
                string kq = p1.loi_giai;

                //pha2: bọc kq vào đối tượng để chuyển thành json
                ph.ok = 1;
                ph.msg = kq;
                
                
            }catch(Exception ex)
            {
                //pha2: nhung khi cos looix
                ph.ok = 0;
                ph.msg = ex.Message;
            }
            finally
            {
                //pha3: chuyển đối tượng => json, gửi ve client
                json = JsonConvert.SerializeObject(ph);
                this.Response.Write(json);
            }
        }
        void giai_ptb2()
        {
            PhanHoi ph = new PhanHoi();
            ph.ok = 1;
            ph.msg = "tao ko biet giải ptb2, đang ngâm cứu";
            string json = JsonConvert.SerializeObject(ph);
            this.Response.Write(json);
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = this.Request.Form["action"];
            switch (action)
            {
                case "giai_ptb1":
                    giai_ptb1();
                    break;
                case "giai_ptb2":
                    giai_ptb2();
                    break;
            }
        }
    }
}