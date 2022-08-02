import ReactDOM from 'react-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'


const App = () => {
	return (
		<>
			<Navbar />
			<div>
				Hello world
			</div>
			<Footer />
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))