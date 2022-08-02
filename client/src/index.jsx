import { createRoot } from 'react-dom/client'
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
const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)