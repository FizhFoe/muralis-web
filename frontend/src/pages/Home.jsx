import SlideShow from "../components/SlideShow"
import CategoriesList from "../components/CategoriesList"
import FreguesiasList from "../components/Freguesias"
import slides from '../assets/slides'
import SearchIcon from '../assets/icons/search-icon.svg?react'
import FilterIcon from '../assets/icons/filter-icon.svg?react'
import LocationIcon from '../assets/icons/location-icon.svg?react'
import { useState } from "react"

function Home() {
    const [categoryId, setCategoryId] = useState('');
    const [freguesia, setFreguesia] = useState('');
    const [search, setSearch] = useState('');
    return (
        <div className="home">
            <SlideShow slides={slides} />

            {/* Slogan e filtros */}
            <div className="text-center">
                <div className="head lowercase p-6 ">
                    <h1 className="text-xl md:text-4xl">um mural de histórias, técnicas e criadores</h1>
                    <h3 className="text-lg md:text-2xl mt-2">encontra-os por nome, categoria ou localização</h3>
                </div>

                <div className="filtros py-6 px-15 flex flex-row flex-wrap md:flex-nowrap justify-evenly gap-4 md:w-[85%] mx-auto">
                    <div className="artista-nome bg-register rounded-full w-full p-3 flex flex-row">
                        <label htmlFor="artist-name">
                            <SearchIcon className="h-7 w-7" />
                        </label>
                        <input
                            id="artist-name" type="text" value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="pesquisa o nome do artista"
                            className="w-full ml-2"
                        />
                    </div>
                    <div className="categoria bg-register rounded-full w-full p-3 flex flex-row">
                        <label htmlFor="categories">
                            <FilterIcon className="h-7 w-7" />
                        </label>
                        <CategoriesList
                            value={categoryId}
                            onChange={setCategoryId}
                            placeholder="categorias"
                            className={`w-full ml-2 pr-8 rounded outline-none focus:outline-none bg-register lowercase ${categoryId ? "text-font" : "text-gray-400"} appearance-none pointer`}
                        />
                    </div>
                    <div className="localizacao bg-register rounded-full w-full p-3 flex flex-row">
                        <label htmlFor="freguesias">
                            <LocationIcon className="h-7 w-7" />
                        </label>
                        <FreguesiasList
                            value={freguesia}
                            onChange={setFreguesia}
                            placeholder="freguesias"
                            className={`w-full ml-2 pr-8 rounded outline-none focus:outline-none ${freguesia ? "text-font" : "text-gray-400"} lowercase appearance-none truncate`}
                        />
                    </div>
                </div>
            </div>

            {/* Categorias */}
            <div className="relative md:w-[90%] mx-auto">
                {/* fade */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-linear-to-r from-bg to-transparent pointer" />

                {/* Categorias */}

                {/* <div className="categorias flex flex-row flex-nowrap gap-10 overflow-x-auto p-6 scrollbar-none">
                    <div className="categoria-block shrink-0">
                        <img src={ceramica} alt="thumbnail ceramica" className="w-36 h-26 md:w-54 md:h-54 rounded-4xl object-cover" />
                    </div>
                    <div className="categoria-block shrink-0">
                        <img src={ceramica} alt="thumbnail ceramica" className="w-36 h-26 md:w-54 md:h-54 rounded-4xl object-cover" />
                    </div>
                    <div className="categoria-block shrink-0">
                        <img src={ceramica} alt="thumbnail ceramica" className="w-36 h-26 md:w-54 md:h-54 rounded-4xl object-cover" />
                    </div>
                    <div className="categoria-block shrink-0">
                        <img src={ceramica} alt="thumbnail ceramica" className="w-36 h-26 md:w-54 md:h-54 rounded-4xl object-cover" />
                    </div>
                    <div className="categoria-block shrink-0">
                        <img src={ceramica} alt="thumbnail ceramica" className="w-36 h-26 md:w-54 md:h-54 rounded-4xl object-cover" />
                    </div>
                    <div className="categoria-block shrink-0">
                        <img src={ceramica} alt="thumbnail ceramica" className="w-36 h-26 md:w-54 md:h-54 rounded-4xl object-cover" />
                    </div>
                    <div className="categoria-block shrink-0">
                        <img src={ceramica} alt="thumbnail ceramica" className="w-36 h-26 md:w-54 md:h-54 rounded-4xl object-cover" />
                    </div>
                    <div className="categoria-block shrink-0">
                        <img src={ceramica} alt="thumbnail ceramica" className="w-36 h-26 md:w-54 md:h-54 rounded-4xl object-cover" />
                    </div>
                </div> */}

                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-linear-to-r from-paper to-transparent" />
            </div>
        </div>
    )
}

export default Home;