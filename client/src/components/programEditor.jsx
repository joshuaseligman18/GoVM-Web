import { useRef } from 'react'

import homeStyles from './../styles/home.module.scss'
import { hexString } from '../util/util'

// Component for where the user can edit and assemble their programs
const ProgramEditor = () => {

	// Reference to the JSX elements
	const progRef = useRef(null)
	const binRef = useRef(null)

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
		} else {
			// Get the error message
			if (data.err.trim() === 'Invalid instruction') {
				// Reset the error message to if it is an empty program
				binRef.current.value = 'Assemble your program to see the output binary here!'
			} else {
				binRef.current.value = data.err
			}
		}
	}

	return (
		<div id={homeStyles.programEditor}>
			<div id={homeStyles.progRow}>
				<h3>Assembly</h3>
				<h3>Binary</h3>
				<textarea ref={progRef} name="prog" className={homeStyles.progArea}></textarea>
				<textarea ref={binRef} name="binary" className={homeStyles.progArea} value="Assemble your program to see the output binary here!" readOnly></textarea>
			</div>
			<div id={homeStyles.submitRow}>
				<button onClick={assembleProgram}>Assemble Program</button>
				<button>Run Program</button>
			</div>
		</div>
	)
}

export default ProgramEditor