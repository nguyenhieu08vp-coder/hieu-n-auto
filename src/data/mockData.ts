import { Product, TeamMember, BlogPost, Testimonial } from '../types';
import sonAvatar from '../assets/images/regenerated_image_1788094605957.jpg';
import hieuAvatar from '../assets/images/regenerated_image_1788094725524.jpg';
import ducAvatar from '../assets/images/regenerated_image_1788098891785.jpg';
import duongLeoAvatar from '../assets/images/regenerated_image_1788099036648.jpg';
import thuHueAvatar from '../assets/images/regenerated_image_1788099350854.jpg';
import hungAvatar from '../assets/images/regenerated_image_1788099573645.jpg';

export const CATEGORIES = [
  { id: 'all', name: 'Tất Cả Danh Mục', count: 24, icon: 'LayoutGrid' },
  { id: 'dashcams-tpms', name: 'Camera Hành Trình (VIETMAP, 70mai) & Cảm Biến Lốp', count: 6, icon: 'ShieldCheck' },
  { id: 'screens-cams', name: 'Camera 360, Màn Hình & HUD', count: 4, icon: 'Tv' },
  { id: 'ambient-lights', name: 'Đèn LED Nội Thất, Bi Gầm & Bi LED Aozoom', count: 4, icon: 'Sparkles' },
  { id: 'seat-covers', name: 'Bọc Ghế Da Nappa & Độ Ghế Điện', count: 2, icon: 'Armchair' },
  { id: 'floor-mats', name: 'Thảm Lót Sàn TPE & Thảm 360', count: 1, icon: 'Layers' },
  { id: 'car-audio', name: 'Nâng Cấp Loa Sub & Âm Thanh', count: 1, icon: 'Volume2' },
  { id: 'steering-accessories', name: 'Cốp Điện, Bệ Tỳ Tay & Gập Gương', count: 4, icon: 'Sliders' },
  { id: 'wheels-exterior', name: 'Phay Lazang & Bảo Vệ Pin Xe Điện', count: 2, icon: 'Disc' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Camera Hành Trình 70mai T400 Ghi Hình 3 Kênh Cao Cấp',
    category: 'dashcams-tpms',
    categoryName: 'Camera Hành Trình 70mai',
    price: 3850000,
    originalPrice: 4500000,
    isBestSeller: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 186,
    primaryImage: '/images/camera_70mai_t400.jpg',
    secondaryImage: '/images/camera_70mai_t400_poster.jpg',
    description: 'Camera hành trình 70mai T400 thế hệ mới ghi hình 3 kênh đồng thời (Trước - Trong khoang lái - Sau xe). Tích hợp mắt hồng ngoại IR quay đêm rõ nét, công nghệ siêu tụ điện an toàn tuyệt đối và điều khiển giọng nói tiện lợi.',
    features: [
      'Ghi hình 3 kênh đồng thời: Camera trước, camera cabin và camera sau',
      'Công nghệ cân bằng sáng HDR sắc nét bất kể ngày đêm',
      'Đèn hồng ngoại IR Lights soi sáng toàn diện trong khoang xe ban đêm',
      'Giám sát đỗ xe thông minh 24/7 phát hiện va chạm tự động',
      'Tích hợp GPS hiển thị tốc độ, tọa độ hành trình chính xác',
      'Trang bị Siêu Tụ Điện (Super Capacitor) chịu nhiệt độ cao, bền bỉ',
      'Kết nối Wifi & App 70mai trích xuất video trực tiếp siêu tốc',
      'Hỗ trợ ra lệnh và điều khiển bằng giọng nói rảnh tay'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Nhựa ABS Chịu Nhiệt', 'Kính Quang Học 6 Lớp'],
    colors: [
      { name: 'Đen Mờ Nhám (Matte Black)', hex: '#1E293B' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 1
  },
  {
    id: 'prod-2',
    name: 'Camera 360 MHU Android VinFast Lux A & Lux SA Sắc Nét Gấp 4 Lần',
    category: 'screens-cams',
    categoryName: 'Camera 360 & MHU',
    price: 14500000,
    originalPrice: 16800000,
    isBestSeller: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 162,
    primaryImage: '/images/camera_360_mhu_lux.webp',
    secondaryImage: '/images/lux_cam360_1.webp',
    description: 'Hệ thống nâng cấp Camera 360 tích hợp trên MHU Android chuyên dụng cho xe VinFast Lux A 2.0 và Lux SA 2.0. Độ phân giải siêu nét gấp 4 lần so với camera 360 zin nguyên bản, mô hình 3D xoay đa chiều trực quan, cắm giắc Zin 100%.',
    features: [
      'Độ nét sắc sảo vượt trội gấp 4 lần camera 360 Zin nguyên bản',
      'Tích hợp trực tiếp lên màn hình trung tâm zin của xe VinFast Lux',
      'Hệ thống 4 mắt cam Sony AHD cao cấp góc rộng, quay đêm rõ nét',
      'Mô hình 3D toàn cảnh, hỗ trợ vạch đánh lái ảo theo góc quay vô lăng',
      'Lắp đặt cắm giắc Zin 100% không cắt trích dây, an toàn điện tuyệt đối',
      'Tích hợp cảnh báo va chạm và tự động hiển thị camera khi xi nhan'
    ],
    vehicleTypes: ['sedan', 'suv', 'luxury'],
    materials: ['Mắt Cam Kính Quang Học Sony', 'Jack Cắm Zin Theo Xe VinFast'],
    colors: [
      { name: 'Đen Sang Trọng OEM', hex: '#1E293B' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 3
  },
  {
    id: 'prod-3',
    name: 'Bộ Đèn LED Nội Thất Raipow Toyota Cross 24 Chi Tiết 64 Màu Đổi Theo Nhạc',
    category: 'ambient-lights',
    categoryName: 'LED nội thất',
    price: 3500000,
    originalPrice: 4800000,
    isBestSeller: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 178,
    primaryImage: '/images/led_raipow_toyota_cross.jpg',
    secondaryImage: '/images/led_ambient_interior.jpg',
    description: 'Bộ LED nội thất Raipow cao cấp dành riêng cho Toyota Cross và các dòng xe với trọn bộ 24 chi tiết đồng bộ: thanh đèn điều khiển trung tâm, hộp điều khiển, khuôn cửa trước, đèn hộp đựng đồ, đèn gác chân, thanh đèn viền 4 cửa, LED vành loa, đèn xử lý và dây nguồn jack Zin 100%. Đổi 64 màu mượt mà, chuyển động theo nhịp điệu âm nhạc.',
    features: [
      'Trọn bộ 24 chi tiết cao cấp: Thanh đèn trung tâm, khuôn cửa, đèn gác chân, đèn hộp đồ, LED vành loa',
      'Dải LED đa sắc RGB 64 triệu màu với hiệu ứng đổi màu đa vùng và chuyển động theo âm nhạc',
      'Hộp điều khiển Raipow thông minh, kết nối Bluetooth tùy chỉnh tiện lợi qua App điện thoại',
      'Lắp đặt khuôn cắm giắc Zin 100%, không cắt trích dây điện, an toàn tuyệt đối',
      'Độ sáng đều, không chói mắt, tạo không gian sang trọng đẳng cấp như xe sang'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Thanh LED Quang Học Raipow', 'Dây Nguồn Jack Cắm Zin Chống Cháy'],
    colors: [
      { name: 'RGB 64 Màu Matrix', hex: '#6366F1' },
      { name: 'Tím Neon Cyberpunk', hex: '#A855F7' },
      { name: 'Xanh Băng Ice Blue', hex: '#38BDF8' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 2
  },
  {
    id: 'prod-4',
    name: 'Phim Cách Nhiệt Cao Cấp 3M Crystalline 200 Lớp Chính Hãng',
    category: 'steering-accessories',
    categoryName: 'Phim cách nhiệt 3M',
    price: 14500000,
    originalPrice: 16800000,
    isBestSeller: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 215,
    primaryImage: '/images/film_3m_crystalline_poster.jpg',
    secondaryImage: '/images/film_3m_crystalline_optical.jpg',
    description: 'Phim cách nhiệt 3M Crystalline công nghệ quang học 200 lớp độc quyền từ 3M Mỹ. Khả năng loại bỏ đến 99% tia hồng ngoại và cản 99.9% tia cực tím UV (SPF 1000+), giảm lóa tới 80% mà không cản trở tầm nhìn hoặc gây nhiễu sóng điện thoại, GPS, thẻ từ thu phí tự động.',
    features: [
      'Công nghệ quang học đa lớp 200 lớp nano siêu mỏng độc quyền của 3M',
      'Chỉ số chống nắng SPF 1000+, ngăn chặn 99.9% tia cực tím UV gây hại da & nội thất',
      'Loại bỏ 99% tia hồng ngoại (IR), cách nhiệt và làm mát khoang xe vượt trội',
      'Giảm độ chói lóa lên tới 80%, tăng cường an toàn khi di chuyển ngược sáng',
      '100% không chứa kim loại, không gây nhiễu sóng điện thoại, 4G/5G, GPS và thẻ ETC/VETC',
      'Bảo hành điện tử chính hãng 3M lên đến 10 năm'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Màng Quang Học 200 Lớp 3M Crystalline', 'Keo Acrylic Chống Thoái Hóa'],
    colors: [
      { name: 'Kính Lái CR60 / CR70', hex: '#64748B' },
      { name: 'Kính Sườn Hậu CR20 / CR40', hex: '#0F172A' }
    ],
    warrantyMonths: 120,
    inStock: true,
    installationTimeHours: 3
  },
  {
    id: 'prod-5',
    name: 'Màn Hình Đôi 20.8 Inch Liền Khối Chạy Song Song Hai Hệ Điều Hành (Màn ODO & Màn Android)',
    category: 'screens-cams',
    categoryName: 'Màn Hình Android & Cam 360',
    price: 18500000,
    originalPrice: 21500000,
    rating: 4.8,
    reviewCount: 94,
    primaryImage: '/images/screen_dual_20inch_size.jpg',
    secondaryImage: '/images/screen_dual_20inch_os.jpg',
    description: 'Hệ thống màn hình đôi 20.8 inch liền khối cao cấp chạy song song 2 hệ điều hành độc lập: Giữ nguyên vẹn hệ điều hành Zin của xe (đồng hồ ODO, thông số pin, cài đặt xe) song song với hệ điều hành Android giải trí đỉnh cao (Youtube, dẫn đường Vietmap Live, tích hợp Camera 360, camera lùi, DVR, TPMS...).',
    features: [
      'Màn hình đôi kích thước cực đại 20.8 inch liền mạch sang trọng đẳng cấp',
      'Chạy song song 2 hệ điều hành độc lập: Giữ nguyên HĐH Zin & HĐH Android',
      'Giữ nguyên 100% cài đặt thông tin xe, ODO, cảnh báo an toàn và nâng cấp phần mềm thuận tiện',
      'Mở rộng thế giới giải trí Android đa nhiệm siêu mượt mà',
      'Tích hợp hoàn hảo các tính năng an toàn: Camera 360, Camera lùi, Cảm biến áp suất lốp TPMS, DVR',
      'Độ phân giải 2K sắc nét, tấm nền IPS chống chói góc nhìn siêu rộng',
      'Lắp đặt cắm giắc Zin 100% không cắt trích dây, an toàn điện tuyệt đối'
    ],
    vehicleTypes: ['sedan', 'suv', 'luxury'],
    materials: ['Kính Cường Lực 2.5D Chống Chói', 'Khung Hợp Kim Tản Nhiệt Nhôm'],
    colors: [
      { name: 'Đen Mờ Liền Khối', hex: '#0F172A' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 3
  },
  {
    id: 'prod-6',
    name: 'Gói Nâng Cấp Loa Sub Điện Gầm Ghế Rebec U10 & Loa Taplo Rebec SA70 Cho VinFast VF3',
    category: 'car-audio',
    categoryName: 'Nâng Cấp Âm Thanh Xe Hơi',
    price: 8500000,
    originalPrice: 9800000,
    rating: 4.9,
    reviewCount: 58,
    primaryImage: '/images/rebec_sub_vf3_kit.jpg',
    secondaryImage: '/images/rebec_sub_closeup.jpg',
    description: 'Bộ kit nâng cấp âm thanh cao cấp Rebec chuyên dụng cắm giắc Zin 100% cho VinFast VF3. Bao gồm Loa Sub điện gầm ghế Rebec U10 uy lực, cặp loa toàn dải đặt Taplo Rebec SA70 tái tạo dải trung cao ngọt ngào, cùng bộ pát và ốc đôn ghế CNC chuẩn xác.',
    features: [
      'Loa Sub điện gầm ghế Rebec U10 tái tạo dải âm trầm siêu sâu, chắc gọn',
      'Cặp loa toàn dải Rebec SA70 đặt Taplo tái hiện âm trường và giọng hát chi tiết',
      'Bộ Kit cắm giắc Zin 100% theo xe VinFast VF3, không cắt trích dây điện',
      'Tặng kèm bộ ốc đôn ghế chuyên dụng vừa vặn chuẩn xác dưới gầm ghế VF3',
      'Trang bị cầu chì ngắt nguồn an toàn độc lập và dây bọc lưới chống cháy',
      'Bảo hành chính hãng Rebec 24 tháng đổi mới'
    ],
    vehicleTypes: ['suv', 'sedan', 'mpv'],
    materials: ['Khung Nhôm Đúc Liền Khối Rebec', 'Màng Loa Cao Cấp Sợi Thủy Tinh'],
    colors: [
      { name: 'Đen Mờ Nhôm Phay Rebec', hex: '#18181B' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 2
  },
  {
    id: 'prod-7',
    name: 'Bệ Tỳ Tay Trung Tâm May Da Cao Cấp Thiết Kế Riêng Cho VinFast VF3 (LED Cốc, Sạc Nhanh & Hộc Chứa Đồ Xuyên)',
    category: 'steering-accessories',
    categoryName: 'Phụ Kiện Tiện Ích & Bệ Tỳ Tay',
    price: 3200000,
    originalPrice: 3900000,
    isSale: true,
    rating: 4.7,
    reviewCount: 78,
    primaryImage: '/images/armrest_vf3_interior_led.jpg',
    secondaryImage: '/images/armrest_vf3_custom_box.jpg',
    description: 'Bệ tỳ tay trung tâm thiết kế may đo độc quyền 100% chuẩn form xe điện VinFast VF3. Tích hợp đèn LED viền khay để cốc phát sáng ice-blue sang trọng, cổng sạc nhanh Type-C/USB, khe để chìa khóa thông minh, nắp tỳ tay bọc da mở cánh đôi sang trọng và khoang chứa đồ rỗng thông xuyên tầng tiện lợi.',
    features: [
      'Thiết kế may đo chuẩn xác form dáng sàn và ghế xe VinFast VF3',
      'Đèn LED viền khay cốc và khe sạc phát sáng xanh Ice-Blue thời thượng',
      'Nắp tỳ tay đệm mút cao cấp bọc da êm ái, cơ chế mở đôi bằng nút bấm tròn tiện lợi',
      'Khoang rỗng thông xuyên tầng phía dưới tối ưu không gian để túi xách, vật dụng',
      'Tích hợp cụm cổng sạc nhanh USB + Type-C an toàn và tiện lợi',
      'Lắp đặt cắm giắc Zin hoàn toàn không khoan đục hay ảnh hưởng kết cấu xe'
    ],
    vehicleTypes: ['suv', 'sedan', 'mpv'],
    materials: ['Khung Gỗ MDF Bọc Da Nappa Cao Cấp', 'Khay Để Cốc Mạ Chrome LED Ice-Blue'],
    colors: [
      { name: 'Hồng Pastel Nữ Tính', hex: '#F472B6' },
      { name: 'Đen May Chỉ Đỏ Thể Thao', hex: '#18181B' },
      { name: 'Cam Hermes Nổi Bật', hex: '#EA580C' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 1
  },
  {
    id: 'prod-8',
    name: 'Cụm Đèn LED Cánh Chim Định Vị & LED Cốp VinFast (LED Ma Trận Hiệu Ứng RGB / Chạy Khởi Động Quét LED)',
    category: 'ambient-lights',
    categoryName: 'Đèn LED & Nâng Cấp Ánh Sáng',
    price: 4500000,
    originalPrice: 5500000,
    isSale: true,
    rating: 4.8,
    reviewCount: 42,
    primaryImage: '/images/led_canhchim_vinfast_kit.jpg',
    secondaryImage: '/images/led_canhchim_vinfast_on.jpg',
    description: 'Cụm đèn LED cánh chim định vị mặt ca-lăng và LED cốp sau chuyên dụng chuẩn form xe VinFast. Tích hợp hiệu ứng quét LED chào mừng khi khởi động xe, dải chuyển màu mượt mà Cyan Ice-Blue sang tím hồng neon cùng chức năng xi nhan chạy đuổi Audi đẳng cấp.',
    features: [
      'Thiết kế chuẩn form dáng chữ V cánh chim đặc trưng thương hiệu VinFast',
      'Hiệu ứng LED ma trận quét chạy chào mừng thể thao khi mở khóa xe',
      'Dải chuyển sắc ánh sáng mượt mà Ice-Blue chuyển tím hồng thời thượng',
      'Tích hợp hiệu ứng xi-nhan chạy đuổi và đèn phanh cảnh báo an toàn',
      'Chất liệu mica quang học kết hợp khung viền mạ Chrome bóng bẩy',
      'Lắp đặt cắm giắc Zin 100%, chống nước chuẩn IP67 an toàn trong mọi điều kiện thời tiết'
    ],
    vehicleTypes: ['suv', 'sedan', 'luxury'],
    materials: ['Mica Quang Học Chống Ố Vàng', 'Khung Viền Mạ Chrome Chống Ăn Mòn'],
    colors: [
      { name: 'LED Đổi Màu Gradient Ice-Blue / Tím', hex: '#06B6D4' },
      { name: 'LED Đỏ Thể Thao Kèm Khởi Động', hex: '#EF4444' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 2
  },
  {
    id: 'prod-9',
    name: 'SICHER - Tấm Chắn Cáp & Tấm Bảo Vệ Pin VinFast VF6 (Bộ Giáp Gầm Bảo Vệ Pin Xe Điện Cao Cấp)',
    category: 'steering-accessories',
    categoryName: 'Giáp Gầm & Bảo Vệ Pin Xe Điện',
    price: 2500000,
    originalPrice: 3200000,
    isSale: true,
    rating: 4.7,
    reviewCount: 58,
    primaryImage: '/images/vf6_battery_shield_poster.jpg',
    secondaryImage: '/images/vf6_battery_shield_plate.jpg',
    description: 'Sản phẩm chính hãng SICHER: Combo Tấm Chắn Cáp & Tấm Bảo Vệ Pin chuyên dụng cho xe điện VinFast VF6. Được gia công dập gân định hình với hàng lỗ tản nhiệt khí động học, bảo vệ toàn diện khối pin và hệ thống dây cáp điện cao áp khỏi đá văng, cạ gầm, dị vật trên mặt đường.',
    features: [
      'Thương hiệu SICHER chính hãng chuyên biệt bảo vệ hệ thống pin xe điện VinFast',
      'Bao gồm trọn bộ: Tấm chắn cáp cao áp và Tấm giáp bảo vệ pin gầm VF6',
      'Gia công từ hợp kim thép chịu lực dập gân tăng cứng, chống va đập và chống móp méo',
      'Hàng lỗ thoáng khí tản nhiệt thông minh giúp lưu thông gió làm mát cụm pin liên tục',
      'Lắp đặt chuẩn xác 100% theo các điểm bắt ốc chờ sẵn của khung gầm xe, không độ chế',
      'Sơn tĩnh điện chống rỉ sét, chịu nước, bùn đất và kháng oxy hóa bền bỉ theo thời gian'
    ],
    vehicleTypes: ['suv'],
    materials: ['Hợp Kim Thép Cường Lực Dập Gân SICHER', 'Sơn Phủ Tĩnh Điện Chống Ăn Mòn'],
    colors: [
      { name: 'Xám Titan Kim Loại', hex: '#64748B' },
      { name: 'Đen Nhám Chống Xước', hex: '#1E293B' }
    ],
    warrantyMonths: 36,
    inStock: true,
    installationTimeHours: 1
  },
  {
    id: 'prod-10',
    name: 'MCD91 - Màn Hình Hiển Thị Kính Lái HUD Dành Riêng Cho Xe Điện VinFast (Đa Dạng 8 Chế Độ Chuyển Đổi Linh Hoạt)',
    category: 'screens-cams',
    categoryName: 'Màn Hình Android & HUD Kính Lái',
    price: 1850000,
    originalPrice: 2450000,
    isSale: true,
    rating: 4.8,
    reviewCount: 86,
    primaryImage: '/images/hud_mcd91_vinfast_poster.jpg',
    secondaryImage: '/images/hud_mcd91_modes_grid.jpg',
    description: 'Màn hình hiển thị trên kính lái HUD MCD91 thiết kế chuyên biệt dành riêng cho các dòng ô tô điện VinFast (VF3, VF5, VF6, VF7, VF8, VF9, VF e34). Hiển thị trực tiếp thông số lái xe sắc nét lên kính lái với 8 chế độ hiển thị linh hoạt: Tốc độ xe, Phần trăm Pin %, Xi-nhan rẽ, Thời gian thực, Chế độ lái (ECO/Normal/Sport), Quãng đường di chuyển Range, Vị trí Hộp số và Cảnh báo an toàn thông minh.',
    features: [
      'Thương hiệu MCD91 HUD cao cấp chuyên dụng cho xe điện VinFast',
      'Đa dạng 8 chế độ hiển thị kỹ thuật số chuyển đổi linh hoạt theo nhu cầu người lái',
      'Chiếu thông tin sắc nét lên kính lái: Tốc độ (km/h), Dung lượng Pin (%), Quãng đường còn lại (Range km)',
      'Đồng bộ tín hiệu tức thì: Xi-nhan trái/phải, Đèn phanh, Báo thắt dây an toàn, Cảnh báo cửa mở, Cảnh báo áp suất lốp',
      'Tự động điều chỉnh độ sáng thông minh theo môi trường (Ban ngày rõ nét không chói, ban đêm dịu mắt)',
      'Lắp đặt cắm giắc cổng OBD2 / CAN-Bus Zin 100% không cắt trích dây, an toàn điện tuyệt đối'
    ],
    vehicleTypes: ['suv', 'sedan', 'mpv'],
    materials: ['Thấu Kính Quang Học Phản Xạ Cao Cấp', 'Khung Hợp Kim ABS Tản Nhiệt Nhanh'],
    colors: [
      { name: 'Đen Mờ Thể Thao', hex: '#0F172A' },
      { name: 'Xám Titan Kim Loại', hex: '#475569' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 1
  },
  {
    id: 'prod-11',
    name: 'ICAR ELLIGATE - Cốp Điện Tự Động Thông Minh Dành Riêng Cho VinFast VF3 (Ti Cốp Chắc Chắn, Đóng Mở Nhẹ Nhàng & Chống Kẹt)',
    category: 'steering-accessories',
    categoryName: 'Cốp Điện Tự Động & Phụ Kiện Tiện Ích',
    price: 8500000,
    originalPrice: 9900000,
    isSale: true,
    rating: 4.8,
    reviewCount: 64,
    primaryImage: '/images/cop_dien_icar_vf3_poster.jpg',
    secondaryImage: '/images/cop_dien_icar_vf3_tech.jpg',
    description: 'Cốp điện tự động thông minh ICAR ELLIGATE thiết kế chuẩn form riêng cho xe điện VinFast VF3. Hệ thống ti cốp điện đôi trợ lực mạnh mẽ, vận hành êm ái nhẹ nhàng với 4 công nghệ tối ưu: Ổ trục đôi ổn định, giảm xóc sợi carbon, thoát nước không đọng nước và chống thấm chống nước tuyệt đối.',
    features: [
      'Thương hiệu ICAR chính hãng - Công nghệ thông minh cho xe bạn',
      'Ti cốp đôi chắc chắn, đóng mở êm ái mượt mà không gây giật cục',
      'Cấu trúc duy trì ổn định ổ trục đôi tăng cường tuổi thọ ti nâng',
      'Thiết kế giảm xóc bằng sợi carbon triệt tiêu rung động và tiếng ồn',
      'Công nghệ thoát nước tiên tiến \'Không đọng nước\' và chống thấm \'Không xâm nhập\'',
      'Tích hợp cảm biến chống kẹt an toàn thông minh khi gặp vật cản',
      'Nhiều phương thức đóng mở: Nút bấm trên cốp, nút bấm vị trí lái, chìa khóa Smartkey và đá cốp (tùy chọn)',
      'Lắp đặt cắm giắc Zin 100% chuẩn theo hệ thống điện xe VinFast VF3'
    ],
    vehicleTypes: ['suv'],
    materials: ['Thép Hợp Kim Cường Lực', 'Lõi Giảm Xóc Sợi Carbon', 'Mô Tơ Điện Êm Ái'],
    colors: [
      { name: 'Đen Nhám Thể Thao', hex: '#0F172A' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 2
  },
  {
    id: 'prod-12',
    name: 'ANDROID BOX ZESTECH DX165 THẾ HỆ 2 - Thiết Bị Chuyển Đổi Màn Hình Zin Sang Android (Chip 8 Nhân, RAM 4GB/ROM 64GB, Cắm Cổng USB Zin)',
    category: 'screens-cams',
    categoryName: 'Android Box & Màn Hình Android',
    price: 3500000,
    originalPrice: 4500000,
    isSale: true,
    rating: 4.7,
    reviewCount: 96,
    primaryImage: '/images/zestech_dx165_android_box_poster.jpg',
    secondaryImage: '/images/vitech_android_box_usb.jpg',
    description: 'Android Box Zestech DX165 Thế Hệ 2 & Vitech Box giải pháp biến màn hình zin nguyên bản theo xe thành màn hình thông minh Android chỉ sau 1 thao tác cắm giắc cổng USB/Type-C. Trang bị chip 8 nhân thế hệ mới, RAM 4GB, ROM 64GB cùng hệ điều hành Android mượt mà đỉnh cao.',
    features: [
      'Thương hiệu Zestech & Vitech chính hãng - Dòng Android Box DX165 Thế Hệ 2',
      'Cấu hình vượt trội: CPU 8 Core mạnh mẽ, RAM 4GB, ROM 64GB, hệ điều hành Android thông minh',
      'Ra lệnh giọng nói thông minh bằng tiếng Việt với trợ lý ảo Kiki tích hợp nút bấm trên vô lăng',
      'Chia đôi màn hình đa nhiệm tỷ lệ 5:5 đến 7:3 mượt mà không giật lag',
      'Cài đặt sẵn 3 ứng dụng bản đồ dẫn đường chuẩn xác: Google Maps, Vietmap Live bản quyền, Navitel',
      'Cảnh báo giới hạn tốc độ, camera phạt nguội và tình trạng giao thông theo thời gian thực',
      'Tặng kèm trọn bộ: Bản quyền Vietmap Live, Sim 4G Viettel tốc độ cao và Youtube Van Premium không quảng cáo',
      'Lắp đặt cắm cổng USB/Type-C cực kỳ nhanh chóng, giữ nguyên bản 100% màn hình Zin của xe'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Vỏ Nhôm Hợp Kim Tản Nhiệt Nhanh', 'Chip Xử Lý Qualcomm Snapdragon'],
    colors: [
      { name: 'Đen Bóng Piano', hex: '#0A0A0A' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 0.2
  },
  {
    id: 'prod-13',
    name: 'Áo Ghế Da Nappa 9D Cao Cấp (Siêu Mềm Mịn - Thoáng Khí - Sang Trọng)',
    category: 'leather-seats',
    categoryName: 'Bọc Ghế Da Cao Cấp',
    price: 7000000,
    originalPrice: 8500000,
    isSale: true,
    rating: 4.9,
    reviewCount: 142,
    primaryImage: '/images/nappa_seat_poster.webp',
    secondaryImage: '/images/nappa_seat_interior.jpg',
    description: 'Dịch vụ bọc ghế da Nappa Ý nhập khẩu chính ngạch 100% may đo chuẩn phom dáng từng dòng xe. Bề mặt da dập lỗ thông hơi CNC thoáng khí kết hợp quạt làm mát đệm mút cao cấp, đường chỉ đôi dập đều tinh xảo mang lại trải nghiệm ngồi êm ái, chống nóng bí lưng trong thời tiết oi bức.',
    features: [
      'Chất liệu da Nappa bò Ý tự nhiên 100% mềm mịn, thoáng khí và siêu bền bỉ',
      'Kỹ thuật dập lỗ thông khí CNC chuẩn xác, tản nhiệt và chống tích tụ mồ hôi',
      'Đường may chỉ đôi kép thủ công tăm tắp, phom ghế ôm sát cơ thể theo chuẩn công thái học',
      'Tùy chọn tích hợp hệ thống quạt gió làm mát lưng và đệm túi khí massage',
      'Không mùi hóa chất độc hại, thân thiện với sức khỏe và an toàn cho trẻ nhỏ',
      'Bảo hành độ bền da và đường may lên tới 5 năm'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Da Bò Nappa Ý Tự Nhiên', 'Đệm Mút Kháng Khuẩn Cao Cấp'],
    colors: [
      { name: 'Nâu Hermes Sang Trọng', hex: '#8B4513' },
      { name: 'Đen Maybach Chỉ Đỏ', hex: '#18181B' },
      { name: 'Kem Sữa Sandstone', hex: '#F5F5DC' },
      { name: 'Cam Đỏ Thể Thao Porsche', hex: '#EA580C' }
    ],
    warrantyMonths: 60,
    inStock: true,
    installationTimeHours: 6
  },
  {
    id: 'prod-14',
    name: 'Thảm Lót Sàn Ô Tô TPE Đúc Khuôn 3D Nguyên Khối HUVI & CARSEN Chuẩn Form Dòng Xe (VinFast, MG, Toyota...)',
    category: 'floor-mats',
    categoryName: 'Thảm Lót Sàn 360 / 6D',
    price: 1500000,
    originalPrice: 1900000,
    isSale: true,
    rating: 4.8,
    reviewCount: 168,
    primaryImage: '/images/huvi_tpe_mat_mgzs.jpg',
    secondaryImage: '/images/carsen_tpe_mat_vf7.jpg',
    description: 'Thảm lót sàn ô tô nhựa TPE nguyên sinh đúc khuôn 3D công nghệ quét Laser scan sàn xe chính xác từng milimet cho VinFast VF7, MG ZS, Mazda, Toyota... Nhựa TPE cao cấp không mùi độc hại, vách chống tràn nước cao 8-10cm và tùy chọn lót rối cước kháng khuẩn cao cấp.',
    features: [
      'Nhựa TPE nguyên sinh 100% không mùi, chịu nhiệt độ cao không biến dạng hay sinh mùi khó chịu',
      'Đúc khuôn 3D theo công nghệ Laser Scan ôm khít sàn từng dòng xe: VinFast VF7, MG ZS, Cross, CX5...',
      'Vách thảm đúc cao nguyên khối ngăn nước, cafe và bùn đất tràn xuống nỉ sàn zin 100%',
      'Tùy chọn kết hợp thảm rối cước nỉ chống trơn trượt gài khóa bấm tháo lắp nhanh',
      'Vệ sinh xịt rửa siêu tiện lợi bằng vòi nước chỉ mất 2 phút',
      'Bảo hành chính hãng 5 năm không gãy nứt cong vênh'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Nhựa TPE Nguyên Sinh Đúc Khuôn', 'Thảm Rối Cước Kháng Khuẩn'],
    colors: [
      { name: 'Đen Mờ TPE Nguyên Bản', hex: '#18181B' },
      { name: 'Đen Lót Rối Xám Carsen', hex: '#475569' }
    ],
    warrantyMonths: 60,
    inStock: true,
    installationTimeHours: 0.5
  },
  {
    id: 'prod-15',
    name: 'Gương Gập Điện Lắp Zin Tự Động Theo Xe MCD91 & HUVI Limo Green (VinFast VF3, VF5, VF6, Limo...)',
    category: 'steering-accessories',
    categoryName: 'Phụ Kiện Tiện Ích & Gương Điện',
    price: 2400000,
    originalPrice: 3200000,
    isSale: true,
    rating: 4.7,
    reviewCount: 188,
    primaryImage: '/images/mcd91_guong_gap_dien_poster.jpg',
    secondaryImage: '/images/huvi_guong_gap_dien_limo.jpg',
    description: 'Bộ nâng cấp gương gập điện tự động MCD91 & HUVI Auto Accessories cắm giắc Zin 100% không cắt trích dây điện cho các dòng xe VinFast VF3, VF5, VF6, Limo... Tự động cụp gương khi bấm khóa cửa xe và xòe gương khi mở khóa, tích hợp phím bấm công tắc gập gương cơ động trong xe.',
    features: [
      'Cắm giắc Zin 100% theo xe, giữ nguyên bản hệ thống điện, không cắt nối dây, an toàn tuyệt đối',
      'Tự động cụp gương khi bấm khóa cửa xe trên chìa khóa Smartkey và mở gương khi mở khóa',
      'Tích hợp nút gập/mở gương điện tiện lợi gắn vào vị trí nút chờ nguyên bản trên xe',
      'Mô tơ bánh răng kim loại chịu lực cao, hoạt động êm ái bền bỉ, chống kẹt tay và chống chập điện',
      'Đạt tiêu chuẩn quản lý chất lượng ISO 9001:2015, sản phẩm chính hãng',
      'Bảo hành chính hãng từ 24 đến 36 tháng 1 đổi 1'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Mô Tơ Xương Nhôm Hợp Kim Đúc', 'Dây Giắc Cắm Zin OEM Chịu Nhiệt'],
    colors: [
      { name: 'Bộ Giắc Zin MCD91 VinFast', hex: '#DC2626' },
      { name: 'Bộ Gương HUVI Limo Green', hex: '#16A34A' }
    ],
    warrantyMonths: 36,
    inStock: true,
    installationTimeHours: 1.5
  },
  {
    id: 'prod-16',
    name: 'Đèn Bi LED Trợ Sáng Mặt Ca Lăng HCLightAuto TS V3 (Three Eyes) & Bi Gầm LED G2 Plus 3 Chế Độ Màu',
    category: 'ambient-lights',
    categoryName: 'Đèn LED & Bi Projector',
    price: 3600000,
    originalPrice: 4500000,
    isSale: true,
    rating: 4.8,
    reviewCount: 142,
    primaryImage: '/images/hcl_tsv3_projector.jpg',
    secondaryImage: '/images/hcl_g2plus_biled.jpg',
    description: 'Hệ thống đèn tăng sáng chuyên dụng HCLightAuto cao cấp gồm đèn trợ sáng cản trước/mặt ca lăng TS V3 (Projector Grille Bumper Light 3 mắt bi cầu) và Bi gầm LED G2 Plus (2.0 Inch - 3 nhiệt màu đa năng). Công suất siêu sáng, gom tia cắt sáng chuẩn không gây chói mắt người đối diện, tản nhiệt nhôm đúc nguyên khối chống nước IP68.',
    features: [
      'Đèn trợ sáng TS V3 thiết kế 3 mắt bi Projector hội tụ công nghệ cao, chiếu xa vượt trội',
      'Bi gầm LED G2 Plus 3 chế độ nhiệt màu (Trắng 6000K, Vàng nắng 4300K, Vàng phá sương 3000K)',
      'Vỏ nhôm CNC nguyên khối tản nhiệt cực nhanh, chống rung lắc và chống nước IP68',
      'Tích hợp chân bắt Zin theo từng dòng xe (Toyota, Ford, Nissan, VinFast...) không độ chế',
      'Chùm sáng mặt cắt thẳng tắp, bám đường cực tốt, an toàn tuyệt đối khi đăng kiểm',
      'Bảo hành chính hãng HCLightAuto 24 tháng 1 đổi 1'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Thấu Kính Thủy Tinh Projector HD', 'Nhôm Đúc CNC Tản Nhiệt Nguyên Khối', 'Chip LED Hiệu Suất Cao'],
    colors: [
      { name: 'TS V3 Projector Grille Light', hex: '#EA580C' },
      { name: 'G2 Plus Bi LED 3 Chế Độ Màu', hex: '#16A34A' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 1.5
  },
  {
    id: 'prod-17',
    name: 'Cảm Biến Áp Suất Lốp Năng Lượng Mặt Trời ICAR Ellisafe TN405 (Van Trong / Hiển Thị Đa Màu Sắc)',
    category: 'dashcams-tpms',
    categoryName: 'Camera & Cảm Biến Lốp',
    price: 2500000,
    originalPrice: 3200000,
    isSale: true,
    rating: 4.8,
    reviewCount: 215,
    primaryImage: '/images/icar_ellisafe_tn405_display.jpg',
    secondaryImage: '/images/icar_ellisafe_tn405_box.jpg',
    description: 'Bộ cảm biến áp suất lốp ICAR Ellisafe TN405 thế hệ mới tích hợp màn hình màu đa sắc đặt taplo tự sạc pin bằng năng lượng mặt trời. Giám sát chính xác từng 0.1 Bar áp suất và nhiệt độ 4 bánh xe thời gian thực, phát cảnh báo âm thanh và hình ảnh ngay lập tức khi lốp bị non hơi, quá nhiệt hoặc rò rỉ khí.',
    features: [
      'Màn hình LCD màu đặt taplo công nghệ tấm sạc Solar năng lượng mặt trời tự động kích hoạt',
      '4 van cảm biến gắn trong bằng hợp kim chống rỉ, chống trộm và chịu áp lực cực cao',
      'Đo đạc siêu nhạy và hiển thị đồng thời cả áp suất lốp (Bar/Psi) và nhiệt độ (°C) của 4 bánh',
      'Cảnh báo tức thì bằng âm thanh bíp và nhấp nháy màn hình khi áp suất thay đổi đột ngột',
      'Tự động ngủ khi xe dừng đỗ và tự động thức dậy hiển thị khi xe rung chuyển chuyển động',
      'Bảo hành chính hãng ICAR Việt Nam 24 tháng 1 đổi 1'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Màn Hình Sạc Năng Lượng Mặt Trời Solar', 'Van Gắn Trong Hợp Kim Cao Cấp'],
    colors: [
      { name: 'Màn Hình Năng Lượng Mặt Trời + 4 Van Trong', hex: '#0F172A' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 0.5
  },
  {
    id: 'prod-18',
    name: 'Combo Độ Ghế Điện Limo Green / UNISEAT Phụ Kiện Nâng Cấp Ghế Chỉnh Điện Theo Xe',
    category: 'seat-covers',
    categoryName: 'Ghế Da & Ghế Điện',
    price: 6500000,
    originalPrice: 8000000,
    isSale: true,
    rating: 4.7,
    reviewCount: 98,
    primaryImage: '/images/uniseat_ghe_dien_limo_green.jpg',
    secondaryImage: '/images/gba_combo_ghe_dien_limo_green.jpg',
    description: 'Bộ phụ kiện nâng cấp ghế chỉnh điện UNISEAT Limo Green & GBA Car Accessories chuẩn theo xe VinFast và các dòng SUV. Trang bị mô-tơ điện êm ái, thanh ray trượt mượt mà, khung xương ghế chịu lực và ốp phím điều khiển điện tử mạ viền sang trọng, cho phép chỉnh tiến - lùi, ngả lưng, nâng hạ đệm ghế đa hướng thuận tiện.',
    features: [
      'Bộ khung ghế chỉnh điện và phụ kiện nâng cấp thiết kế Zin 100% theo xe VinFast Limo Green',
      'Mô-tơ điện thế hệ mới hoạt động êm ái, không gây tiếng ồn, độ bền bỉ vượt trội',
      'Ốp công tắc điều chỉnh điện sắc nét tích hợp nút bấm chỉnh đa hướng mạ chrome cao cấp',
      'Thanh ray trượt thép carbon cường lực chịu tải cao, trượt êm mượt và chống rơ lắc',
      'Cắm giắc Zin theo xe có cầu chì bảo vệ riêng biệt, không cắt trích hệ thống điện nguyên bản',
      'Bảo hành chính hãng 24 tháng đối với toàn bộ hệ thống mô tơ và ray trượt'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Khung Thép Cường Lực Sơn Tĩnh Điện', 'Mô-tơ Điện Lõi Đồng Nguyên Chất', 'Ốp Công Tắc Nhựa ABS & Chrome'],
    colors: [
      { name: 'UNISEAT Ghế Điện Limo Green', hex: '#DC2626' },
      { name: 'GBA Combo Ghế Chỉnh Điện', hex: '#0F172A' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 3
  },
  {
    id: 'prod-19',
    name: 'Dịch Vụ Phay Phục Hồi Lazang Ô Tô CNC Chuyên Nghiệp & Sơn Đổi Màu Mâm Thể Thao',
    category: 'wheels-exterior',
    categoryName: 'Mâm Lazang & Phay CNC',
    price: 1800000,
    originalPrice: 2400000,
    isSale: true,
    rating: 4.8,
    reviewCount: 116,
    primaryImage: '/images/phay_lazang_honda_wheel.jpg',
    secondaryImage: '/images/tst_phay_lazang_vinfast.jpg',
    description: 'Dịch vụ phay phục hồi lazang mâm xe ô tô bằng công nghệ máy tiện phay CNC Diamond Cut chuyên dụng độ chính xác từng micron. Xóa sạch 100% các vết trầy xước, cấn lề, biến dạng, tái tạo bề mặt phay xước ánh kim đa chiều sắc nét như mâm đúc xuất xưởng. Hỗ trợ sơn phối màu 2 tông (Two-tone Black & Diamond Cut) thể thao cho VinFast Lux A/SA, Honda, Mazda, Toyota, Hyundai...',
    features: [
      'Công nghệ máy tiện phay CNC vi tính lập trình biên dạng chấu tự động chuẩn xác từng nan mâm',
      'Phục hồi triệt để lazang trầy xước vỉa hè, ố màu rỉ sét, trả lại bề mặt kim loại sáng bóng',
      'Sơn lót sấy tĩnh điện công nghệ cao chống bong tróc, phủ bóng Ceramic bảo vệ bề mặt chống ố',
      'Cân bằng động bấm chì lại toàn bộ 4 bánh xe miễn phí sau khi hoàn thiện gia công',
      'Thời gian thi công nhanh chóng, có sẵn mâm lốp sơ cua cho khách hàng mượn lăn bánh tạm',
      'Bảo hành nước sơn và bề mặt phay CNC 24 tháng không bong tróc ố vàng'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Hợp Kim Nhôm Đúc / Rèn Forged', 'Lớp Sơn Tĩnh Điện & Phủ Bóng Men Gốm Diamond Ceramic'],
    colors: [
      { name: 'Phay Xước Ánh Kim Diamond Cut Phối Đen Bóng', hex: '#E2E8F0' },
      { name: 'Sơn Đen Mờ Xước Kim Loại Thể Thao', hex: '#1E293B' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 4
  },
  {
    id: 'prod-20',
    name: 'Cảm Biến Đỗ Xe Ô Tô ICAR Ellisen S40 / E48 (Hiển Thị Màn ODO Zin / Màn Liền Cam 360 / Android)',
    category: 'dashcams-tpms',
    categoryName: 'Camera & Cảm Biến Đỗ Xe',
    price: 2800000,
    originalPrice: 3500000,
    isSale: true,
    rating: 4.8,
    reviewCount: 148,
    primaryImage: '/images/icar_ellisen_s40_poster.jpg',
    secondaryImage: '/images/icar_ellisen_e48_poster.jpg',
    description: 'Hệ thống cảm biến đỗ xe thông minh ICAR Ellisen S40 & E48 cao cấp. Giúp người lái xóa tan nỗi lo va chạm khi ghép xe, lùi chuồng hẹp với công nghệ sóng siêu âm cực nhạy, hiển thị trực quan khoảng cách chướng ngại vật lên màn hình công tơ mét ODO Zin, màn DVD Zin, màn hình Android hoặc tích hợp liền mạch vào hệ thống Camera 360.',
    features: [
      'Mắt cảm biến siêu âm công nghệ mới chống nước IP68, phát hiện vật cản từ cự ly 0.3m đến 2.0m',
      'Hỗ trợ tùy chọn mắt cảm biến Zin phẳng như xe nguyên bản hoặc mắt thường thẩm mỹ cao',
      'Hiển thị vạch khoảng cách và cảnh báo vật cản trực tiếp trên màn ODO, màn Zin hoặc màn Android',
      'Tích hợp tính năng tự động kích hoạt cảm biến lùi khi vào số R và cảm biến tiến khi đạp phanh',
      'Phát cảnh báo âm thanh bíp thông minh tăng dần tần số khi khoảng cách tiến sát chướng ngại vật',
      'Bảo hành chính hãng ICAR Việt Nam 24 tháng 1 đổi 1'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Mắt Cảm Biến Siêu Âm Chống Nước IP68', 'Hộp Xử Lý Vi Điều Khiển ICAR Canbus'],
    colors: [
      { name: 'Ellisen S40 Cảm Biến Mắt Zin', hex: '#E2E8F0' },
      { name: 'Ellisen E48 Cảm Biến Đa Năng 8 Mắt', hex: '#0F172A' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 1.5
  },
  {
    id: 'prod-21',
    name: 'Camera Hành Trình 70mai 4K A810 Lite (Ghi Hình 2 Kênh 4K HDR & Điều Khiển Giọng Nói)',
    category: 'dashcams-tpms',
    categoryName: 'Camera Hành Trình 70mai',
    price: 3200000,
    originalPrice: 3800000,
    isBestSeller: true,
    isNew: true,
    isSale: true,
    rating: 5.0,
    reviewCount: 238,
    primaryImage: '/images/camera_70mai_a810lite.jpg',
    secondaryImage: '/images/camera_70mai_a810lite_poster.jpg',
    description: 'Camera hành trình 70mai 4K A810 Lite thế hệ mới - Nhỏ gọn tinh tế, sắc nét chuẩn 4K. Ghi hình đồng thời 2 kênh: Camera trước 4K HDR siêu sắc nét và camera sau 1080P. Tích hợp công nghệ 70mai Lumi Vision quay đêm chân thực, tính năng điều khiển bằng giọng nói thông minh (hỗ trợ tiếng Việt và tiếng Anh), trang bị siêu tụ điện an toàn tuyệt đối, ghi hình khẩn cấp có bộ đệm, GPS tích hợp, tương thích 4G và hỗ trợ thẻ nhớ dung lượng lên tới 512GB.',
    features: [
      'Ghi hình 2 kênh 4K HDR & 1080P: Camera trước độ phân giải chuẩn 4K và camera sau 1080P siêu nét',
      'Điều khiển bằng giọng nói thông minh: Hỗ trợ tiếng Việt (VN), tiếng Anh (EN) ra lệnh chụp ảnh, quay video rảnh tay an toàn',
      'Công nghệ 70mai Lumi Vision độc quyền cho khả năng cân bằng sáng và ghi hình ban đêm chân thực',
      'Trang bị Siêu Tụ Điện (Super Capacitor) bền bỉ, chịu nhiệt độ cao, an toàn tuyệt đối',
      'Ghi hình khẩn cấp có bộ đệm: Tự động ghi lại cả đoạn video trước khi va chạm diễn ra',
      'Chế độ giám sát đỗ xe 24H phát hiện va chạm và rung lắc tự động khi xe tắt máy',
      'Tích hợp GPS hiển thị tốc độ di chuyển và tọa độ hành trình chính xác thời gian thực',
      'Tương thích kết nối Module 4G giám sát xe từ xa và định vị vị trí xe qua smartphone',
      'Hỗ trợ thẻ nhớ MicroSD dung lượng cực khủng lên tới 512GB không lo đầy bộ nhớ',
      'Điều khiển, xem trực tiếp và trích xuất video siêu tốc qua ứng dụng di động App 70mai'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Thân Vỏ Hợp Kim & Nhựa Chịu Nhiệt', 'Viền Vàng Kim Gold Accent', 'Kính Quang Học 70mai Lumi Vision'],
    colors: [
      { name: 'Đen Viền Vàng Kim (Gold Accent)', hex: '#D4AF37' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 1
  },
  {
    id: 'prod-22',
    name: 'Camera Hành Trình VIETMAP S720 Ghi Hình Kép 4K & Cảnh Báo Giao Thông Bằng Giọng Nói',
    category: 'dashcams-tpms',
    categoryName: 'Camera Hành Trình VIETMAP',
    price: 3200000,
    originalPrice: 3800000,
    isBestSeller: true,
    isNew: true,
    isSale: true,
    rating: 4.9,
    reviewCount: 195,
    primaryImage: '/images/camera_vietmap_s720.webp',
    secondaryImage: '/images/camera_vietmap_s720_poster.webp',
    description: 'Camera hành trình VIETMAP S720 thế hệ mới - Ghi hình kép cực sắc nét với Camera trước độ phân giải 4K (3840x2160) và Camera sau Full HD (1920x1080), cảm biến Sony Starvis cao cấp bắt trọn mọi chi tiết dù là nhỏ nhất. Tích hợp tính năng độc quyền Cảnh báo biển báo giao thông bằng giọng nói tiếng Việt chuẩn xác trên toàn quốc: Cảnh báo tốc độ giới hạn, khu dân cư, cấm vượt và camera giao thông / phạt nguội. Màn hình hiển thị chi tiết khoảng cách và tốc độ thời gian thực.',
    features: [
      'Ghi hình kép 2 kênh: Camera trước độ phân giải chuẩn 4K (3840x2160P) & Camera sau Full HD (1920x1080P)',
      'Cảnh báo biển báo giao thông bằng giọng nói tiếng Việt: Cảnh báo biển giới hạn tốc độ, biển vào/ra khu dân cư, biển cấm vượt',
      'Cảnh báo camera giao thông: Cảnh báo khu vực có camera phạt nguội, camera giám sát tốc độ chuẩn xác',
      'Màn hình LCD màu sắc nét hiển thị tốc độ giới hạn, tốc độ di chuyển hiện tại và khoảng cách tới biển báo',
      'Cảm biến hình ảnh Sony Starvis siêu nhạy sáng ghi hình rõ nét biển số xe cả ngày lẫn đêm',
      'Tích hợp GPS độ nhạy cao ghi lại chính xác tọa độ, tốc độ và lộ trình di chuyển của xe',
      'Kết nối Wi-Fi 5GHz tốc độ cao giúp xem trực tiếp và tải video nhanh chóng qua App VIETMAP',
      'Cảm biến G-Sensor khóa bảo vệ video khẩn cấp khi xảy ra va chạm và hỗ trợ giám sát đỗ xe 24H'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Thân Vỏ Hợp Kim & Nhựa Chịu Nhiệt Cao Cấp', 'Ống Kính Kính Quang Học 6 Lớp 4K'],
    colors: [
      { name: 'Đen Nhám Chống Chói', hex: '#1E293B' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 1
  },
  {
    id: 'prod-23',
    name: 'Bi LED Aozoom EXTRA SAPPHIRE Uy Lực Siêu Pha 62W-98W (Nhiệt Màu 5000K Bám Đường & Chống Nước IP67)',
    category: 'ambient-lights',
    categoryName: 'Bi LED Aozoom Đức',
    price: 7000000,
    originalPrice: 7800000,
    isBestSeller: true,
    isNew: true,
    isSale: true,
    rating: 5.0,
    reviewCount: 228,
    primaryImage: '/images/aozoom_extra_sapphire.webp',
    secondaryImage: '/images/aozoom_extra_sapphire_poster.webp',
    description: 'Bi LED Aozoom EXTRA SAPPHIRE New Standard LED Projectors thế hệ mới - "Ánh sáng dẫn lối, vị thế dẫn đầu". Sản phẩm đèn chiếu sáng công nghệ Đức (German Technology) đột phá với thiết kế đa thấu kính hội tụ độc bản: Tầng trên gồm 3 thấu kính ma trận siêu sáng, tầng dưới trang bị thấu kính trợ pha uy lực đưa tổng công suất pha đạt tới 98W (Cos 62W - Pha 98W). Nhiệt màu 5000K ngả vàng ấm cho khả năng bám đường tuyệt đỉnh, xuyên mưa và phá sương mù vượt trội. Toàn bộ thân vỏ chế tác từ hợp kim nhôm đúc nguyên khối với rãnh tản nhiệt CNC cao cấp, đạt tiêu chuẩn kháng nước bụi IP67.',
    features: [
      'Công nghệ Đức (German Technology): Cấu hình quang học đa thấu kính ma trận độc bản thế hệ mới',
      'Uy lực siêu pha công suất khủng 62W (Cos) - 98W (Pha): Chùm sáng pha gom dày, chiếu xa hàng trăm mét bao quát toàn bộ tầm nhìn',
      'Nhiệt màu 5000K ánh sáng tự nhiên ngả vàng ấm: Bám đường đỉnh cao, dịu mắt và khả năng xuyên mưa phá sương hoàn hảo',
      'Dải điện áp hoạt động rộng 9V - 16V: Tương thích mượt mà, ổn định trên tất cả các dòng xe ô tô hiện đại',
      'Tiêu chuẩn chống nước và bụi bẩn IP67: Vận hành bền bỉ tuyệt đối trong mọi điều kiện thời tiết khắc nghiệt',
      'Hệ thống tản nhiệt CNC đa tầng: Thân vỏ hợp kim nhôm đúc rãnh sâu tản nhiệt siêu tốc, bảo vệ chip LED tối đa',
      'Mặt cắt ánh sáng Cos văn minh: Đường cắt thẳng tắp, gom sáng chuẩn xác, không gây chói mắt người đi đối diện',
      'Bảo hành chính hãng AOZOOM 2 năm (24 tháng) 1 đổi 1 tại Hieu N Auto'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Hợp Kim Nhôm Đúc Tản Nhiệt CNC Hàng Không', 'Thấu Kính Thủy Tinh Quang Học Sapphire HD', 'Chip LED Aozoom German Technology'],
    colors: [
      { name: 'Đen Mờ Nhôm Hàng Không (5000K)', hex: '#1E293B' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 2
  },
  {
    id: 'prod-24',
    name: 'Camera Hành Trình 70mai M500 2K Ultra HD Bộ Nhớ Trong eMMC 64GB (Góc Rộng 170° & Giấu Dây Tinh Tế)',
    category: 'dashcams-tpms',
    categoryName: 'Camera Hành Trình 70mai',
    price: 2850000,
    originalPrice: 3400000,
    isSale: true,
    rating: 4.8,
    reviewCount: 167,
    primaryImage: '/images/camera_70mai_m500.jpg',
    secondaryImage: '/images/camera_70mai_m500_poster.jpg',
    description: 'Camera hành trình 70mai M500 thiết kế hình trụ tối giản không màn hình, giấu gọn gàng sau gương chiếu hậu giữ nguyên tầm nhìn lái xe. Sở hữu độ phân giải 2K 1944P, góc quay siêu rộng 170 độ bao trọn 5 làn xe, bộ nhớ trong eMMC 5.1 dung lượng 64GB siêu bền bỉ không lo lỗi thẻ nhớ. Tích hợp điều khiển giọng nói, hiệu ứng RS đặc biệt và kết nối cảm biến áp suất lốp TPMS trực tiếp.',
    features: [
      'Độ phân giải 2K 1944P Ultra HD cùng góc quay siêu rộng 170° bao quát toàn bộ làn đường phía trước',
      'Thiết kế hình trụ tối giản, gọn gàng, hoàn toàn không chiếm dụng tầm nhìn kính chắn gió',
      'Tích hợp sẵn bộ nhớ trong eMMC 5.1 64GB tốc độ cao, độ bền gấp 10 lần thẻ nhớ MicroSD thông thường',
      'Hiệu ứng đồ họa công nghệ thực tế ảo RS (Route Sense) mô phỏng tốc độ, gia tốc và độ dốc đường',
      'Hỗ trợ kết nối trực tiếp với van cảm biến áp suất lốp TPMS 70mai hiển thị áp suất từng bánh',
      'Hệ thống ADAS thông minh và điều khiển ra lệnh chụp ảnh/quay video bằng giọng nói rảnh tay',
      'Hỗ trợ Module 4G giám sát đỗ xe và nhận thông báo va chạm tức thời qua điện thoại',
      'Bảo hành chính hãng 24 tháng 1 đổi 1'
    ],
    vehicleTypes: ['sedan', 'suv', 'mpv', 'luxury'],
    materials: ['Hợp Kim Nhôm Hàng Không Tản Nhiệt Nhanh', 'Thấu Kính Quang Học 6 Lớp Khẩu Độ F2.0'],
    colors: [
      { name: 'Xám Titan Kim Loại (Space Gray)', hex: '#334155' }
    ],
    warrantyMonths: 24,
    inStock: true,
    installationTimeHours: 1
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Nguyễn Duy Hiếu',
    role: 'CEO & Nhà Sáng Lập Hieu N Auto',
    experience: '12 năm kinh nghiệm',
    image: hieuAvatar,
    bio: 'Người sáng lập và định hình chiến lược phát triển tại Hieu N Auto. Chịu trách nhiệm hoạch định hệ sinh thái sản phẩm chính hãng, xây dựng tiêu chuẩn dịch vụ khách hàng và định hướng thương hiệu uy tín hàng đầu.',
    specialty: 'Hoạch định chiến lược sản phẩm, thẩm định chất lượng phụ kiện công nghệ & xây dựng tiêu chuẩn dịch vụ'
  },
  {
    id: 'team-2',
    name: 'Nguyễn Đức Sơn',
    role: 'Giám Đốc Kỹ Thuật & Đồng Sáng Lập Hieu N Auto',
    experience: '9 năm kinh nghiệm',
    image: sonAvatar,
    bio: 'Đồng sáng lập và chịu trách nhiệm cao nhất về chất lượng thi công tại Hieu N Auto. Phụ trách hoạch định tiêu chuẩn kỹ thuật và giám sát thi công các hạng mục tại Hieu N Auto.',
    specialty: 'Quản lý quy trình thi công tiêu chuẩn và kiểm soát chất lượng kỹ thuật thi công'
  },
  {
    id: 'team-3',
    name: 'Lê Quang Huy',
    role: 'Chuyên Gia Kỹ Thuật Phim Cách Nhiệt & Cách Âm Chống Ồn',
    experience: '10 năm kinh nghiệm',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Kỹ thuật viên trưởng đạt chứng chỉ thi công dán phim cách nhiệt 3M Crystalline và Nano Ceramic chính hãng trong phòng lạnh khép kín, tối ưu khả năng cản tia UV và chống nóng vượt trội.',
    specialty: 'Dán phim cách nhiệt 3M Crystalline/Ceramic, đo kiểm chỉ số nhiệt hồng ngoại & thi công cách âm khoang lái'
  },
  {
    id: 'team-4',
    name: 'Phạm Hoàng Nam',
    role: 'Kỹ Sư Trưởng Hệ Thống Chiếu Sáng & Phụ Kiện Tiện Ích',
    experience: '8 năm kinh nghiệm',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Chuyên trách thi công hệ thống LED nội thất Ambient Light 64 màu Raipow, Đèn Bi gầm tăng sáng phá sương, Cốp điện tự động, Bệ bước chân và Giáp gầm bảo vệ gầm pin xe điện.',
    specialty: 'LED viền Ambient 64 màu theo nhạc, Đèn Bi gầm tăng sáng, Cốp điện thông minh & Giáp bảo vệ pin SICHER'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-led-ambient',
    title: 'Kinh Nghiệm Độ LED Nội Thất Ambient Light 64 Màu: Cách Chọn Dòng LED Đẹp, Giữ Chuẩn Zin & Không Chói Mắt',
    slug: 'kinh-nghiem-do-led-noi-that-ambient-light',
    excerpt: 'Tìm hiểu các hệ thống LED viền nội thất ô tô 18 - 24 chi tiết, công nghệ thanh quang học chuyển màu 64 sắc thái theo nhạc, cắm giắc Zin an toàn 100%.',
    content: `
Ánh sáng nội thất Ambient Light không chỉ mang lại vẻ đẹp lung linh sang trọng như trên các dòng xe Mercedes-Benz hay Porsche, mà còn giúp không gian khoang lái trở nên thư giãn, sống động và đậm dấu ấn cá nhân.

### 1. Phân loại các dòng LED nội thất hiện nay:
- **LED viền sợi quang học thế hệ mới:** Dải LED mỏng dẹt giấu mép tinh xảo, ánh sáng phát đều mịn không bị đứt đoạn hay đốm hạt.
- **Hệ thống LED 18 - 24 chi tiết:** Bao gồm thanh LED táp-lô, 4 cánh cửa, hộc để chân trước sau, viền loa cánh, tay nắm mở cửa và hộc để đồ.
- **Công nghệ LED Matrix đuổi màu:** Hiệu ứng chuyển động mượt mà nhiều màu cùng lúc hoặc đổi màu linh hoạt theo nhịp điệu bài hát đang phát.

### 2. Ưu điểm khi nâng cấp LED nội thất tại Hieu N Auto:
- **Cắm giắc Zin 100%:** Tuyệt đối không cắt trích hay đấu nối thủ công làm ảnh hưởng tới hệ thống điện nguyên bản của xe.
- **Điều khiển đa phương thức:** Tùy chỉnh màu sắc, độ sáng, hiệu ứng dễ dàng qua ứng dụng Smartphone hoặc phím vô lăng.
- **Độ sáng dịu mắt:** Ánh sáng quang học được hiệu chỉnh không gây chói hoặc phản chiếu khó chịu lên kính lái ban đêm.
- **Có cầu chì bảo vệ độc lập:** Đảm bảo an toàn tuyệt đối chống quá tải và chống chập cháy.

### Lời khuyên cho chủ xe:
Nên chọn các gói LED nội thất đồng bộ có ánh sáng dịu nhẹ (Ice Blue, Warm Amber, Purple Neon) để vừa tạo không gian thư thái vừa hỗ trợ quan sát các vị trí trong xe khi trời tối.
    `,
    coverImage: '/images/led_ambient_interior.jpg',
    category: 'LED & Ánh Sáng',
    date: '2026-08-25',
    author: 'Phạm Hoàng Nam',
    readTime: '5 phút đọc',
    tags: ['LED nội thất', 'Ambient Light', 'LED 64 màu', 'Ánh sáng ô tô'],
    views: 4820
  },
  {
    id: 'post-dashcam-70mai',
    title: 'Cẩm Nang Chọn Mua Camera Hành Trình: Vì Sao Nên Chọn Loại 3 Kênh Siêu Tụ Điện & Giám Sát Đỗ Xe 24/7?',
    slug: 'cam-nang-chon-camera-hanh-trinh-3-kenh',
    excerpt: 'Kinh nghiệm chọn camera hành trình bảo vệ quyền lợi pháp lý, ghi hình trước - trong cabin - sau xe siêu nét, trang bị mắt hồng ngoại IR quay đêm và siêu tụ điện an toàn.',
    content: `
Camera hành trình là trang bị bắt buộc không thể thiếu trên mọi chiếc ô tô giúp ghi lại mọi diễn biến trên đường, làm bằng chứng xác thực khi xảy ra va chạm hay sự cố giao thông.

### 1. Những tiêu chí quan trọng khi chọn camera hành trình:
- **Ghi hình 3 kênh đồng thời (Trước - Cabin - Sau):** Bảo vệ toàn diện cả phía trước đầu xe, khoang hành khách (đặc biệt hữu ích khi chở gia đình hoặc lái xe dịch vụ) và đuôi xe.
- **Công nghệ Siêu Tụ Điện (Super Capacitor):** Thay thế pin Lithium truyền thống, chống chịu nhiệt độ cao trong xe dưới trời nắng gắt (lên tới 70-80°C) mà không lo phồng rộp hay cháy nổ.
- **Mắt hồng ngoại IR quay đêm:** Đảm bảo ghi hình rõ mặt và hành vi trong khoang cabin ngay cả khi tắt hết đèn xe.
- **Chế độ giám sát đỗ xe 24/24:** Cảm biến G-Sensor tự động kích hoạt ghi hình khẩn cấp khi phát hiện rung lắc hoặc va chạm trong bãi đỗ.
- **Tích hợp GPS & Kết nối App Wifi:** Xem lại và tải video độ phân giải cao trực tiếp về điện thoại trong vài giây.

### 2. Dòng camera hành trình tiêu biểu:
Camera hành trình 70mai T400 / A810 / Omni 360 với độ phân giải lên đến 4K HDR và công nghệ AI nhận diện chuyển động thông minh đang là sự lựa chọn số 1 hiện nay.
    `,
    coverImage: '/images/camera_70mai_t400_poster.jpg',
    category: 'Camera & Màn Hình',
    date: '2026-08-22',
    author: 'Trần Minh Tuấn',
    readTime: '6 phút đọc',
    tags: ['Camera hành trình', '70mai', 'Siêu tụ điện', 'Giám sát 24/7'],
    views: 5210
  },
  {
    id: 'post-cam-360',
    title: 'Giải Pháp Nâng Cấp Camera 360 Tích Hợp MHU Android: Xóa Bỏ Điểm Mù, Sắc Nét Gấp 4 Lần Màn Zin',
    slug: 'giai-phap-nang-cap-camera-360-mhu',
    excerpt: 'Hướng dẫn giải pháp lắp đặt Camera 360 toàn cảnh tích hợp trực tiếp lên màn hình xe (VinFast Lux, Everest, SantaFe...), hỗ trợ mô phỏng 3D và vạch đánh lái.',
    content: `
Điểm mù quanh xe là nguyên nhân hàng đầu gây ra các vụ va quẹt khi di chuyển trong ngõ hẹp, ghép xe song song hoặc lùi xe vào chuồng.

### 1. Tại sao nên nâng cấp Camera 360 tích hợp MHU?
- **Độ nét vượt trội:** Sử dụng mắt cam Sony AHD cao cấp với thấu kính quang học 6 lớp, cho hình ảnh siêu nét gấp 4 lần so với các hệ thống camera 360 zin nguyên bản mờ nhạt.
- **Mô phỏng 3D xoay đa góc:** Quan sát toàn diện 360 độ từ trên cao nhìn xuống, nhìn 2 bánh trước khi cập lề hay nhìn bánh sau khi lùi chuồng hẹp.
- **Vạch đánh lái bẻ góc theo vô lăng:** Giúp người lái dễ dàng ước lượng quỹ đạo di chuyển chính xác tới từng centimet.
- **Tự động kích hoạt thông minh:** Tự mở camera khi bật xi nhan trái/phải, khi cài số lùi (R) hoặc khi cảm biến khoảng cách phát hiện vật cản phía trước.
- **Cắm giắc Zin 100%:** Giữ nguyên màn hình zin của xe, không độ chế cắt trích dây nguồn.

### 2. Quy trình căn chỉnh bạt tự động:
Tại Hieu N Auto, xe được trải bạt tiêu chuẩn chuyên dụng và căn chỉnh bằng phần mềm máy tính chính xác, loại bỏ hoàn toàn hiện tượng méo hình hay lệch ghép mí giữa 4 mắt cam.
    `,
    coverImage: '/images/camera_360_mhu_lux.webp',
    category: 'Camera & Màn Hình',
    date: '2026-08-19',
    author: 'Nguyễn Hiếu',
    readTime: '5 phút đọc',
    tags: ['Camera 360', 'MHU Android', 'Xóa điểm mù', 'VinFast Lux'],
    views: 3980
  },
  {
    id: 'post-window-film-3m',
    title: 'Đánh Giá Phim Cách Nhiệt 3M Crystalline Quang Học 200 Lớp: Chống Nóng Đỉnh Cao & Phân Biệt Thật - Giả',
    slug: 'danh-gia-phim-cach-nhiet-3m-crystalline',
    excerpt: 'Tại sao 3M Crystalline là dòng phim cách nhiệt quang học cao cấp nhất? Khả năng cản 99% tia hồng ngoại IR, chống 99.9% tia UV và không gây nhiễu sóng GPS/4G.',
    content: `
Dưới cái nắng gay gắt mùa hè tại Việt Nam, nhiệt độ trong khoang xe có thể vượt ngưỡng 60°C, gây hại nghiêm trọng đến da ghế, táp-lô và tiêu hao nhiều nhiên liệu cho hệ thống điều hòa.

### 1. Công nghệ đột phá của 3M Crystalline:
- **Cấu trúc quang học 200 lớp nano:** 3M sử dụng công nghệ nano đa lớp độc quyền, mỏng hơn một sợi tóc nhưng có khả năng phản xạ và khúc xạ nhiệt tối đa.
- **Chỉ số chống nắng SPF 1000+:** Loại bỏ 99.9% tia tử ngoại cực tím (UVA/UVB), bảo vệ làn da người ngồi trong xe và ngăn ngừa hiện tượng bạc màu nội thất da.
- **Cản 99% tia hồng ngoại sinh nhiệt (IR):** Giúp khoang xe mát nhanh hơn, giảm tải cho lốc lạnh điều hòa và tiết kiệm nhiên liệu.
- **100% Phi kim loại (Non-metallized):** Hoàn toàn không gây cản trở sóng thẻ từ ETC/VETC, tín hiệu GPS dẫn đường hoặc sóng điện thoại di động 4G/5G.

### 2. Cách nhận biết phim 3M Crystalline chính hãng:
- Khi xịt nước lên phim, phim Crystalline thật sẽ ánh lên sắc đỏ tía (hiệu ứng khúc xạ quang học độc quyền).
- Luôn có mã kích hoạt bảo hành điện tử chính hãng 3M Electronic Warranty 10 năm tra cứu trực tiếp trên website của 3M Việt Nam.
    `,
    coverImage: '/images/film_3m_crystalline_poster.jpg',
    category: 'Phim Cách Nhiệt & Âm Thanh',
    date: '2026-08-16',
    author: 'Lê Quang Huy',
    readTime: '6 phút đọc',
    tags: ['Phim cách nhiệt', '3M Crystalline', 'Chống nóng ô tô', 'Chống tia UV'],
    views: 4650
  },
  {
    id: 'post-screen-dual',
    title: 'Màn Hình Dài Đôi 20.8 Inch Liền Khối: Nâng Tầm Khoang Lái Tương Lai & Chạy Song Song 2 Hệ Điều Hành',
    slug: 'man-hinh-dai-doi-20-inch-lien-khoi',
    excerpt: 'Khám phá màn hình đôi trải dài 20.8 inch liền mạch: đồng hồ kỹ thuật số ODO kết hợp màn Android giải trí 2K, chuyển đổi 1 chạm giữa hệ điều hành nguyên bản và Android.',
    content: `
Màn hình đôi liền khối (Dual Widescreen) vốn chỉ xuất hiện trên các siêu phẩm hạng sang như Mercedes S-Class, BMW iX hay Cadillac Escalade. Giờ đây, công nghệ này đã có thể trang bị cho mọi dòng xe với độ tương thích hoàn hảo.

### 1. Trải nghiệm thị giác đỉnh cao:
- **Kích thước siêu khủng 20.8 inch liền tấm:** Thiết kế mặt kính cong nhẹ tràn viền, loại bỏ hoàn toàn viền nhựa ngăn cách giữa cụm đồng hồ lái và màn hình giải trí trung tâm.
- **Độ phân giải 2K sắc nét:** Tấm nền IPS chống lóa quang học góc rộng, màu sắc rực rỡ và hiển thị sắc nét ngay cả dưới trời nắng chiếu trực diện.

### 2. Chạy song song 2 hệ điều hành (Dual OS):
- **Hệ thống 1 (Hệ điều hành Zin):** Đồng bộ 100% thông tin tốc độ, vòng tua, cảnh báo cửa, áp suất lốp, mức tiêu hao nhiên liệu từ cụm đồng hồ công-tơ-mét gốc.
- **Hệ thống 2 (Android Auto / Apple CarPlay không dây):** Cấu hình chip 8 nhân, hỗ trợ chia đôi màn hình vừa xem bản đồ Vietmap Live dẫn đường vừa nghe nhạc Spotify / Youtube rảnh tay.
- Chuyển đổi qua lại mượt mà chỉ bằng 1 nút chạm trên vô lăng hoặc màn hình.

### 3. Quy trình lắp đặt:
Thi công dưỡng Zin ôm khít táp-lô theo từng form xe, cắm giắc nguồn Canbus chuyên dụng không cắt dây điện.
    `,
    coverImage: '/images/screen_dual_20inch_size.jpg',
    category: 'Camera & Màn Hình',
    date: '2026-08-15',
    author: 'Trần Minh Tuấn',
    readTime: '5 phút đọc',
    tags: ['Màn hình dài', 'Màn hình đôi', 'Màn hình Android', '2K Liền Khối'],
    views: 4120
  },
  {
    id: 'post-armrest-spaceship',
    title: 'Bệ Tỳ Tay Phi Thuyền Trung Tâm: Giải Pháp Chống Mỏi Tay Lái & Tích Hợp Sạc Không Dây, LED Nội Thất',
    slug: 'be-ty-tay-phi-thuyen-trung-tam',
    excerpt: 'Nâng cấp bệ tỳ tay trung tâm phong cách phi thuyền sang trọng: bọc da êm ái, khay để cốc, sạc không dây chuẩn Qi, cổng sạc Type-C nhanh và đèn LED viền.',
    content: `
Trên nhiều mẫu xe đô thị cỡ nhỏ (như VinFast VF3, Wuling Mini EV, Fadil, Morning, i10...), việc thiếu bệ tỳ tay trung tâm khiến người lái nhanh bị mỏi khớp vai và cánh tay khi lái xe đường dài hoặc kẹt xe giờ cao điểm.

### 1. Thiết kế phong cách phi thuyền không gian (Spaceship):
- **Đường nét khí động học sang trọng:** Tạo điểm nhấn bề thế, lấp đầy khoảng trống giữa hai ghế trước giúp khoang lái nhìn sang trọng và liền lạc hơn.
- **Bọc da Nappa / PU cao cấp:** Mút đệm dày dặn, nâng đỡ cánh tay tự nhiên ở góc 90 độ, giải tỏa áp lực lên vai gáy.

### 2. Tích hợp chuỗi tiện ích đa năng:
- **Đế sạc nhanh không dây chuẩn Qi:** Đặt điện thoại lên là sạc ngay mà không cần cắm dây vướng víu.
- **Hệ thống cổng sạc nhanh USB & Type-C:** Cung cấp nguồn sạc tiện lợi cho cả ghế trước và hành khách hàng ghế sau.
- **Hộc chứa đồ đa tầng rộng rãi:** Để vừa ví tiền, chìa khóa, kính mát, thẻ xe và tích hợp khay giữ ly nước chắc chắn.
- **Dải LED viền đổi màu:** Đồng bộ ánh sáng lung linh với hệ thống đèn nội thất của xe.

### 3. Lắp đặt chuẩn xác:
Khớp ngàm Zin vào hộc phanh tay nguyên bản, cố định chắc chắn không rung lắc, không khoan đục sàn xe.
    `,
    coverImage: '/images/armrest_vf3_interior_led.jpg',
    category: 'Cốp Điện & Tiện Ích',
    date: '2026-08-15',
    author: 'Nguyễn Hiếu',
    readTime: '4 phút đọc',
    tags: ['Tì tay phi thuyền', 'Bệ tỳ tay', 'Sạc không dây', 'VinFast VF3'],
    views: 4890
  },
  {
    id: 'post-electric-tailgate',
    title: 'Có Nên Nâng Cấp Cốp Điện Tự Động & Cảm Biến Đá Cốp? Tiêu Chuẩn An Toàn & Chống Kẹt Thông Minh',
    slug: 'co-nen-nang-cap-cop-dien-tu-dong-da-cop',
    excerpt: 'Giải pháp mở cốp rảnh tay tiện lợi khi xách nhiều đồ đạc, ty thủy lực điện êm ái tích hợp tính năng chống kẹt an toàn bảo vệ gia đình có trẻ nhỏ.',
    content: `
Đóng mở cốp cơ nặng nề, bụi bẩn bám dính vào tay khi trời mưa hoặc tầm với quá cao luôn là nỗi bất tiện lớn, đặc biệt với chị em phụ nữ và người lớn tuổi.

### 1. Những tính năng nổi bật của bộ cốp điện thế hệ mới:
- **Đóng mở đa điểm linh hoạt:** Mở cốp bằng nút bấm trên chìa khóa Smartkey zin, nút bấm tại vị trí ghế lái, nút bấm sau nắp cốp hoặc cảm biến đá chân (Kick Sensor).
- **Cảm biến đá cốp rảnh tay:** Khi hai tay đang mang vác nhiều đồ đạc, chỉ cần đưa chân nhẹ nhàng dưới gầm đuôi xe là cốp tự động mở êm ái.
- **Cơ chế chống kẹt thông minh (Anti-pinch):** Trong quá trình hạ xuống, nếu phát hiện có vật cản (tay, người, đồ vật), cốp sẽ ngay lập tức dừng lại và đảo chiều đi lên để bảo đảm an toàn tuyệt đối.
- **Cài đặt nhớ độ cao mở cốp:** Tùy chỉnh độ mở cốp phù hợp với chiều cao người dùng hoặc chiều cao trần nhà để xe.
- **Ty điện cao cấp chống ồn:** Động cơ êm ái, hoạt động bền bỉ, tích hợp hít cốp nhẹ nhàng không gây tiếng kêu rầm khó chịu.

### 2. Tiêu chuẩn lắp đặt chuẩn Zin:
Toàn bộ hệ thống cốp điện tại Hieu N Auto đều sử dụng pát bắt ốc và cắm giắc Zin theo từng dòng xe (Fortuner, CX-5, Tucson, SantaFe, Cross, VF3, VF5...), không khoan cắt khung sườn xe.
    `,
    coverImage: '/images/cop_dien_icar_vf3_poster.jpg',
    category: 'Cốp Điện & Tiện Ích',
    date: '2026-08-14',
    author: 'Trần Minh Tuấn',
    readTime: '4 phút đọc',
    tags: ['Cốp điện', 'Đá cốp', 'Cảm biến đá chân', 'Chống kẹt'],
    views: 3120
  },
  {
    id: 'post-android-box',
    title: 'So Sánh Android Box vs Thay Màn Hình Android Ô Tô: Lựa Chọn Nào Giữ "Zin" Hoàn Hảo Cho Xe?',
    slug: 'so-sanh-android-box-va-man-hinh-android',
    excerpt: 'Phân tích chi tiết ưu nhược điểm giữa việc cắm Android Box qua cổng CarPlay và việc thay màn hình Android 2K liền khối để bạn chọn phương án tối ưu nhất.',
    content: `
Rất nhiều chủ xe mong muốn sử dụng bản đồ dẫn đường Vietmap Live cảnh báo tốc độ, nghe nhạc Youtube không quảng cáo, tra cứu phạt nguội nhưng phân vân giữa việc giữ màn zin hay thay màn mới.

### 1. Android Box cho ô tô (Giữ 100% Màn Hình Zin):
- **Cơ chế hoạt động:** Chỉ cần cắm dây USB vào cổng Apple CarPlay / Android Auto có sẵn trên xe, màn hình zin sẽ lập tức chuyển thành giao diện Android thông minh.
- **Ưu điểm:** Giữ nguyên 100% màn hình gốc và các tính năng điều khiển nguyên bản của hãng; dễ dàng rút ra chuyển sang xe khác; cấu hình chip 8 nhân mạnh mẽ, RAM 4GB - 8GB mượt mà.
- **Phù hợp với:** Các dòng xe đời mới có màn hình zin to đẹp (Mercedes, BMW, VinFast, Ford, Kia, Hyundai, Toyota...).

### 2. Màn Hình Android Liền Khối:
- **Ưu điểm:** Màn hình cảm ứng kích thước lớn 9 - 13 inch độ phân giải 2K sắc nét; tích hợp sẵn camera 360 AHD; xử lý âm thanh DSP 32 kênh chuyên nghiệp.
- **Phù hợp với:** Các dòng xe đời cũ chưa có màn hình hoặc màn hình zin nhỏ hẹp, độ phân giải thấp.

### 3. Hệ sinh thái ứng dụng tiện ích:
Cả hai giải pháp đều hỗ trợ giọng nói tiếng Việt Kiki rảnh tay, cảnh báo biển báo giao thông - camera phạt nguội và xem truyền hình trực tuyến VTVgo, Netflix.
    `,
    coverImage: '/images/zestech_dx165_android_box_poster.jpg',
    category: 'Camera & Màn Hình',
    date: '2026-08-11',
    author: 'Nguyễn Hiếu',
    readTime: '5 phút đọc',
    tags: ['Android Box', 'Màn hình Android', 'Vietmap Live', 'CarPlay', 'Zestech'],
    views: 4230
  },
  {
    id: 'post-auto-folding-mirrors',
    title: 'Độ Gương Gập Điện Tự Động: Tự Động Cụp Khi Khóa Cửa, Chống Va Quẹt Ngõ Hẹp & Lắp Đặt Chuẩn Zin',
    slug: 'do-guong-gap-dien-tu-dong-theo-xe',
    excerpt: 'Hướng dẫn nâng cấp hệ thống mô tơ gương gập điện tự động cho các dòng xe bản thiếu: bấm khóa cửa gương tự cụp, mở khóa gương tự xòe và nút bấm gập gương trong cabin.',
    content: `
Việc phải đi vòng quanh xe gập gương bằng tay khi đỗ ở ngõ hẹp hoặc quên gập gương khiến xe dễ bị xe máy quẹt vỡ mặt gương là nỗi ám ảnh của nhiều tài xế.

### 1. Nguyên lý hoạt động của cụm gương gập điện thông minh:
- **Khóa cửa tự động cụp gương:** Bấm nút khóa trên chìa khóa Smartkey hoặc chạm tay nắm cửa, 2 tai gương tự động khép gọn sát thân xe.
- **Mở khóa tự động xòe gương:** Khi người lái đến gần hoặc bấm mở khóa, gương tự động mở ra sẵn sàng lăn bánh.
- **Nhận diện trạng thái khóa xe từ xa:** Chỉ cần nhìn từ xa thấy 2 gương đã cụp là biết xe đã được khóa cửa an toàn, không lo quên khóa xe.
- **Công tắc gập/xòe chủ động trong cabin:** Cho phép gập gương nhanh khi đang di chuyển qua cầu hẹp, cổng nhà chật hoặc ngõ hẻm đông đúc.

### 2. Tiêu chuẩn mô-tơ và mạch điều khiển:
- Sử dụng mô-tơ xương nhôm đúc chịu lực cao, bánh răng kim loại bền bỉ không bị rơ lắc khi chạy tốc độ cao.
- Mạch điều khiển thông minh tự ngắt khi kẹt vật cản, bảo vệ mô-tơ không bị om điện sinh nhiệt.
- Cắm giắc Zin 100% vào cụm khóa cửa, không trích dây điện zin của xe.
    `,
    coverImage: '/images/mcd91_guong_gap_dien_poster.jpg',
    category: 'Cốp Điện & Tiện Ích',
    date: '2026-08-09',
    author: 'Trần Minh Tuấn',
    readTime: '4 phút đọc',
    tags: ['Gương điện', 'Gập gương tự động', 'Mô tơ gương', 'Tiện ích ô tô'],
    views: 3560
  },
  {
    id: 'post-bi-gam-fog-lights',
    title: 'Nâng Cấp Đèn Bi Gầm Ô Tô 3 Nhiệt Màu: Tăng Sáng Gấp 5 Lần, Đi Mưa & Phá Sương Mù An Toàn Chuẩn Đăng Kiểm',
    slug: 'nang-cap-den-bi-gam-o-to-3-mau',
    excerpt: 'Bí quyết tăng sáng văn minh với đèn Bi Gầm LED/Laser: mặt cắt ánh sáng phẳng không gây chói mắt xe ngược chiều, 3 chế độ màu thích ứng mọi thời tiết.',
    content: `
Hệ thống đèn gầm halogen nguyên bản trên nhiều dòng xe có ánh sáng yếu, tầm chiếu gần và dễ bị "nuốt sáng" khi di chuyển trong điều kiện mưa bão hoặc sương mù dày đặc.

### 1. Lợi ích khi độ đèn Bi Gầm LED / Laser:
- **Tăng sáng gấp 5 - 7 lần:** Quang thông mạnh mẽ, luồng sáng trải rộng sang hai bên lề đường giúp tài xế phát hiện sớm chướng ngại vật, ổ gà hay người đi bộ.
- **3 Chế độ nhiệt màu linh hoạt (3000K - 4300K - 5500K):**
  - *3000K (Vàng đậm):* Khả năng phá sương mù và bám đường cực tốt khi mưa to bão gió.
  - *4300K (Vàng trắng nắng ấm):* Ánh sáng bám đường hỗn hợp di chuyển đa địa hình.
  - *5500K (Trắng thời trang):* Chiếu sáng rực rỡ, thẩm mỹ cao trên đường cao tốc khô ráo.
- **Đường cắt ánh sáng (Cut-off line) chuẩn xác:** Toàn bộ ánh sáng tập trung xuống mặt đường, tuyệt đối không hắt lên tầm mắt xe đi đối diện, văn minh và an toàn.
- **Đăng kiểm thuận lợi:** Lắp đặt tại vị trí đèn sương mù zin, sử dụng pát chuyên dụng theo xe, không thay đổi kết cấu cụm đèn pha chính.

### 2. Tiêu chuẩn thi công:
Sử dụng giắc cắm chống nước chuẩn IP68, cầu chì ngắt nguồn độc lập và canh chỉnh độ cao tia sáng bằng máy đo góc chiếu chuyên dụng.
    `,
    coverImage: '/images/hcl_g2plus_biled.jpg',
    category: 'LED & Ánh Sáng',
    date: '2026-08-07',
    author: 'Phạm Hoàng Nam',
    readTime: '5 phút đọc',
    tags: ['Đèn bi gầm', 'Bi LED gầm', 'Phá sương mù', 'Tăng sáng ô tô'],
    views: 3740
  },
  {
    id: 'post-sub-underseat',
    title: 'Bí Quyết Nâng Cấp Loa Sub Gầm Ghế & DSP Cho Ô Tô: Tăng Tiếng Bass Uy Lực Mà Vẫn Gọn Gàng',
    slug: 'bi-quyet-nang-cap-loa-sub-gam-ghe-dsp',
    excerpt: 'Giải pháp cải thiện chất lượng âm thanh xe hơi nhanh chóng, bổ sung dải trầm sâu lắng cho các dòng nhạc EDM, Remix, Bolero mà không chiếm diện tích cốp xe.',
    content: `
Dàn loa nguyên bản theo xe phổ thông thường thiếu hụt dải âm siêu trầm (Sub-bass), khiến âm nhạc bị mỏng, đục và thiếu lực khi nghe các bản nhạc sôi động hoặc nhạc trữ tình.

### 1. Tại sao loa Sub gầm ghế là lựa chọn tối ưu?
- **Kích thước siêu nhỏ gọn:** Toàn bộ cụm loa trầm và amply tích hợp nằm gọn gàng dưới gầm ghế phụ hoặc ghế lái, không hề làm mất không gian chứa đồ ở cốp xe.
- **Bổ sung dải âm trầm uy lực:** Tái tạo tiếng trống, tiếng bass sâu, chắc nịch và có chiều sâu cảm xúc.
- **Kết hợp bộ xử lý tín hiệu DSP:** Cân bằng âm trường, chia tần số chính xác cho từng loa cánh và loa treble, tái tạo không gian sân khấu âm nhạc sống động.
- **Lắp đặt an toàn:** Đấu nối dây nguồn có cầu chì bảo vệ riêng biệt, lấy tín hiệu âm thanh chuẩn không ảnh hưởng đến hệ thống điện tử của xe.

### 2. Các thương hiệu Sub điện gầm ghế uy tín:
Rebec, DLS Thụy Điển, Focal Pháp, Blaupunkt Đức, Nakamichi Nhật Bản là những cái tên hàng đầu được giới yêu âm thanh xe hơi ưa chuộng tại Hieu N Auto.
    `,
    coverImage: '/images/rebec_sub_closeup.jpg',
    category: 'Phim Cách Nhiệt & Âm Thanh',
    date: '2026-08-04',
    author: 'Trần Minh Tuấn',
    readTime: '5 phút đọc',
    tags: ['Sub gầm ghế', 'Nâng cấp âm thanh', 'Loa sub ô tô', 'DSP', 'Rebec'],
    views: 3890
  },
  {
    id: 'post-tire-pressure-tpms',
    title: 'Cảm Biến Áp Suất Lốp TPMS Van Trong: "Lá Bùa Hộ Mệnh" Chống Nổ Lốp & Tiết Kiệm Nhiên Liệu',
    slug: 'cam-bien-ap-suat-lop-tpms-van-trong',
    excerpt: 'Tại sao 100% ô tô hiện đại đều cần cảm biến áp suất lốp? Theo dõi nhiệt độ và áp suất 4 bánh theo thời gian thực, phát hiện rò rỉ khí và cán đinh tức thì.',
    content: `
Lốp xe là bộ phận duy nhất tiếp xúc trực tiếp với mặt đường. Lốp non hơi không chỉ làm tăng ma sát tiêu hao 10-15% nhiên liệu mà còn tiềm ẩn nguy cơ mất lái và nổ lốp cực kỳ nguy hiểm trên đường cao tốc.

### 1. Ưu điểm vượt trội của van cảm biến trong (Internal Sensor):
- **Tính thẩm mỹ & Chống trộm:** Đầu van gắn kín đáo bên trong vành lốp thay thế van cao su gốc, không lo bị tháo trộm hay gãy khi va quẹt lề đường.
- **Đo lường cực kỳ chuẩn xác:** Tiếp xúc trực tiếp với luồng khí trong lốp, đo chính xác cả áp suất (Bar/PSI) và nhiệt độ lốp (°C).
- **Tuổi thọ pin lên tới 5 năm:** Chip xử lý siêu tiết kiệm năng lượng, pin Maxell Nhật Bản hoạt động bền bỉ.

### 2. Các phương thức hiển thị thông minh:
- **Màn hình đặt táp-lô pin năng lượng mặt trời:** Tự động sạc pin bằng ánh sáng, tự bật khi có rung động khởi động xe.
- **Tích hợp cổng chờ ODO / Màn hình Android:** Hiển thị trực tiếp lên đồng hồ nguyên bản của xe hoặc màn hình giải trí trung tâm kèm giọng nói tiếng Việt cảnh báo.
- **Cài đặt ngưỡng cảnh báo:** Tùy biến giới hạn áp suất tối đa - tối thiểu để hệ thống bíp còi báo động kịp thời.
    `,
    coverImage: '/images/icar_ellisafe_tn405_display.jpg',
    category: 'Camera & Màn Hình',
    date: '2026-08-03',
    author: 'Trần Minh Tuấn',
    readTime: '5 phút đọc',
    tags: ['Áp suất lốp', 'TPMS', 'ICAR Ellisafe', 'An toàn ô tô'],
    views: 4350
  },
  {
    id: 'post-floor-mats-tpe',
    title: 'Phân Biệt Các Loại Thảm Sàn Ô Tô: Thảm Nhựa Đúc TPE, Thảm 360 Tràn Viền & Thảm 6D Loại Nào Tốt?',
    slug: 'phan-biet-cac-loai-tham-san-o-to-tpe-360',
    excerpt: 'So sánh chi tiết ưu nhược điểm giữa thảm đúc TPE nguyên sinh không mùi, thảm da 360 tràn viền full carbon và thảm 6D để chọn đúng loại lót sàn bảo vệ xe tối đa.',
    content: `
Sàn nỉ nguyên bản của xe rất dễ hút nước, bám bùn đất và sinh ra mùi ẩm mốc khó chịu nếu không được bảo vệ bởi một bộ thảm lót sàn chất lượng.

### 1. Thảm nhựa đúc khuôn TPE nguyên sinh (Xu hướng mới):
- **Ưu điểm:** 100% nhựa TPE cao cấp không mùi độc hại, chịu nhiệt tốt, chống nước tuyệt đối.
- **Thiết kế viền cao:** Giữ trọn nước mưa và cát bụi trong lòng thảm, dễ dàng tháo rời xịt rửa và khô ngay sau 5 phút.
- **Độ bền:** Lên đến 10 năm không biến dạng.

### 2. Thảm da 360 độ tràn viền Full Carbon:
- **Ưu điểm:** May đo thủ công ôm khít 100% sàn xe từ chân vách đến gầm ghế, tạo vẻ đẹp sang trọng, đẳng cấp như nội thất xe Maybach.
- **Khả năng cách âm:** Giảm một phần tiếng ồn dội từ gầm xe lên khoang lái.

### 3. Thảm 5D/6D truyền thống:
- Giá thành mềm, êm chân nhưng cần vệ sinh kỹ lớp rối trên bề mặt định kỳ.

### Lời khuyên:
Nếu xe thường xuyên chở gia đình, trẻ nhỏ hoặc đi trời mưa nhiều, thảm TPE hoặc thảm 360 tràn viền là sự đầu tư xứng đáng nhất.
    `,
    coverImage: '/images/huvi_tpe_mat_mgzs.jpg',
    category: 'Thảm Sàn & Ghế Da',
    date: '2026-08-01',
    author: 'Lê Quang Huy',
    readTime: '5 phút đọc',
    tags: ['Thảm lót sàn', 'Thảm TPE', 'Thảm sàn 360', 'Chống mùi xe'],
    views: 4190
  },
  {
    id: 'post-electric-seat-massage',
    title: 'Độ Ghế Chỉnh Điện 10 Hướng & Hệ Thống Quạt Mát Lưng, Massage: Biến Ghế Xe Thành Khoang Hạng Nhất',
    slug: 'do-ghe-chinh-dien-quat-mat-lung-massage',
    excerpt: 'Nâng cấp cụm mô tơ ghế chỉnh điện đa hướng, nhớ vị trí ghế lái, quạt thông gió làm mát lưng ghế mùa hè và hệ thống đệm khí massage xoa bóp cột sống.',
    content: `
Việc phải gạt cần cơ điều chỉnh ghế nặng nề hoặc tình trạng nóng bức đổ mồ hôi lưng khi lái xe mùa hè luôn gây cảm giác mệt mỏi cho tài xế.

### 1. Nâng cấp bộ ghế chỉnh điện 6 - 10 - 12 hướng:
- **Tùy biến tư thế chuẩn công thái học:** Tiến - lùi, nâng - hạ mông, ngả lưng ghế, nâng đùi và bơm đỡ thắt lưng chống đau mỏi cột sống.
- **Nhớ vị trí ghế lái 2 - 3 cấu hình:** Tự động điều chỉnh về tư thế ngồi quen thuộc của từng tài xế chỉ với 1 nút bấm.
- **Tính năng lùi ghế tự động (Easy Entry):** Khi tắt máy, ghế tự động lùi về sau để tài xế bước ra vào xe rộng rãi, thuận tiện.

### 2. Hệ thống quạt gió làm mát lưng ghế:
- Quạt tuabin hút luồng gió mát từ điều hòa thổi trực tiếp qua các lỗ đục CNC trên bề mặt da ghế.
- Giải nhiệt tức thì, giữ lưng áo luôn khô thoáng ngay cả trong những ngày nắng nóng đỉnh điểm 40°C.

### 3. Đệm khí massage đa điểm:
- 8 túi khí nén liên tục co bóp nhẹ nhàng dọc sống lưng, kích thích tuần hoàn máu và giảm đau nhức vai gáy khi di chuyển hành trình dài.
    `,
    coverImage: '/images/uniseat_ghe_dien_limo_green.jpg',
    category: 'Thảm Sàn & Ghế Da',
    date: '2026-07-30',
    author: 'Lê Quang Huy',
    readTime: '6 phút đọc',
    tags: ['Ghế điện', 'Ghế massage', 'Quạt mát lưng ghế', 'Ghế công thái học'],
    views: 4670
  },
  {
    id: 'post-parking-sensor-icar',
    title: 'Cảm Biến Đỗ Xe Tiến & Lùi ICAR Ellisen: Đo Khoảng Cách Chính Xác & Hiển Thị Màn Hình ODO Nguyên Bản',
    slug: 'cam-bien-do-xe-tien-lui-icar-ellisen',
    excerpt: 'Giải pháp hỗ trợ đỗ xe an toàn trong ngõ hẻm: 4-8 mắt cảm biến siêu âm chống nước, cảnh báo âm thanh đa cấp độ và tích hợp giao diện màn hình taplo zin.',
    content: `
Góc chết đầu xe và đuôi xe là những khu vực tài xế hoàn toàn không thể quan sát bằng mắt thường, rất dễ va vào bồn hoa, cọc tiêu hoặc các vật cản thấp.

### 1. Công nghệ cảm biến đỗ xe thế hệ mới ICAR Ellisen S40 / E48:
- **Mắt cảm biến siêu âm dẹt nguyên bản (Zin style):** Đục lỗ phẳng khít mí với ba-đờ-sốc zin như xe nguyên bản xuất xưởng từ nhà máy.
- **Khả năng nhận diện vật cản từ khoảng cách 0.3m - 1.5m:** Tự động phát hiện chướng ngại vật phía trước và phía sau xe.
- **Cảnh báo âm thanh đa cấp độ:** Âm bíp ngắt quãng càng dồn dập khi khoảng cách đến vật cản càng thu hẹp, giúp tài xế phản xạ phanh kịp thời.

### 2. Hiển thị thông minh không cần màn hình phụ:
- Đồng bộ hiển thị trực tiếp lên màn hình đồng hồ ODO trung tâm của xe hoặc tích hợp mượt mà vào màn hình Android.
- Tự động kích hoạt khi cài số lùi (R) hoặc khi xe di chuyển ở tốc độ chậm dưới 15km/h trong phố đông.
    `,
    coverImage: '/images/icar_ellisen_s40_poster.jpg',
    category: 'Camera & Màn Hình',
    date: '2026-07-29',
    author: 'Trần Minh Tuấn',
    readTime: '4 phút đọc',
    tags: ['Cảm biến lùi', 'Cảm biến đỗ xe', 'ICAR Ellisen', 'Cảm biến trước'],
    views: 3820
  },
  {
    id: 'post-ev-battery-plate',
    title: 'Tại Sao Chủ Xe Điện Cần Lắp Giáp Bảo Vệ Pin? Chống Va Đập & Bảo Vệ Cụm Pin Gầm Cho VinFast VF3, VF5, VF6, VF8, VF9',
    slug: 'tai-sao-can-lap-giap-bao-ve-pin-xe-dien',
    excerpt: 'Cụm pin gầm là bộ phận đắt giá nhất trên xe điện. Tìm hiểu lý do tại sao tấm giáp bảo vệ pin hợp kim nhôm-magie/thép cường lực là trang bị sinh tồn cho xe điện.',
    content: `
Trên các dòng xe điện như VinFast VF3, VF5, VF6, VF7, VF8, VF9 hay Hyundai Ioniq, toàn bộ cụm pin cao áp được bố trí trải dài dưới đáy gầm xe để tối ưu trọng tâm.

### 1. Mối nguy hại đối với cụm pin dưới gầm xe:
- **Cạ gầm khi leo lề, qua gờ giảm tốc cao hoặc đường mấp mô:** Có thể làm móp méo hoặc rách vỏ bảo vệ pin.
- **Đá văng trên cao tốc:** Những viên đá sắc nhọn văng với vận tốc lớn có thể đâm xuyên tấm ốp nhựa mỏng của nhà sản xuất.
- **Chi phí thay pin cực đắt:** Chi phí thay thế hoặc sửa chữa một cụm pin bị tổn hại vật lý có thể lên tới hàng trăm triệu đồng và thường bị hãng từ chối bảo hành do lỗi va chạm ngoại lực.

### 2. Ưu điểm của Tấm Giáp Bảo Vệ Pin Xe Điện:
- **Chất liệu hợp kim Nhôm - Magie hàng không hoặc Thép mangan cường lực:** Siêu bền, phân tán lực va đập cực tốt mà không làm tăng quá nhiều trọng lượng xe.
- **Thiết kế chuẩn form theo từng dòng xe:** Bắt ốc vào các lỗ chờ zin trên khung gầm, tuyệt đối không khoan cắt đục khoét sườn xe.
- **Tối ưu tản nhiệt & thoát nước:** Thiết kế các khe thoáng khí chuẩn khí động học, không ảnh hưởng đến khả năng tản nhiệt tự nhiên của khối pin.
- **Sơn tĩnh điện chống ăn mòn:** Bền bỉ trước bùn đất, muối biển và nước mưa.
    `,
    coverImage: '/images/vf6_battery_shield_poster.jpg',
    category: 'Xe Điện & Bảo Vệ Gầm',
    date: '2026-07-28',
    author: 'Nguyễn Hiếu',
    readTime: '6 phút đọc',
    tags: ['Bảo vệ pin xe điện', 'Giáp gầm xe điện', 'VinFast VF3', 'VinFast VF5', 'VinFast VF6', 'VinFast VF8'],
    views: 6540
  },
  {
    id: 'post-led-canh-chim',
    title: 'Độ Đèn LED Cánh Chim Nhận Diện VinFast: Hiệu Ứng Chào Đón & Xi Nhan Chạy Tuần Tự Cực Đẹp',
    slug: 'do-den-led-canh-chim-nhan-dien-vinfast',
    excerpt: 'Hướng dẫn nâng cấp dải LED cánh chim phát sáng mặt ca-lăng và đuôi xe VinFast (VF3, VF5, VF6, Fadil, Lux), tích hợp hiệu ứng đồ họa chào mừng và xi-nhan chạy sang trọng.',
    content: `
Dải LED cánh chim hình chữ V đặc trưng là biểu tượng nhận diện thương hiệu đầy tự hào của các dòng xe VinFast. Tuy nhiên, trên một số phiên bản tiêu chuẩn (Base/Eco) của VF3, VF5, VF6 hoặc Fadil, chi tiết này chỉ là ốp nhựa mạ chrome tĩnh không phát sáng.

### 1. Tính năng nổi bật của bộ LED cánh chim thế hệ mới:
- **Hiệu ứng đồ họa chào đón (Welcome Light):** Khi bấm mở khóa Smartkey, dải LED quét ánh sáng mượt mà từ tâm chữ V lan tỏa sang hai bên cánh chim cực kỳ ấn tượng.
- **Xi-nhan chạy đuổi tuần tự (Sequential Turn Signal):** Khi bật xi-nhan, ánh sáng vàng chuyển động liền mạch báo hướng rẽ rõ ràng, tăng độ an toàn khi chuyển làn.
- **Đèn định vị ban ngày DRL:** Tăng khả năng nhận diện xe từ xa trong điều kiện mưa mù hoặc nhá nhem tối.
- **Chế độ phát sáng tĩnh:** Khi bật đèn pha cos ban đêm, dải LED chuyển sang chế độ sáng trắng thanh lịch, đồng bộ với cụm đèn chính.

### 2. Tiêu chuẩn thi công chuẩn Zin tại Hieu N Auto:
- Sử dụng dải LED uốn định hình đúc nguyên khối chống nước chuẩn IP68.
- Cắm giắc chuyển tiếp theo xe 100%, không cắt dây điện gốc, không can thiệp hệ thống điều khiển ECU của xe.
    `,
    coverImage: '/images/led_canhchim_vinfast_on.jpg',
    category: 'LED & Ánh Sáng',
    date: '2026-07-26',
    author: 'Phạm Hoàng Nam',
    readTime: '5 phút đọc',
    tags: ['LED cánh chim', 'LED VinFast', 'VinFast VF3', 'VinFast VF5', 'Hiệu ứng chào đón'],
    views: 5890
  },
  {
    id: 'post-hud-display',
    title: 'Trải Nghiệm Màn Hình Hiển Thị Kính Lái HUD Thông Minh: Lái Xe Không Cần Cúi Đầu & Cảnh Báo Tốc Độ Chuẩn Xác',
    slug: 'trai-nghiem-man-hinh-hien-thi-kinh-lai-hud',
    excerpt: 'Tại sao HUD (Head-Up Display) là trang bị an toàn hàng đầu giúp tài xế theo dõi tốc độ, vòng tua máy, áp suất lốp và cảnh báo quá tốc độ ngay trên kính lái.',
    content: `
Khi di chuyển với tốc độ 80 - 120 km/h trên cao tốc, chỉ cần 1 giây cúi đầu nhìn đồng hồ công-tơ-mét, chiếc xe đã trôi đi hơn 25 - 33 mét trong trạng thái mất tập trung. Màn hình hiển thị kính lái HUD chính là công nghệ xuất phát từ buồng lái máy bay chiến đấu giúp giải quyết triệt để rủi ro này.

### 1. Các thông số hiển thị quan trọng trên HUD thông minh MCD91:
- **Vận tốc xe tức thời (km/h):** Hiển thị chữ số sắc nét, rõ ràng dưới ánh nắng gắt nhờ cảm biến tự động điều chỉnh độ sáng.
- **Cảnh báo quá tốc độ & Camera phạt nguội:** Phát tín hiệu âm thanh và nhấp nháy màu đỏ khi tài xế chạy quá tốc độ cho phép trên từng đoạn đường.
- **Hiển thị áp suất lốp & nhiệt độ lốp (TPMS):** Cảnh báo ngay lập tức khi lốp bị dính đinh, non hơi hoặc nhiệt độ lốp quá cao.
- **Dung lượng pin xe điện (%):** Tích hợp thông minh hiển thị % pin và số km còn lại cho các dòng xe VinFast VF3, VF5, VF6, VF8...
- **Vòng tua máy, nhiệt độ nước làm mát, điện áp ắc quy:** Giúp chủ xe kiểm soát tình trạng vận hành động cơ mọi lúc.

### 2. Cơ chế kết nối:
Cắm cổng OBD2 hoặc GPS tích hợp sẵn trên xe, tự động bật khi khởi động xe và tự động tắt sau khi tắt máy, không tiêu hao bình ắc-quy.
    `,
    coverImage: '/images/hud_mcd91_vinfast_poster.jpg',
    category: 'Cốp Điện & Tiện Ích',
    date: '2026-07-25',
    author: 'Nguyễn Hiếu',
    readTime: '5 phút đọc',
    tags: ['HUD', 'HUD kính lái', 'Cảnh báo tốc độ', 'MCD91', 'OBD2'],
    views: 4780
  },
  {
    id: 'post-nappa-seats',
    title: 'Quy Trình Bọc Ghế Da Nappa May Đo Thủ Công: Đỉnh Cao Vật Liệu Nội Thất Ô Tô Đẳng Cấp Thương Gia',
    slug: 'quy-trinh-boc-ghe-da-nappa-may-do-thu-cong',
    excerpt: 'Trải nghiệm sự êm ái của da Nappa Ý nguyên tấm, kỹ thuật dập lỗ thông hơi CNC thoáng mát và các phong cách phối màu may đo tinh xảo theo sở thích riêng.',
    content: `
Bộ ghế da là điểm nhấn trung tâm quyết định đến 70% vẻ đẹp thẩm mỹ và sự thoải mái của toàn bộ khoang nội thất xe hơi.

### 1. Da Nappa Ý - Đỉnh cao vật liệu nội thất:
- Da Nappa được tuyển chọn từ những tấm da bò tốt nhất, thuộc da bằng công nghệ hữu cơ thân thiện, giữ nguyên độ mềm mịn tự nhiên.
- Khả năng đàn hồi tuyệt hảo, bề mặt thoáng khí không gây nóng rát lưng khi lái xe đường dài.
- Kháng bám bẩn, dễ dàng lau chùi vệ sinh và không để lại mùi hôi khó chịu.

### 2. Kỹ thuật may đo thủ công tinh hoa tại Hieu N Auto:
- **Dập lỗ thoáng khí CNC:** Họa tiết quả trám, lục giác kim cương tạo vẻ đẹp quý phái và thông thoáng khí tối đa.
- **Đường may mũi chỉ đôi tăm tắp:** Thực hiện bởi đội ngũ thợ may lành nghề hơn 10 năm kinh nghiệm.
- **Phối màu cá nhân hóa:** Đa dạng tone màu sang trọng như Nâu da bò Hermes, Kem Macchiato, Đỏ rượu vang Bordeaux, Đen chỉ tương phản hoặc phối 2 màu thể thao.
    `,
    coverImage: '/images/nappa_seat_poster.webp',
    category: 'Thảm Sàn & Ghế Da',
    date: '2026-07-24',
    author: 'Lê Quang Huy',
    readTime: '6 phút đọc',
    tags: ['Ghế da Nappa', 'Bọc ghế da', 'Nội thất xe hơi', 'May đo thủ công'],
    views: 5120
  },
  {
    id: 'post-phay-lazang-cnc',
    title: 'Phay Phục Hồi Lazang Mâm Xe Ô Tô Bằng Máy CNC Laser: Khắc Phục Vết Xước, Đẹp Như Mâm Mới Xuất Xưởng',
    slug: 'phay-phuc-hoi-lazang-mam-xe-o-to-cnc',
    excerpt: 'Giải pháp xử lý triệt để các vết trầy xước mâm lazang do cạ vỉa hè bằng công nghệ quét laser 3D và tiện phay kim cương CNC độ chính xác micro.',
    content: `
Trong quá trình di chuyển và đỗ xe tại các đô thị, việc mâm lazang bị cạ vào vỉa hè hoặc đá văng làm trầy xước, mất đi vẻ sáng bóng là điều khó tránh khỏi.

### 1. Công nghệ phay mâm CNC kim cương hiện đại:
- **Đầu quét quang học Laser 3D:** Quét biên dạng bề mặt mâm xe với độ chính xác đến 0.01mm, vẽ lại chính xác 100% đường cong nguyên bản của nhà sản xuất.
- **Dao cắt kim cương siêu tinh xảo:** Bào đi lớp xước mỏng nhất có thể (chỉ từ 0.05 - 0.1mm), không làm ảnh hưởng đến độ dày và khả năng chịu lực của kết cấu mâm.
- **Tạo lại đường phay xước đồng tâm nguyên bản:** Mang lại ánh kim loại 7 màu lấp lánh như vừa xuất xưởng từ nhà máy sản xuất xe.

### 2. Phủ men bóng Ceramic bảo vệ 2K:
Sau khi phay CNC, mâm xe được sấy nhiệt và phủ lớp men gốm Ceramic chống ố vàng, ngăn ngừa rỉ sét và chống bám bụi phanh hiệu quả.
    `,
    coverImage: '/images/phay_lazang_honda_wheel.jpg',
    category: 'Cốp Điện & Tiện Ích',
    date: '2026-07-20',
    author: 'Nguyễn Hiếu',
    readTime: '4 phút đọc',
    tags: ['Phay lazang', 'Phục hồi mâm xe', 'CNC Laser', 'Mâm xe ô tô'],
    views: 3290
  }
];


export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'Anh Dương Leo',
    carModel: 'Mercedes-Benz E300 AMG',
    serviceUsed: 'Camera 360 & MHU',
    rating: 5,
    comment: 'Cực kỳ hài lòng với tay nghề của xưởng Hieu N Auto! Độ nét của Camera 360 trên màn hình cực đỉnh, căn lề và lùi xe chuẩn xác 100%. Đội ngũ anh Hiếu tư vấn rất nhiệt tình và chu đáo.',
    avatar: duongLeoAvatar,
    date: '15/08/2026',
    verified: true
  },
  {
    id: 'test-2',
    customerName: 'Chị Thu Huệ',
    carModel: 'VinFast VF8 Plus',
    serviceUsed: 'Nâng Cấp Bi Gầm',
    rating: 5,
    comment: 'Lắp bộ Bi Gầm ánh sáng gom cắt phẳng lì không hề gây chói mắt xe đối diện, đi trời mưa và sương mù bám đường cực kỳ tốt. Thi công cắm giắc Zin nhanh chóng, chuẩn giờ hẹn bàn giao xe.',
    avatar: thuHueAvatar,
    date: '02/08/2026',
    verified: true
  },
  {
    id: 'test-3',
    customerName: 'Anh Nguyễn Đăng Đức',
    carModel: 'Toyota Fortuner Legender',
    serviceUsed: 'Phim Cách Nhiệt',
    rating: 5,
    comment: 'Dán gói Phim Cách Nhiệt gốm Nano Ceramic đi trời nắng gắt giảm nhiệt rõ rệt, điều hòa mát nhanh và không bị chói mắt. Tay nghề thợ dán rất khéo, không hề bị bọt khí hay bụi.',
    avatar: ducAvatar,
    date: '22/07/2026',
    verified: true
  },
  {
    id: 'test-4',
    customerName: 'Anh Hưng',
    carModel: 'Hyundai SantaFe Calligraphy',
    serviceUsed: 'SUB Gầm Ghế',
    rating: 5,
    comment: 'Lắp thêm quả SUB Gầm Ghế âm bass đánh chắc nịch, nghe nhạc EDM hay Bolero đều đượm và có lực hơn hẳn dàn zin. Thi công giấu dây gọn gàng, không chiếm diện tích xe.',
    avatar: hungAvatar,
    date: '10/07/2026',
    verified: true
  }
];

export const COMPANY_INFO = {
  brandName: 'Hieu N Auto',
  companyName: 'XƯỞNG NÂNG CẤP Ô TÔ HIEU N AUTO',
  taxId: '026205004828',
  taxAuthority: 'Thuế cơ sở 9 tỉnh Phú Thọ (Vĩnh Phúc cũ)',
  businessLicense: '01A8029384 cấp ngày 15/03/2021 bởi Sở KH&ĐT TP. Hà Nội',
  hotline: '0397.063.419',
  hotlineSecondary: '0966.777.999',
  email: 'nguyenhieu08vp@gmail.com',
  supportEmail: 'nguyenhieu08vp@gmail.com',
  mainAddress: 'Chung cư M1 Masteri Waterfront, Vinhomes Ocean Park, Gia Lâm, Hà Nội',
  branchAddress: '50 Nguyễn Hữu Thọ, Đại Kim, Hoàng Mai, Hà Nội',
  workingHours: '08:00 - 17:00 (Thứ 2 - Chủ Nhật)',
  copyright: '© 2026 Hieu N Auto. Tất cả các quyền được bảo lưu.'
};

export const FORMAT_CURRENCY = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
};
