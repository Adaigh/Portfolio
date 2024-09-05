import { useSiteContext } from "../../context/SiteContext"
import ErrorMessage from "./ErrorMessage"

const NavBar = () => {

    const { navigation } = useSiteContext()

    if (navigation) {
        return (
            <nav className="custom-reactive-navbar">
                <div className="container-fluid">

                    <a className="custom-reactive-navbar-brand" href="#">{navigation.brandText}</a>

                    <button className="navbar-toggler mx-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="custom-reactive-navbar-list">
                            {
                                navigation.links.map((entry, index) => {
                                    return (
                                        <li className="nav-item" key={index}>
                                            <a className="nav-link" href={entry.ref} dangerouslySetInnerHTML={{__html: entry.text}} />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </div>
            </nav>
        )
    }

    return <ErrorMessage string={"There was an error loading the navigation bar data"} />
}

export default NavBar