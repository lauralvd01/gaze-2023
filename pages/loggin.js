import style from '@/styles/loggin.module.css'
import Image from 'next/image'
import React from 'react';



export default function Loggin(){
    const [iscreatting, setcreate] = React.useState(false);

    const changeCreation = () => {
        setcreate(!iscreatting);
        return (
            <></>
        )
    }
    return (
        <div className={style.main_loggin}>
            <div className="container logging-container">
                <div className="card">
                    <div className="card-body">
                        {iscreatting?(
                            <h2>Création d'un compte</h2>
                        ):(
                            <h2>Connection</h2>
                        )}
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Adresse mail </label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mot de passe</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            {iscreatting?(
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Nom d'utilisateur </label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <label className="form-label">Sexe </label>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="" checked="checked"/>
                                                <label className="form-check-label">
                                                    Femme
                                                </label>
                                                </div>
                                                <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                                <label className="form-check-label mb-3" >
                                                    Homme
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-8'>
                                            <div className="mb-3">
                                                <label className="form-label">Poids</label>
                                                <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="120 (beau bestiau)"/>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="button" className="btn loggin_button my-2">Créer le compte</button>
                                    <div className={style.switchlog}>
                                        <a onClick={changeCreation}>Vous possédez déjà un compte ?</a>
                                    </div>
                                </>
                            ):(
                                <>
                                    <button type="button" className="btn loggin_button my-2">Se connecter</button>
                                    <div className={style.switchlog}>
                                        <a onClick={changeCreation}>Vous n'avez pas encore de compte ?</a>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <a href='/'>
                <Image src="/../public/fire-exit.png" className={style.exit_image} alt="Bootstrap" width="60" height="60"/>
            </a>
        </div>
    )
}