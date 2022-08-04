import homeStyles from './../styles/home.module.scss'
import CpuStatus from './cpuStatus'
import ProgramEditor from './programEditor'
import QueueArea from './queueArea'

// Component for the homepage
const Home = () => {
	return (
		<div id={homeStyles.homePage} className={homeStyles.page}>
			<ProgramEditor />
			<QueueArea />
			<CpuStatus />
		</div>
	)
}

export default Home