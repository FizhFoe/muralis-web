import SlideShow from "../components/SlideShow"
import slides from '../assets/slides'
import ceramica from '../assets/images/ceramica/ceramica-03.jpg'

function Home() {
    return (
        <div className="home mx-auto">
            <SlideShow slides={slides}/>
            <h1 className="text-2xl text-center py-6 lowercase">explorar por categoria</h1>
            <div className="categorias flex flex-row gap-10 mx-auto">
                <div className="categoria-block">
                    <img src={ceramica} alt="thumbnail ceramica" className="rounded-full size-24 md:size-64" />
                </div>
                <div className="categoria-block">
                    <img src={ceramica} alt="thumbnail ceramica" className="rounded-full size-24 md:size-64" />
                </div>
                <div className="categoria-block">
                    <img src={ceramica} alt="thumbnail ceramica" className="rounded-full size-24 md:size-64" />
                </div>
                <div className="categoria-block">
                    <img src={ceramica} alt="thumbnail ceramica" className="rounded-full size-64" />
                </div>
            </div>
        </div>
    )
}

export default Home;