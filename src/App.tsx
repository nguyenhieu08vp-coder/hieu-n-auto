import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, PolicyTab, Product, CartItem, HistoryEntry, PAGE_TITLES } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackButton } from './components/BackButton';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickConsultationModal } from './components/QuickConsultationModal';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProductsView } from './views/ProductsView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';
import { PoliciesView } from './views/PoliciesView';

import { COMPANY_INFO } from './data/mockData';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

const pageTransitionVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 45 : dir < 0 ? -45 : 0,
    opacity: 0,
    scale: 0.995,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 340, damping: 30 },
      opacity: { duration: 0.22, ease: 'easeOut' },
      scale: { duration: 0.2 },
    },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 45 : -45,
    opacity: 0,
    scale: 0.995,
    transition: {
      x: { type: 'spring', stiffness: 340, damping: 30 },
      opacity: { duration: 0.18, ease: 'easeIn' },
    },
  }),
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [policyTab, setPolicyTab] = useState<PolicyTab>('privacy');
  
  // Navigation history stack for "Quay lại phần trước"
  const [historyStack, setHistoryStack] = useState<HistoryEntry[]>([]);
  // Direction: 1 for forward, -1 for backward, 0 for initial
  const [direction, setDirection] = useState<number>(0);

  // Shopping cart with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hieunauto_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationCarModel, setConsultationCarModel] = useState<string>('');
  const [consultationService, setConsultationService] = useState<string>('Bọc ghế da Nappa cao cấp');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Navigate to a new page while recording the previous section into history
  const navigateTo = useCallback((nextPage: PageId) => {
    if (nextPage === currentPage) return;

    const currentEntry: HistoryEntry = {
      page: currentPage,
      scrollY: window.scrollY,
      title: PAGE_TITLES[currentPage] || 'Trang Chủ',
      timestamp: Date.now(),
    };

    setHistoryStack((prev) => [...prev, currentEntry]);
    setDirection(1); // Moving forward
    setCurrentPage(nextPage);

    try {
      window.history.pushState({ page: nextPage }, '', `#${nextPage}`);
    } catch {
      // ignore
    }
  }, [currentPage]);

  // Smooth "Go Back to Previous Section / Page" with directional slide animation
  const handleGoBack = useCallback(() => {
    if (historyStack.length > 0) {
      const previous = historyStack[historyStack.length - 1];
      setDirection(-1); // Moving backward: smooth reverse spatial slide
      setCurrentPage(previous.page);
      setHistoryStack((prev) => prev.slice(0, -1));

      try {
        window.history.replaceState({ page: previous.page }, '', `#${previous.page}`);
      } catch {
        // ignore
      }

      // Smoothly restore previous scroll position or view section
      setTimeout(() => {
        if (previous.scrollY > 40) {
          window.scrollTo({ top: previous.scrollY, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else if (currentPage !== 'home') {
      setDirection(-1);
      setCurrentPage('home');
      try {
        window.history.replaceState({ page: 'home' }, '', '#home');
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [historyStack, currentPage]);

  // Browser back button / gesture listener (popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        setDirection(-1);
        setCurrentPage(e.state.page);
      } else {
        handleGoBack();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleGoBack]);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hieunauto_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When navigating forward, scroll to top
  useEffect(() => {
    if (direction >= 0) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentPage, direction]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleAddToCart = (product: Product, selectedColor?: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id && item.selectedColor === selectedColor);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedColor }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const openConsultationWithDetails = (carModel?: string, service?: string) => {
    if (carModel) setConsultationCarModel(carModel);
    if (service) setConsultationService(service);
    setIsConsultationOpen(true);
  };

  const openPolicyTabDirectly = (tab: PolicyTab) => {
    setPolicyTab(tab);
    navigateTo('policies');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const previousEntry = historyStack.length > 0 ? historyStack[historyStack.length - 1] : null;
  const canGoBack = historyStack.length > 0 || currentPage !== 'home';
  const previousPageTitle = previousEntry?.title || (currentPage !== 'home' ? 'Trang Chủ' : undefined);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 1. Header (Fixed navigation with Logo, Pages, Back Button, Cart, Search, Hotline) */}
      <Header
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        openCart={() => setIsCartOpen(true)}
        openConsultation={() => openConsultationWithDetails()}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        canGoBack={canGoBack}
        previousPageTitle={previousPageTitle}
        onGoBack={handleGoBack}
      />

      {/* 2. Main Body View Rendering with Direction-Aware Smooth Transition Effects */}
      <main className="flex-1 overflow-x-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageTransitionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full smooth-gpu"
          >
            {currentPage === 'home' && (
              <HomeView
                setCurrentPage={navigateTo}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                openConsultation={openConsultationWithDetails}
              />
            )}

            {currentPage === 'about' && (
              <AboutView
                setCurrentPage={navigateTo}
                openConsultation={() => openConsultationWithDetails()}
                onGoBack={handleGoBack}
              />
            )}

            {currentPage === 'products' && (
              <ProductsView
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onGoBack={handleGoBack}
              />
            )}

            {currentPage === 'blog' && (
              <BlogView
                setCurrentPage={navigateTo}
                openConsultation={(car, srv) => openConsultationWithDetails(car, srv)}
                onGoBack={handleGoBack}
              />
            )}

            {currentPage === 'contact' && (
              <ContactView onGoBack={handleGoBack} />
            )}

            {currentPage === 'policies' && (
              <PoliciesView
                activeTab={policyTab}
                setActiveTab={setPolicyTab}
                setCurrentPage={navigateTo}
                onGoBack={handleGoBack}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Floating "Quay lại phần trước" Button with Trail & Shortcuts */}
      <BackButton
        canGoBack={canGoBack}
        previousEntry={previousEntry}
        historyList={historyStack}
        onGoBack={handleGoBack}
        currentPage={currentPage}
      />

      {/* 4. Footer (Legal information, Policies hyperlinks, Copyright) */}
      <Footer
        setCurrentPage={navigateTo}
        openPolicyTab={openPolicyTabDirectly}
      />

      {/* 5. Cart Drawer Flyout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 6. Product Quick View Detail Modal with exit animation */}
      <AnimatePresence>
        {quickViewProduct && (
          <ProductDetailModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={handleAddToCart}
            openConsultation={() => {
              if (quickViewProduct) {
                openConsultationWithDetails('', quickViewProduct.name);
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* 7. Quick Consultation Popup Modal */}
      <QuickConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultCarModel={consultationCarModel}
        defaultService={consultationService}
      />

      {/* 8. Floating Fast Action Widget (Hotline & Consultation Floating Action) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Floating Call Button */}
        <motion.a
          href={`tel:${COMPANY_INFO.hotline}`}
          id="floating-hotline-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl shadow-orange-500/40 flex items-center justify-center cursor-pointer"
          title="Gọi Hotline 24/7"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700 shadow-xl hidden sm:block">
            Hotline: {COMPANY_INFO.hotline}
          </span>
        </motion.a>

        {/* Scroll To Top Button with Smooth AnimatePresence */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              id="scroll-to-top-btn"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-lg backdrop-blur-md transition-colors cursor-pointer"
              title="Lên đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
