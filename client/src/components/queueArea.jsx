import { useState } from 'react'

import queueStyles from './../styles/queue.module.scss'
import QueueListItem from './queueListItem'

import { fetchEventSource } from '@microsoft/fetch-event-source'
import QueueStatusItem from './queueStatusItem'
import QueueContext from './queueSelectionContext'

const QueueArea = () => {

    const [queueComponents, setQueueComponents] = useState([])
    const [selected, setSelected] = useState({})
    const [queue, setQueue] = useState({})

    fetchEventSource('http://localhost:8080/api/queuestatus', {
        onmessage(e) {
            // Get the data and old components
            let newData = JSON.parse(e.data)
            let newDataArr = [...newData.completed]
            if (newData.inProgress !== null) { newDataArr.push(newData.inProgress) }
            newDataArr.push(...newData.pending)
            
            let oldComponents = queueComponents
            let newComponents = []
            newDataArr.forEach(progItem => {
                // If the old component already exists, we want to keep it
                let result = oldComponents.filter((elem) => elem.props.prog.id === progItem.id)
                if (result.length === 1) {
                    newComponents.push(elem)
                } else {
                    // Otherwise create a new component
                    newComponents.push(<QueueListItem key={progItem.id} prog={progItem} />)
                }
            });
            // Rerender the area with the new programs in the queue
            setQueue(newData)
            setQueueComponents(newComponents)
        }
    })

    return (
        <div id={queueStyles.queueArea}>
            <h3 id={queueStyles.queueAreaTitle}>Program Queue</h3>
            <div id={queueStyles.queues}>
                <QueueContext.Provider value={{selectedProg: selected, updateProg: (newProg) => setSelected(newProg), queue: queue}}>
                    <div id={queueStyles.queueList} className={queueStyles.queueSection}>
                            {[...queueComponents]}
                    </div>
                    <QueueStatusItem />
                </QueueContext.Provider>
            </div>
        </div>
    )
}

export default QueueArea