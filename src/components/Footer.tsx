import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Award,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { PageId, PolicyTab } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  openPolicyTab?: (tab: PolicyTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, openPolicyTab }) => {
  const handleNav = (page: PageId) => {
    setCurrentPage(page);
  };

  const handlePolicyClick = (tab: PolicyTab) => {
    setCurrentPage('policies');
    if (openPolicyTab) {
      openPolicyTab(tab);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      {/* Top Value Proposition Grid */}
      <div className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Sản Phẩm Chính Hãng</h4>
                <p className="text-xs text-slate-400">100% sản phẩm, phụ kiện nguồn gốc xuất xứ chính hãng</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Vận Chuyển Tận Nơi</h4>
                <p className="text-xs text-slate-400">Miễn phí vận chuyển với mọi đơn hàng có giá trị từ 5.000.000đ trên phạm vi toàn quốc</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Bảo Hành Dài Hạn</h4>
                <p className="text-xs text-slate-400">Bảo hành 24 tháng trên toàn quốc</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Lắp Đặt Tận Nơi</h4>
                <p className="text-xs text-slate-400">Hỗ trợ thi công tại nhà nhanh chóng, an toàn</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand & Legal Information (Mandatory) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-purple-600 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-['Space_Grotesk']">
                HIEU N <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-orange-400 bg-clip-text text-transparent">AUTO</span>
              </span>
            </div>

            {/* Legal Information block explicitly requested */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs">
              <div className="font-bold text-slate-200 text-sm uppercase text-emerald-400">
                {COMPANY_INFO.companyName}
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300">Văn phòng:</strong> {COMPANY_INFO.mainAddress}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300">Xưởng Nâng Cấp:</strong> {COMPANY_INFO.branchAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => handleNav('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => handleNav('about')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Về chúng tôi &amp; Đội ngũ
                </button>
              </li>
              <li>
                <button
                  id="footer-link-products"
                  onClick={() => handleNav('products')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Sản phẩm &amp; Dịch vụ độ xe
                </button>
              </li>
              <li>
                <button
                  id="footer-link-blog"
                  onClick={() => handleNav('blog')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Cẩm nang &amp; Tin tức ô tô
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => handleNav('contact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Liên hệ &amp; Chỉ đường
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy Hyperlinks (Mandatory) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-2 border-purple-500 pl-2.5">
              Chính Sách Pháp Lý
            </h4>
            <p className="text-xs text-slate-400">
              Cam kết dịch vụ minh bạch, đảm bảo tối đa quyền lợi khách hàng.
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  id="footer-policy-privacy"
                  onClick={() => handlePolicyClick('privacy')}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-purple-400 transition-colors group text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-125 transition-transform" />
                  <span className="underline decoration-slate-700 underline-offset-4 group-hover:decoration-purple-400">
                    Chính sách bảo mật thông tin
                  </span>
                </button>
              </li>
              <li>
                <button
                  id="footer-policy-refund"
                  onClick={() => handlePolicyClick('refund')}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-purple-400 transition-colors group text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:scale-125 transition-transform" />
                  <span className="underline decoration-slate-700 underline-offset-4 group-hover:decoration-orange-400">
                    Chính sách đổi trả &amp; hoàn tiền
                  </span>
                </button>
              </li>
              <li>
                <button
                  id="footer-policy-shipping"
                  onClick={() => handlePolicyClick('shipping')}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-purple-400 transition-colors group text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:scale-125 transition-transform" />
                  <span className="underline decoration-slate-700 underline-offset-4 group-hover:decoration-sky-400">
                    Chính sách vận chuyển &amp; lắp đặt
                  </span>
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block mb-1">Phương thức thanh toán hỗ trợ:</span>
              <div className="flex flex-wrap gap-1.5">
                {['Tiền mặt', 'Chuyển khoản QR', 'Visa/Master', 'Trả góp 0%'].map((pay) => (
                  <span key={pay} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium">
                    {pay}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Contact Hotline & Hours */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-l-2 border-orange-500 pl-2.5">
              Hỗ Trợ 24/7
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${COMPANY_INFO.hotline}`}
                className="block p-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/30 hover:border-orange-500 transition-colors"
              >
                <span className="text-[10px] uppercase font-bold text-orange-400 block">Hotline Tư Vấn</span>
                <span className="text-base font-extrabold text-white flex items-center gap-1 mt-0.5">
                  <Phone className="w-4 h-4 text-orange-400" />
                  {COMPANY_INFO.hotline}
                </span>
              </a>

              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{COMPANY_INFO.email}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar (Mandatory) */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="font-medium text-slate-300">
            {COMPANY_INFO.copyright}
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Thiết kế &amp; Vận hành bởi Hieu N Auto Interior Systems</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-emerald-400">Chất lượng tạo niềm tin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
