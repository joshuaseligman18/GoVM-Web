import cpuStyles from './../styles/cpu.module.scss'

const CpuStatus = (props) => {

    const cpuStatus = props.cpuStatus

    return (
        <div id={cpuStyles.cpuStatusArea}>
            <h2 id={cpuStyles.title}>CPU Status</h2>
            <p>{JSON.stringify(cpuStatus)}</p>
        </div>
    )
}

export default CpuStatus