import { Container, Logo, LogoutBtn } from '../index'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const authStatus = useSelector(state => state.auth.isAuthenticated)
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
                    className='inline-bock px-6 py-2 duration-200 hover:bg-gray-300 hover:text-gray-950 rounded-full cursor-pointer'
                >{item.name}</button>
            </li>
        ) : null
    )


    return (
        <header className='py-3 shadow bg-gray-950 text-white'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />

                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItemsElements}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
