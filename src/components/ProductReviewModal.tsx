import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Star,
  Send,
  CheckCircle2,
  Sparkles,
  Car,
  User,
  Phone,
  MessageSquare,
  PackageCheck,
  Search,
  Check,
  ChevronDown
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, COMPANY_INFO } from '../data/mockData';

interface ProductReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductId?: string;
  onViewProduct?: (product: Product) => void;
}

const QUICK_TAGS = [
  'Lắp đặt cắm giắc Zin 100%',
  'Kỹ thuật viên tay nghề cao',
  'Độ nét camera cực đỉnh',
  'Gương gập êm ái chống kẹt',
  'Giáp gầm bảo vệ pin chắc chắn',
  'Đèn bi bám đường phá sương tốt',
  'Bảo hành chính hãng uy tín',
  'Tư vấn chu đáo đúng hẹn'
];

export const ProductReviewModal: React.FC<ProductReviewModalProps> = ({
  isOpen,
  onClose,
  defaultProductId,
  onViewProduct
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    defaultProductId || PRODUCTS[0]?.id || ''
  );
  const [productSearch, setProductSearch] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>('');
  const [carModel, setCarModel] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (defaultProductId) {
      setSelectedProductId(defaultProductId);
    }
  }, [defaultProductId]);

  if (!isOpen) return null;

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(productSearch.toLowerCase())
  );

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getRatingLabel = (r: number) => {
    switch (r) {
      case 5:
        return 'Tuyệt vời - Rất hài lòng về chất lượng & dịch vụ';
      case 4:
        return 'Hài lòng - Thi công cẩn thận, sản phẩm chuẩn';
      case 3:
        return 'Bình thường - Đạt yêu cầu cơ bản';
      case 2:
        return 'Chưa hài lòng - Cần cải thiện thêm';
      case 1:
        return 'Không hài lòng';
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim() || !currentProduct) return;

    const fullComment = selectedTags.length > 0
      ? `${comment.trim()}\n\n[Điểm nổi bật: ${selectedTags.join(', ')}]`
      : comment.trim();

    const newReview = {
      id: `rev-user-${Date.now()}`,
      name: customerName.trim(),
      carModel: carModel.trim() || 'Xe ô tô',
      phoneNumber: phoneNumber.trim(),
      rating,
      date: 'Vừa xong',
      comment: fullComment,
      helpfulCount: 1,
      isVerified: true
    };

    try {
      const storageKey = `hieunauto_reviews_${currentProduct.id}`;
      const existing = localStorage.getItem(storageKey);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newReview);
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setComment('');
    setSelectedTags([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 z-10 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <span>Đánh Giá Sản Phẩm &amp; Dịch Vụ</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                  Chính Hãng
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Chia sẻ trải nghiệm thực tế sau khi thi công và nâng cấp tại {COMPANY_INFO.brandName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-xl font-extrabold text-white">
                  Gửi Đánh Giá Thành Công!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cảm ơn bạn <span className="text-white font-bold">{customerName}</span> đã dành thời gian nhận xét cho <span className="text-emerald-400 font-semibold">{currentProduct?.name}</span>. Đánh giá của bạn đã được cập nhật trực tiếp vào hệ thống.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{customerName}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'fill-amber-400' : 'text-slate-700'}`} />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  {carModel || 'Khách hàng'} • {currentProduct?.name}
                </div>
                <p className="text-xs text-slate-300 italic pt-1">
                  "{comment}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                {onViewProduct && currentProduct && (
                  <button
                    onClick={() => {
                      onClose();
                      onViewProduct(currentProduct);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>Xem Trang Sản Phẩm</span>
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs cursor-pointer transition-colors"
                >
                  Đóng Hộp Thoại
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Selector Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  1. Chọn sản phẩm hoặc dịch vụ bạn đã sử dụng *
                </label>

                <div className="relative">
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={currentProduct.primaryImage}
                        alt={currentProduct.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-800 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-white text-xs truncate">
                          {currentProduct.name}
                        </div>
                        <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-2 mt-0.5">
                          <span>{currentProduct.categoryName}</span>
                          <span>•</span>
                          <span className="text-amber-400 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {currentProduct.rating.toFixed(1)} ({currentProduct.reviewCount} đánh giá)
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                  </div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl z-30 space-y-2 max-h-64 overflow-y-auto"
                      >
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm theo tên..."
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div className="space-y-1">
                          {filteredProducts.slice(0, 8).map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setSelectedProductId(p.id);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full p-2 rounded-xl text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                                p.id === currentProduct.id
                                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-white'
                                  : 'hover:bg-slate-900 text-slate-300'
                              }`}
                            >
                              <img
                                src={p.primaryImage}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-semibold truncate">{p.name}</div>
                                <div className="text-[10px] text-slate-400">{p.categoryName}</div>
                              </div>
                              {p.id === currentProduct.id && (
                                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Star Rating Section */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-center">
                <label className="block text-xs font-bold text-slate-300">
                  2. Mức độ hài lòng của bạn về sản phẩm này *
                </label>

                <div className="flex items-center justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1.5 transition-transform hover:scale-125 cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 sm:w-9 sm:h-9 ${
                          s <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                            : 'text-slate-800'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="text-xs font-extrabold text-amber-400">
                  {hoverRating || rating} / 5.0 Sao — {getRatingLabel(hoverRating || rating)}
                </div>
              </div>

              {/* Quick Tag Badges */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  3. Chọn nhanh các ưu điểm nổi bật (Tùy chọn)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {isSelected && <span className="text-emerald-400 mr-1 font-bold">✓</span>}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Họ và tên của bạn *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Anh Nam / Chị Lan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-slate-400" />
                    <span>Dòng xe của bạn (Khuyên dùng)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: VinFast VF3, Mercedes E300..."
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Số điện thoại (Tùy chọn - Nhận voucher 10% tri ân)</span>
                </label>
                <input
                  type="tel"
                  placeholder="VD: 0988.xxx.xxx"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              {/* Comment Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Nội dung đánh giá &amp; cảm nhận chi tiết *</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Chia sẻ chi tiết về chất lượng sản phẩm, độ nét camera, âm thanh loa, độ đầm chắc tấm giáp pin, thái độ phục vụ của kỹ thuật viên..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3.5 text-xs text-white focus:outline-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer transition-colors"
                >
                  Hủy Bỏ
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 hover:from-amber-400 to-orange-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Đánh Giá Ngay</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
