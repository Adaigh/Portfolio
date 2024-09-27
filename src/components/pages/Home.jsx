import Contact from "../ui/Contact"
import Demonstrations from "../ui/Demonstrations"
import Introduction from "../ui/Introduction"
import Projects from "../ui/Projects"
import Resume from "../ui/Resume"

const Home = () => {

    return (
        <div className="home-container">
        <Introduction />
        <Demonstrations />
        <Projects />
        <Resume />
        <Contact />
        </div>
    )
}

export default Home