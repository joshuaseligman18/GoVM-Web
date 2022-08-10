import { useRef } from 'react'

import queueStyles from './../styles/queue.module.scss'
import QueueContext from './queueSelectionContext'

// Component for a specific item in the queue
const QueueListItem = (props) => {
    const prog = props.prog
    const listItemRef = useRef(null)
    const statusRef = useRef(null)

    // Function that determines the status text and returns the appropriate CSS class
    function getStatus(queue) {
        if (statusRef.current != null) {
            // Logic for being in progress
            if (queue.inProgress !== null && queue.inProgress.id === prog.id) {
                statusRef.current.innerHTML = 'In Progress'
                return queueStyles.inProgress
            }
            // Logic for being completed
            const completedFind = queue.completed.find((elem) => elem.id === prog.id)
            if (completedFind !== undefined) {
                statusRef.current.innerHTML = 'Completed'
                return queueStyles.completed
            }
            // Logic for being pending
            const pendingFind = queue.pending.find((elem) => elem.id === prog.id)
            if (pendingFind !== undefined) {
                statusRef.current.innerHTML = 'Pending'
                return queueStyles.pending
            }
        }
    }
    
    return (
        // Uses the data from the context
        <QueueContext.Consumer>
            {({selectedProg, updateProg, queue}) => (
                <div ref={listItemRef} onClick={() => updateProg(prog)} className={`${queueStyles.queueListItem} ${selectedProg.id === prog.id ? queueStyles.selected : ''}`}>
                    <h3>{prog.progName}</h3>
                    <p ref={statusRef} className={getStatus(queue)}></p>
                </div>
            )}
        </QueueContext.Consumer>
    )
}

export default QueueListItem