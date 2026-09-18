import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  FileText, 
  CheckCircle2, 
  Phone, 
  HelpCircle, 
  Award,
  ChevronDown
} from 'lucide-react';
import { PolicyTab, PageId } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface PoliciesViewProps {
  activeTab: PolicyTab;
  setActiveTab: (tab: PolicyTab) => void;
  setCurrentPage: (page: PageId) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({
  activeTab,
  setActiveTab,
  setCurrentPage,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabs: { id: PolicyTab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'privacy', label: 'Chính Sách Bảo Mật Thông Tin', icon: <ShieldCheck className="w-4 h-4" />, color: 'emerald' },
    { id: 'refund', label: 'Chính Sách Đổi Trả & Hoàn Tiền', icon: <RotateCcw className="w-4 h-4" />, color: 'orange' },
    { id: 'shipping', label: 'Chính Sách Vận Chuyển & Lắp Đặt', icon: <Truck className="w-4 h-4" />, color: 'sky' },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-16">
      {/* 1. Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          Quy Định &amp; Cam Kết Pháp Lý
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Chính Sách Hoạt Động &amp; Quyền Lợi Khách Hàng
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Áp dụng cho toàn bộ thiết bị điện tử, camera, màn hình, âm thanh, đèn tăng sáng và phụ kiện nâng cấp ô tô tại Hệ thống Hieu N Auto.
        </p>
      </motion.div>

      {/* 2. Policy Switcher Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl mx-auto"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`policy-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                isActive
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePolicyTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-400 rounded-xl shadow-lg shadow-emerald-950/50"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 truncate">
                {tab.icon}
                <span className="truncate">{tab.label}</span>
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* 3. Content Panel based on Active Tab */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, delay: 0.18 }}
        className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ================= TAB 1: BẢO MẬT THÔNG TIN ================= */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs uppercase font-bold text-emerald-400">Bảo mật dữ liệu cá nhân</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Chính Sách Bảo Mật Thông Tin Khách Hàng
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Cập nhật lần cuối: 01/08/2026 • Tuân thủ theo Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">1. Mục Đích Thu Thập Thông Tin</h3>
              <p>
                <strong className="text-white">Xưởng Nâng Cấp Nội Thất Ô Tô Hieu N Auto</strong> chỉ thu thập các thông tin cần thiết nhằm phục vụ trực tiếp cho việc tư vấn form xe, lập hóa đơn, kích hoạt bảo hành điện tử và hỗ trợ chăm sóc khách hàng:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>Họ và tên khách hàng hoặc tên doanh nghiệp sở hữu xe.</li>
                <li>Số điện thoại liên lạc để kỹ thuật viên đặt lịch và xếp lịch thi công.</li>
                <li>Địa chỉ email để gửi báo giá chi tiết và biên bản bàn giao nghiệm thu.</li>
                <li>Dòng xe, năm sản xuất và màu sắc nội thất mong muốn.</li>
                <li>Địa chỉ nhận hàng hoặc địa chỉ yêu cầu thi công tận nhà.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">2. Phạm Vi &amp; Thời Gian Lưu Trữ Thông Tin</h3>
              <p>
                Thông tin của quý khách được mã hóa trên máy chủ nội bộ an toàn và lưu trữ trong suốt thời gian bảo hành sản phẩm (từ 24 đến 60 tháng) nhằm mục đích tra cứu sổ bảo hành điện tử nhanh chóng khi quý khách đến bảo hành.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">3. Cam Kết Tuyệt Đối Không Chia Sẻ Dữ Liệu</h3>
              <p>
                Hieu N Auto cam kết <strong className="text-emerald-400">100% KHÔNG bán, cho thuê, trao đổi hoặc tiết lộ</strong> thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào vì mục đích thương mại khi chưa có sự đồng ý rõ ràng bằng văn bản của khách hàng.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">4. Quyền Của Khách Hàng Đối Với Dữ Liệu</h3>
              <p>
                Khách hàng có toàn quyền yêu cầu kiểm tra, cập nhật, điều chỉnh hoặc yêu cầu xóa bỏ thông tin cá nhân của mình trên hệ thống bất kỳ lúc nào bằng cách liên hệ Hotline: <strong className="text-orange-400">{COMPANY_INFO.hotline}</strong> hoặc email <strong className="text-white">{COMPANY_INFO.email}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ĐỔI TRẢ & HOÀN TIỀN & BẢO HÀNH ================= */}
        {activeTab === 'refund' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs uppercase font-bold text-orange-400">Đảm bảo 100% quyền lợi khách hàng</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Chính Sách Đổi Trả &amp; Hoàn Tiền Minh Bạch
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Áp dụng cho toàn bộ Camera 360, Màn hình Android, Loa Sub, Cửa hít, Cốp điện, Đèn Bi gầm, LED nội thất &amp; Phụ kiện ô tô.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 font-extrabold text-base mx-auto flex items-center justify-center mb-2">
                  30N
                </div>
                <h4 className="font-bold text-white text-xs">Đổi Mới 1:1 Trong 30 Ngày</h4>
                <p className="text-[11px] text-slate-400 mt-1">Đổi mới thiết bị nguyên hộp nếu phát sinh lỗi phần cứng, lỗi chipset hoặc không tương thích tín hiệu</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-extrabold text-base mx-auto flex items-center justify-center mb-2">
                  200%
                </div>
                <h4 className="font-bold text-white text-xs">Cam Kết Hoàn Tiền 200%</h4>
                <p className="text-[11px] text-slate-400 mt-1">Bồi thường gấp đôi giá trị nếu phát hiện thiết bị, linh kiện, camera, phụ kiện là hàng giả, hàng nhái kém chất lượng</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 font-extrabold text-base mx-auto flex items-center justify-center mb-2">
                  24H
                </div>
                <h4 className="font-bold text-white text-xs">Hoàn Tiền Nhanh Trong 24h</h4>
                <p className="text-[11px] text-slate-400 mt-1">Thực hiện chuyển khoản hoàn trả ngay trong vòng 24 giờ làm việc sau khi tiếp nhận xác nhận</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">1. Điều Kiện Áp Dụng Đổi Trả &amp; Hoàn Tiền</h3>
              <p className="text-slate-300">
                Quý khách được quyền yêu cầu đổi mới sản phẩm 1:1 hoặc hoàn tiền 100% đối với các thiết bị và phụ kiện ô tô trong các trường hợp sau:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Lỗi phần cứng từ nhà sản xuất (1 đổi 1 trong 30 ngày):</strong> Màn hình Android, Android Box MHU, Camera hành trình, Camera 360, Cảm biến áp suất lốp TPMS, HUD kính lái, Loa Subwoofer, Cửa hít tự động, Cốp điện, Đèn Bi gầm, LED nội thất Ambient Light phát sinh lỗi nguồn, chập chờn tín hiệu, sọc màn hình, chết mắt camera hoặc lỗi vi xử lý.</li>
                <li><strong className="text-white">Không đúng thông số &amp; cấu hình cam kết:</strong> Sản phẩm bàn giao không đúng mã hiệu model, cấu hình RAM/ROM, độ phân giải màn hình, thương hiệu hoặc không đúng chủng loại đã ghi trong phiếu dịch vụ.</li>
                <li><strong className="text-white">Không tương thích hệ thống xe:</strong> Thiết bị không nhận giao thức Canbus zin của xe, không đồng bộ nút vô lăng hoặc phụ kiện (thảm lót sàn TPE đúc khuôn, ốp gầm bảo vệ pin xe điện, bệ bước chân) bị đúc sai kích thước phom xe.</li>
                <li><strong className="text-white">Hư hại trong quá trình vận chuyển:</strong> Sản phẩm đặt mua giao tận nơi bị nứt vỡ, móp méo, trầy xước vỏ ngoài hoặc thiếu phụ kiện, dây giắc đi kèm khi đồng kiểm nhận hàng.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">2. Chính Sách &amp; Phương Thức Hoàn Tiền</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Hoàn tiền 100%:</strong> Áp dụng khi thiết bị gặp lỗi kỹ thuật mà xưởng hoặc hãng không có sản phẩm cùng loại thay thế trong vòng 48h, hoặc thiết bị không thể tương thích với giao thức điện nguyên bản của xe và khách hàng không đồng ý đổi sang dòng sản phẩm khác.</li>
                <li><strong className="text-white">Bồi thường 200%:</strong> Áp dụng ngay nếu thẩm định phát hiện thiết bị điện tử, camera, màn hình, phụ kiện là hàng giả mạo, hàng dựng trôi nổi không có chứng nhận chất lượng chính hãng.</li>
                <li><strong className="text-white">Phương thức hoàn tiền:</strong> Chuyển khoản trực tiếp tới tài khoản ngân hàng chính chủ của quý khách hoặc nhận tiền mặt tại quầy văn phòng của Hieu N Auto trong vòng 24 giờ làm việc.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">3. Các Trường Hợp Từ Chối Đổi Trả / Hoàn Tiền</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Thiết bị bị chập cháy do tự ý can thiệp, câu trích dây điện sai quy chuẩn ngoài xưởng, xe bị ngập nước (thủy kích) hoặc tai nạn va đập cơ học làm vỡ nát bo mạch, màn hình.</li>
                <li>Tem bảo hành niêm phong, số Serial, mã vạch QR trên thân thiết bị (màn hình, camera, loa sub, hộp điều khiển ECU) bị rách, tẩy xóa hoặc có dấu hiệu cạy mở, thay linh kiện bên trong.</li>
                <li>Hư hỏng do sử dụng nguồn điện sai định mức, câu bình ắc quy sai cực, hoặc tự ý chạy lại ROM/Firmware không chính thức làm brick thiết bị.</li>
                <li>Quá thời hạn quy định đổi mới 30 ngày (sau 30 ngày, sản phẩm sẽ được áp dụng chế độ Bảo Hành Chính Hãng theo tiêu chuẩn nhà sản xuất từ 12 đến 36 tháng).</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">4. Quy Trình 4 Bước Tiếp Nhận &amp; Xử Lý</h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li><strong>Bước 1 - Tiếp nhận &amp; Chẩn đoán từ xa:</strong> Quý khách liên hệ qua Hotline/Zalo kỹ thuật <strong>{COMPANY_INFO.hotline}</strong>, gửi video/hình ảnh mô tả hiện tượng lỗi của thiết bị.</li>
                <li><strong>Bước 2 - Thẩm định kỹ thuật tại xưởng:</strong> Kỹ thuật viên kết nối thiết bị chuyên dụng kiểm tra nguồn điện, giắc Canbus và xác định nguyên nhân lỗi trong vòng 15 – 30 phút.</li>
                <li><strong>Bước 3 - Tiến hành Đổi mới / Hoàn tiền:</strong> Thực hiện bóc hộp đổi mới thiết bị 1:1 ngay tại xưởng hoặc lập phiếu hoàn tiền theo thỏa thuận.</li>
                <li><strong>Bước 4 - Nghiệm thu &amp; Bàn giao:</strong> Lắp đặt giắc cắm zin an toàn, cập nhật số serial mới lên hệ thống Sổ Bảo Hành Điện Tử hoặc thực hiện lệnh chuyển tiền hoàn tất trong 24 giờ.</li>
              </ol>
            </div>
          </div>
        )}

        {/* ================= TAB 3: VẬN CHUYỂN & LẮP ĐẶT TẬN NƠI ================= */}
        {activeTab === 'shipping' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs uppercase font-bold text-sky-400">Tiện lợi &amp; Nhanh chóng</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Chính Sách Giao Hàng &amp; Hỗ Trợ Thi Công Lắp Đặt
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Quy chuẩn đóng gói an toàn, vận chuyển hỏa tốc và hỗ trợ thi công giắc cắm zin chuẩn kỹ thuật.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">1. Miễn Phí Vận Chuyển Toàn Quốc</h3>
              <p>
                Đối với các sản phẩm phụ kiện (Thảm lót sàn TPE, Camera hành trình, Loa Sub, Cảm biến lốp, Bệ tỳ tay, Tấm ốp gầm pin), Hieu N Auto <strong className="text-emerald-400">miễn phí vận chuyển 100%</strong> toàn quốc cho mọi đơn hàng có giá trị từ 5.000.000 ₫. Khách hàng được kiểm tra hàng trước khi thanh toán.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">2. Thời Gian Giao Nhận &amp; Lắp Đặt Dự Kiến</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong>Phụ kiện có sẵn:</strong> Giao hỏa tốc trong 2 giờ tại nội thành Hà Nội; từ 1 - 3 ngày tại các tỉnh thành khác.</li>
                <li><strong>Màn hình Android, Camera 360, Cảm biến lốp:</strong> Lắp đặt giắc cắm zin hoàn thiện chỉ từ 1.5 – 2.5 giờ.</li>
                <li><strong>Cửa hít, Cốp điện tự động &amp; LED Ambient Light:</strong> Thi công chuẩn kỹ thuật trong 2 – 4 giờ tại xưởng.</li>
              </ul>
            </div>
          </div>
        )}
        </motion.div>
      </AnimatePresence>

        {/* 4. Common FAQs Accordion */}
        <div className="border-t border-slate-800 pt-8 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            Câu Hỏi Thường Gặp Về Quyền Lợi Khách Hàng
          </h3>

          <div className="space-y-3">
            {[
              {
                q: 'Lắp đặt màn hình Android, Camera 360 và Loa Sub có ảnh hưởng đến bảo hành xe của hãng không?',
                a: 'Hoàn toàn không. Toàn bộ thiết bị điện tử, camera và màn hình tại Hieu N Auto đều sử dụng giắc cắm chuyển chuẩn zin 100%, không cắt trích dây điện nguyên bản, tương thích hoàn toàn giao thức Canbus và giữ nguyên bảo hành chính hãng của xe.'
              },
              {
                q: 'Tôi ở tỉnh xa thì việc bảo hành sản phẩm sẽ diễn ra như thế nào?',
                a: 'Hệ thống Hieu N Auto có mạng lưới hơn 50 garage liên kết ủy quyền tại các tỉnh thành trên cả nước. Khi cần hỗ trợ kỹ thuật, chúng tôi sẽ điều phối kỹ thuật viên đến tận nơi hoặc hỗ trợ qua video call và chuyển linh kiện bảo hành hỏa tốc miễn phí.'
              },
              {
                q: 'Làm thế nào để kiểm tra thời hạn bảo hành điện tử?',
                a: `Quý khách chỉ cần gọi đến Hotline ${COMPANY_INFO.hotline} và đọc số điện thoại đã đăng ký khi thi công, hệ thống CRM sẽ cung cấp đầy đủ thông tin bảo hành, lịch sử bảo dưỡng và ngày hết hạn.`
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between hover:bg-slate-900 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-300 border-t border-slate-900">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Official Contact Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-bold text-white">Bạn cần giải đáp thêm về các điều khoản?</div>
            <div className="text-slate-400">Phòng Pháp chế &amp; CSKH Hieu N Auto sẵn sàng hỗ trợ 24/7.</div>
          </div>
          <button
            onClick={() => {
              setCurrentPage('contact');
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold whitespace-nowrap transition-colors"
          >
            Liên Hệ CSKH
          </button>
        </div>
      </motion.div>
    </div>
  );
};
