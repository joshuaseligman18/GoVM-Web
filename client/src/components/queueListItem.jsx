import queueStyles from './../styles/queue.module.scss'

const QueueListItem = (props) => {
    const prog = props.prog

    return (
        <div className={queueStyles.queueListItem}>
            <h3>{prog.progName}</h3>
        </div>
    )
}

export default QueueListItem