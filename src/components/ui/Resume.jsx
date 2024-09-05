import { useSiteContext } from "../../context/SiteContext"
import SectionHeader from "../utility/SectionHeader"
import ErrorMessage from "./ErrorMessage"


const Resume = () => {

    const { resume } = useSiteContext()

    const { education, employment } = { ...resume }

    if (education && employment) {
        return (
            <div id="Resume" className="banner">
                
                <SectionHeader
                    title={resume.header.title}
                    message={resume.header.message} />

                <div className="mw-1300p mx-auto">

                    <div className="card">
                        <h3 className="card-header fw-bolder">Education</h3>
                        <ul className="list-group">
                            {education.map((item, index) => {
                                return (

                                    <li className="list-group-item" key={`edu_${index}`}>
                                        <span className="lightred-text">{item.institution} </span><span className="d-inline-block">- {item.certificate} ({item.gpa} GPA)</span>
                                        <span className="d-block fs-6 text-secondary">&gt;&gt; {item.period} | {item.location}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="card mt-5">
                        <h3 className="card-header fw-bolder">Employment</h3>
                        <ul className="list-group">
                            {employment.map((item, index) => {
                                return (

                                    <li className="list-group-item" key={`edu_${index}`}>
                                        <span className="lightgreen-text">{item.employer} </span><span className="d-inline-block">- {item.position}</span>
                                        <span className="d-block fs-6 text-secondary">&gt;&gt; {item.period}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                </div>

            </div>
        )
    }

    return <ErrorMessage string={"There was an error loading the Resume data."} />
}

export default Resume