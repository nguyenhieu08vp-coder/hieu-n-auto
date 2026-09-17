import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CornerUpLeft, History } from 'lucide-react';
import { HistoryEntry, PAGE_TITLES, PageId } from '../types';

interface BackButtonProps {
  canGoBack: boolean;
  previousEntry?: HistoryEntry | null;
  historyList: HistoryEntry[];
  onGoBack: () => void;
  currentPage: PageId;
}

export const BackButton: React.FC<BackButtonProps> = ({
  canGoBack,
  previousEntry,
  historyList,
  onGoBack,
  currentPage,
}) => {
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Target label for the previous section / page
  const prevTitle = previousEntry?.title || (currentPage !== 'home' ? PAGE_TITLES.home : 'Phần trước');

  // Keyboard shortcut listener: Alt + ArrowLeft or Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if ((e.altKey && e.key === 'ArrowLeft') || (e.key === 'Backspace' && e.altKey)) {
        e.preventDefault();
        if (canGoBack) {
          onGoBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoBack, onGoBack]);

  if (!canGoBack && currentPage === 'home') {
    return null;
  }

  return (
    <div 
      className="fixed bottom-6 left-6 z-30 pointer-events-auto flex flex-col items-start gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowHistoryDropdown(false);
      }}
    >
      {/* History Trail Tooltip / Dropdown */}
      <AnimatePresence>
        {showHistoryDropdown && historyList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="mb-2 p-3 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl w-64 max-w-[85vw]"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 pb-2 border-b border-slate-800">
              <History className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lịch sử các phần đã xem</span>
            </div>
            <div className="mt-2 space-y-1 max-h-48 overflow-y-auto pr-1">
              {historyList.slice(-4).reverse().map((entry, idx) => (
                <div
                  key={`${entry.page}-${entry.timestamp}-${idx}`}
                  className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg bg-slate-950/60 border border-slate-800/60 text-slate-300 hover:text-white"
                >
                  <span className="truncate">{entry.title}</span>
                  <span className="text-[10px] text-slate-500 ml-2 whitespace-nowrap">
                    {idx === 0 ? 'Vừa xem' : `${idx + 1} bước trước`}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating "Quay lại" Button with Interactive Spring Motion */}
      <motion.button
        id="floating-back-btn"
        onClick={onGoBack}
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -20, scale: 0.9 }}
        whileHover={{ scale: 1.04, x: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-emerald-400/60 shadow-xl shadow-slate-950/60 backdrop-blur-md cursor-pointer transition-all duration-200"
        title={`Quay lại: ${prevTitle} (Phím tắt: Alt + ←)`}
      >
        {/* Subtle glowing ring on hover */}
        <span className="absolute inset-0 rounded-2xl bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Animated Left Arrow Icon with Directional Glide */}
        <motion.div
          animate={isHovered ? { x: [-1, -4, -1] } : { x: 0 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
          className="w-7 h-7 rounded-xl bg-slate-800 group-hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </motion.div>

        {/* Label & Target Info */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
              Quay lại
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 hidden sm:inline-block">
              Alt + ←
            </span>
          </div>
          <span className="text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-[180px] leading-tight">
            {prevTitle}
          </span>
        </div>

        {/* History Stack Indicator Count if > 1 */}
        {historyList.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowHistoryDropdown(!showHistoryDropdown);
            }}
            className="p-1 rounded-lg hover:bg-slate-700/80 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
            title="Xem danh sách các trang đã duyệt"
          >
            <History className="w-3.5 h-3.5" />
          </button>
        )}
      </motion.button>
    </div>
  );
};
