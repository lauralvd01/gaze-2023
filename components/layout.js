import Head from 'next/head';
import Image from 'next/image';


// import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
// import Link from 'next/link';

export const siteTitle = 'Paul\'s research project';

export default function Layout({children, home}){
    return (
        <div className="bg-light">
            <Head>
                {/* <link rel="icon" href="/favicon.ico" /> */}
                <link rel="icon" href="/poland.png" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header>
                <nav className="navbar navbar-expand-lg bg-gradient shadow">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <Image src="/../public/images/artem.png" alt="Bootstrap" width="50" height="50"/>
                        </a>
                        <a className="navbar-brand" href="/">Projet recherche</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/simulator">simulateur</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <a className="btn" href="https://www.linkedin.com/in/paul-cambon54/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container">
                    {children}
                </div>
            </main>
            <footer className='bg-gradient shadow'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className='container'>
                                <p> Projet recherche informatique </p>
                                <p> Paul Cambon 2A depinfo</p>
                                <p> Développement Web </p>
                                <p> Réalisé au premier semestre 2023</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className='container'>
                                <a className="navbar-brand" href="/">
                                    <p>Home</p>
                                </a>
                                <a className="navbar-brand" href="/simulator">
                                    <p>Simulateur</p>
                                </a>
                                <a className="navbar-brand" href="https://www.linkedin.com/in/paul-cambon54/">
                                    <p>Linkedin</p>
                                </a>
                                <p> Merci pour votre visite, à bientôt !</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
