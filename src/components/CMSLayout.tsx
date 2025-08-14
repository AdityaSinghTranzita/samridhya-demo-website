import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { isAllowedDomain } from '@/firebase/auth';
import { 
  LogOut, 
  ArrowLeft, 
  User, 
  Home, 
  FileText, 
  Image, 
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface CMSLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  backUrl?: string;
}

const CMSLayout: React.FC<CMSLayoutProps> = ({
  children,
  title = 'CMS',
  showBackButton = false,
  backUrl = '/cms'
}) => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/cms/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/cms', icon: Home },
    { name: 'Blog Posts', href: '/cms/blog', icon: FileText },
    { name: 'Media', href: '/cms/media', icon: Image },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Additional security check: Verify domain access
  if (user.email && !isAllowedDomain(user.email)) {
    // If somehow a user with unauthorized domain gets here, sign them out and redirect
    handleSignOut();
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            Only users with @samridhya.com or @tranzita.com email addresses can access this CMS.
          </p>
          <p className="text-sm text-gray-500">
            You will be redirected to the login page shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title} - Samridhya CMS</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left side - Logo and Back button */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {showBackButton && (
                  <Link 
                    href={backUrl} 
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">Back</span>
                  </Link>
                )}
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                    <img 
                      src="/favicon.svg" 
                      alt="Samridhya Logo" 
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">{title}</h1>
                </div>
              </div>

              {/* Center - Mobile Title */}
              <div className="flex items-center sm:hidden">
                <h1 className="text-lg font-bold text-gray-900 truncate max-w-[200px]">{title}</h1>
              </div>

              {/* Right side - Navigation and User */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-1">
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = router.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* User Profile - Desktop */}
                <div className="hidden sm:flex items-center relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        className="h-8 w-8 rounded-full border-2 border-blue-100 object-cover"
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=6366f1&color=fff`}
                        alt={user.displayName || user.email || 'User'}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=6366f1&color=fff`;
                        }}
                      />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                          {user.displayName || user.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">Administrator</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Profile - Mobile */}
                <div className="sm:hidden flex items-center space-x-2">
                  <img
                    className="h-8 w-8 rounded-full border-2 border-blue-100 object-cover"
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=6366f1&color=fff`}
                    alt={user.displayName || user.email || 'User'}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=6366f1&color=fff`;
                    }}
                  />
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm"
                >
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = router.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                    
                    {/* Mobile User Menu */}
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium text-gray-900">
                          {user.displayName || user.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-6 sm:px-0"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CMSLayout; 