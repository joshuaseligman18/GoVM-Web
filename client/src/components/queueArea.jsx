import homeStyles from './../styles/home.module.scss'

const QueueArea = () => {

    let eventsource = new EventSource('http://127.0.0.1:8080/api/queuestatus')

    eventsource.addEventListener('ping', (e) => {
        console.log(e.data)
    })

    return (
        <div id={homeStyles.queueArea}>
            <h3 id={homeStyles.queueAreaTitle}>Program Queue</h3>
            <div id={homeStyles.queues}>
                <div id={homeStyles.queueList} className={homeStyles.queueSection}>
                    h
                </div>
                <div id={homeStyles.queueStatus} className={homeStyles.queueSection}>
                    h
                </div>
            </div>
        </div>
    )
}

export default QueueArea