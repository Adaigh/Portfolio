import { useCallback, useState } from "react"
import FormatString from "./FormatString"

const ProjectFrame = ({ description, bullets, slides, github }) => {

    const [slideURL, setSlideURL] = useState(slides[0])

    const changePhoto = useCallback((e)=> {
        setSlideURL((current) => {
            const indexPosition = (slides.indexOf(current) + 1) % slides.length
            return slides[indexPosition]
        })
    }, [slides])

    return (
        <div className="d-flex flex-column-reverse flex-xl-row gap-3 py-5 align-items-center">
            <div className="mx-auto w-xl-50">
                <ul>
                    {description.map((entry, index) => {
                        return (
                            <li key={`desc_${index}`}>
                                <FormatString string={entry} />
                            </li>
                        )
                    })}
                    {bullets.map((entry, index) => {
                        return (
                            <li key={`bull_${index}`}>
                                - <FormatString string={entry} />
                            </li>
                        )
                    })}
                    {github && <li>See it on <a href={github} target="_blank">GitHub</a></li>}
                </ul>
            </div>
            <div>
                <img src={slideURL} className="project-img" onClick={e => changePhoto(e)}/>
            </div>
        </div>
    )
}

export default ProjectFrame