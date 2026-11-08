
'use client';

import React, { useState } from 'react';
import { X, LogIn, Home, Menu, User as UserIcon, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';
import { useAuth } from '../../lib/auth';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user, ready } = useAuth();
    const firstName = user ? user.name.trim().split(' ')[0] : '';
    
    return (
        <header className="ras-header">
            <nav className="ras-main-nav">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <ul className="ras-menu-list">
                                <li className="ras-menu-item ras-home-item">
                                    <Link href="/" className={`ras-menu-link ras-home-link d-none d-lg-flex ${pathname === '/' ? 'active' : ''}`}>
                                        <Home size={18} />
                                        <span>خانه</span>
                                    </Link>
                                    <p className="mb-0 ras-title-text">مرکز مشاوره پرتو امید</p>
                                    
                                    {/* دکمه همبرگر - فقط در موبایل و تبلت */}
                                    <button 
                                        className="ras-mobile-toggle d-lg-none"
                                        onClick={() => setIsMenuOpen(true)}
                                        aria-label="باز کردن منو"
                                    >
                                        <Menu size={28} />
                                    </button>
                                    
                                    

                                    {ready && (user ? (
                                        <Link href="/account" className={`ras-menu-link ras-account-link d-none d-lg-flex ${pathname === '/account' ? 'active' : ''}`}>
                                            <UserIcon size={18} />
                                            <span>{firstName}</span>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href="/login" className={`ras-menu-link ras-account-link d-none d-lg-flex ${pathname === '/login' ? 'active' : ''}`}>
                                                <LogIn size={18} />
                                                <span>ورود</span>
                                            </Link>
                                            <Link href="/signup" className={`ras-menu-link ras-account-link d-none d-lg-flex ${pathname === '/signup' ? 'active' : ''}`}>
                                                <UserPlus size={18} />
                                                <span>ثبت‌نام</span>
                                            </Link>
                                        </>
                                    ))}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* منوی موبایل */}
            <div
                className={`menu-overlay ras-mobile-overlay ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
            >
                <div className="ras-mobile-menu" onClick={(e) => e.stopPropagation()}>
                    <div className="ras-mobile-header">
                        <span className="ras-mobile-title">منوی سایت</span>
                        <button
                            className="ras-mobile-close"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="بستن منو"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="ras-mobile-content">
                        <div className="ras-mobile-menu-item">
                            <Link href="/" className="ras-mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
                                <Home size={18} style={{ marginLeft: '8px' }} />
                                <span>خانه</span>
                            </Link>
                        </div>
                        <div style={{ marginTop: '20px', padding: '15px', borderTop: '1px solid #eaeaea' }}>
                            {user ? (
                                <Link href="/account" className="ras-mobile-menu-link" style={{ color: '#ffb726' }} onClick={() => setIsMenuOpen(false)}>
                                    <UserIcon size={18} style={{ marginLeft: '8px' }} />
                                    حساب کاربری ({firstName})
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="ras-mobile-menu-link" style={{ color: '#ffb726' }} onClick={() => setIsMenuOpen(false)}>
                                        <LogIn size={18} style={{ marginLeft: '8px' }} />
                                        ورود
                                    </Link>
                                    <Link href="/signup" className="ras-mobile-menu-link" style={{ color: '#ffb726', marginTop: '10px' }} onClick={() => setIsMenuOpen(false)}>
                                        <UserPlus size={18} style={{ marginLeft: '8px' }} />
                                        ثبت نام
                                    </Link>
                                </>
                            )}
                            <Link href="/vendor" className="ras-mobile-menu-link" style={{ color: '#ffb726', marginTop: '10px' }}>
                                <span>💰</span>
                                فروشنده شوید
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
