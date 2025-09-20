import Logo from '../Logo'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex items-center justify-between">
                    <Link to='/' className='nav-link'>
                        <Logo width='70px' />
                    </Link>
                    <p className="meta">© {new Date().getFullYear()} — All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
