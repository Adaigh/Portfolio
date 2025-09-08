import FormatString from "./FormatString"

const SectionHeader = ({title, message}) => {
    return (
        <div className="mx-auto w-lg-75 p-5 text-center">
        <h1>{title}</h1>
        {message.map((entry, index) => {
            return <span key={`msg_${index}`} className="d-block p-2"><FormatString string={entry} /></span>
        })}
        </div>
    )
}

export default SectionHeader