import { useSiteContext } from "../../context/SiteContext"
import ImgFrame from "../utility/ImgFrame"
import LinkString from "../utility/LinkString"
import ErrorMessage from "./ErrorMessage"


const Introduction = () => {

    const { introduction } = useSiteContext()

    if (introduction) {
        
        return (
            <div id="Introduction" className="banner">
                <div className="custom-reactive-header-container">
                    <div className="custom-reactive-intro-container">
                        <div className="spaced-header">{introduction.name}</div>
                        <div>
                            <span className="d-block bold-header">{introduction.title}</span>
                            <span className="d-block fst-italic">- {introduction.subtitle}</span>
                        </div>
                        <div>{introduction.message}</div>
                        <div className="d-block">
                            <LinkString string={introduction.description} links={introduction.links} />
                        </div>
                    </div>
                    <div className="vertical-separator d-block" />
                    <ImgFrame content={introduction.img} />
                </div>

            </div>
        )
    }

    return <ErrorMessage string={"There was an error loading the site data."}/>
}

export default Introduction