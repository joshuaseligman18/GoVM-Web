import ReactDOM from 'react-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './components/home'

// Main app component
const App = () => {
	return (
		<>
			<Navbar />
			<Home />
			<Footer />
		</>
	)
}

// Render the application within the "app" element in the html file
ReactDOM.render(<App />, document.getElementById('app'))