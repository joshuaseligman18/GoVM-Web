import { useRef } from 'react'

import programStyles from './../styles/program.module.scss'
import { hexString } from '../util/util'

// Component for where the user can edit and assemble their programs
const ProgramEditor = () => {

	// Reference to the JSX elements
	const progRef = useRef(null)
	const binRef = useRef(null)
	const runBtnRef = useRef(null)
	const progNameRef = useRef(null)

	let lastProg = null

	// Function that calls the API to assemble the program and output the binary
	async function assembleProgram() {
		// Call the API
		const res = await fetch('http://127.0.0.1:8080/api/asmprog', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prog: progRef.current.value
			})
		})

		// Get the data
		const data = await res.json()

		if (res.status === 200) {
			// Save the binary for future use
			lastProg = data.binaryProg

			// Convert the binary to a string and output it
			const instrStrArr = data.binaryProg.map((instr) => hexString(instr, 8))
			const instrStr = instrStrArr.join('\n')
			binRef.current.value = instrStr

			// Update the run program button
			runBtnRef.current.classList.remove(programStyles.notClickable)
			runBtnRef.current.classList.add(programStyles.clickable)
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
			runBtnRef.current.classList.add(programStyles.notClickable)
			runBtnRef.current.classList.remove(programStyles.clickable)
			runBtnRef.current.onclick = null
		}
	}

	// Function that gets called to add the program to the server's queue to run
	async function addProgramToQueue() {
		await fetch('http://127.0.0.1:8080/api/addprog', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				binaryProg: lastProg,
				progName: progNameRef.current.value
			})
		})
		progNameRef.current.value = ''
	}

	return (
		<div id={programStyles.programEditor}>
			{/* The titles above the boxes */}
			<h3>Assembly</h3>
			<h3>Binary</h3>
			
			{/* The actual content boxes */}
			<textarea ref={progRef} name="prog" className={`${programStyles.progArea} ${programStyles.editable}`} id={programStyles.editable}></textarea>
			<textarea ref={binRef} name="binary" className={programStyles.progArea} id={programStyles.readOnly} value="Assemble your program to see the output binary here!" readOnly></textarea>
			
			{/* The submit buttons */}
			<button className={programStyles.clickable} onClick={assembleProgram}>Assemble Program</button>
			<div id={programStyles.rightBtnArea}>
				<input ref={progNameRef} type="text" name="progName" placeholder="Program Name" id={programStyles.progNameInput} className={programStyles.editable}></input>
				<button ref={runBtnRef} id={programStyles.runBtn} className={programStyles.notClickable}>Run</button>
			</div>
		</div>
	)
}

export default ProgramEditor