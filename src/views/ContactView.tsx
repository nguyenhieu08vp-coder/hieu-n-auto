import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Navigation,
  MessageSquare,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactFormData } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { submitLeadToGoogleSheets } from '../services/leadService';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    carModel: '',
    serviceInterest: 'Đèn LED nội thất & LED viền Ambient Light',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Real-time Vietnamese Phone & Email Validation logic
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Vui lòng nhập họ và tên của bạn';
        if (value.trim().length < 2) return 'Họ và tên cần ít nhất 2 ký tự';
        return '';

      case 'phoneNumber': {
        if (!value.trim()) return 'Vui lòng nhập số điện thoại liên hệ';
        // Vietnamese phone number validation regex: 10 digits starting with 03, 05, 07, 08, 09 or +84
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(value.trim())) {
          return 'Số điện thoại không đúng định dạng (VD: 0988888686, 10 số)';
        }
        return '';
      }

      case 'email': {
        if (!value.trim()) return 'Vui lòng nhập địa chỉ email';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Email không hợp lệ (VD: example@domain.com)';
        }
        return '';
      }

      case 'message':
        if (!value.trim()) return 'Vui lòng nhập nội dung lời nhắn hoặc yêu cầu cụ thể';
        if (value.trim().length < 5) return 'Lời nhắn cần ít nhất 5 ký tự';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: { [key: string]: string } = {
      fullName: validateField('fullName', formData.fullName),
      phoneNumber: validateField('phoneNumber', formData.phoneNumber),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);
    setTouched({
      fullName: true,
      phoneNumber: true,
      email: true,
      message: true,
    });

    const hasError = Object.values(newErrors).some((msg) => msg !== '');
    if (hasError) return;

    setIsSubmitting(true);

    // Send data to Google Sheets
    submitLeadToGoogleSheets({
      name: formData.fullName.trim(),
      phone: formData.phoneNumber.trim(),
      email: formData.email.trim(),
      car: formData.carModel.trim(),
      service: formData.serviceInterest,
      note: formData.message.trim(),
      source: 'Form Trang Liên Hệ (Contact View)',
    }).finally(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    });
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      carModel: '',
      serviceInterest: 'Bọc ghế da Nappa cao cấp',
      message: '',
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-16">
      {/* 1. Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold">
          <MessageSquare className="w-3.5 h-3.5" />
          Hỗ Trợ &amp; Tư Vấn Trực Tiếp
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Liên Hệ Hệ Thống Hieu N Auto
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Đội ngũ kỹ thuật viên luôn sẵn sàng tư vấn sản phẩm tốt nhất và phù hợp nhất mà bạn đang tìm kiếm
        </p>
      </motion.div>

      {/* 2-COLUMN LAYOUT AS REQUIRED:
          LEFT: Hotline, Email, Office Address, Embedded Google Map
          RIGHT: Online Contact Form with Input Validation (Name, Phone, Email, Message)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* ================= LEFT COLUMN: CONTACT INFO & GOOGLE MAPS ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.12 }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Contact Details Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-400" />
              Thông Tin Liên Hệ Trực Tiếp
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Hotline */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Hotline Tư Vấn 24/7</div>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <a href={`tel:${COMPANY_INFO.hotline}`} className="font-extrabold text-white text-base hover:text-orange-400 transition-colors">
                      {COMPANY_INFO.hotline}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Hộp Thư Điện Tử</div>
                  <div className="font-bold text-white text-sm mt-1">
                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-purple-400 transition-colors">
                      {COMPANY_INFO.email}
                    </a>
                    <span className="text-slate-500 font-normal ml-2">({COMPANY_INFO.supportEmail})</span>
                  </div>
                </div>
              </div>

              {/* Office & Workshop Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Địa Chỉ Văn Phòng &amp; Xưởng Nâng Cấp</div>
                  <div>
                    <span className="text-emerald-400 font-bold block text-xs">Văn phòng:</span>
                    <span className="text-slate-300 text-xs">{COMPANY_INFO.mainAddress}</span>
                  </div>
                  <div>
                    <span className="text-sky-400 font-bold block text-xs">Xưởng Nâng Cấp:</span>
                    <span className="text-slate-300 text-xs">{COMPANY_INFO.branchAddress}</span>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Thời Gian Làm Việc</div>
                  <div className="font-bold text-white text-xs mt-1">
                    {COMPANY_INFO.workingHours}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Maps Frame as explicitly requested */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-400" />
                Sơ Đồ Vị Trí (Google Maps)
              </h3>
              <a
                href="https://www.google.com/maps/search/?api=1&query=T%C3%B2a+M1+Vinhomes+Ocean+Park+1+Gia+L%C3%A2m+H%C3%A0+N%E1%BB%99i"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 transition-colors"
              >
                Mở Google Maps &rarr;
              </a>
            </div>

            {/* Interactive Embedded Google Maps iframe */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
              <iframe
                title="Bản đồ Tòa M1 Vinhomes Ocean Park 1 - Hieu N Auto"
                src="https://maps.google.com/maps?q=T%C3%B2a+M1+Vinhomes+Ocean+Park+1+Gia+L%C3%A2m+H%C3%A0+N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />

              {/* Map Floating Indicator */}
              <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-slate-200 pointer-events-none flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tòa M1, Vinhomes Ocean Park 1, Gia Lâm, Hà Nội</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: VALIDATED CONTACT FORM ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.18 }}
          className="lg:col-span-6"
        >
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Phản Hồi Nhanh Trong 15 Phút
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                Gửi Lời Nhắn &amp; Đặt Lịch Tư Vấn
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Vui lòng điền đầy đủ các thông tin bên dưới để kỹ thuật viên chuẩn bị sẵn catalogue và mẫu da thực tế trước khi liên hệ.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">Đã Gửi Thành Công!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Cảm ơn quý khách <strong className="text-emerald-400">{formData.fullName}</strong> đã tin tưởng Hieu N Auto. Chuyên viên kỹ thuật sẽ gọi qua số điện thoại <strong className="text-emerald-400">{formData.phoneNumber}</strong> và gửi báo giá chi tiết qua email <strong className="text-white">{formData.email}</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5 max-w-sm mx-auto">
                  <div className="text-slate-400">Dịch vụ quan tâm: <span className="text-white font-medium">{formData.serviceInterest}</span></div>
                  {formData.carModel && <div className="text-slate-400">Dòng xe: <span className="text-white font-medium">{formData.carModel}</span></div>}
                  <div className="text-slate-400">Hotline hỗ trợ: <span className="text-orange-400 font-bold">{COMPANY_INFO.hotline}</span></div>
                </div>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Gửi Thêm Lời Nhắn Khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
                {/* 1. Họ và tên */}
                <div className="space-y-1">
                  <label htmlFor="contact-fullName" className="text-slate-300 font-semibold block">
                    Họ và tên của bạn <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Ví dụ: Trần Minh Hoàng"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 focus:outline-none text-xs sm:text-sm transition-colors ${
                      touched.fullName && errors.fullName
                        ? 'border-rose-500 focus:border-rose-500 bg-rose-950/20'
                        : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="text-rose-400 text-[11px] flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* 2. Số điện thoại & Email (2 Cột) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Số điện thoại */}
                  <div className="space-y-1">
                    <label htmlFor="contact-phoneNumber" className="text-slate-300 font-semibold block">
                      Số điện thoại <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      placeholder="0988888686"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 focus:outline-none text-xs sm:text-sm transition-colors ${
                        touched.phoneNumber && errors.phoneNumber
                          ? 'border-rose-500 focus:border-rose-500 bg-rose-950/20'
                          : 'border-slate-800 focus:border-emerald-500'
                      }`}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <p className="text-rose-400 text-[11px] flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-slate-300 font-semibold block">
                      Địa chỉ Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="hoangtran@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 focus:outline-none text-xs sm:text-sm transition-colors ${
                        touched.email && errors.email
                          ? 'border-rose-500 focus:border-rose-500 bg-rose-950/20'
                          : 'border-slate-800 focus:border-emerald-500'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-rose-400 text-[11px] flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* 3. Dòng xe & Dịch vụ quan tâm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-carModel" className="text-slate-300 font-semibold block">
                      Dòng xe &amp; Năm sản xuất
                    </label>
                    <input
                      id="contact-carModel"
                      name="carModel"
                      type="text"
                      placeholder="VD: Mazda CX-5 2023, Ford Ranger..."
                      value={formData.carModel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-serviceInterest" className="text-slate-300 font-semibold block">
                      Dịch vụ bạn quan tâm
                    </label>
                    <select
                      id="contact-serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 text-xs sm:text-sm cursor-pointer"
                    >
                      <option value="Đèn LED nội thất & LED viền Ambient Light">Đèn LED nội thất &amp; LED viền Ambient Light</option>
                      <option value="Camera hành trình 3 kênh (Trước - Cabin - Sau)">Camera hành trình 3 kênh (Trước - Cabin - Sau)</option>
                      <option value="Camera 360 & MHU Android liền màn Zin">Camera 360 &amp; MHU Android liền màn Zin</option>
                      <option value="Phim cách nhiệt 3M Crystalline chính hãng">Phim cách nhiệt 3M Crystalline chính hãng</option>
                      <option value="Màn hình dài 20.8 inch liền khối (2 Hệ điều hành)">Màn hình dài 20.8 inch liền khối (2 Hệ điều hành)</option>
                      <option value="Bệ tỳ tay phi thuyền trung tâm (Sạc không dây Qi)">Bệ tỳ tay phi thuyền trung tâm (Sạc không dây Qi)</option>
                      <option value="Bọc ghế da Nappa Ý may đo thủ công cao cấp">Bọc ghế da Nappa Ý may đo thủ công cao cấp</option>
                      <option value="Gương gập điện tự động & khóa cửa cụp gương">Gương gập điện tự động &amp; khóa cửa cụp gương</option>
                      <option value="Cảm biến áp suất lốp TPMS (Năng lượng mặt trời / Màn Android)">Cảm biến áp suất lốp TPMS (Năng lượng mặt trời / Màn Android)</option>
                      <option value="Độ ghế chỉnh điện đa hướng, quạt mát lưng & massage">Độ ghế chỉnh điện đa hướng, quạt mát lưng &amp; massage</option>
                      <option value="Cảm biến lùi & cảm biến đỗ xe ICAR Ellisen">Cảm biến lùi &amp; cảm biến đỗ xe ICAR Ellisen</option>
                      <option value="Cốp điện tự động thông minh & Cảm biến đá cốp">Cốp điện tự động thông minh &amp; Cảm biến đá cốp</option>
                      <option value="Android Box cấu hình cao (Giữ nguyên màn Zin)">Android Box cấu hình cao (Giữ nguyên màn Zin)</option>
                      <option value="Đèn Bi gầm LED 3 nhiệt màu tăng sáng phá sương">Đèn Bi gầm LED 3 nhiệt màu tăng sáng phá sương</option>
                      <option value="Gói nâng cấp Sub gầm ghế & Âm thanh DSP xe hơi">Gói nâng cấp Sub gầm ghế &amp; Âm thanh DSP xe hơi</option>
                      <option value="Thảm lót sàn ô tô TPE đúc khuôn 3D & Thảm 360 tràn viền">Thảm lót sàn ô tô TPE đúc khuôn 3D &amp; Thảm 360 tràn viền</option>
                      <option value="Tấm giáp bảo vệ pin gầm xe điện (VinFast VF3/VF5/VF6/VF8)">Tấm giáp bảo vệ pin gầm xe điện (VinFast VF3/VF5/VF6/VF8)</option>
                      <option value="LED cánh chim định vị VinFast & Welcome Light">LED cánh chim định vị VinFast &amp; Welcome Light</option>
                      <option value="Màn hình hiển thị kính lái HUD MCD91 cảnh báo tốc độ">Màn hình hiển thị kính lái HUD MCD91 cảnh báo tốc độ</option>
                      <option value="Phay phục hồi mâm Lazang ô tô máy CNC kim cương">Phay phục hồi mâm Lazang ô tô máy CNC kim cương</option>
                      <option value="Combo nâng cấp tổng thể toàn diện theo xe">Combo nâng cấp tổng thể toàn diện theo xe</option>
                    </select>
                  </div>
                </div>

                {/* 4. Lời nhắn */}
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-slate-300 font-semibold block">
                    Lời nhắn hoặc yêu cầu cụ thể <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Quý khách có yêu cầu gì về màu sắc da, thời gian thi công hoặc địa điểm lắp đặt tận nhà..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white placeholder-slate-500 focus:outline-none text-xs sm:text-sm transition-colors ${
                      touched.message && errors.message
                        ? 'border-rose-500 focus:border-rose-500 bg-rose-950/20'
                        : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p className="text-rose-400 text-[11px] flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  id="contact-form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Gửi Thông Tin &amp; Nhận Báo Giá Tức Thì</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Hieu N Auto cam kết bảo mật 100% thông tin cá nhân khách hàng.</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
