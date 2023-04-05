import Head from 'next/head';
import Image from 'next/image';


// import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
// import Link from 'next/link';

export const SITE_TITLE = 'GazEDIfication';

export default function Layout({children}){
    return (
        <>
            <Head>
                {/* <link rel="icon" href="/favicon.ico" /> */}
                <link rel="icon" href="/poland.png" />
                <meta name="og:title" content={SITE_TITLE} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header>
                <nav className="navbar navbar-expand-lg bg-gradient shadow">
                    <div className="container-fluid">
                        <a className="navbar-brand pb-2" href="/">
                            <Image src="/../public/biere-petite.png" alt="PA=anus" width="50" height="50"/>
                        </a>
                        <a className="navbar-brand" href="/">GazeEDIfication</a>
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
                        <button type="button" class="btn loggin_button">Primary</button>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container">
                    {children}
                </div>
            </main>
            <footer className='shadow'>
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
        </>
    );
}
