import { useState } from 'react';
import { Link } from 'react-router';

const navLinks = [
    { label: "Inicio", to: "/"},
    { label: "Entrar", to: "/login"},
] 

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Nome do site */}
                <Link to="/" className="flex items-center gap-2.5" onClick={()=> setIsOpen(false)}>
                    <span className='font-display text-xl font-semibold text-ink'>MuraLis</span>
                </Link>

                {/* Menu para mobile */}
                <button onClick={() => setIsOpen(!isOpen)}
                    className='text-white focus:outline-none md:hidden'>
                    {isOpen ? (
                        <span className="material-symbols-outlined">menu_open</span>
                    ) : (
                        <span className="material-symbols-outlined">menu</span>
                    )}
                </button>

                {/* Links */}
                {/* <div
                    className={`w-full md:flex md:items-center md:w-auto md:space-x-4 absolute md:relative top-16 left-0 md:top-0 
                    md:left-0 p-4 md:p-0  md:bg-transparent transition-all duration-500 ease-in-out transform 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
                    md:translate-x-0`}>
                    
                    <Link to={link.to}>
                        
                    </Link>
                </div> */}
                <ul className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className="font-sans text-sm font-bold text-ink/80 transition-colors hover:text-azulejo">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}