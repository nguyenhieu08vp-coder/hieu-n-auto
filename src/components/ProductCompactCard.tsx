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

interface ProductCompactCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCompactCard: React.FC<ProductCompactCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.colors[0]?.name);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      id={`product-compact-${product.id}`}
      className="group relative bg-slate-900/90 rounded-xl border border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Square Image */}
      <div 
        className="relative w-full aspect-square bg-slate-950 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 contrast-[1.02]"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-amber-500 text-slate-950 shadow">
              Hot
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-600 text-white shadow">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/90 text-sky-400 hover:text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Xem chi tiết"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1">
            <span className="truncate">{product.categoryName}</span>
            <div className="flex items-center gap-0.5 text-amber-400 text-[10px] font-bold flex-shrink-0">
              <Star className="w-2.5 h-2.5 fill-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h4 
            onClick={() => onQuickView(product)}
            className="text-white font-semibold text-xs leading-snug line-clamp-2 hover:text-emerald-400 transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h4>
        </div>

        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm font-extrabold text-orange-400">
              {FORMAT_CURRENCY(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] text-slate-500 line-through">
                {FORMAT_CURRENCY(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`w-full py-1.5 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3 h-3" />
                <span className="text-[11px]">Đã thêm</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span className="text-[11px]">Chọn Mua</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
