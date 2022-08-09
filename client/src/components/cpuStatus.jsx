import cpuStyles from './../styles/cpu.module.scss'

import { hexString } from './../util/util'

const CpuStatus = (props) => {

    const cpuStatus = props.cpuStatus !== undefined ? props.cpuStatus.cpu : null

    const statusComponents = []

    for (let i = 0; i < 32; i++) {
        let text = ''
        if (i === 0) {
            text += 'PC: '
        } else {
            text += `X${i - 1}: `
        }

        if (cpuStatus === null) {
            text += hexString(0, 16)
        } else {
            if (i === 0) {
                text += hexString(cpuStatus.programCounter, 16)
            } else {
                text += hexString(cpuStatus.registers[i - 1], 16)
            }
        }

        statusComponents.push(<p>{text}</p>)
    }

    return (
        <div id={cpuStyles.cpuStatusArea}>
            <h2 id={cpuStyles.title}>CPU Status</h2>
            <div id={cpuStyles.statusTable}>
                {[...statusComponents]}
            </div>
        </div>
    )
}

export default CpuStatus