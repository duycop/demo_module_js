using System;
using System.Collections.Generic;
using System.Text;

namespace lib_toan
{
    public class Pbt1
    {
        public double a, b;
        public string loi_giai { get; private set; }  //lỗi thừa pulic trước get

        public Pbt1()
        {
            loi_giai = "";
        }
        public void giai()
        {
            if (a == 0)
            {

                if (b == 0)
                {
                    //0x+0=0
                    loi_giai = "PTB1 có vô số nghiệm";
                }
                else
                {
                    //0x+b=0
                    loi_giai = "PTB1 vô nghiệm";
                }
            }
            else //a khác 0
            {
                loi_giai = $"PTB1 có 1 nghiệm X={-b / a}";
            }
        }
    }

}