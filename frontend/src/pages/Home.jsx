import SlideShow from "../components/SlideShow"
import slides from '../assets/slides'
import ceramica from '../assets/images/ceramica/ceramica-03.jpg'
import SearchIcon from '../assets/icons/search-icon.svg?react'
import FilterIcon from '../assets/icons/filter-icon.svg?react'
import LocationIcon from '../assets/icons/location-icon.svg?react'

function Home() {
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
                        <input type="text" placeholder="pesquisa o nome do artista" className="w-full ml-2" />
                    </div>
                    <div className="categoria bg-register rounded-full w-full p-3 flex flex-row">
                        <label htmlFor="category-filter">
                            <FilterIcon className="h-7 w-7" />
                        </label>
                        <select name="category-filter" id="category-filter" placeholder="categoria" className="w-full ml-2">
                            <option value="ceramica">Cerâmica</option>
                        </select>
                    </div>
                    <div className="localizacao bg-register rounded-full w-full p-3 ">
                        <LocationIcon className="h-7 w-7" />

                    </div>
                </div>
            </div>

            {/* Categorias */}
            <div className="categorias flex flex-row justify-evenly md:w-[90%] gap-10 mx-auto p-6 flex-wrap">

                <div className="categoria-block">
                    <img src={ceramica} alt="thumbnail ceramica" className="rounded-4xl size-34 md:size-64 hover:border-amber-700" />
                </div>
                <div className="categoria-block">
                    <img src={ceramica} alt="thumbnail ceramica" className="rounded-4xl size-34 md:size-64" />
                </div>
                <div className="categoria-block">
                    <img src={ceramica} alt="thumbnail ceramica" className="rounded-4xl size-34 md:size-64" />
                </div>
                <div className="categoria-block">
                    <img src={ceramica} alt="thumbnail ceramica" className="rounded-4xl size-34 md:size-64" />
                </div>
            </div>
        </div>
    )
}

export default Home;