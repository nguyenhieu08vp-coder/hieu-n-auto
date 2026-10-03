export interface StoreCategoryItem {
  id: string;
  name: string;
  shortName: string;
  count: number;
  icon: string;
  productIds: string[];
  color?: string;
  bgColor?: string;
}

export const STORE_CATEGORY_GROUPS: StoreCategoryItem[] = [
  { 
    id: 'all', 
    name: 'Tất Cả Danh Mục', 
    shortName: 'Tất Cả', 
    count: 40, 
    icon: 'LayoutGrid', 
    productIds: [],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30'
  },
  { 
    id: 'dashcam', 
    name: 'Camera Hành Trình', 
    shortName: 'Camera Hành Trình', 
    count: 4, 
    icon: 'Video', 
    productIds: ['prod-1', 'prod-21', 'prod-22', 'prod-28'],
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10 border-sky-500/30'
  },
  { 
    id: 'camera360', 
    name: 'Camera 360 - Hỗ Trợ Đỗ Xe', 
    shortName: 'Camera 360', 
    count: 3, 
    icon: 'Eye', 
    productIds: ['prod-2', 'prod-38', 'prod-39'],
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10 border-indigo-500/30'
  },
  { 
    id: 'lighting', 
    name: 'Cá Nhân Hóa Ánh Sáng', 
    shortName: 'Nâng Cấp Ánh Sáng', 
    count: 4, 
    icon: 'Sun', 
    productIds: ['prod-16', 'prod-23', 'prod-35', 'prod-34'],
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 border-yellow-500/30'
  },
  { 
    id: 'led', 
    name: 'Đèn LED (Nội & Ngoại Thất)', 
    shortName: 'Đèn LED Đa Sắc', 
    count: 4, 
    icon: 'Sparkles', 
    productIds: ['prod-3', 'prod-8', 'prod-24', 'prod-40'],
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/30'
  },
  { 
    id: 'audio', 
    name: 'Cá Nhân Hóa Âm Thanh', 
    shortName: 'Âm Thanh Ô Tô', 
    count: 4, 
    icon: 'Volume2', 
    productIds: ['prod-6', 'prod-37', 'prod-26', 'prod-36'],
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/30'
  },
  { 
    id: 'display', 
    name: 'Màn Hình & Android Box', 
    shortName: 'Màn Hình & Box', 
    count: 5, 
    icon: 'Tv', 
    productIds: ['prod-5', 'prod-10', 'prod-25', 'prod-12', 'prod-30'],
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/30'
  },
  { 
    id: 'mirror', 
    name: 'Gập Gương Tự Động', 
    shortName: 'Gập Gương Tự Động', 
    count: 4, 
    icon: 'Sliders', 
    productIds: ['prod-15', 'prod-31', 'prod-32', 'prod-33'],
    color: 'text-amber-300',
    bgColor: 'bg-amber-500/10 border-amber-500/30'
  },
  { 
    id: 'interior-seat', 
    name: 'Nội Thất & Ghế Xe', 
    shortName: 'Nội Thất & Ghế', 
    count: 5, 
    icon: 'Armchair', 
    productIds: ['prod-7', 'prod-13', 'prod-18', 'prod-14', 'prod-29'],
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10 border-rose-500/30'
  },
  { 
    id: 'safety-utility', 
    name: 'Tiện Ích & An Toàn Xe', 
    shortName: 'Tiện Ích & An Toàn', 
    count: 7, 
    icon: 'ShieldCheck', 
    productIds: ['prod-17', 'prod-20', 'prod-11', 'prod-27', 'prod-4', 'prod-9', 'prod-19'],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30'
  },
];
