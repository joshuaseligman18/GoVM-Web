import queueStyles from './../styles/queue.module.scss'
import QueueContext from './queueSelectionContext'


const QueueStatusItem = () => {

    async function donwloadStatus(id) {
        const res = await fetch(`/api/finalstatus/${id}`)
        const data = await res.json()

        console.log(data)
    }

    return (
        <QueueContext.Consumer>
            {({selectedProg, updateProg, queue}) => (
                (Object.keys(selectedProg).length > 0) ?
                    <div id={queueStyles.statusItem} className={queueStyles.queueSection}>
                        <p>Id: {selectedProg.id}</p>
                        <p>Name: {selectedProg.progName}</p>
                        <p>Date Created: {selectedProg.created.substring(0, 10)}</p>
                        <p>Time Created: {selectedProg.created.substring(11, 19)}</p>
                        {(queue.completed.filter((elem) => selectedProg.id === elem.id).length === 1) && <button id={queueStyles.downloadBtn} onClick={async () => await donwloadStatus(selectedProg.id)}>Download Final Status</button>}
                    </div>
                :   <div id={queueStyles.statusItem} className={queueStyles.queueSection}>
                        <p>Select a program in the queue to view more details.</p>
                    </div>

            )}
        </QueueContext.Consumer>
    )
}

export default QueueStatusItem