import React, { useState } from 'react';
import { X, Phone, Car, CheckCircle2, ShieldCheck, Sparkles, Clock, MessageSquare, Tag, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/mockData';
import { submitLeadToGoogleSheets } from '../services/leadService';

interface QuickConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCarModel?: string;
  defaultService?: string;
}

export const QuickConsultationModal: React.FC<QuickConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultCarModel = '',
  defaultService = 'Đèn LED nội thất & LED viền Ambient Light',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState(defaultCarModel);
  const [service, setService] = useState(defaultService);
  const [contactMethod, setContactMethod] = useState<'zalo' | 'call'>('zalo');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên của bạn';
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại hoặc số Zalo';
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Số điện thoại không đúng định dạng (VD: 0988888686)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Send lead to Google Sheets
    await submitLeadToGoogleSheets({
      name: name.trim(),
      phone: phone.trim(),
      car: car.trim(),
      service: service,
      contactMethod: contactMethod,
      note: note.trim(),
      source: 'Form Đăng Ký Tư Vấn Nhanh (Modal)',
    });

    setIsSubmitting(false);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Đã Tiếp Nhận Yêu Cầu Tư Vấn!</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Cảm ơn quý khách <strong className="text-emerald-400">{name}</strong>. Chuyên viên kỹ thuật Hieu N Auto sẽ liên hệ qua {contactMethod === 'zalo' ? 'Zalo' : 'cuộc gọi'} số <strong className="text-emerald-400">{phone}</strong> trong vòng <strong>5 phút</strong> để gửi báo giá chi tiết cấu hình <strong className="text-white">{service}</strong> cho dòng xe <strong className="text-white">{car || 'của bạn'}</strong> kèm mã ưu đãi 10%.
            </p>
            
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                Thời gian làm việc: 08:00 - 17:00
              </span>
              <a href={`tel:${COMPANY_INFO.hotline}`} className="text-orange-400 font-bold hover:underline">
                Hotline: {COMPANY_INFO.hotline}
              </a>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-colors cursor-pointer"
            >
              Hoàn Tất &amp; Quay Lại
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Báo Giá Chuẩn Zin Trong 5 Phút &amp; Tặng Voucher 10%
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Đăng Ký Tư Vấn Nhanh
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Để lại thông tin dòng xe, kỹ thuật viên trưởng Hieu N Auto sẽ tư vấn giải pháp nâng cấp tối ưu, báo giá trọn gói không phát sinh.
              </p>
            </div>

            {/* Quick Benefits Banner */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 text-center">
              <div className="flex flex-col items-center gap-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">Bảo Hành 2-5 Năm</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 border-x border-slate-800">
                <Car className="w-3.5 h-3.5 text-orange-400" />
                <span className="font-semibold text-white">Cắm Giắc Zin 100%</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-white">Tư Vấn Miễn Phí</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Quốc Hưng"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  {errors.name && <p className="text-rose-400 text-[11px]">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Số điện thoại / Zalo *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0988888686"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  {errors.phone && <p className="text-rose-400 text-[11px]">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Dòng xe &amp; Đời xe (Năm sản xuất)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: VinFast VF3 / VF6, Ford Everest, Mazda CX-5, Toyota Cross..."
                  value={car}
                  onChange={(e) => setCar(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Dịch vụ &amp; Phụ kiện bạn quan tâm</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Đèn LED nội thất & LED viền Ambient Light">Đèn LED nội thất &amp; LED viền Ambient Light 64 màu</option>
                  <option value="Bi LED Aozoom EXTRA SAPPHIRE (Siêu pha 62W-98W, 5000K, IP67)">Bi LED Aozoom EXTRA SAPPHIRE (Siêu pha 62W-98W, 5000K, IP67 Đức)</option>
                  <option value="Camera hành trình (VIETMAP S720 4K / 70mai A810 Lite / A510 / M500 / T400)">Camera hành trình (VIETMAP S720 4K / 70mai A810 Lite / A510 / M500 / T400)</option>
                  <option value="Camera 360 & MHU Android liền màn Zin">Camera 360 &amp; MHU Android liền màn Zin Sony AHD</option>
                  <option value="Phim cách nhiệt 3M Crystalline chính hãng">Phim cách nhiệt 3M Crystalline chính hãng chống nóng 99%</option>
                  <option value="Màn hình dài 20.8 inch liền khối (2 Hệ điều hành)">Màn hình dài 20.8 inch liền khối (2 Hệ điều hành Android + Zin)</option>
                  <option value="Bệ tỳ tay phi thuyền trung tâm (Sạc không dây Qi)">Bệ tỳ tay phi thuyền trung tâm (Sạc không dây Qi &amp; LED)</option>
                  <option value="Bọc ghế da Nappa Ý may đo thủ công cao cấp">Bọc ghế da Nappa Ý may đo thủ công đục lỗ CNC</option>
                  <option value="Gương gập điện tự động & khóa cửa cụp gương">Gương gập điện tự động &amp; khóa cửa cụp gương thông minh</option>
                  <option value="Cảm biến áp suất lốp TPMS (Năng lượng mặt trời / Màn Android)">Cảm biến áp suất lốp TPMS van trong ICAR Ellisafe</option>
                  <option value="Độ ghế chỉnh điện đa hướng, quạt mát lưng & massage">Độ ghế chỉnh điện 10 hướng, quạt mát lưng &amp; đệm massage</option>
                  <option value="Cảm biến lùi & cảm biến đỗ xe ICAR Ellisen">Cảm biến lùi &amp; cảm biến đỗ xe ICAR Ellisen mắt phẳng</option>
                  <option value="Cốp điện tự động thông minh & Cảm biến đá cốp">Cốp điện tự động thông minh ICAR ELLIGATE &amp; Đá cốp</option>
                  <option value="Android Box cấu hình cao (Giữ nguyên màn Zin)">Android Box Zestech / Caska cấu hình cao giữ màn Zin</option>
                  <option value="Đèn Bi gầm LED 3 nhiệt màu tăng sáng phá sương">Đèn Bi gầm LED 3 nhiệt màu HCL tăng sáng phá sương mù</option>
                  <option value="Gói nâng cấp Sub gầm ghế & Âm thanh DSP xe hơi">Gói nâng cấp Sub gầm ghế Rebec &amp; Âm thanh DSP xe hơi</option>
                  <option value="Thảm lót sàn ô tô TPE đúc khuôn 3D & Thảm 360 tràn viền">Thảm lót sàn ô tô TPE đúc khuôn HUVI / CARSEN &amp; Thảm 360</option>
                  <option value="Tấm giáp bảo vệ pin gầm xe điện (VinFast VF3/VF5/VF6/VF8)">Tấm giáp bảo vệ pin gầm xe điện SICHER hợp kim nhôm</option>
                  <option value="LED cánh chim định vị VinFast & Welcome Light">LED cánh chim định vị VinFast &amp; hiệu ứng Welcome Light</option>
                  <option value="Màn hình hiển thị kính lái HUD MCD91 cảnh báo tốc độ">Màn hình hiển thị kính lái HUD MCD91 cảnh báo giao thông</option>
                  <option value="Phay phục hồi mâm Lazang ô tô máy CNC kim cương">Phay phục hồi mâm Lazang ô tô máy CNC Laser kim cương</option>
                  <option value="Combo nâng cấp tổng thể toàn diện theo xe">Combo nâng cấp nội thất &amp; phụ kiện trọn gói theo xe</option>
                </select>
              </div>

              {/* Contact Method Preference */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Hình thức tư vấn ưu tiên</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setContactMethod('zalo')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      contactMethod === 'zalo'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Nhắn tin qua Zalo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod('call')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      contactMethod === 'call'
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Gọi điện trực tiếp</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Ghi chú thêm (Tùy chọn)</label>
                <input
                  type="text"
                  placeholder="Yêu cầu riêng, thời gian rảnh tiện nghe máy..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Đang gửi thông tin lên hệ thống...</span>
                  </>
                ) : (
                  <span>Gửi Yêu Cầu &amp; Nhận Báo Giá Ngay</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bảo mật thông tin 100% - Tư vấn tận tâm không chèo kéo</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

