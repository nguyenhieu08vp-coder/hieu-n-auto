import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  Star, 
  Check, 
  ShieldCheck, 
  Zap, 
  Sparkles 
} from 'lucide-react';
import { Product } from '../types';
import { FORMAT_CURRENCY } from '../data/mockData';

interface ProductTableViewProps {
  products: Product[];
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductTableView: React.FC<ProductTableViewProps> = ({
  products,
  onAddToCart,
  onQuickView,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.colors[0]?.name);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Sản Phẩm</th>
              <th className="py-3.5 px-4 hidden sm:table-cell">Danh Mục</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Chất Liệu &amp; Dòng Xe</th>
              <th className="py-3.5 px-4 hidden lg:table-cell text-center">Bảo Hành</th>
              <th className="py-3.5 px-4 hidden sm:table-cell text-center">Đánh Giá</th>
              <th className="py-3.5 px-4 text-right">Giá Bán Trọn Gói</th>
              <th className="py-3.5 px-4 text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {products.map((product) => {
              const discountPercent = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;
              const isAdded = addedId === product.id;

              return (
                <tr 
                  key={product.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => onQuickView(product)}
                >
                  {/* Product Info */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                        <img 
                          src={product.primaryImage} 
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                        {product.isBestSeller && (
                          <span className="absolute top-0 left-0 px-1 py-0.2 rounded-br text-[8px] font-extrabold bg-amber-500 text-slate-950">
                            HOT
                          </span>
                        )}
                      </div>
                      <div className="max-w-xs sm:max-w-sm">
                        <h4 className="text-white font-bold text-xs sm:text-sm group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                        <div className="sm:hidden text-[10px] text-emerald-400 mt-0.5">
                          {product.categoryName}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 hidden sm:table-cell">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-slate-800 text-[11px] font-medium">
                      {product.categoryName}
                    </span>
                  </td>

                  {/* Materials & Vehicles */}
                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <div className="space-y-1">
                      <div className="text-slate-300 truncate max-w-[180px]">
                        {product.materials.join(', ')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Xe: {product.vehicleTypes.join(', ').toUpperCase()}
                      </div>
                    </div>
                  </td>

                  {/* Warranty */}
                  <td className="py-3.5 px-4 hidden lg:table-cell text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 text-[11px] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {product.warrantyMonths} Tháng
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="py-3.5 px-4 hidden sm:table-cell text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-amber-400 font-bold">{product.rating.toFixed(1)}</span>
                      <span className="text-slate-500 text-[10px]">({product.reviewCount})</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="font-extrabold text-orange-400 text-sm sm:text-base">
                      {FORMAT_CURRENCY(product.price)}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-[10px] text-slate-500 line-through">
                        {FORMAT_CURRENCY(product.originalPrice)}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onQuickView(product)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => handleAdd(product, e)}
                        className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        }`}
                        title="Thêm vào giỏ hàng"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Đã thêm</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Mua Ngay</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
