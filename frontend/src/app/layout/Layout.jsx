import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import SearchIcon from '../../assets/icons/search-icon.svg?react';
import FavoriteIcon from '../../assets/icons/favorites-icon.svg?react'

const navLinks = [
    { label: 'Procurar', to: "/procurar", icon: SearchIcon, iconOnly: true},
    { label: 'Favoritos', to: "/favoritos", icon: FavoriteIcon, iconOnly: true},
    { label: "Criar Conta | Iniciar Sessão", to: "/registar", className: "bg-register rounded-full text-gray-500 py-1 px-4 lowercase"},
    { label: "Sou Artesão", to: "/login-artesao", className: "bg-gray-500 text-white rounded-full py-1 px-4 lowercase" }
]

export default function Layout() {
    return (
        <>
            <NavBar brand={{ to: '/', label: 'Mura.lis' }} links={navLinks} />
            <main>
                <Outlet />
            </main>
        </>
    )
}