import { useState } from "react"
import { useSiteContext } from "../../context/SiteContext"
import ProjectFrame from "../utility/ProjectFrame"
import SectionHeader from "../utility/SectionHeader"
import ErrorMessage from "./ErrorMessage"

const Projects = () => {

    const { project } = useSiteContext()

    const [showNum, setShowNum] = useState(0)

    if (project) return (

        <div id="Projects" className="banner">

            <SectionHeader
                title={project.header.title}
                message={project.header.message} />

            <div className="mw-1300p mx-auto" id="projectAccordion">
                {project.projects.map((entry, index) => {
                    return (
                        <div key={index}>
                            <div className="project-button-bg">
                                <button className={showNum === index ? "accordion-button p-4 opacity-0" : "accordion-button p-4"} type="button" onClick={() => setShowNum(index)}>
                                    {entry.title.text}
                                </button>
                            </div>
                            <div className={showNum === index ? "shrink active" : "shrink"}>
                                {entry.title.type == "text" && <>{entry.title.text.replace(/\(.+\)/, '')}</>}
                                {entry.title.type == "link" && <a target="_blank" href={entry.title.ref}>{entry.title.text.replace(/\(.+\)/, '')}</a>}
                                <ProjectFrame {...entry} />
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