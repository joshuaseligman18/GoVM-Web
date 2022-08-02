import navStyles from './../styles/navbar.module.scss'

// Component for the navbar
const Navbar = () => {
	return (
		<nav id={navStyles.navbar} className={navStyles.bar}>
			<h1>GoVM</h1>
		</nav>
	)
}

export default Navbar