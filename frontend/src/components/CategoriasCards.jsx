import { useCallback, useEffect, useState } from "react"
import { SERVER_URL } from "../http-common"
import categoryService from "../services/category.service"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CategoriesCards() {
    const [categories, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // Embla Carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 2 })
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)

    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()

    const toggleButtonsDisabled = useCallback((emblaApi) => {
        setPrevButtonDisabled(!emblaApi.canScrollPrev())
        setNextButtonDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.on('init', toggleButtonsDisabled)
        emblaApi.on('reInit', toggleButtonsDisabled)
        emblaApi.on('select', toggleButtonsDisabled)

        return () => {
            emblaApi.off('init', toggleButtonsDisabled)
            emblaApi.off('reInit', toggleButtonsDisabled)
            emblaApi.off('select', toggleButtonsDisabled)
        }
    }, [emblaApi, toggleButtonsDisabled])

    useEffect(() => {
        categoryService.getAll()
            .then((response) => {
                setCategorias(response.data)
            })
            .catch((error) => {
                console.error('Erro ao obter categorias:', error)
                setError('Não foi possível carregar as categorias.')
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    if (loading) return <p>A carregar categorias...</p>
    if (error) return <p>{error}</p>

    const categorias = categories.map((categoria) => ({
        id: categoria.id,
        title: categoria.nome,
        image: categoria.imagem_capa?.startsWith('http')
            ? categoria.imagem_capa
            : `${SERVER_URL}${categoria.imagem_capa}`,
    }));

    if (categorias.length === 0) return null;

    return (
        <div className="">
            <div className="w-full flex items-center gap-4">
                {/* botão anterior */}
                <button
                    className="shrink-0 flex items-center opacity-0 md:opacity-100 justify-center text-white p-1 rounded-full bg-setas hover:bg-setas transition-colors md:disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
                    onClick={scrollPrev}
                    disabled={prevButtonDisabled}>
                    <ChevronLeft size={14} />
                </button>

                {/* Carrossel */}
                <div className="my-15 overflow-hidden flex-1 min-w-0" ref={emblaRef}>
                    <div className="flex">
                        {categorias.map((categoria) => (
                            // <div key={categoria.id} className="rounded-xl flex-none w-1/2 md:w-1/3 xl:w-1/5 ">
                            <div key={categoria.id} className="flex-none w-1/2 md:w-1/3 xl:w-1/4 px-2 md:px-7 ">
                                <div className="relative aspect-square rounded-[2.4rem] overflow-hidden group cursor-pointer">
                                    <img src={categoria.image} alt={categoria.title} className="w-full h-full object-cover" />

                                    {/* Título da categoria */}
                                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center bg-white/85 lg:bg-white/0 md:group-hover:bg-white/85 transition-colors duration-200">
                                        <p className="w-full text-center py-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">{categoria.title}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* botão seguinte */}
                <button
                    className="shrink-0 flex items-center opacity-0 md:opacity-100 justify-center text-white p-1 rounded-full bg-setas hover:bg-setas transition-colors md:disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
                    onClick={scrollNext}
                    disabled={nextButtonDisabled}>
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    )
}