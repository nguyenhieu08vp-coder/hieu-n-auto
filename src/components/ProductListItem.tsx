import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  Star, 
  Check, 
  ShieldCheck, 
  Zap, 
  Car, 
  Layers 
} from 'lucide-react';
import { Product } from '../types';
import { FORMAT_CURRENCY } from '../data/mockData';

interface ProductListItemProps {
  product: Product;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      id={`product-list-item-${product.id}`}
      className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col md:flex-row overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image on Left / Top on mobile */}
      <div 
        className="relative w-full md:w-56 lg:w-64 aspect-[4/3] md:aspect-square bg-slate-950 flex-shrink-0 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
        <img
          src={product.secondaryImage || product.primaryImage}
          alt={`${product.name} góc phụ`}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-current" />
              Bán Chạy #1
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600/90 text-white backdrop-blur-sm shadow">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Button on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className={`absolute bottom-2.5 right-2.5 p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white backdrop-blur-md border border-slate-700 shadow-lg transition-all duration-300 cursor-pointer ${
            isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0'
          }`}
          title="Xem chi tiết"
        >
          <Eye className="w-3.5 h-3.5 text-sky-400" />
        </button>

        {/* Warranty Tag */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[10px] font-medium text-slate-300 bg-slate-900/85 backdrop-blur-md px-1.5 py-0.5 rounded border border-slate-800">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>BH {product.warrantyMonths}T</span>
        </div>
      </div>

      {/* Middle: Content Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-emerald-400 font-semibold">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-amber-400 font-extrabold text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-medium text-[10px]">({product.reviewCount} đánh giá)</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-white font-bold text-base sm:text-lg leading-snug hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Specs tags: Materials & Vehicles */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {product.materials.length > 0 && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                <Layers className="w-3 h-3 text-emerald-400" />
                <span>{product.materials.slice(0, 2).join(', ')}</span>
              </div>
            )}
            {product.vehicleTypes.length > 0 && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                <Car className="w-3 h-3 text-sky-400" />
                <span>Phù hợp: {product.vehicleTypes.map(v => v.toUpperCase()).join(', ')}</span>
              </div>
            )}
          </div>

          {/* Color swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400">Màu sắc:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(c.name);
                    }}
                    title={c.name}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      selectedColor === c.name
                        ? 'ring-2 ring-emerald-400 scale-110 border-white'
                        : 'border-slate-600 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-300 font-medium ml-1">({selectedColor})</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Pricing & Action */}
      <div className="p-4 sm:p-5 md:w-56 lg:w-64 bg-slate-950/60 md:border-l border-t md:border-t-0 border-slate-800/80 flex flex-col justify-between gap-4 flex-shrink-0">
        <div>
          <span className="text-[11px] text-slate-400 block mb-1">Giá bán trọn gói:</span>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold text-orange-400 tracking-tight">
              {FORMAT_CURRENCY(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500 line-through">
                  {FORMAT_CURRENCY(product.originalPrice)}
                </span>
                <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 px-1.5 py-0.2 rounded border border-rose-800/50">
                  Tiết kiệm {FORMAT_CURRENCY(product.originalPrice - product.price)}
                </span>
              </div>
            )}
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sẵn hàng - Thi công ngay</span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            id={`btn-add-to-cart-list-${product.id}`}
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md ${
              addedAnimation
                ? 'bg-emerald-600 text-white scale-[0.98]'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold shadow-emerald-500/20'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Đã thêm!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Vào Giỏ</span>
              </>
            )}
          </button>

          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2 px-3 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Xem Chi Tiết</span>
          </button>
        </div>
      </div>
    </div>
  );
};
