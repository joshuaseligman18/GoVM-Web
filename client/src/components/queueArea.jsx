import { useState, useEffect } from 'react'

import queueStyles from './../styles/queue.module.scss'
import QueueListItem from './queueListItem'

import { fetchEventSource } from '@microsoft/fetch-event-source'

const QueueArea = () => {

    const [queueComponents, setQueueComponents] = useState([])

    fetchEventSource('http://localhost:8080/api/queuestatus', {
        onmessage(e) {
            // Get the data and create the components
            let newComponents = JSON.parse(e.data).map((progItem) => <QueueListItem key={progItem.id} prog={progItem} />)
            // Rerender the area with the new programs in the queue
            setQueueComponents(newComponents)
        }
    })

    return (
        <div id={queueStyles.queueArea}>
            <h3 id={queueStyles.queueAreaTitle}>Program Queue</h3>
            <div id={queueStyles.queues}>
                <div id={queueStyles.queueList} className={queueStyles.queueSection}>
                    {[...queueComponents]}
                </div>
                <div id={queueStyles.queueStatus} className={queueStyles.queueSection}>
                    h
                </div>
            </div>
        </div>
    )
}

export default QueueArea