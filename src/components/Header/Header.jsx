import { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const authStatus = useSelector(state => state.auth.isAuthenticated)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "User Posts",
            slug: "/user-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    const navItemsElements = navItems.map((item) =>
        item.active ? (
            <li key={item.name}>
                <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-3 py-2 md:px-6 duration-200 hover:bg-gray-300 hover:text-gray-950 rounded-full cursor-pointer text-sm md:text-base'
                >{item.name}</button>
            </li>
        ) : null
    )


    return (
        <header className='py-3 shadow bg-gray-950 text-white sticky top-0 z-50'>
            <Container>
                <nav className='flex items-center justify-between gap-2'>
                    <div className='mr-2 md:mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />

                        </Link>
                    </div>
                    {/* Desktop nav */}
                    <ul className='hidden md:flex ml-auto items-center gap-2 md:gap-1'>
                        {navItemsElements}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                    {/* Mobile hamburger */}
                    <div className='md:hidden ml-auto'>
                        <button
                            aria-label='Open menu'
                            className='p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white'
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                        >
                            <span className='block w-6 h-0.5 bg-white mb-1'></span>
                            <span className='block w-6 h-0.5 bg-white mb-1'></span>
                            <span className='block w-6 h-0.5 bg-white'></span>
                        </button>
                    </div>
                </nav>
                {/* Mobile dropdown */}
                {isMobileMenuOpen && (
                    <div className='md:hidden mt-2 bg-gray-900 rounded-lg p-2'>
                        <ul className='flex flex-col gap-1'>
                            {navItemsElements}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </Container>
        </header>
    )
}
