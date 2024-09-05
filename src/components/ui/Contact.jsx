import { useSiteContext } from "../../context/SiteContext"
import GmapiFrame from "../utility/GmapiFrame"
import SectionHeader from "../utility/SectionHeader"
import ErrorMessage from "./ErrorMessage"


const Contact = () => {

    const { contact } = useSiteContext()

    if (contact) {
        return (
            <div id="Contact" className="banner">

                <SectionHeader
                    title={contact.header.title}
                    message={contact.header.message} />
                    
                <div className="custom-reactive-contact-container">

                    <div className="map-frame">
                        <GmapiFrame />
                    </div>

                    <div className="d-flex flex-column gap-3 justify-content-center">
                        <a href={`mailto: ${contact.email}`} className="mx-auto">
                            <img src="./email_icon.png" className="contact-icon" />
                            {contact.email}
                        </a>
                        <a href={contact.linkedin} className="mx-auto" target="_blank">
                            <img src="./linkedin_icon.png" className="contact-icon" />
                            LinkedIn
                        </a>
                        <a href={contact.github} className="mx-auto" target="_blank">
                            <img src="./github_icon.png" className="contact-icon" />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return <ErrorMessage string={"There was an issue loading the contact data."} />
}

export default Contact