import { fetchEventSource } from '@microsoft/fetch-event-source'

import cpuStyles from './../styles/cpu.module.scss'

const CpuStatus = () => {

    fetchEventSource('http://localhost:8080/api/cpustatus', {
        onmessage(e) {
            console.log(JSON.parse(e.data))
            // Get the data and old components
            // let newData = JSON.parse(e.data)
            // let oldComponents = queueComponents
            // let newComponents = []
            // newData.forEach(progItem => {
            //     // If the old component already exists, we want to keep it
            //     let result = oldComponents.filter((elem) => elem.props.prog.id === progItem.id)
            //     if (result.length === 1) {
            //         newComponents.push(elem)
            //     } else {
            //         // Otherwise create a new component
            //         newComponents.push(<QueueListItem key={progItem.id} prog={progItem} />)
            //     }
            // });
            // // Rerender the area with the new programs in the queue
            // setQueueComponents(newComponents)
        }
    })

    return (
        <div id={cpuStyles.cpuStatusArea}>
            <h2 id={cpuStyles.title}>CPU Status</h2>
            <table>
                <tr>
                    <td>PC: 0x0000000000000000</td>
                    <td>ACC: 0x0000000000000000</td>
                </tr>
            </table>
        </div>
    )
}

export default CpuStatus