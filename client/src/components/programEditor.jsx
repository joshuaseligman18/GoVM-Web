import { useRef } from 'react'

import homeStyles from './../styles/home.module.scss'
import { hexString } from '../util/util'

// Component for where the user can edit and assemble their programs
const ProgramEditor = () => {

	// Reference to the JSX elements
	const progRef = useRef(null)
	const binRef = useRef(null)
	const runBtnRef = useRef(null)

	// Function that calls the API to assemble the program and output the binary
	async function assembleProgram() {
		// Call the API
		const res = await fetch('http://127.0.0.1:8080/api/asmprog', {
			method: 'POST',
			body: JSON.stringify({
				prog: progRef.current.value
			})
		})

		// Get the data
		const data = await res.json()

		if (res.status === 200) {
			// Convert the binary to a string and output it
			const instrStrArr = data.binaryProg.map((instr) => hexString(instr, 8))
			const instrStr = instrStrArr.join('\n')
			binRef.current.value = instrStr

			// Update the run program button
			runBtnRef.current.classList.remove(homeStyles.notClickable)
			runBtnRef.current.classList.add(homeStyles.clickable)
			runBtnRef.current.onclick = addProgramToQueue
		} else {
			// Get the error message
			if (progRef.current.value == '') {
				// Reset the error message to if it is an empty program
				binRef.current.value = 'Assemble your program to see the output binary here!'
			} else {
				binRef.current.value = data.err
			}
			// Update the run program button
			runBtnRef.current.classList.add(homeStyles.notClickable)
			runBtnRef.current.classList.remove(homeStyles.clickable)
			runBtnRef.current.onclick = null
		}
	}

	// Function that gets called to add the program to the server's queue to run
	function addProgramToQueue() {
		console.log('Called add program')
	}

	return (
		<div id={homeStyles.programEditor}>
			{/* The titles above the boxes */}
			<h3>Assembly</h3>
			<h3>Binary</h3>
			
			{/* The actual content boxes */}
			<textarea ref={progRef} name="prog" className={homeStyles.progArea} id={homeStyles.editable}></textarea>
			<textarea ref={binRef} name="binary" className={homeStyles.progArea} id={homeStyles.readOnly} value="Assemble your program to see the output binary here!" readOnly></textarea>
			
			{/* The submit buttons */}
			<button className={homeStyles.clickable} onClick={assembleProgram}>Assemble Program</button>
			<button ref={runBtnRef} className={homeStyles.notClickable}>Run Program</button>
		</div>
	)
}

export default ProgramEditor