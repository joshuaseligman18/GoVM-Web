import queueStyles from './../styles/queue.module.scss'
import QueueContext from './queueSelectionContext'

// Component for the status of the selected queue
const QueueStatusItem = () => {

    // Function that downloads the final status of a completed program
    async function donwloadStatus(id) {
        // Fetch the data and get the JSON object
        const res = await fetch(`/api/finalstatus/${id}`)
        const data = await res.json()

        // Create an anchor element and a file to download
        const downloadElem = document.createElement('a')
        const file = new Blob([JSON.stringify(data)], { type: "text/plain" })
        downloadElem.href = URL.createObjectURL(file)
        downloadElem.download = `${id}.json`
        // Call the download and clean up the element
        downloadElem.click()
        downloadElem.remove()
    }

    return (
        // Uses the information from the queue context
        <QueueContext.Consumer>
            {({selectedProg, updateProg, queue}) => (
                (Object.keys(selectedProg).length > 0) ?
                    // Output if there is a selected program
                    <div id={queueStyles.statusItem} className={queueStyles.queueSection}>
                        <p>Id: {selectedProg.id}</p>
                        <p>Name: {selectedProg.progName}</p>
                        <p>Date Created: {selectedProg.created.substring(0, 10)}</p>
                        <p>Time Created: {selectedProg.created.substring(11, 19)}</p>
                        {(queue.completed.filter((elem) => selectedProg.id === elem.id).length === 1) && <button id={queueStyles.downloadBtn} onClick={async () => await donwloadStatus(selectedProg.id)}>Download Final Status</button>}
                    </div>
                :   // Output if there is not a selecteb program
                    <div id={queueStyles.statusItem} className={queueStyles.queueSection}>
                        <p>Select a program in the queue to view more details.</p>
                    </div>

            )}
        </QueueContext.Consumer>
    )
}

export default QueueStatusItem