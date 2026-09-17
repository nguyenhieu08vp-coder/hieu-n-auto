import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, PolicyTab, Product, CartItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [policyTab, setPolicyTab] = useState<PolicyTab>('privacy');

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

  // Smoothly reset scroll position when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

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
    setCurrentPage('policies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 1. Header (Fixed navigation with Logo, Pages, Cart, Search, Hotline) */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        openCart={() => setIsCartOpen(true)}
        openConsultation={() => openConsultationWithDetails()}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. Main Body View Rendering with Smooth Transition Effects */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full smooth-gpu"
          >
            {currentPage === 'home' && (
              <HomeView
                setCurrentPage={setCurrentPage}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                openConsultation={openConsultationWithDetails}
              />
            )}

            {currentPage === 'about' && (
              <AboutView
                setCurrentPage={setCurrentPage}
                openConsultation={() => openConsultationWithDetails()}
              />
            )}

            {currentPage === 'products' && (
              <ProductsView
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}

            {currentPage === 'blog' && (
              <BlogView
                setCurrentPage={setCurrentPage}
                openConsultation={(car, srv) => openConsultationWithDetails(car, srv)}
              />
            )}

            {currentPage === 'contact' && <ContactView />}

            {currentPage === 'policies' && (
              <PoliciesView
                activeTab={policyTab}
                setActiveTab={setPolicyTab}
                setCurrentPage={setCurrentPage}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer (Legal information, Policies hyperlinks, Copyright) */}
      <Footer
        setCurrentPage={setCurrentPage}
        openPolicyTab={openPolicyTabDirectly}
      />

      {/* 4. Cart Drawer Flyout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 5. Product Quick View Detail Modal with exit animation */}
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

      {/* 6. Quick Consultation Popup Modal */}
      <QuickConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultCarModel={consultationCarModel}
        defaultService={consultationService}
      />

      {/* 7. Floating Fast Action Widget (Hotline & Consultation Floating Action) */}
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
