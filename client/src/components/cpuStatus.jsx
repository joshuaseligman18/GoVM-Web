import { useState, useRef } from 'react'

import { fetchEventSource } from '@microsoft/fetch-event-source'

import cpuStyles from './../styles/cpu.module.scss'

import { hexString } from './../util/util'

const CpuStatus = () => {

    const [status, setStatus] = useState({})
    const memRef = useRef(null)

    fetchEventSource('http://localhost:8080/api/cpustatus', {
        onmessage(e) {
            setStatus({...JSON.parse(e.data)})
        }
    })

    function getMemoryAddress(e) {
        const hex = /[0-9ABCDEF]/gi
        let addrStr = e.target.value
        if (addrStr.match(hex)) {
            let addr = parseInt(addrStr, 8)
            if (status.memory !== undefined && addr < status.memory.ram.length) {
                let val = new Uint32Array(1)
                val[0] = status.memory.ram[addr]
                for (let i = addr + 1; i < addr + 4 && i < status.memory.ram.length; i++) {
                    let add = status.memory.ram[i]
                    val[0] = val[0] << 8 | add
                }
                memRef.current.innerHTML = hexString(val[0], 8)
            } else {
                memRef.current.innerHTML = hexString(0, 8)
            }
        }
    }

    return (
        <div id={cpuStyles.cpuStatusArea}>
            <h2 id={cpuStyles.title}>CPU Status</h2>
            <table>
                <tr>
                    <td>PC: 0x0000000000000000</td>
                    <td>ACC: 0x0000000000000000</td>
                </tr>
            </table>
            <div id={cpuStyles.memArea}>
                <h3>Memory (Addr - Addr + 3)</h3>
                <input type="text" placeholder="Address" size="16" maxLength="16" onChange={getMemoryAddress}></input>
                <p ref={memRef}>0x00000000</p>
            </div>
        </div>
    )
}

export default CpuStatus