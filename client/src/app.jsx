import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './components/home'
import React from 'react'

// Main app component
const App = () => {
	return (
		<React.StrictMode>
			<Navbar />
			<Home />
			<Footer />
		</React.StrictMode>
	)
}

export default App