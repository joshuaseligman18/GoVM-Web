import { useRef } from 'react'

import homeStyles from './../styles/home.module.scss'

const ProgramEditor = () => {

	const progRef = useRef(null)

	async function assembleProgram() {
		const res = await fetch('http://127.0.0.1:8080/api/asmprog', {
			method: 'POST',
			body: JSON.stringify({
				prog: progRef.current.value
			})
		})

		console.log(res.json())

	}

	return (
		<div id={homeStyles.programEditor}>
			<div id={homeStyles.progRow}>
				<h3>Assembly</h3>
				<h3>Binary</h3>
				<textarea ref={progRef} name="prog" className={homeStyles.progArea}></textarea>
				<textarea name="binary" className={homeStyles.progArea} value="Test" readOnly></textarea>
			</div>
			<div id={homeStyles.submitRow}>
				<button onClick={assembleProgram}>Assemble Program</button>
				<button>Run Program</button>
			</div>
		</div>
	)
}

export default ProgramEditor