import homeStyles from './../styles/home.module.scss'

const ProgramEditor = () => {

    function assembleProgram() {
        console.log('hello world!')
    }

    return (
        <div id={homeStyles.programEditor}>
            <div id={homeStyles.progRow}>
                <h3>Assembly</h3>
                <h3>Binary</h3>
                <textarea name="prog" className={homeStyles.progArea}></textarea>
                <textarea name="binary" className={homeStyles.progArea} readOnly></textarea>
            </div>
            <div id={homeStyles.submitRow}>
                <button onClick={assembleProgram}>Assemble Program</button>
                <button>Run Program</button>
            </div>
        </div>
    )
}

export default ProgramEditor