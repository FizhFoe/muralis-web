import SlideShow from "../components/SlideShow"
import slides from '../assets/slides'

function Home() {
    return (
        <div className="home">
            <SlideShow slides={slides}/>
            <h1 className="text-2xl text-center py-6 lowercase">explorar por categoria</h1>
        </div>
    )
}

export default Home;