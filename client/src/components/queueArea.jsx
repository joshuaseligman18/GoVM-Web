import { useState } from 'react'

import queueStyles from './../styles/queue.module.scss'
import QueueListItem from './queueListItem'

const QueueArea = () => {

    const [queueComponents, setQueueComponents] = useState([])

    let eventsource = new EventSource('http://127.0.0.1:8080/api/queuestatus')

    eventsource.addEventListener('ping', (e) => {
        // Get the data and create the components
        let newComponents = JSON.parse(e.data).map((progItem) => <QueueListItem prog={progItem} />)
        // Rerender the area with the new programs in the queue
        setQueueComponents(newComponents)
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