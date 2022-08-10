import { useState } from 'react'

import queueStyles from './../styles/queue.module.scss'

import QueueStatusItem from './queueStatusItem'
import QueueContext from './queueSelectionContext'

// Component for the queue area
const QueueArea = (props) => {

    const queue = props.queue
    const queueComponents = props.queueComponents

    // Variable for the selected component
    const [selected, setSelected] = useState({})

    return (
        <div id={queueStyles.queueArea}>
            <h3 id={queueStyles.queueAreaTitle}>Program Queue</h3>
            <p id={queueStyles.note}>Note: It takes a few seconds for the queue to fully update</p>
            <div id={queueStyles.queues}>
                {/* All elements inside will have access to the selected program, the update function, and the actual queue */}
                <QueueContext.Provider value={{selectedProg: selected, updateProg: (newProg) => setSelected(newProg), queue: queue}}>
                    <div id={queueStyles.queueList} className={queueStyles.queueSection}>
                            {/* Each element in the queue */}
                            {[...queueComponents]}
                    </div>
                    {/* The status of the selected queue item */}
                    <QueueStatusItem />
                </QueueContext.Provider>
            </div>
        </div>
    )
}

export default QueueArea