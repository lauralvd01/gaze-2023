import Head from "next/head";
import Image from "next/image";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

// import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
// import Link from 'next/link';

export const SITE_TITLE = "GazEDIfication";
import style from "@/styles/layout.module.css";

export default function Layout({ children }) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

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
            <div className="container">
              <div className="float-start">
                <Link className="navbar-brand pb-2" href="/">
                  <Image
                    src="/biere-petite.png"
                    alt="PA=anus"
                    width="50"
                    height="50"
                  />
                </Link>
              </div>
              <div className="float-start">
                <Link className="navbar-brand" href="/">
                  <span className={style.noir}>Gaz</span>
                  <span className={style.jaune}>EDI</span>
                  <span className={style.rouge}>fication</span>
                </Link>
              </div>
              {/* <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
              <span className="navbar-toggler-icon"></span>
              </button> */}
            </div>
            {/* <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
              </ul>
            </div> */}
            {!user ? (
              <Link href="/login">
                <button type="button" className="btn loggin_button m-2">
                  se connecter/créer un compte
                </button>
              </Link>
            ) : (
              <>
                <Link href="/profile">
                  <button type="button" className="btn loggin_button m-2">
                    Profil
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn loggin_button m-2"
                  onClick={() => supabaseClient.auth.signOut()}
                >
                  log out
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>
        {children}
        {/* <div className="container">{children}</div> */}
      </main>
      <footer className="shadow">
        <div className="container">
          <p className="warning">
            {" "}
            Attention l&apos;abus d&apos;alcool est dangereux pour la santé !
          </p>
          <div className="row">
            <div className="col">
              <div className="container">
                <p> Projet software engineering </p>
                <p> Laura Levraud</p>
                <p> Simun Pauget</p>
                <p> Pierre-Atoine Lequeu</p>
                <p> Paul Cambon</p>
              </div>
            </div>
            <div className="col">
              <div className="container">
                <Link className="navbar-brand" href="/">
                  <p>Home</p>
                </Link>
                <Link className="navbar-brand" href="/login">
                  <p>Login</p>
                </Link>
                <Link
                  className="navbar-brand"
                  href="https://github.com/lauralvd01/gaze-2023"
                >
                  <p>Github du projet</p>
                </Link>
                <p> Merci pour votre visite, à bientôt !</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
