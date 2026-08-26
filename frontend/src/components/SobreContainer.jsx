import Contact from '../assets/icons/contacta-icon.svg?react'
import Find from '../assets/icons/descobre-icon.svg?react'
import Explore from '../assets/icons/eplora-icon.svg?react'
import Speak from '../assets/icons/falar-icon.svg?react'

const sobreContainers = [
    {
        icon: Find,
        title: "descobre os criadores",
        desc: "conhece artistas e artesões através dos seus perfis e trabalhos"
    },
    {
        icon: Explore,
        title: "explora talentos perto de ti",
        desc: "filtra pelos artistas da região e quem sabe, não descobres novos lugares"
    },
    {
        icon: Contact,
        title: "contacta diretamente",
        desc: "sem intermediários. Uma conversa entre quem cria e quem procura algo único"
    },
    {
        icon: Speak,
        title: "descobre eventos",
        desc: "encontra feiras, workshops, exposições e ateliers abertos ao público"
    }
];

export default function SobreContainer() {
    return (
        <div className="bg-register py-10 px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 md:gap-x-4">
                {sobreContainers.map((sobre) => {
                    const Icon = sobre.icon;
                    return (
                        <div key={sobre.title} className="flex flex-col items-center text-center gap-2 px-4 text-gray-400">
                            <Icon className="w-15 h-15 md:w-20 md:h-20 mb-6"  />
                            <p className="lowercase text-nowrap">{sobre.title}</p>
                            <p className="w-35 md:text-wrap leading-4">{sobre.desc}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}