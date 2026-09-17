import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Calendar, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  X, 
  Share2, 
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  ArrowLeft
} from 'lucide-react';
import { BlogPost, PageId } from '../types';
import { BLOG_POSTS } from '../data/mockData';

interface BlogViewProps {
  setCurrentPage: (page: PageId) => void;
  openConsultation: (carModel?: string, service?: string) => void;
  onGoBack?: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  setCurrentPage,
  openConsultation,
  onGoBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', name: 'Tất Cả Bài Viết' },
    { id: 'LED & Ánh Sáng', name: 'LED & Ánh Sáng' },
    { id: 'Camera & Màn Hình', name: 'Camera & Màn Hình' },
    { id: 'Phim Cách Nhiệt & Âm Thanh', name: 'Phim Cách Nhiệt & Âm Thanh' },
    { id: 'Cốp Điện & Tiện Ích', name: 'Cốp Điện & Tiện Ích' },
    { id: 'Thảm Sàn & Ghế Da', name: 'Thảm Sàn & Ghế Da' },
    { id: 'Xe Điện & Bảo Vệ Gầm', name: 'Xe Điện & Bảo Vệ Gầm' },
  ];

  const popularProductTags = [
    'LED nội thất',
    'Camera hành trình',
    'Camera 360',
    'Phim cách nhiệt',
    'Màn hình dài',
    'Tì tay phi thuyền',
    'Ghế da Nappa',
    'Gương điện',
    'Áp suất lốp',
    'Ghế điện',
    'Cảm biến lùi',
    'Cốp điện',
    'Android Box',
    'Đèn bi gầm',
    'Sub gầm ghế',
    'Thảm lót sàn',
    'Bảo vệ pin xe điện',
    'LED cánh chim',
    'HUD kính lái',
    'Phay lazang'
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (selectedTag !== 'all' && !post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchTag = post.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchTag) return false;
    }
    return true;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-16">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {onGoBack && (
              <button
                id="blog-breadcrumb-back-btn"
                onClick={onGoBack}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-medium transition-colors cursor-pointer group"
                title="Quay lại phần trước (Alt + ←)"
              >
                <ArrowLeft className="w-3 h-3 text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Quay lại</span>
              </button>
            )}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              Cẩm Nang Chuyên Sâu &amp; Tin Tức Kỹ Thuật
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cẩm Nang Nâng Cấp Nội Thất &amp; Phụ Kiện Ô Tô
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
            Tổng hợp kinh nghiệm kỹ thuật, so sánh sản phẩm và hướng dẫn chi tiết về LED nội thất, Camera hành trình, Camera 360, Phim cách nhiệt, Màn hình dài, Tì tay phi thuyền, Ghế da Nappa, Gương điện, Áp suất lốp (TPMS), Ghế điện, Cảm biến lùi, Cốp điện, Box Android, Đèn bi gầm, Sub gầm ghế, Thảm sàn, Bảo vệ pin xe điện, LED cánh chim và HUD kính lái.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Tìm theo sản phẩm, từ khóa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Category Tabs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedTag('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id && selectedTag === 'all'
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3. Quick Product Filter Cloud */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-bold mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400" />
            <span>Chủ đề sản phẩm nhanh:</span>
          </div>
          {popularProductTags.map((tag) => {
            const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    setSelectedTag('all');
                  } else {
                    setSelectedTag(tag);
                    setSelectedCategory('all');
                  }
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {(selectedTag !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedTag('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[11px] text-red-400 hover:underline ml-auto flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              Đặt lại bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* 4. Featured Big Post (Khi xem tất cả và không search/tag) */}
      {selectedCategory === 'all' && selectedTag === 'all' && !searchQuery.trim() && featuredPost && (
        <div 
          onClick={() => setActivePost(featuredPost)}
          className="relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden group cursor-pointer hover:border-emerald-500/50 transition-all duration-300 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-950 relative">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wide bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                Cẩm Nang Nổi Bật
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-emerald-400 font-semibold">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">{featuredPost.category}</span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-[10px]">
                    NH
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{featuredPost.author}</div>
                    <div className="text-[10px] text-slate-500">{featuredPost.date}</div>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Đọc cẩm nang <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Article Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Không tìm thấy bài viết phù hợp</h3>
          <p className="text-xs text-slate-400">Thử tìm kiếm với từ khóa khác như "LED", "Camera", "Phim cách nhiệt", "Cốp điện"...</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTag('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            Xem tất cả bài viết
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={`blog-card-${post.id}`}
              onClick={() => setActivePost(post)}
              className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4 text-xs">
                <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{post.views.toLocaleString()} lượt đọc</span>
                </div>
                <span className="font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 6. Full Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div 
            className="relative bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              <button
                onClick={() => setActivePost(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span>Quay lại danh sách bài viết</span>
              </button>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {activePost.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    {activePost.views.toLocaleString()} lượt quan tâm
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  {activePost.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-white font-medium">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    Tác giả: {activePost.author}
                  </span>
                  <span>•</span>
                  <span>Ngày đăng: {activePost.date}</span>
                  <span>•</span>
                  <span>Thời gian đọc: {activePost.readTime}</span>
                </div>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rich Content formatted */}
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                {activePost.content}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500" /> Tags liên quan:
                </span>
                {activePost.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* In-article CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-purple-950/70 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base">Bạn muốn thi công gói {activePost.tags[0]} cho xe của mình?</h4>
                  <p className="text-xs text-slate-300">Đội ngũ kỹ thuật viên Hieu N Auto sẵn sàng tư vấn cấu hình chuẩn zin và báo giá ưu đãi nhất.</p>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setActivePost(null);
                      openConsultation('', activePost.tags[0]);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold whitespace-nowrap shadow-lg shadow-orange-500/20 cursor-pointer"
                  >
                    Nhận Báo Giá Ngay
                  </button>
                  <button
                    onClick={() => {
                      setActivePost(null);
                      setCurrentPage('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold whitespace-nowrap border border-slate-700 cursor-pointer"
                  >
                    Xem Sản Phẩm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
