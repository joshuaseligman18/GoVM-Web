import { useRef } from 'react'

import queueStyles from './../styles/queue.module.scss'

const QueueListItem = (props) => {
    const prog = props.prog

    const listItemRef = useRef(null)

    function setClicked() {
        console.log(`clicked: ${prog.id}`)
        listItemRef.current.classList.add(queueStyles.selected)
    }

    return (
        <div ref={listItemRef} onClick={setClicked} className={queueStyles.queueListItem}>
            <h3>{prog.progName}</h3>
        </div>
    )
}

export default QueueListItem