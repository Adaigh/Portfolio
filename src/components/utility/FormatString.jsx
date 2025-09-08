import ErrorMessage from "../ui/ErrorMessage"

const FormatString = ({ string }) => {

    if (typeof string === "string"){
        if (string.match(/<r>/)) {
            string = string.replace(/<r>|<\/r>/g, "")
            return <span className="red-text">{string}</span>
        }
        if (string.match(/<u>/)) {
            console.log("UNDERLINE STRING", string)
            string = string.replace(/<u>|<\/u>/g, "")
            return <span className="underline">{string}</span>
        }
        return <>{string}</>
    }

    return <ErrorMessage string="Error parsing the formatted string" />
}

export default FormatString