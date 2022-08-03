const QueueListItem = (props) => {
    const prog = props.prog

    return (
        <div key={prog.id}>
            <h3>{prog.progName}</h3>
        </div>
    )
}

export default QueueListItem