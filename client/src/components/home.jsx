import homeStyles from './../styles/home.module.scss'
import ProgramEditor from './programEditor'
import Status from './status'
import GitHub from './github'

// Component for the homepage
const Home = () => {
	return (
		<div id={homeStyles.homePage} className={homeStyles.page}>
			<ProgramEditor />
			<Status />
			<GitHub />
		</div>
	)
}

export default Home