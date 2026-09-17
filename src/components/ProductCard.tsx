import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  Star, 
  Check, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { Product } from '../types';
import { FORMAT_CURRENCY } from '../data/mockData';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
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
      id={`product-card-${product.id}`}
      className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/30 transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container with Image Hover Swap */}
      <div 
        className="relative w-full aspect-square bg-slate-950 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Primary and Secondary Images for hover effect */}
        <img
          src={product.primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 contrast-[1.02] ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ imageRendering: '-webkit-optimize-contrast' }}
          loading="lazy"
        />
        <img
          src={product.secondaryImage || product.primaryImage}
          alt={`${product.name} góc phụ`}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 contrast-[1.02] ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ imageRendering: '-webkit-optimize-contrast' }}
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" />
              Bán Chạy #1
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-600/90 text-white backdrop-blur-sm shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Button on Image */}
        <button
          id={`btn-quickview-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className={`absolute bottom-3 right-3 p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white backdrop-blur-md border border-slate-700 shadow-lg transition-all duration-300 cursor-pointer ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 sm:opacity-0'
          }`}
          title="Xem chi tiết sản phẩm"
        >
          <Eye className="w-4 h-4 text-sky-400" />
        </button>

        {/* Warranty Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>BH {product.warrantyMonths}T</span>
        </div>
      </div>

      {/* Product Content Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-2 text-xs">
            <span className="text-emerald-400 font-semibold truncate">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-amber-400 font-extrabold text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-medium text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 hover:text-emerald-400 transition-colors cursor-pointer mb-2.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Color preview swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[11px] text-slate-400">Màu:</span>
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
              <span className="text-[10px] text-slate-400 truncate ml-1">{selectedColor}</span>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Section */}
        <div className="pt-3 border-t border-slate-800/80">
          {/* Price display with strikethrough */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg sm:text-xl font-extrabold text-orange-400 tracking-tight">
              {FORMAT_CURRENCY(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                {FORMAT_CURRENCY(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Action button "Thêm vào giỏ hàng" */}
          <button
            id={`btn-add-to-cart-${product.id}`}
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md ${
              addedAnimation
                ? 'bg-emerald-600 text-white scale-[0.98]'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold shadow-emerald-500/20 hover:shadow-emerald-500/30'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span className="text-white">Đã thêm vào giỏ!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Vào Giỏ Hàng</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
