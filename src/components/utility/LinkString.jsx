import React, { useEffect, useState } from "react"
import ErrorMessage from "../ui/ErrorMessage"

const LinkString = ({ string, links }) => {

    const [partitionList, setPartitionList] = useState([])

    useEffect(() => {
        setPartitionList(string.split(/<link_[\d+]>/))
    }, [])

    if (Array.isArray(links)) {
        return (
            <span>
                {links.map((link, index) => {
                    return (
                        <React.Fragment key={link.text}>
                            {partitionList[index]}
                            <a href={link.ref} target="_blank">{link.text}</a>
                        </React.Fragment>
                    )
                })}
                <React.Fragment key={partitionList.length-1}>
                    {partitionList[partitionList.length-1]}
                </React.Fragment>
            </span>
        )
    }

    return <ErrorMessage string={"There was an error parsing the link string."} />
}

export default LinkString