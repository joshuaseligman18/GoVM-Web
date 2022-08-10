import homeStyles from './../styles/home.module.scss'

// Component for the GitHub area
const GitHub = () => {
    return (
        <div id={homeStyles.githubArea}>
            {/* GitHub logo */}
            <img id={homeStyles.githubLogo} src='/githubLogo.png'></img>
            {/* Area for links to GitHub repos */}
            <div id={homeStyles.githubLinksArea}>
                <p>GoVM Package and Assembly Documentation: <a className={homeStyles.githubLink} href="https://github.com/joshuaseligman/GoVM" target="_blank">https://github.com/joshuaseligman/GoVM</a></p>
                <p>GoVM Website: <a className={homeStyles.githubLink} href="https://github.com/joshuaseligman/GoVM-Web" target="_blank">https://github.com/joshuaseligman/GoVM-Web</a></p>
            </div>
        </div>
    )
}

export default GitHub