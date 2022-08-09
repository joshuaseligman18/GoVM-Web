import { useState } from 'react'

import queueStyles from './../styles/queue.module.scss'

import QueueStatusItem from './queueStatusItem'
import QueueContext from './queueSelectionContext'

const QueueArea = (props) => {

    const queue = props.queue
    const queueComponents = props.queueComponents

    const [selected, setSelected] = useState({})

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