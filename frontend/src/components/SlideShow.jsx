import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SlideShow({ slides, autoPlay = 5000 }) {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((i) => setCurrent((i + slides.length) % slides.length), [slides.length]);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
    }, [slides.length])

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }, [slides.length])

    useEffect(() => {
        if (!autoPlay || paused || slides.length <= 1) return;
        const interval = setInterval(next, autoPlay)
        return () => clearInterval(interval)
    }, [autoPlay, paused, next, slides.length])

    if (!slides || slides.length === 0) return null


    return (
        <div className="relative w-screen left-1/2 right-1/2 mx-[-50vw] overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="relative h-[80vh] min-h-86 w-full">
                {slides.map((slide, i) => (
                    <div key={slide.image}
                        className={`absolute inset-0 transition-opacity duration-700 
                        ${i === current ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" loading={i === current ? 'eager' : 'lazy'} />
                    </div>
                ))}                
            </div>

            {/* Butões Prev & Next */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        aria-label="Imagem anterior"
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full text-white transition-colors hover:bg-gray-900/30"
                    >
                        <ChevronLeft size={48} />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Próxima imagem"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full text-white transition-colors hover:bg-gray-900/30"
                    >
                        <ChevronRight size={48} />
                    </button>
                </>
            )}

            {/* Pontos / Posição */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((slide, i) => (
                    <button key={slide.image}
                        onClick={() => goTo(i)}
                        aria-label={`Ir para: ${slides.title || 'imagem ${i + 1}'}`}
                        aria-current={i === current}
                        className={`h-2.5 rounded-full transition-all ${
                            i === current ? 'w-6 bg-gray-100' : 'w-2.5 bg-gray-300/50 hover:bg-gray-800/75'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
