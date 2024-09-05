const ImgFrame = (props) => {
    return (
        <div className="d-block mx-auto mx-lg-0 p-2 pb-4 shadow rounded-3 bg-light">
            <img src={props.content.ref} className="mh-350p" alt={props.content.altText}/>
        </div>
    )
}

export default ImgFrame