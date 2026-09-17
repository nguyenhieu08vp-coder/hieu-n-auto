import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Wrench, 
  HeartHandshake, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Compass, 
  Car,
  Phone,
  Layers
} from 'lucide-react';
import { TEAM_MEMBERS, COMPANY_INFO } from '../data/mockData';
import { PageId } from '../types';

interface AboutViewProps {
  setCurrentPage: (page: PageId) => void;
  openConsultation: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  setCurrentPage,
  openConsultation,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Header Banner */}
      <section className="relative py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 overflow-hidden border border-slate-800 bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=2000&q=80"
            alt="Xưởng độ xe Hieu N Auto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Câu Chuyện Thương Hiệu
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Hành Trình <br />
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
              Nâng Tầm Trải Nghiệm Ở Khoang Nội Thất Ô Tô
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Hieu N Auto ra đời với sứ mệnh mang đến không gian khoang lái sang trọng, êm ái và cá nhân hóa tuyệt đối cho từng chủ xe tại Việt Nam.
          </p>
        </div>
      </section>

      {/* 2. Brand Story & Mission / Vision */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-slate-800 backdrop-blur-sm">
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-orange-400 tracking-wider">
              Về chúng tôi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Khởi Nguồn Từ Niềm Đam Mê Với Những Chiếc Ô Tô
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Thành lập từ năm 2023 bởi CEO Nguyễn Duy Hiếu, <strong className="text-white font-semibold">Hieu N Auto</strong> khởi đầu với định hướng nâng cấp và hoàn thiện không gian nội thất ô tô. Trải qua nhiều năm phát triển, chúng tôi từng bước xây dựng vị thế là đơn vị chuyên nâng cấp nội thất và tiện nghi ô tô, được khách hàng tại Hà Nội tin tưởng và lựa chọn.
            </p>
            
            <p>
              Chúng tôi hiểu rằng, mỗi chiếc xe không chỉ là phương tiện di chuyển mà còn là không gian trải nghiệm riêng của chủ nhân. Vì vậy, <strong className="text-white font-semibold">Hieu N Auto</strong> tập trung mang đến những giải pháp nâng cấp thiết thực, kết hợp hài hòa giữa công nghệ, thẩm mỹ, sự tiện nghi và an toàn.
            </p>

            <p>
              Các hạng mục nổi bật bao gồm camera hành trình, camera 360°, màn hình giải trí, hệ thống LED nội thất, phim cách nhiệt, cách âm, nâng cấp âm thanh cùng nhiều thiết bị tiện ích thông minh.
            </p>

            <p>
              Mỗi sản phẩm được lựa chọn kỹ lưỡng và thi công theo tiêu chuẩn riêng của từng dòng xe. Từ khả năng vận hành ổn định, tính thẩm mỹ khi lắp đặt cho đến sự đồng bộ với thiết kế nguyên bản, mọi chi tiết đều được đội ngũ kỹ thuật viên <strong className="text-white font-semibold">Hieu N Auto</strong> chú trọng nhằm mang lại trải nghiệm sử dụng liền mạch, tinh tế và khác biệt.
            </p>

            <p>
              Với phương châm <span className="text-orange-300 font-medium">nâng cấp đúng nhu cầu – hoàn thiện đúng tiêu chuẩn</span>, Hieu N Auto không ngừng cập nhật những công nghệ và giải pháp mới để biến mỗi hành trình trở nên an toàn, thoải mái và đáng trải nghiệm hơn.
            </p>

            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-500/20 text-orange-300 font-semibold text-center text-sm sm:text-base shadow-sm">
              Hieu N Auto – Nâng cấp công nghệ. Hoàn thiện tiện nghi. Nâng tầm trải nghiệm.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all">
              <Target className="w-6 h-6 text-emerald-400 mb-2" />
              <h3 className="font-bold text-white text-sm sm:text-base mb-1">Sứ Mệnh</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Kiến tạo không gian nội thất xe hơi thoải mái, sang trọng và chuẩn tiện nghi
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition-all">
              <Compass className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-bold text-white text-sm sm:text-base mb-1">Tầm Nhìn</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Trở thành chuỗi xưởng nâng cấp nội thất xe hơi Bespoke chuẩn quốc tế dẫn đầu Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values (4 Giá Trị Cốt Lõi) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold mb-2">
            <Award className="w-4 h-4" />
            Triết Lý Kinh Doanh
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            4 Giá Trị Cốt Lõi Tạo Nên Uy Tín Hieu N Auto
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">1. Tinh Tế (Bespoke)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mỗi sản phẩm là một tác phẩm nghệ thuật cá nhân hóa và đúng chuẩn sở thích riêng của từng khách hàng.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">2. Chất Lượng Chuẩn</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nói KHÔNG với sản phẩm kém chất lượng, phụ kiện trôi nổi. Cam kết hoàn tiền 100% nếu phát hiện sản phẩm là hàng giả, hàng nhái.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">3. Tận Tâm Phục Vụ</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tư vấn trung thực đúng nhu cầu, không vẽ thêm dịch vụ, hỗ trợ kỹ thuật và bảo hành chu đáo trọn đời xe.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">4. Thi Công Chuẩn Xác</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kỹ thuật lắp đặt tỉ mỉ, dán phim cách nhiệt trong phòng lạnh tiêu chuẩn, căn chỉnh camera và thiết bị tối ưu hiệu năng.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ĐỘI NGŨ CHUYÊN GIA KỸ THUẬT (EXPERT TEAM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
            <Users className="w-4 h-4" />
            Nhân Sự Nòng Cốt
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Đội Ngũ Kỹ Thuật Viên &amp; Chuyên Gia Công Nghệ Ô Tô
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Quy tụ các chuyên gia kỹ thuật dày dặn kinh nghiệm về camera hành trình, camera 360°, dán phim cách nhiệt chính hãng và hệ thống điện tử tiện ích xe hơi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-950">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-orange-400 mt-0.5">
                    {member.role}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">
                    Chuyên môn thế mạnh:
                  </span>
                  <div className="text-[11px] text-slate-300 font-medium">
                    {member.specialty}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. QUY TRÌNH 6 BƯỚC THI CÔNG CHUẨN XÁC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Quy Trình 6 Bước Nâng Cấp Nội Thất Tiêu Chuẩn
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Đảm bảo sự chuẩn xác tuyệt đối và bàn giao đúng hẹn cho quý khách hàng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Tiếp Nhận & Kiểm Tra', desc: 'Tiếp nhận xe từ khách hàng và kiểm tra tình trạng của xe trước khi thi công.' },
              { step: '02', title: 'Khảo Sát & Đề Xuất Giải Pháp', desc: 'Đánh giá chi tiết và đưa ra phương án tối ưu về công năng, thẩm mỹ, độ tương thích và an toàn.' },
              { step: '03', title: 'Lựa Chọn Thiết Bị & Sản Phẩm', desc: 'Tư vấn và lựa chọn sản phẩm phù hợp với từng dòng xe và nhu cầu của khách hàng.' },
              { step: '04', title: 'Thi Công & Lắp Đặt', desc: 'Tiến hành tháo lắp và thi công theo quy trình kỹ thuật, đảm bảo tính thẩm mỹ sau khi hoàn thiện.' },
              { step: '05', title: 'Kiểm Tra & Hiệu Chỉnh', desc: 'Kiểm tra toàn bộ hệ thống sau lắp đặt. Tiến hành cài đặt và hiệu chỉnh để các hạng mục hoạt động ổn định, đồng bộ.' },
              { step: '06', title: 'Bàn Giao & Hướng Dẫn Sử Dụng', desc: 'Vệ sinh, hoàn thiện xe và kiểm tra lần cuối trước khi bàn giao. Kỹ thuật viên hướng dẫn khách hàng sử dụng các tính năng, đồng thời cung cấp thông tin bảo hành và hỗ trợ kỹ thuật sau nâng cấp.' },
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-purple-600 text-slate-950 font-extrabold text-base flex items-center justify-center flex-shrink-0 shadow-md">
                  {st.step}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{st.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Bạn Đang Muốn Nâng Cấp Phụ Kiện &amp; Công Nghệ Cho Dòng Xe Nào?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Liên hệ ngay với đội ngũ Hieu N Auto để được tư vấn cấu hình camera hành trình, mã phim cách nhiệt và thiết bị công nghệ phù hợp nhất.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={openConsultation}
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              Gặp Chuyên Gia Tư Vấn
            </button>
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              Đến Trực Tiếp Showroom
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
