import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Wrench, 
  Clock, 
  Car, 
  Star, 
  Layers, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Flame,
  Zap,
  Sliders,
  Check,
  Video,
  Volume2,
  Shield,
  Sun,
  Disc,
  Tag,
  CheckSquare,
  Square,
  Armchair,
  Tv,
  ShieldAlert,
  PackageCheck,
  Eye,
  LayoutGrid
} from 'lucide-react';
import { PageId, Product } from '../types';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, COMPANY_INFO, FORMAT_CURRENCY } from '../data/mockData';
import { STORE_CATEGORY_GROUPS } from '../data/storeCategories';
import { ProductCard } from '../components/ProductCard';

interface HomeViewProps {
  setCurrentPage: (page: PageId) => void;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onQuickView: (product: Product) => void;
  openConsultation: (carModel?: string, service?: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentPage,
  onAddToCart,
  onQuickView,
  openConsultation,
  onSelectCategory,
}) => {
  // 4 Best selling products explicitly requested by prompt (đa dạng danh mục tiêu biểu)
  const bestSellerProducts = ['prod-1', 'prod-23', 'prod-6', 'prod-4']
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  // Filter tab for Home category groups (matching classifications in Products & Services)
  const [homeCatTypeFilter, setHomeCatTypeFilter] = useState<'all' | 'product' | 'service'>('all');

  // Collapsed mode state for the moved Dịch Vụ Độ Xe Chính Hãng section (initially collapsed as requested)
  const [expandedServiceIds, setExpandedServiceIds] = useState<string[]>([]);

  const toggleServiceExpand = (id: string) => {
    setExpandedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAllServices = () => {
    if (expandedServiceIds.length > 0) {
      setExpandedServiceIds([]);
    } else {
      setExpandedServiceIds(servicesList.map((s) => s.id));
    }
  };

  const servicesList = [
    {
      id: 'srv-battery-shield',
      categoryId: 'battery-shield',
      categoryName: 'Bảo Vệ Pin & Giáp Gầm Xe Điện',
      title: 'Lắp Giáp Gầm Bảo Vệ Pin Xe Điện VinFast',
      brandTag: 'KATA & Sichër',
      type: 'service' as const,
      description: 'Tấm giáp hợp kim nhôm magie & thép dập gân tản nhiệt, chống va đập cạ gầm cụm pin cao áp, chuẩn ốc Zin 100%.',
      points: ['Bảo vệ khối pin không mất bảo hành', 'Lắp chuẩn vị trí ốc gầm Zin 100%'],
      icon: Shield,
      color: 'text-teal-400',
      hoverBorder: 'hover:border-teal-500/50',
      badgeStyle: 'bg-teal-950/70 border-teal-500/30 text-teal-300'
    },
    {
      id: 'srv-mirror',
      categoryId: 'mirror',
      categoryName: 'Gập Gương Tự Động',
      title: 'Độ Gương Gập Điện Tự Động Theo Xe',
      brandTag: 'LimoGreen & VF3/VF5/VF6',
      type: 'service' as const,
      description: 'Motor gập gương điện thông minh theo chìa khóa Smartkey cho xe điện VinFast, tích hợp mạch cắm giắc Zin.',
      points: ['Tự gập khi khóa - xòe khi mở xe', 'Cắm giắc Zin 100% không cắt nối'],
      icon: Sliders,
      color: 'text-amber-300',
      hoverBorder: 'hover:border-amber-500/50',
      badgeStyle: 'bg-amber-950/70 border-amber-500/30 text-amber-200'
    },
    {
      id: 'srv-lighting',
      categoryId: 'lighting',
      categoryName: 'Cá Nhân Hóa Ánh Sáng',
      title: 'Nâng Cấp Bi LED & Bi Gầm Tăng Sáng Siêu Pha',
      brandTag: 'Aozoom EXTRA SAPPHIRE',
      type: 'product' as const,
      description: 'Bi LED Laser 62W-98W nhiệt màu 5000K bám đường mưa sương, đường cắt sắc nét văn minh không chói mắt.',
      points: ['Tăng sáng gấp 5-7 lần nguyên bản', 'Đạt chuẩn đăng kiểm & an toàn điện'],
      icon: Sun,
      color: 'text-yellow-400',
      hoverBorder: 'hover:border-yellow-500/50',
      badgeStyle: 'bg-yellow-950/70 border-yellow-500/30 text-yellow-300'
    },
    {
      id: 'srv-led',
      categoryId: 'led',
      categoryName: 'Đèn LED (Nội & Ngoại Thất)',
      title: 'Độ LED Viền Nội Thất & Trần Sao Rơi Rolls-Royce',
      brandTag: 'Raipow 64-256 Màu',
      type: 'product' as const,
      description: 'Dải LED viền ma trận 64 màu mượt mà, cảm biến nháy chuyển động theo nhạc qua App và bầu trời sao băng.',
      points: ['Điều khiển qua App & nút bấm zin', 'Dải LED đúc khuôn OEM siêu mảnh'],
      icon: Zap,
      color: 'text-purple-400',
      hoverBorder: 'hover:border-purple-500/50',
      badgeStyle: 'bg-purple-950/70 border-purple-500/30 text-purple-300'
    },
    {
      id: 'srv-camera360',
      categoryId: 'camera360',
      categoryName: 'Camera 360 - Hỗ Trợ Đỗ Xe',
      title: 'Lắp Đặt Hệ Thống Camera 360 Độ Toàn Cảnh',
      brandTag: 'TECHCAM Sony Starvis',
      type: 'product' as const,
      description: 'Ghi hình 4 mắt cam góc 180° loại bỏ điểm mù quanh xe, mô phỏng không gian 3D và vạch đánh lái bẻ cong.',
      points: ['Vạch đánh lái bẻ cong theo vô lăng', 'Mắt cam chống nước IP68 siêu nét'],
      icon: Eye,
      color: 'text-indigo-400',
      hoverBorder: 'hover:border-indigo-500/50',
      badgeStyle: 'bg-indigo-950/70 border-indigo-500/30 text-indigo-300'
    },
    {
      id: 'srv-dashcam',
      categoryId: 'dashcam',
      categoryName: 'Camera Hành Trình',
      title: 'Lắp Đặt Camera Hành Trình Thông Minh 3 Kênh',
      brandTag: '70mai T400 & VIETMAP',
      type: 'product' as const,
      description: 'Ghi hình 3 kênh trước - trong cabin - sau siêu nét, cảnh báo giao thông phạt nguội giọng nói, siêu tụ điện 24/7.',
      points: ['Cảnh báo tốc độ & camera phạt nguội', 'Định vị GPS & trích xuất Wifi 5GHz'],
      icon: Video,
      color: 'text-sky-400',
      hoverBorder: 'hover:border-sky-500/50',
      badgeStyle: 'bg-sky-950/70 border-sky-500/30 text-sky-300'
    },
    {
      id: 'srv-audio',
      categoryId: 'audio',
      categoryName: 'Cá Nhân Hóa Âm Thanh',
      title: 'Nâng Cấp Âm Thanh DSP, Loa Treble & Loa Sub Gầm VINSUB VS8-PRO',
      brandTag: 'VINSUB VS8-PRO, Danty Q5, STEG & Rebec',
      type: 'product' as const,
      description: 'Nâng cấp Loa Sub Điện VINSUB VS8-PRO (8 inch vỏ nhôm nguyên khối siêu lực), Loa Treble Danty Q5 (120W Max âm tép sắc bén), Sub gầm Rebec U10/STEG và bộ khuếch đại DSP chuyên nghiệp.',
      points: ['Loa Sub Điện VINSUB VS8-PRO (8 inch nhôm)', 'Loa Treble Danty Q5 & Cân chỉnh DSP'],
      icon: Volume2,
      color: 'text-rose-400',
      hoverBorder: 'hover:border-rose-500/50',
      badgeStyle: 'bg-rose-950/70 border-rose-500/30 text-rose-300'
    },
    {
      id: 'srv-display',
      categoryId: 'display',
      categoryName: 'Màn Hình & Android Box',
      title: 'Màn Hình Đôi Setcar Vision Pro & Android Box',
      brandTag: 'Setcar, Carlinkit & Zestech',
      type: 'product' as const,
      description: 'Màn hình đôi 24.6 inch Setcar Vision Pro LimoGreen, Android Box cắm Type-C RAM 8GB, Vietmap Live và Camera 360.',
      points: ['Màn hình đôi 24.6 inch Chip T7870', 'Giữ zin 100% điện & cắm giắc Plug & Play'],
      icon: Tv,
      color: 'text-blue-400',
      hoverBorder: 'hover:border-blue-500/50',
      badgeStyle: 'bg-blue-950/70 border-blue-500/30 text-blue-300'
    },
    {
      id: 'srv-interior',
      categoryId: 'interior-seat',
      categoryName: 'Nội Thất & Ghế Xe',
      title: 'Phím Vô Lăng MCD91 & Độ Ghế Chỉnh Điện',
      brandTag: 'MCD91 & Da Nappa Ý',
      type: 'product' as const,
      description: 'Phím vô lăng MCD91 Cruise Control Limo Green, ghế điện đa hướng, bọc da Nappa đục lỗ CNC thông khí và bệ tỳ tay.',
      points: ['Phím vô lăng MCD91 cắm giắc Zin', 'Bảo hành độ bền chuẩn Zin 5 năm'],
      icon: Armchair,
      color: 'text-orange-400',
      hoverBorder: 'hover:border-orange-500/50',
      badgeStyle: 'bg-orange-950/70 border-orange-500/30 text-orange-300'
    },
    {
      id: 'srv-safety',
      categoryId: 'safety-utility',
      categoryName: 'Tiện Ích & An Toàn Xe',
      title: 'Độ Cửa Hít, Cốp Điện & Dán Phim Cách Nhiệt 3M',
      brandTag: 'ICAR, Owin & 3M',
      type: 'service' as const,
      description: 'Cửa hít chống kẹt êm ái, cốp điện đá chân tự động và phim quang học 200 lớp 3M Crystalline cản nhiệt 99.9%.',
      points: ['Đóng cửa êm dịu giảm chấn xe', 'Cản 99.9% tia tử ngoại UV bảo vệ da'],
      icon: ShieldCheck,
      color: 'text-emerald-400',
      hoverBorder: 'hover:border-emerald-500/50',
      badgeStyle: 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300'
    }
  ];

  const filteredServices = servicesList.filter((s) => {
    if (homeCatTypeFilter === 'all') return true;
    if (homeCatTypeFilter === 'product') return s.type === 'product';
    if (homeCatTypeFilter === 'service') return s.type === 'service';
    return true;
  });

  // Configurator / Quick estimate state
  const [selectedVehicle, setSelectedVehicle] = useState<'vf_mini' | 'sedan' | 'suv' | 'mpv' | 'luxury'>('suv');
  const [selectedPackage, setSelectedPackage] = useState<'essential' | 'comfort' | 'vip'>('comfort');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['addon_led']);

  const customAddonList = [
    { id: 'addon_led', name: 'Đèn LED nội thất & viền Ambient Light 64 màu', price: 2800000, icon: Sparkles },
    { id: 'addon_cam360', name: 'Camera 360 TECHCAM cắm giắc Zin tích hợp màn Zin', price: 7500000, icon: Video },
    { id: 'addon_hud', name: 'Màn hình HUD kính lái MCD91 cảnh báo tốc độ', price: 2800000, icon: Zap },
    { id: 'addon_sub', name: 'Nâng cấp Sub gầm ghế Rebec U10 & Âm thanh DSP', price: 4500000, icon: Volume2 },
    { id: 'addon_skidplate', name: 'Tấm giáp hợp kim bảo vệ pin gầm xe điện', price: 3200000, icon: ShieldCheck },
    { id: 'addon_cnc_rim', name: 'Phay phục hồi mâm Lazang CNC kim cương (Bộ 4 mâm)', price: 2400000, icon: Disc },
  ];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const estimatePackages = {
    essential: {
      name: 'Gói Tiện Ích & An Toàn Thiết Yếu',
      desc: 'Cam hành trình 3 kênh 70mai + Cảm biến áp suất lốp TPMS Solar + Thảm đúc TPE 3D + Phim cách nhiệt 3M Crystalline',
      tag: 'Tiết kiệm & Thiết yếu',
      vf_mini: 8500000,
      sedan: 9800000,
      suv: 11500000,
      mpv: 13200000,
      luxury: 15500000,
      warranty: '3 năm chính hãng',
      time: '04 - 06 giờ thi công',
      items: [
        'Camera hành trình 3 kênh (Trước - Cabin - Sau) 70mai',
        'Cảm biến áp suất lốp ICAR Ellisafe van trong pin năng lượng mặt trời',
        'Bộ thảm lót sàn TPE đúc khuôn 3D tràn viền theo xe',
        'Dán trọn gói phim cách nhiệt 3M Crystalline chống tia UV 99.9%'
      ]
    },
    comfort: {
      name: 'Gói Tiện Nghi & Công Nghệ Chuẩn Zin',
      desc: 'Màn hình Android 20.8" liền khối / Box cấu hình cao + Bệ tỳ tay phi thuyền Qi + Gương gập điện + Cốp điện ICAR',
      tag: 'Phổ biến & Được ưa chuộng nhất',
      vf_mini: 19500000,
      sedan: 22800000,
      suv: 25500000,
      mpv: 28900000,
      luxury: 34000000,
      warranty: '3 - 5 năm chuẩn Zin',
      time: '01 ngày thi công cắm giắc',
      items: [
        'Màn hình dài 20.8 inch liền khối hoặc Android Box Zestech cấu hình cao',
        'Bệ tỳ tay trung tâm phi thuyền bọc da tích hợp sạc không dây Qi & LED',
        'Bộ gương gập điện tự động & mạch khóa cửa cụp gương thông minh',
        'Bộ cốp điện tự động ICAR ELLIGATE chống kẹt thông minh kèm đá cốp'
      ]
    },
    vip: {
      name: 'Gói Thương Gia VIP & Đẳng Cấp Thượng Lưu',
      desc: 'Bọc full da Nappa Ý may đo + Độ ghế chỉnh điện 10 hướng quạt mát massage + LED viền 64 màu + Sub Rebec + Giáp pin',
      tag: 'Đẳng cấp & Hoàn mỹ',
      vf_mini: 36000000,
      sedan: 48000000,
      suv: 59000000,
      mpv: 69000000,
      luxury: 82000000,
      warranty: '5 năm trọn gói',
      time: '02 - 03 ngày thi công',
      items: [
        'Bọc toàn bộ ghế da Nappa Ý cao cấp may đo thủ công đục lỗ CNC',
        'Độ ghế chỉnh điện đa hướng thông minh, hệ thống quạt thông gió & massage',
        'Hệ thống LED viền nội thất Ambient Light Raipow 64 màu thanh mảnh',
        'Nâng cấp âm thanh Sub gầm ghế Rebec U10 & Loa trung tâm Taplo SA70',
        'Tấm giáp gầm hợp kim nhôm bảo vệ pin và cụm dây cáp xe điện'
      ]
    }
  };

  const basePrice = estimatePackages[selectedPackage][selectedVehicle];
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const item = customAddonList.find(a => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const currentPrice = basePrice + addonsTotal;
  const originalPrice = Math.round(currentPrice * 1.12);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION WITH LARGE BANNER, IMPRESSIVE SLOGAN, AND PROMINENT CTAs */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-slate-800 bg-slate-950">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=2000&q=85"
            alt="Nội thất ô tô cao cấp Hieu N Auto"
            className="w-full h-full object-cover object-center brightness-[0.38] scale-105 animate-in fade-in zoom-in-95 duration-1000"
          />
          {/* Multi-layered futuristic glowing gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-lg shadow-emerald-950/40"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Hệ Thống Nâng Cấp Nội Thất Xe Hơi Uy Tín Tại Việt Nam</span>
            </motion.div>

            {/* Impressive Slogan */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-['Space_Grotesk']"
            >
              Độ Zin Xế Cưng, <br />
              <span className="bg-gradient-to-r from-emerald-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
                Nâng Tầm Trải Nghiệm
              </span>
            </motion.h1>

            {/* Subheading text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Hieu N Auto — Chuyên gia nâng cấp công nghệ, ánh sáng và cá nhân hóa nội ngoại thất ô tô toàn diện: Đèn Bi LED &amp; Bi gầm, Camera 360, âm thanh xe hơi, màn hình Android đến tiện ích an toàn thông minh. Cam kết thi công cắm giắc Zin 100%, bảo toàn hệ thống điện nguyên bản và an tâm đăng kiểm.
            </motion.p>

            {/* Prominent CTA Buttons explicitly requested: "Mua ngay" hoặc "Nhận tư vấn" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary CTA: "Nhận tư vấn" */}
              <motion.button
                id="hero-cta-consult-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openConsultation()}
                className="px-8 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                <span>Nhận Tư Vấn &amp; Báo Giá Ngay</span>
              </motion.button>

              {/* Secondary CTA: "Mua ngay" / Xem sản phẩm */}
              <motion.button
                id="hero-cta-buy-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentPage('products');
                }}
                className="px-8 py-4 rounded-2xl font-bold text-base bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-emerald-400/50 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Mua Ngay / Xem Sản Phẩm</span>
                <ArrowRight className="w-5 h-5 text-emerald-400" />
              </motion.button>
            </motion.div>

            {/* Social Proof & Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg text-slate-300"
            >
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-['Space_Grotesk']">
                  5.000+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400">Xe đã hoàn thiện</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-['Space_Grotesk']">
                  4.8/5 🤩
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400">Đánh giá của khách hàng</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-purple-400 font-['Space_Grotesk']">
                  3+ Năm
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400">Kinh nghiệm xe sang</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. KHU VỰC TRƯNG BÀY 4 SẢN PHẨM BÁN CHẠY NHẤT (CARD TRỰC QUAN) - Mandatory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold mb-2">
              <Flame className="w-4 h-4 fill-current" />
              Top Sản Phẩm Yêu Thích Nhất
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              4 Sản Phẩm Bán Chạy Nhất Tại Hieu N Auto
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Được nhiều chủ xe lựa chọn và đánh giá cao về chất lượng chất lượng sản phẩm và tính thẩm mĩ khi lắp đặt.
            </p>
          </div>

          <button
            id="view-all-bestsellers-btn"
            onClick={() => {
              setCurrentPage('products');
            }}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm transition-colors group cursor-pointer"
          >
            <span>Xem tất cả danh mục sản phẩm</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              badgeText="Bán chạy #1"
            />
          ))}
        </div>
      </section>

      {/* 3. DỊCH VỤ ĐỘ XE CHÍNH HÃNG THEO CÁC MỤC LỚN (ĐÃ CHUYỂN VỊ TRÍ LÊN THAY THẾ HỆ SINH THÁI - CHẾ ĐỘ THU GỌN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-2">
              <Wrench className="w-4 h-4" />
              Dịch Vụ Độ Xe Chính Hãng
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <span>Dịch Vụ Độ Xe Chính Hãng &amp; Thi Công Chuẩn Zin</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              100% linh kiện chính hãng, cắm giắc Zin Plug &amp; Play không cắt trích dây điện. Các hạng mục nâng cấp hiển thị ở chế độ thu gọn để dễ dàng tra cứu nhanh.
            </p>
          </div>

          {/* Controls: Filter & Expand/Collapse All */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setHomeCatTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  homeCatTypeFilter === 'all'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tất Cả ({servicesList.length})
              </button>
              <button
                type="button"
                onClick={() => setHomeCatTypeFilter('product')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  homeCatTypeFilter === 'product'
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5" />
                <span>Sản Phẩm</span>
              </button>
              <button
                type="button"
                onClick={() => setHomeCatTypeFilter('service')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  homeCatTypeFilter === 'service'
                    ? 'bg-purple-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Dịch Vụ</span>
              </button>
            </div>

            {/* Master Toggle Collapse / Expand */}
            <button
              type="button"
              id="toggle-all-services-btn"
              onClick={handleToggleAllServices}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-xs font-bold text-slate-300 hover:text-emerald-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {expandedServiceIds.length > 0 ? (
                <>
                  <ChevronUp className="w-4 h-4 text-emerald-400" />
                  <span>Thu gọn tất cả</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 text-emerald-400" />
                  <span>Mở rộng tất cả</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 10 Services in Collapsed Mode (2 Columns Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {filteredServices.map((service) => {
            const ServiceIcon = service.icon;
            const isExpanded = expandedServiceIds.includes(service.id);
            return (
              <div
                key={service.id}
                id={`service-item-${service.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-emerald-500/50 bg-slate-900 shadow-xl shadow-emerald-950/20'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900/95'
                }`}
              >
                {/* Header (Always Visible - Click to Expand / Collapse) */}
                <div
                  onClick={() => toggleServiceExpand(service.id)}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${service.color}`}>
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${service.badgeStyle}`}>
                          {service.categoryName}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800/80">
                          {service.brandTag}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs sm:text-sm truncate group-hover:text-emerald-300 transition-colors">
                        {service.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openConsultation(undefined, service.title);
                      }}
                      className="hidden sm:inline-flex text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
                    >
                      Tư vấn
                    </button>
                    <div className={`p-1.5 rounded-lg border transition-all ${
                      isExpanded
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 group-hover:text-white'
                    }`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Collapsible Details Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                          {service.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 py-1">
                          {service.points.map((pt, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="text-slate-300">{pt}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                          <button
                            type="button"
                            onClick={() => {
                              if (onSelectCategory) {
                                onSelectCategory(service.categoryId);
                              }
                              setCurrentPage('products');
                            }}
                            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Khám phá toàn bộ {service.categoryName}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openConsultation(undefined, service.title)}
                            className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Nhận Báo Giá Lắp Đặt</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE CAR INTERIOR CONFIGURATOR & ESTIMATE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold mb-2">
              <Sliders className="w-4 h-4" />
              Công Cụ Dự Toán Chi Phí Nhanh
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Cá Nhân Hóa &amp; Dự Toán Chi Phí Nâng Cấp Xe Ô Tô
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Chọn phân khúc dòng xe của bạn, gói nâng cấp tiêu chuẩn và tùy chọn các phụ kiện đi kèm để nhận báo giá dự kiến chính xác nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left selectors */}
            <div className="lg:col-span-7 space-y-7">
              {/* Vehicle Type Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3 flex items-center justify-between">
                  <span>1. Chọn Phân Khúc Dòng Xe Của Bạn:</span>
                  <span className="text-emerald-400 font-normal lowercase text-[11px]">Đã chọn: {
                    selectedVehicle === 'vf_mini' ? 'Xe Điện Mini' :
                    selectedVehicle === 'sedan' ? 'Sedan / Hatchback' :
                    selectedVehicle === 'suv' ? 'SUV / Crossover' :
                    selectedVehicle === 'mpv' ? 'MPV / Bán Tải' : 'Xe Sang Bespoke'
                  }</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {[
                    { id: 'vf_mini', label: 'Xe Điện Mini', sub: 'VF3 / Wuling', tag: 'Hot Trend' },
                    { id: 'sedan', label: 'Sedan / C-Sedan', sub: '4 - 5 chỗ' },
                    { id: 'suv', label: 'SUV / Crossover', sub: '5 - 7 chỗ', tag: 'Phổ biến' },
                    { id: 'mpv', label: 'MPV / Bán Tải', sub: '7 chỗ rộng' },
                    { id: 'luxury', label: 'Xe Sang', sub: 'Bespoke VIP' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      id={`calc-vehicle-${v.id}`}
                      onClick={() => setSelectedVehicle(v.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                        selectedVehicle === v.id
                          ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      {v.tag && (
                        <span className="absolute -top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-500 text-slate-950">
                          {v.tag}
                        </span>
                      )}
                      <Car className={`w-5 h-5 mb-2 ${selectedVehicle === v.id ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <div>
                        <div className="font-bold text-xs text-white line-clamp-1">{v.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{v.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                  2. Chọn Gói Nâng Cấp Toàn Diện:
                </label>
                <div className="space-y-3">
                  {[
                    { id: 'essential', data: estimatePackages.essential },
                    { id: 'comfort', data: estimatePackages.comfort },
                    { id: 'vip', data: estimatePackages.vip },
                  ].map(({ id, data }) => (
                    <button
                      key={id}
                      type="button"
                      id={`calc-pkg-${id}`}
                      onClick={() => setSelectedPackage(id as any)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${
                        selectedPackage === id
                          ? 'border-purple-500 bg-purple-950/30 ring-1 ring-purple-500/40 shadow-lg'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-white">{data.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-purple-500/30">
                            {data.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{data.desc}</p>
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-300 font-medium">
                          <span className="text-emerald-400 font-bold">
                            Giá gói cơ sở: {FORMAT_CURRENCY(data[selectedVehicle])}
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sky-400" />
                            {data.time}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 ${
                        selectedPackage === id ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-700'
                      }`}>
                        {selectedPackage === id && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Optional Custom Add-ons */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3 flex items-center justify-between">
                  <span>3. Tùy Chọn Thêm Phụ Kiện Độc Lập (Tùy Ý):</span>
                  <span className="text-amber-400 text-[11px] font-medium">Đã chọn: {selectedAddons.length} phụ kiện</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {customAddonList.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    const AddonIcon = addon.icon;
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        id={`calc-addon-${addon.id}`}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-500/60 bg-amber-950/20 text-white shadow-md'
                            : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-900 text-slate-500'
                          }`}>
                            <AddonIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-xs text-slate-200 line-clamp-1">{addon.name}</div>
                            <div className="text-[11px] font-bold text-amber-400">+{FORMAT_CURRENCY(addon.price)}</div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Quote Summary Card */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Bảng Báo Giá Dự Toán:</span>
                    <h3 className="font-extrabold text-white text-base sm:text-lg mt-0.5">
                      {estimatePackages[selectedPackage].name}
                    </h3>
                    <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                      Dòng xe: {
                        selectedVehicle === 'vf_mini' ? 'Xe Điện Mini (VF3 / Wuling)' :
                        selectedVehicle === 'sedan' ? 'Sedan / Hatchback' :
                        selectedVehicle === 'suv' ? 'SUV / Crossover' :
                        selectedVehicle === 'mpv' ? 'MPV / Bán Tải' : 'Xe Sang Bespoke'
                      }
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                    BH {estimatePackages[selectedPackage].warranty}
                  </span>
                </div>

                {/* Items included in Base Package */}
                <div className="space-y-2 text-xs">
                  <span className="text-slate-400 font-semibold block">Hạng mục trong gói chính:</span>
                  {estimatePackages[selectedPackage].items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Selected Add-ons List */}
                <AnimatePresence>
                  {selectedAddons.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden pt-3 border-t border-slate-800/80 space-y-2 text-xs"
                    >
                      <span className="text-slate-400 font-semibold flex items-center justify-between">
                        <span>Phụ kiện chọn thêm ({selectedAddons.length}):</span>
                        <span className="text-amber-400 font-bold">+{FORMAT_CURRENCY(addonsTotal)}</span>
                      </span>
                      <div className="space-y-1.5">
                        {selectedAddons.map(addonId => {
                          const addon = customAddonList.find(a => a.id === addonId);
                          if (!addon) return null;
                          return (
                            <motion.div 
                              key={addonId} 
                              layout
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-900/70 px-2.5 py-1 rounded-lg border border-slate-800"
                            >
                              <span className="line-clamp-1">{addon.name}</span>
                              <span className="font-bold text-amber-400 ml-2 whitespace-nowrap">+{FORMAT_CURRENCY(addon.price)}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Price Display */}
                <div className="pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Giá niêm yết:</span>
                    <span className="line-through text-slate-500 font-semibold">{FORMAT_CURRENCY(originalPrice)}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-xs text-slate-300 font-bold">Tổng dự toán trọn gói công lắp:</div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Tiết kiệm 10%
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPrice}
                      initial={{ opacity: 0.5, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0.5, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="text-3xl font-black text-orange-400 tracking-tight mt-1"
                    >
                      {FORMAT_CURRENCY(currentPrice)}
                    </motion.div>
                  </AnimatePresence>
                  <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                    <span>Thời gian thi công: <strong className="text-white">{estimatePackages[selectedPackage].time}</strong></span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  id="calc-submit-btn"
                  onClick={() => {
                    const vehicleLabel = 
                      selectedVehicle === 'vf_mini' ? 'Xe Điện Mini (VF3 / Wuling)' :
                      selectedVehicle === 'sedan' ? 'Sedan / Hatchback' :
                      selectedVehicle === 'suv' ? 'SUV / Crossover' :
                      selectedVehicle === 'mpv' ? 'MPV / Bán Tải' : 'Xe Sang Bespoke';
                    const consultationService = `${estimatePackages[selectedPackage].name}${selectedAddons.length > 0 ? ` (+${selectedAddons.length} phụ kiện chọn thêm)` : ''}`;
                    openConsultation(vehicleLabel, consultationService);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Nhận Báo Giá Chi Tiết &amp; Giữ Lịch</span>
                </motion.button>

                <p className="text-[11px] text-center text-slate-500">
                  * Giá trên đã bao gồm toàn bộ công lắp đặt, cắm giắc Zin 100% và bảo hành chính hãng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 5. KHÁCH HÀNG ĐÁNH GIÁ (TESTIMONIALS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-2">
            <Star className="w-4 h-4 fill-current" />
            Khách Hàng Thực Tế
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Trải Nghiệm Của Chủ Xe Sau Khi Nâng Cấp
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(t.rating) ? 'fill-current text-amber-400' : 'text-slate-700'}`}
                    />
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-1">{t.rating.toFixed(1)}</span>
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3 mt-4">
                <img
                  src={t.avatar}
                  alt={t.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                />
                <div className="min-w-0">
                  <div className="font-bold text-xs text-white truncate flex items-center gap-1">
                    <span>{t.customerName}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{t.carModel}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold truncate">{t.serviceUsed}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-purple-900 border border-slate-700/80 p-8 sm:p-12 overflow-hidden text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
              Sẵn Sàng Nâng Cấp Nội Thất &amp; Phụ Kiện Cho Xế Cưng?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Đăng ký tư vấn nhanh ngay hôm nay để nhận báo giá chuẩn Zin cho từng dòng xe, tặng voucher giảm 10% và gói kiểm tra hệ thống điện xe miễn phí.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openConsultation()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30 hover:from-orange-400 hover:to-amber-400 transition-all cursor-pointer"
            >
              Nhận Tư Vấn Miễn Phí Ngay
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-emerald-400/50 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Xem Địa Chỉ Showroom &amp; Liên Hệ</span>
            </button>
            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Hotline: {COMPANY_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
