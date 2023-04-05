import Head from 'next/head';
import Image from 'next/image';


// import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
// import Link from 'next/link';

export const SITE_TITLE = 'GazEDIfication';
import style from '@/styles/layout.module.css'


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
                        <a className="navbar-brand" href="/">
                            <span className={style.noir}>Gaz</span>
                            <span className={style.jaune}>EDI</span>
                            <span className={style.rouge}>fication</span>
                        </a>
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
                        <a href='/loggin'>
                            <button type="button" className="btn loggin_button m-2">se connecter/créer un compte</button>
                        </a>
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
                                <p> Projet software engineering </p>
                                <p> Laura Levraud</p>
                                <p> Simun Pauget</p>
                                <p> Pierre-Atoine Lequeu</p>
                                <p> Paul Cambon</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className='container'>
                                <a className="navbar-brand" href="/">
                                    <p>Home</p>
                                </a>
                                <a className="navbar-brand" href="/loggin">
                                    <p>Loggin</p>
                                </a>
                                <a className="navbar-brand" href="https://www.linkedin.com/in/paul-cambon54/">
                                    <p>Github du projet</p>
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
