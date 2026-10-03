import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  Star, 
  Check, 
  ShieldCheck, 
  Video,
  Sun,
  Sparkles,
  PackageCheck
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

  const cameraProducts = products.filter(p => p.category === 'cameras-360');
  const lightingProductIds = new Set(['prod-16', 'prod-23']);
  const lightingProducts = products.filter(p => lightingProductIds.has(p.id));
  const ledProductIds = new Set(['prod-3', 'prod-8', 'prod-24']);
  const ledProducts = products.filter(p => ledProductIds.has(p.id));
  const otherProducts = products.filter(p => p.category !== 'cameras-360' && !lightingProductIds.has(p.id) && !ledProductIds.has(p.id));
  const showGroupSeparators = [cameraProducts.length > 0, lightingProducts.length > 0, ledProducts.length > 0, otherProducts.length > 0].filter(Boolean).length > 1;

  const renderProductRow = (product: Product) => {
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
                <span className="absolute top-0 left-0 px-1.5 py-0.5 rounded-br text-[8px] font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow">
                  Bán Chạy #1
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
          <div className="space-y-1">
            <span className="inline-flex px-2 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-slate-800 text-[11px] font-medium">
              {product.categoryName}
            </span>
            <div>
              {product.itemType === 'service' ? (
                <span className="inline-flex items-center text-[9px] font-bold text-purple-300 bg-purple-950/70 px-1.5 py-0.5 rounded border border-purple-500/30">
                  Dịch Vụ Độ Xe
                </span>
              ) : (
                <span className="inline-flex items-center text-[9px] font-bold text-sky-300 bg-sky-950/70 px-1.5 py-0.5 rounded border border-sky-500/30">
                  Sản Phẩm Zin
                </span>
              )}
            </div>
          </div>
        </td>

        {/* Materials / Vehicle types */}
        <td className="py-3.5 px-4 hidden md:table-cell text-slate-400">
          <div className="line-clamp-1 text-[11px] text-slate-300">
            {product.materials.join(', ')}
          </div>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500">
            <span>Tương thích:</span>
            <span className="text-slate-400 font-medium">
              {product.vehicleTypes.map((v) => v.toUpperCase()).join(' / ')}
            </span>
          </div>
        </td>

        {/* Warranty & Time */}
        <td className="py-3.5 px-4 hidden lg:table-cell text-center">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
            <ShieldCheck className="w-3 h-3" />
            <span>{product.warrantyMonths} Tháng</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {product.installationTimeHours}h thi công
          </div>
        </td>

        {/* Rating */}
        <td className="py-3.5 px-4 hidden sm:table-cell text-center">
          <div className="inline-flex items-center gap-1 font-bold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
          </div>
          <div className="text-[10px] text-slate-500">
            ({product.reviewCount} đánh giá)
          </div>
        </td>

        {/* Price */}
        <td className="py-3.5 px-4 text-right">
          <div className="font-extrabold text-white text-xs sm:text-sm">
            {FORMAT_CURRENCY(product.price)}
          </div>
          {product.originalPrice && (
            <div className="flex items-center justify-end gap-1.5 mt-0.5 text-[10px]">
              <span className="text-slate-500 line-through">
                {FORMAT_CURRENCY(product.originalPrice)}
              </span>
              <span className="text-rose-400 font-bold bg-rose-950/60 px-1 rounded">
                -{discountPercent}%
              </span>
            </div>
          )}
        </td>

        {/* Actions */}
        <td className="py-3.5 px-4 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <button
              onClick={(e) => handleAdd(product, e)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isAdded
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 scale-105'
                  : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/30'
              }`}
              title="Thêm vào giỏ"
            >
              {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onQuickView(product)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              title="Xem chi tiết"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    );
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
            {showGroupSeparators ? (
              <>
                {/* 📹 Nhóm Camera Header Row */}
                {cameraProducts.length > 0 && (
                  <>
                    <tr className="bg-sky-950/70 border-y border-sky-500/30">
                      <td colSpan={7} className="py-2.5 px-4 text-sky-300 font-extrabold text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-sky-400" />
                            <span>Nhóm Sản Phẩm Camera &amp; Ghi Hình Chuyên Nghiệp</span>
                          </div>
                          <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                            {cameraProducts.length} Sản phẩm
                          </span>
                        </div>
                      </td>
                    </tr>
                    {cameraProducts.map(renderProductRow)}
                  </>
                )}

                {/* 🔆 Mục Ánh Sáng Header Row (Bên Dưới Camera & Tách Riêng Đèn LED) */}
                {lightingProducts.length > 0 && (
                  <>
                    <tr className="bg-yellow-950/70 border-y border-yellow-500/30">
                      <td colSpan={7} className="py-2.5 px-4 text-yellow-300 font-extrabold text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4 text-yellow-400" />
                            <span>Mục Nâng Cấp Ánh Sáng &amp; Đèn Tăng Sáng</span>
                          </div>
                          <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-400/30">
                            {lightingProducts.length} Sản phẩm
                          </span>
                        </div>
                      </td>
                    </tr>
                    {lightingProducts.map(renderProductRow)}
                  </>
                )}

                {/* 💡 Nhóm Đèn LED Header Row (Tách Riêng với Mục Ánh Sáng) */}
                {ledProducts.length > 0 && (
                  <>
                    <tr className="bg-amber-950/70 border-y border-amber-500/30">
                      <td colSpan={7} className="py-2.5 px-4 text-amber-300 font-extrabold text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>Nhóm Đèn LED &amp; Hiệu Ứng Ánh Sáng</span>
                          </div>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                            {ledProducts.length} Sản phẩm
                          </span>
                        </div>
                      </td>
                    </tr>
                    {ledProducts.map(renderProductRow)}
                  </>
                )}

                {/* 🚗 Các Sản Phẩm & Dịch Vụ Khác Header Row */}
                {otherProducts.length > 0 && (
                  <>
                    <tr className="bg-slate-950/90 border-y border-slate-800">
                      <td colSpan={7} className="py-2.5 px-4 text-slate-300 font-extrabold text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PackageCheck className="w-4 h-4 text-emerald-400" />
                            <span>Các Nhóm Sản Phẩm &amp; Dịch Vụ Độ Xe Khác</span>
                          </div>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                            {otherProducts.length} Mục
                          </span>
                        </div>
                      </td>
                    </tr>
                    {otherProducts.map(renderProductRow)}
                  </>
                )}
              </>
            ) : (
              products.map(renderProductRow)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
