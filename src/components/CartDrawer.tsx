import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin,
  Phone,
  Sparkles,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { COMPANY_INFO, FORMAT_CURRENCY } from '../data/mockData';
import { submitLeadToGoogleSheets } from '../services/leadService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [installationOption, setInstallationOption] = useState<'showroom' | 'home'>('showroom');
  const [carModel, setCarModel] = useState('');
  const [notes, setNotes] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount > 0 ? (subtotal * appliedDiscount) / 100 : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'HIEUNAUTO' || discountCode.trim().toUpperCase() === 'VIP2026') {
      setAppliedDiscount(10);
      setErrors((prev) => ({ ...prev, coupon: '' }));
    } else {
      setErrors((prev) => ({ ...prev, coupon: 'Mã giảm giá không hợp lệ. Hãy thử: HIEUNAUTO' }));
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.customerName = 'Vui lòng nhập họ và tên';
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!phoneRegex.test(phoneNumber.trim())) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ (10 chữ số, ví dụ 0988888686)';
    }

    if (!address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ nhận hàng / lắp đặt';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const itemsSummary = cartItems
      .map(item => `${item.product.name} (x${item.quantity}${item.selectedColor ? `, Màu: ${item.selectedColor}` : ''})`)
      .join('; ');

    // Send order to Google Sheets
    await submitLeadToGoogleSheets({
      name: customerName.trim(),
      phone: phoneNumber.trim(),
      address: address.trim(),
      car: carModel.trim(),
      service: `Đơn Hàng: ${itemsSummary}`,
      items: itemsSummary,
      totalAmount: FORMAT_CURRENCY(total),
      note: `${notes.trim() ? `Ghi chú: ${notes.trim()} | ` : ''}Hình thức: ${installationOption === 'home' ? 'Lắp đặt tận nhà' : 'Lắp tại xưởng Showroom'} | Tổng: ${FORMAT_CURRENCY(total)}`,
      source: 'Đơn Hàng Giỏ Hàng (Cart Drawer)',
    });

    setIsSubmitting(false);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setOrderSuccess(true);
    onClearCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between pointer-events-auto"
            >
              {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
              </div>
              <h2 className="text-lg font-bold text-white">
                {showCheckout ? 'Đặt Lịch & Thanh Toán' : 'Giỏ Hàng Của Bạn'}
              </h2>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {orderSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white">Đặt Hàng Thành Công!</h3>
                <p className="text-xs text-slate-300 leading-relaxed px-4">
                  Cảm ơn quý khách <strong className="text-emerald-400">{customerName}</strong>. Chuyên viên kỹ thuật Hieu N Auto sẽ liên hệ qua số điện thoại <strong className="text-emerald-400">{phoneNumber}</strong> trong 15 phút để xác nhận form xe và xếp lịch thi công.
                </p>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5">
                  <div className="text-slate-400">Hình thức: <span className="text-white font-medium">{installationOption === 'home' ? 'Lắp đặt tận nhà' : 'Thi công tại xưởng Hieu N Auto'}</span></div>
                  {carModel && <div className="text-slate-400">Dòng xe: <span className="text-white font-medium">{carModel}</span></div>}
                  <div className="text-slate-400">Hotline hỗ trợ: <span className="text-orange-400 font-bold">{COMPANY_INFO.hotline}</span></div>
                </div>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    setShowCheckout(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-colors"
                >
                  Tiếp Tục Mua Sắm
                </button>
              </div>
            ) : showCheckout ? (
              /* Checkout Form View */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  {errors.customerName && <p className="text-rose-400 text-[11px]">{errors.customerName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0988888686"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  {errors.phoneNumber && <p className="text-rose-400 text-[11px]">{errors.phoneNumber}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Dòng xe &amp; Năm sản xuất</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: VinFast VF8 2024, Mercedes C200 2022..."
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Địa điểm thi công</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInstallationOption('showroom')}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                        installationOption === 'showroom'
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      Tại Showroom
                    </button>
                    <button
                      type="button"
                      onClick={() => setInstallationOption('home')}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                        installationOption === 'home'
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      Lắp Tại Nhà
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Địa chỉ chi tiết *</label>
                  <input
                    type="text"
                    required
                    placeholder="Số nhà, tên đường, quận/huyện, tỉnh/thành phố"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  {errors.address && <p className="text-rose-400 text-[11px]">{errors.address}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Ghi chú thêm</label>
                  <textarea
                    rows={2}
                    placeholder="Yêu cầu riêng về màu chỉ may, thời gian thi công mong muốn..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Tạm tính ({cartItems.length} món):</span>
                    <span>{FORMAT_CURRENCY(subtotal)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Giảm giá ({appliedDiscount}%):</span>
                      <span>-{FORMAT_CURRENCY(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-slate-800">
                    <span>Tổng thanh toán:</span>
                    <span className="text-orange-400">{FORMAT_CURRENCY(total)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                  >
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold shadow-lg shadow-orange-500/25 hover:from-orange-400 hover:to-amber-400 flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang lưu đơn...</span>
                      </>
                    ) : (
                      <span>Xác Nhận Đặt Hàng</span>
                    )}
                  </button>
                </div>
              </form>
            ) : cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">Giỏ hàng của bạn đang trống</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Khám phá các gói bọc ghế da Nappa, thảm lót sàn 360 và phụ kiện nâng cấp nội thất xe hơi cao cấp.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
                >
                  Xem Sản Phẩm Ngay
                </button>
              </div>
            ) : (
              /* Cart Item List */
              <>
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.22 }}
                        className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex gap-3 items-center"
                      >
                        <img
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-900 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate leading-snug">
                            {item.product.name}
                          </h4>
                          {item.selectedColor && (
                            <p className="text-[11px] text-slate-400">
                              Màu: <span className="text-emerald-400">{item.selectedColor}</span>
                            </p>
                          )}
                          <div className="text-xs font-bold text-orange-400 mt-1">
                            {FORMAT_CURRENCY(item.product.price)}
                          </div>
                        </div>

                        {/* Quantity Modifier */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                            title="Xóa sản phẩm"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 text-slate-400 hover:text-white flex items-center justify-center font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 text-slate-400 hover:text-white flex items-center justify-center font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Coupon input */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Mã ưu đãi (VD: HIEUNAUTO)"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 border border-slate-700"
                    >
                      Áp Dụng
                    </button>
                  </div>
                  {errors.coupon && <p className="text-rose-400 text-[11px] mt-1">{errors.coupon}</p>}
                  {appliedDiscount > 0 && (
                    <p className="text-emerald-400 text-[11px] mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Đã áp dụng giảm giá {appliedDiscount}%
                    </p>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer Summary & Checkout Trigger */}
          {cartItems.length > 0 && !showCheckout && !orderSuccess && (
            <div className="p-5 sm:p-6 border-t border-slate-800 bg-slate-950 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Tổng tiền hàng:</span>
                  <span>{FORMAT_CURRENCY(subtotal)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Mã giảm giá ({appliedDiscount}%):</span>
                    <span>-{FORMAT_CURRENCY(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Phí lắp đặt tại xưởng:</span>
                  <span className="text-emerald-400 font-bold">Miễn Phí</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Tổng thanh toán:</span>
                  <span className="text-orange-400">{FORMAT_CURRENCY(total)}</span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                onClick={() => setShowCheckout(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Tiến Hành Đặt Lịch / Mua Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cam kết 100% da chính hãng &amp; Bảo hành tới 5 năm</span>
              </div>
            </div>
          )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
