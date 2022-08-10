import CpuStatus from "./cpuStatus"
import QueueArea from "./queueArea"
import QueueListItem from "./queueListItem"

import { useEffect, useState } from "react"

// Wrapper component for all the components that need to update the status
const Status = () => {

    const [status, setStatus] = useState({})
    const [queueComponents, setQueueComponents] = useState([])

    useEffect(() => {
        // Run the function ever 500 milliseconds
        const interval = setInterval(async () => {
            // Get the updated status and the response JSON object
            const res = await fetch('/api/status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()

            // Merge the queue elements into one big array
            let newData = data.queues
            let newDataArr = [...newData.completed]
            if (newData.inProgress !== null) { newDataArr.push(newData.inProgress) }
            newDataArr.push(...newData.pending)
            
            // Determine the components that are needed to be added
            let oldComponents = queueComponents
            let newComponents = []
            newDataArr.forEach(progItem => {
                // If the old component already exists, we want to keep it
                let result = oldComponents.filter((elem) => elem.props.prog.id === progItem.id)
                if (result.length === 1) {
                    newComponents.push(result[0])
                } else {
                    // Otherwise create a new component
                    newComponents.push(<QueueListItem key={progItem.id} prog={progItem} />)
                }
            })
            // Rerender the area with the new programs in the queue
            setStatus(data)
            setQueueComponents(newComponents)
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <QueueArea queue={status.queues} queueComponents={queueComponents}/>
            <CpuStatus cpuStatus={status.cpuStatus}/>
        </>
    )
}

export default Status