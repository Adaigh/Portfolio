import { useCallback, useState } from "react"

const ProjectFrame = ({ description, bullets, slides }) => {

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
                        if (entry.match(/<r>/)) {
                            entry = entry.replace(/<r>/, "<span class='red-text'>")
                            entry = entry.replace(/<\/r>/, "</span>")
                            return (
                                <li key={`desc_${index}`} dangerouslySetInnerHTML={{ __html: entry }}>
                                </li>
                            )
                        }
                        return (
                            <li key={`desc_${index}`}>
                                {entry}
                            </li>
                        )
                    })}
                    {bullets.map((entry, index) => {
                        return (
                            <li key={`bull_${index}`}>
                                - {entry}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <img src={slideURL} className="img-fluid rounded-3" onClick={e => changePhoto(e)}/>
            </div>
        </div>
    )
}

export default ProjectFrame