const QueueListItem = (props) => {
    const prog = props.prog

    return (
        <div>
            <h3>{prog.progName}</h3>
        </div>
    )
}

export default QueueListItem