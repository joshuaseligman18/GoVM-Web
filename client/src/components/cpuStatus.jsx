import cpuStyles from './../styles/cpu.module.scss'

import { hexString } from './../util/util'

// Component for the CPU status
const CpuStatus = (props) => {

    // Get the updated status from the props
    const cpuStatus = props.cpuStatus !== undefined ? props.cpuStatus.cpu : null

    // Function that updates the general register area
    function getGeneralRegisters() {
        const statusComponents = []
    
        for (let i = 0; i < 32; i++) {
            // Get the starting text
            let text = ''
            if (i === 0) {
                text += 'PC: '
            } else {
                text += `X${i - 1}: `
            }
    
            // Add the value
            if (cpuStatus === null) {
                text += hexString(0, 16)
            } else {
                if (i === 0) {
                    text += hexString(cpuStatus.programCounter, 16)
                } else {
                    text += hexString(cpuStatus.registers[i - 1], 16)
                }
            }
    
            // Add the new component
            statusComponents.push(<p>{text}</p>)
        }
        return statusComponents
    }

    // Function to get the data from the IFID register
    function getIFID() {
        const ifidComponents = []

        // Get the instruction
        ifidComponents.push(<p>Instruction</p>)
        if (cpuStatus !== null && cpuStatus.ifidReg !== null) {
            ifidComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.ifidReg.instr, 8)}</p>)
        } else {
            ifidComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 8)}</p>)   
        }

        // Get the incremented PC
        ifidComponents.push(<p>Incremented PC</p>)
        if (cpuStatus !== null && cpuStatus.ifidReg !== null) {
            ifidComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.ifidReg.incrementedPC, 16)}</p>)
        } else {
            ifidComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        return ifidComponents
    }

    // Function to update the information of the IDEX register
    function getIDEX() {
        const idexComponents = []

        // Get the intstruction
        idexComponents.push(<p>Instruction</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.instr, 8)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 8)}</p>)   
        }

        // Get the incremented PC
        idexComponents.push(<p>Incremented PC</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.incrementedPC, 16)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        // Get the first register read data
        idexComponents.push(<p>Reg Read Data 1</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.regReadData1, 16)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        // Get the second register read data
        idexComponents.push(<p>Reg Read Data 2</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.regReadData2, 16)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        // Ge the sign exteded immediate
        idexComponents.push(<p>Sign Extended Imm</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.signExtendImm, 16)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        return idexComponents
    }

    // Function that updates the info on the EXMEM register
    function getEXMEM() {
        const exmemComponents = []

        // Get the instruction
        exmemComponents.push(<p>Instruction</p>)
        if (cpuStatus !== null && cpuStatus.exmemReg !== null) {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.exmemReg.instr, 8)}</p>)
        } else {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 8)}</p>)   
        }

        // Get the incremented PC
        exmemComponents.push(<p>Incremented PC</p>)
        if (cpuStatus !== null && cpuStatus.exmemReg !== null) {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.exmemReg.incrementedPC, 16)}</p>)
        } else {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        // Get the value to write
        exmemComponents.push(<p>Write Value</p>)
        if (cpuStatus !== null && cpuStatus.exmemReg !== null) {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.exmemReg.writeVal, 16)}</p>)
        } else {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        // Get the address that will be used
        exmemComponents.push(<p>Working Address</p>)
        if (cpuStatus !== null && cpuStatus.exmemReg !== null) {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.exmemReg.workingAddr, 16)}</p>)
        } else {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        return exmemComponents
    }

    // Get the information on the MEMWB register
    function getMEMWB() {
        const memwbComponents = []

        // Get the instruction
        memwbComponents.push(<p>Instruction</p>)
        if (cpuStatus !== null && cpuStatus.memwbReg !== null) {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.memwbReg.instr, 8)}</p>)
        } else {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 8)}</p>)   
        }

        // Get the incremented PC
        memwbComponents.push(<p>Incremented PC</p>)
        if (cpuStatus !== null && cpuStatus.memwbReg !== null) {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.memwbReg.incrementedPC, 16)}</p>)
        } else {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        // Get the value being written
        memwbComponents.push(<p>Write Value</p>)
        if (cpuStatus !== null && cpuStatus.memwbReg !== null) {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.memwbReg.writeVal, 16)}</p>)
        } else {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        return memwbComponents
    }

    return (
        <div id={cpuStyles.cpuStatusArea}>
            <h2 id={cpuStyles.title}>CPU Status</h2>
            {/* Area for the general purpose registers */}
            <div id={cpuStyles.statusTable}>
                {[...getGeneralRegisters()]}
            </div>
            {/* Area for the pipeline reisters */}
            <div id={cpuStyles.interRegArea}>
                <div className={cpuStyles.register}>
                    <h3>IFID Register</h3>
                    {[...getIFID()]}
                </div>
                <div className={cpuStyles.register}>
                    <h3>IDEX Register</h3>
                    {[...getIDEX()]}
                </div>
                <div className={cpuStyles.register}>
                    <h3>EXMEM Register</h3>
                    {[...getEXMEM()]}
                </div>
                <div className={cpuStyles.register}>
                    <h3>MEMWB Register</h3>
                    {[...getMEMWB()]}
                </div>
            </div>
        </div>
    )
}

export default CpuStatus