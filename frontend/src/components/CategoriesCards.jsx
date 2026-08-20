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
        <div className="w-full flex items-center gap-4">
            {/* botão anterior */}
            <button
                className="shrink-0 flex items-center justify-center text-white p-1 rounded-full bg-setas hover:bg-setas transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
                onClick={scrollPrev}
                disabled={prevButtonDisabled}>
                <ChevronLeft size={14} />
            </button>

            {/* Carrossel */}
            <div className="my-15 overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {categorias.map((categoria) => (
                        <div key={categoria.id} className="rounded-xl flex-none w-1/2 md:w-1/5">
                            <div className="relative w-54 h-54 rounded-[2.4rem] flex justify-center items-center overflow-hidden group">
                                <img src={categoria.image} alt={categoria.title} className="w-75 h-75 object-cover" />

                                {/* Título da categoria */}
                                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center bg-white/0 group-hover:bg-white/85 transition-colors duration-200">
                                    <p className="w-full text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">{categoria.title}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* botão seguinte */}
            <button
                className="shrink-0 flex items-center justify-center text-white p-1 rounded-full bg-setas hover:bg-setas transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
                onClick={scrollNext}
                disabled={nextButtonDisabled}>
                <ChevronRight size={14} />
            </button>
        </div>

    )
}