import cpuStyles from './../styles/cpu.module.scss'

import { hexString } from './../util/util'

const CpuStatus = (props) => {

    const cpuStatus = props.cpuStatus !== undefined ? props.cpuStatus.cpu : null

    function getGeneralRegisters() {
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
        return statusComponents
    }

    function getIFID() {
        const ifidComponents = []

        ifidComponents.push(<p>Instruction</p>)
        if (cpuStatus !== null && cpuStatus.ifidReg !== null) {
            ifidComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.ifidReg.instr, 8)}</p>)
        } else {
            ifidComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 8)}</p>)   
        }

        ifidComponents.push(<p>Incremented PC</p>)
        if (cpuStatus !== null && cpuStatus.ifidReg !== null) {
            ifidComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.ifidReg.incrementedPC, 16)}</p>)
        } else {
            ifidComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        return ifidComponents
    }

    function getIDEX() {
        const idexComponents = []

        idexComponents.push(<p>Instruction</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.instr, 8)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 8)}</p>)   
        }

        idexComponents.push(<p>Incremented PC</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.incrementedPC, 16)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        idexComponents.push(<p>Reg Read Data 1</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.regReadData1, 16)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        idexComponents.push(<p>Reg Read Data 2</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.regReadData2, 16)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        idexComponents.push(<p>Sign Extended Imm</p>)
        if (cpuStatus !== null && cpuStatus.idexReg !== null) {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.idexReg.signExtendImm, 16)}</p>)
        } else {
            idexComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        return idexComponents
    }

    function getEXMEM() {
        const exmemComponents = []

        exmemComponents.push(<p>Instruction</p>)
        if (cpuStatus !== null && cpuStatus.exmemReg !== null) {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.exmemReg.instr, 8)}</p>)
        } else {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 8)}</p>)   
        }

        exmemComponents.push(<p>Incremented PC</p>)
        if (cpuStatus !== null && cpuStatus.exmemReg !== null) {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.exmemReg.incrementedPC, 16)}</p>)
        } else {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        exmemComponents.push(<p>Write Value</p>)
        if (cpuStatus !== null && cpuStatus.exmemReg !== null) {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.exmemReg.writeVal, 16)}</p>)
        } else {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        exmemComponents.push(<p>Working Address</p>)
        if (cpuStatus !== null && cpuStatus.exmemReg !== null) {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.exmemReg.workingAddr, 16)}</p>)
        } else {
            exmemComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

        return exmemComponents
    }

    function getMEMWB() {
        const memwbComponents = []

        memwbComponents.push(<p>Instruction</p>)
        if (cpuStatus !== null && cpuStatus.memwbReg !== null) {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.memwbReg.instr, 8)}</p>)
        } else {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 8)}</p>)   
        }

        memwbComponents.push(<p>Incremented PC</p>)
        if (cpuStatus !== null && cpuStatus.memwbReg !== null) {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(cpuStatus.memwbReg.incrementedPC, 16)}</p>)
        } else {
            memwbComponents.push(<p className={cpuStyles.regValue}>{hexString(0, 16)}</p>)   
        }

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
            <div id={cpuStyles.statusTable}>
                {[...getGeneralRegisters()]}
            </div>
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