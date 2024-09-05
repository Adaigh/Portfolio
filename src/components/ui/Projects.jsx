import { useSiteContext } from "../../context/SiteContext"
import ProjectFrame from "../utility/ProjectFrame"
import SectionHeader from "../utility/SectionHeader"
import ErrorMessage from "./ErrorMessage"

const Projects = () => {

    const { project } = useSiteContext()

    if (project) return (

        <div id="Projects" className="banner">

            <SectionHeader
                title={project.header.title}
                message={project.header.message} />

            <div className="accordion mw-1300p mx-auto" id="projectAccordion">
                {project.projects.map((entry, index) => {
                    if (index == 0) {
                        return (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`#collapsezero`}>
                                        {entry.title.text}
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} className="accordion-collapse collapse show" data-bs-parent="#projectAccordion">
                                    <div className="accordion-body">
                                        {entry.title.type == "text" && <>{entry.title.text.replace(/\(.+\)/, '')}</>}
                                        {entry.title.type == "link" && <a target="_blank" href={entry.title.ref}>{entry.title.text.replace(/\(.+\)/, '')}</a>}
                                        <ProjectFrame {...entry} />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`#collapse${index}`}>
                                    {entry.title.text}
                                </button>
                            </h2>
                            <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#projectAccordion">
                                <div className="accordion-body">
                                    {entry.title.type == "text" && <>{entry.title.text.replace(/\(.+\)/, '')}</>}
                                    {entry.title.type == "link" && <a target="_blank" href={entry.title.ref}>{entry.title.text.replace(/\(.+\)/, '')}</a>}
                                    <ProjectFrame {...entry} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )

    return <ErrorMessage string={"There was an error loading project data"} />
}

export default Projects