import { useState } from 'react'

import { fetchEventSource } from '@microsoft/fetch-event-source'

import cpuStyles from './../styles/cpu.module.scss'

const CpuStatus = () => {

    const [status, setStatus] = useState({})

    // fetchEventSource('http://localhost:8080/api/cpustatus', {
    //     onmessage(e) {
    //         setStatus({...JSON.parse(e.data)})
    //     }
    // })

    return (
        <div id={cpuStyles.cpuStatusArea}>
            <h2 id={cpuStyles.title}>CPU Status</h2>
            <table>
                <tr>
                    <td>PC: 0x0000000000000000</td>
                    <td>ACC: 0x0000000000000000</td>
                </tr>
                <tr>
                    <td>{JSON.stringify(status)}</td>
                </tr>
            </table>
        </div>
    )
}

export default CpuStatus