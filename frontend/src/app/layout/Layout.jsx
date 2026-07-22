import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import { Heart, Search  } from 'lucide-react';

const navLinks = [
    { label: 'Procurar', to: "/procurar", icon: Search, iconOnly: true, className: "text-gray-400"},
    { label: 'Favoritos', to: "/favoritos", icon: Heart, iconOnly: true, className: "text-gray-400"},
    // { label: 'Carrinho', to: "/carrinho", icon: ShoppingBag, iconOnly: true},
    // { label: "Inicio", to: "/" },
    { label: "Criar Conta | Iniciar Sessão", to: "/registar", className: "bg-register rounded-full text-gray-400 py-1 px-4 lowercase"},
    { label: "Sou Artesão", to: "/login-artesao", className: "bg-gray-500 text-white rounded-full py-1 px-4" }
]

export default function Layout() {
    return (
        <>
            <NavBar brand={{ to: '/', label: 'Muralis' }} links={navLinks} />
            <main>
                <Outlet />
            </main>
        </>
    )
}