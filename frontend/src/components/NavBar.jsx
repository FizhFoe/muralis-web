import { useState } from 'react';
import { Link } from 'react-router';

export default function NavBar({ links = [], brand = { to: '/', label: 'Muralis' } }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="navbar p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to={brand.to} className='navbar-brand flex items-center gap-2.5' onClick={() => setIsOpen(false)}>
                    <span className='font-display text-xl font-semibold uppercase md:text-3xl'>
                        {brand.label}
                    </span>
                </Link>

                {/* Menu para mobile */}
                <button onClick={() => setIsOpen(!isOpen)}
                    className='text-black focus:outline-none md:hidden'>
                    {isOpen ? (
                        <span className="material-symbols-outlined">menu_open</span>
                    ) : (
                        <span className="material-symbols-outlined">menu</span>
                    )}
                </button>

                {/* Links de Navegação */}
                <div className="navbar-links hidden items-center gap-2 md:flex">
                    {links.map(({ to, label, icon: Icon, iconOnly = false, className = '' }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`text-gray-500 ${className}`.trim()}
                            aria-label={iconOnly ? label : undefined}
                            title={iconOnly ? label : undefined}
                        >
                            {                            
                                Icon && <Icon className="navbar-link-icon w-8 h-8 text-gray-500 hover:text-orange-500" />
                            }
                            {!iconOnly && label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}