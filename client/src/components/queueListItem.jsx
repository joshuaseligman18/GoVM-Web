import { useRef } from 'react'

import queueStyles from './../styles/queue.module.scss'
import QueueSelectionContext from './queueSelectionContext'

const QueueListItem = (props) => {
    const prog = props.prog
    const listItemRef = useRef(null)
    
    return (
        <QueueSelectionContext.Consumer>
            {({id, updateId}) => (
                <div ref={listItemRef} onClick={() => updateId(prog.id)} className={`${queueStyles.queueListItem} ${id === prog.id ? queueStyles.selected : ''}`}>
                    <h3>{prog.progName}</h3>
                </div>
            )}
        </QueueSelectionContext.Consumer>
    )
}

export default QueueListItem