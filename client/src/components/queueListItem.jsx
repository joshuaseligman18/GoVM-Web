import { useRef } from 'react'

import queueStyles from './../styles/queue.module.scss'
import QueueContext from './queueSelectionContext'

const QueueListItem = (props) => {
    const prog = props.prog
    const listItemRef = useRef(null)
    const statusRef = useRef(null)

    function getStatus(queue) {
        if (statusRef.current != null) {
            if (queue.inProgress !== null && queue.inProgress.id === prog.id) {
                statusRef.current.innerHTML = 'In Progress'
                return queueStyles.inProgress
            }
            const completedFind = queue.completed.find((elem) => elem.id === prog.id)
            if (completedFind !== undefined) {
                statusRef.current.innerHTML = 'Completed'
                return queueStyles.completed
            }
            const pendingFind = queue.pending.find((elem) => elem.id === prog.id)
            if (pendingFind !== undefined) {
                statusRef.current.innerHTML = 'Pending'
                return queueStyles.pending
            }
        }
    }
    
    return (
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