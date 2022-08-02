import homeStyles from './../styles/home.module.scss'
import ProgramEditor from './programEditor'

// Component for the homepage
const Home = () => {
	return (
        <div className={homeStyles.page}>
            <ProgramEditor />
        </div>
	)
}

export default Home