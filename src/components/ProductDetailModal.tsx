import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShoppingBag, 
  ShieldCheck, 
  Star, 
  Check, 
  Wrench, 
  Clock, 
  Car, 
  Sparkles, 
  PhoneCall,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Camera,
  MessageSquare,
  CheckCircle2,
  ThumbsUp,
  Send,
  User
} from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO, FORMAT_CURRENCY } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, quantity?: number) => void;
  openConsultation: () => void;
}

interface UserReview {
  id: string;
  name: string;
  carModel: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
  isVerified: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  openConsultation,
}) => {
  if (!product) return null;

  const allImages = Array.from(
    new Set([product.primaryImage, product.secondaryImage, ...(product.galleryImages || [])])
  ).filter(Boolean);

  const [activeImage, setActiveImage] = useState<string>(product.primaryImage);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | 'all'>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.primaryImage);
      setSelectedColor(product.colors[0]?.name || '');
    }
  }, [product?.id, product?.primaryImage]);

  // Interactive review submission state
  const [userRating, setUserRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userCar, setUserCar] = useState<string>('');
  const [userComment, setUserComment] = useState<string>('');
  const [submittedReview, setSubmittedReview] = useState<boolean>(false);

  // Dynamic sample reviews tailored to this product
  const [reviewsList, setReviewsList] = useState<UserReview[]>([
    {
      id: 'rev-1',
      name: 'Anh Trần Tuấn Anh',
      carModel: 'VinFast VF3 / VF5',
      rating: 5,
      date: '2 ngày trước',
      comment: `Lắp đặt tại xưởng cực kỳ hài lòng! Sản phẩm ${product.name} chuẩn Zin 100%, kỹ thuật viên thi công cẩn thận, test kỹ từng chi tiết trước khi bàn giao xe. Rất đáng đồng tiền bát gạo!`,
      helpfulCount: 24,
      isVerified: true,
    },
    {
      id: 'rev-2',
      name: 'Anh Nguyễn Minh Hải',
      carModel: 'MG ZS / Toyota Cross',
      rating: 5,
      date: '5 ngày trước',
      comment: 'Chất lượng hoàn thiện cao cấp, vật liệu xịn không mùi độc hại, đường nét sắc sảo ôm khít phom xe. Đội ngũ tư vấn nhiệt tình và bảo hành chính hãng uy tín.',
      helpfulCount: 18,
      isVerified: true,
    },
    {
      id: 'rev-3',
      name: 'Chị Lê Thị Mai Lan',
      carModel: 'VinFast VF7 / VF8',
      rating: 5,
      date: '1 tuần trước',
      comment: 'Sản phẩm hoàn toàn giống hình chụp thực tế, lắp lên xe nhìn sang trọng và thẩm mỹ hơn hẳn. Dịch vụ chăm sóc khách hàng sau khi lắp đặt rất chu đáo!',
      helpfulCount: 15,
      isVerified: true,
    },
    {
      id: 'rev-4',
      name: 'Anh Phạm Quốc Đạt',
      carModel: 'Mazda CX-5 / Hyundai Tucson',
      rating: product.rating < 5.0 ? 4 : 5,
      date: '2 tuần trước',
      comment: 'Thi công nhanh chóng đúng hẹn, nhân viên hướng dẫn sử dụng rất kỹ. Sẽ tiếp tục ủng hộ xưởng các gói phụ kiện tiếp theo.',
      helpfulCount: 11,
      isVerified: true,
    }
  ]);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      name: userName.trim(),
      carModel: userCar.trim() || 'Xe ô tô',
      rating: userRating,
      date: 'Vừa xong',
      comment: userComment.trim(),
      helpfulCount: 1,
      isVerified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedReview(true);
    setUserName('');
    setUserCar('');
    setUserComment('');
    setTimeout(() => setSubmittedReview(false), 4000);
  };

  // Rating percentage calculation matching product total rating
  const totalReviews = product.reviewCount + (reviewsList.length - 4);
  const fiveStarPct = product.rating >= 5.0 ? 96 : 88;
  const fourStarPct = product.rating >= 5.0 ? 4 : 12;
  const fiveStarCount = Math.round((totalReviews * fiveStarPct) / 100);
  const fourStarCount = totalReviews - fiveStarCount;

  const filteredReviews = selectedStarFilter === 'all' 
    ? reviewsList 
    : reviewsList.filter((r) => r.rating === selectedStarFilter);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Gallery Column - Expanded Space */}
            <div className="lg:col-span-6 space-y-4">
              <div 
                className="relative aspect-square sm:min-h-[380px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl group p-2.5 sm:p-3.5 flex items-center justify-center cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 contrast-[1.03] select-none rounded-xl"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
                
                {/* Previous & Next Buttons */}
                {allImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const currIdx = allImages.indexOf(activeImage);
                        const prevIdx = (currIdx - 1 + allImages.length) % allImages.length;
                        setActiveImage(allImages[prevIdx]);
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl cursor-pointer transition-all hover:scale-110 z-10"
                      title="Ảnh trước"
                      aria-label="Ảnh trước"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const currIdx = allImages.indexOf(activeImage);
                        const nextIdx = (currIdx + 1) % allImages.length;
                        setActiveImage(allImages[nextIdx]);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl cursor-pointer transition-all hover:scale-110 z-10"
                      title="Ảnh tiếp theo"
                      aria-label="Ảnh tiếp theo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-rose-600 text-white shadow-md">
                      Tiết kiệm {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Top Right Maximize / Fullscreen Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg cursor-pointer transition-all z-10 flex items-center gap-1 text-[11px] font-semibold"
                  title="Phóng to toàn cảnh"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Phóng to</span>
                </button>

                {/* Active Image Indicator & Dots */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/70 shadow">
                    {allImages.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          allImages.indexOf(activeImage) === i
                            ? 'bg-emerald-400 w-4'
                            : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-bold text-slate-300 shadow">
                    Ảnh {Math.max(1, allImages.indexOf(activeImage) + 1)} / {allImages.length}
                  </div>
                </div>
              </div>

              {/* Thumbnails - Expanded Image Placement Space */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Không Gian Góc Chụp Thực Tế ({allImages.length} Ảnh)
                  </span>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    Click để đổi ảnh hoặc phóng to
                  </span>
                </div>
                <div className="flex items-center gap-3 overflow-x-auto pb-1.5 scrollbar-thin">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative flex-shrink-0 w-24 sm:w-28 h-20 sm:h-22 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shadow-md ${
                        activeImage === img
                          ? 'border-emerald-500 ring-2 ring-emerald-500/40 scale-[1.02]'
                          : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600'
                      }`}
                    >
                      <img src={img} alt={`thumbnail-${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-slate-950/90 text-emerald-400 border border-emerald-500/30">
                        Ảnh {idx + 1}
                      </span>
                    </button>
                  ))}

                  {/* Extra slot: Request custom vehicle photos */}
                  <button
                    type="button"
                    onClick={openConsultation}
                    className="relative flex-shrink-0 w-24 sm:w-28 h-20 sm:h-22 rounded-xl border-2 border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-950/50 hover:bg-slate-900/60 flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer group/add"
                    title="Gửi hình ảnh hoặc yêu cầu thêm góc chụp"
                  >
                    <Camera className="w-4 h-4 text-emerald-400 mb-1 group-hover/add:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold text-slate-300 leading-tight">
                      + Thêm Góc Chụp
                    </span>
                  </button>
                </div>
              </div>

              {/* Quality Badges */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-slate-300 font-medium">Bảo hành {product.warrantyMonths}T</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <Clock className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                  <span className="text-slate-300 font-medium">Lắp {product.installationTimeHours}h</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <Wrench className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span className="text-slate-300 font-medium">Chuẩn Zin 100%</span>
                </div>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {product.itemType === 'service' ? (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-950/80 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      Dịch Vụ Độ Xe Chính Hãng
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-sky-950/80 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Sản Phẩm Chính Hãng
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {product.categoryName}
                  </span>
                  
                  {/* Accurate Star Rating Badge */}
                  <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-extrabold text-amber-400">{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-slate-400">({totalReviews} đánh giá)</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {product.name}
                </h2>
              </div>

              {/* Price section */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-400">
                  {FORMAT_CURRENCY(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-slate-500 line-through">
                    {FORMAT_CURRENCY(product.originalPrice)}
                  </span>
                )}
                <span className="ml-auto text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Giá bao gồm công lắp đặt
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Tùy Chọn Màu Sắc &amp; Phối Bản: <span className="text-white font-semibold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 font-bold'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-700"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg text-slate-300 hover:bg-slate-800 flex items-center justify-center font-bold text-base cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-white text-sm">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg text-slate-300 hover:bg-slate-800 flex items-center justify-center font-bold text-base cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-emerald-500/20'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5 text-white" />
                        <span className="text-white">Đã thêm vào giỏ hàng!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>Thêm Vào Giỏ ({FORMAT_CURRENCY(product.price * quantity)})</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      openConsultation();
                    }}
                    className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-orange-400 border border-orange-500/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-orange-400" />
                    Đặt Lịch Thi Công Nhanh
                  </button>
                  <a
                    href={`tel:${COMPANY_INFO.hotline}`}
                    className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Hotline: {COMPANY_INFO.hotline}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features & Specifications Checklist */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Đặc Điểm Nổi Bật &amp; Cam Kết Chất Lượng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= COMPREHENSIVE REVIEWS & STAR RATING SECTION ================= */}
          <div className="border-t border-slate-800 pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  Đánh Giá &amp; Nhận Xét Của Khách Hàng
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Đánh giá thực tế từ các chủ xe đã trải nghiệm và lắp đặt trực tiếp tại xưởng
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                100% Đã Xác Thực Mua Hàng
              </span>
            </div>

            {/* Rating Summary Card with Distribution Bars */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-950 border border-slate-800">
              
              {/* Overall Score Box */}
              <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight mb-2">
                  {product.rating.toFixed(1)}
                  <span className="text-xl text-slate-500 font-normal"> / 5.0</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} 
                    />
                  ))}
                </div>
                <div className="text-xs text-slate-300 font-semibold">
                  Dựa trên <span className="text-white font-bold">{totalReviews}</span> lượt đánh giá thực tế
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                  ★ 100% khách hàng hài lòng &amp; khuyên dùng
                </div>
              </div>

              {/* Progress Bars (5★ to 1★) */}
              <div className="md:col-span-7 flex flex-col justify-center space-y-2.5">
                {/* 5 Stars */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-14 flex items-center gap-1 text-slate-300 font-bold">
                    <span>5 Sao</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${fiveStarPct}%` }}
                    />
                  </div>
                  <div className="w-16 text-right font-medium text-slate-400 text-[11px]">
                    {fiveStarCount} ({fiveStarPct}%)
                  </div>
                </div>

                {/* 4 Stars */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-14 flex items-center gap-1 text-slate-300 font-bold">
                    <span>4 Sao</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-amber-400/70 rounded-full transition-all duration-500"
                      style={{ width: `${fourStarPct}%` }}
                    />
                  </div>
                  <div className="w-16 text-right font-medium text-slate-400 text-[11px]">
                    {fourStarCount} ({fourStarPct}%)
                  </div>
                </div>

                {/* 3 Stars */}
                <div className="flex items-center gap-3 text-xs opacity-40">
                  <div className="w-14 flex items-center gap-1 text-slate-300 font-bold">
                    <span>3 Sao</span>
                    <Star className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400/30 rounded-full" style={{ width: '0%' }} />
                  </div>
                  <div className="w-16 text-right font-medium text-slate-500 text-[11px]">0 (0%)</div>
                </div>

                {/* 2 Stars */}
                <div className="flex items-center gap-3 text-xs opacity-40">
                  <div className="w-14 flex items-center gap-1 text-slate-300 font-bold">
                    <span>2 Sao</span>
                    <Star className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400/30 rounded-full" style={{ width: '0%' }} />
                  </div>
                  <div className="w-16 text-right font-medium text-slate-500 text-[11px]">0 (0%)</div>
                </div>

                {/* 1 Star */}
                <div className="flex items-center gap-3 text-xs opacity-40">
                  <div className="w-14 flex items-center gap-1 text-slate-300 font-bold">
                    <span>1 Sao</span>
                    <Star className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400/30 rounded-full" style={{ width: '0%' }} />
                  </div>
                  <div className="w-16 text-right font-medium text-slate-500 text-[11px]">0 (0%)</div>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-medium">Lọc theo:</span>
              <button
                type="button"
                onClick={() => setSelectedStarFilter('all')}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition-colors cursor-pointer ${
                  selectedStarFilter === 'all'
                    ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Tất Cả ({totalReviews})
              </button>
              <button
                type="button"
                onClick={() => setSelectedStarFilter(5)}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  selectedStarFilter === 5
                    ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span>5 Sao</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>({fiveStarCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedStarFilter(4)}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  selectedStarFilter === 4
                    ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span>4 Sao</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>({fourStarCount})</span>
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.map((rev) => (
                <div 
                  key={rev.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-slate-700 flex items-center justify-center font-black text-amber-400 text-sm">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <span>{rev.name}</span>
                          {rev.isVerified && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                              <Check className="w-3 h-3" />
                              Đã lắp đặt tại xưởng
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="text-emerald-400 font-medium">{rev.carModel}</span>
                          <span>•</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-800'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed sm:pl-13">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 sm:pl-13 pt-1">
                    <span className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Hữu ích ({rev.helpfulCount})
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Write Review Form */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                Gửi Đánh Giá Của Bạn Cho Sản Phẩm Này
              </h4>

              {submittedReview && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Cảm ơn bạn đã gửi đánh giá! Nhận xét của bạn đã được cập nhật thành công vào danh sách.</span>
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating selection stars */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-300">Chấm điểm sao:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star 
                          className={`w-5 h-5 ${
                            star <= (hoverRating || userRating) 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-slate-700'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-400">
                    {(hoverRating || userRating)} / 5.0 Sao
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Họ và tên của bạn *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Anh Minh"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Dòng xe của bạn (Tùy chọn)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: VinFast VF3 / Toyota Cross"
                      value={userCar}
                      onChange={(e) => setUserCar(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Cảm nhận &amp; nhận xét của bạn *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Chia sẻ trải nghiệm về độ sắc nét, độ êm ái, thẩm mỹ hoặc tay nghề thi công..."
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi Đánh Giá Ngay</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox / Fullscreen Image Space */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 cursor-pointer transition-all z-20"
              title="Đóng xem toàn cảnh"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Prev / Next */}
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const currIdx = allImages.indexOf(activeImage);
                    const prevIdx = (currIdx - 1 + allImages.length) % allImages.length;
                    setActiveImage(allImages[prevIdx]);
                  }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 cursor-pointer transition-all hover:scale-110 z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const currIdx = allImages.indexOf(activeImage);
                    const nextIdx = (currIdx + 1) % allImages.length;
                    setActiveImage(allImages[nextIdx]);
                  }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 cursor-pointer transition-all hover:scale-110 z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
              <img
                src={activeImage}
                alt={product.name}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
              />
              <div className="mt-4 flex items-center gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === img ? 'border-emerald-500 scale-105' : 'border-slate-800 opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
