import Image from "next/image";


export default function Leaderboard({leader_list}){
    return(
        <div className="leader_box">
            <h1>Le classement des champions :</h1>
            <ul class="list-group">
                {leader_list.map((pers, index) => 
                    <li class="list-group-item">
                        {index == 0?(
                            <>
                                <Image
                                    src="/../public/medalGold.png"
                                    alt="Bootstrap"
                                    className="medalImage"
                                    width="32"
                                    height="30"
                                />
                            </>
                        ):(index == 1?(
                            <>
                                <Image
                                    src="/../public/medalSilver.png"
                                    alt="Bootstrap"
                                    className="medalImage"
                                    width="32"
                                    height="30"
                                />
                            </>
                        ):(index == 2?(
                            <>
                                <Image
                                    src="/../public/medalBronze.png"
                                    alt="Bootstrap"
                                    className="medalImage"
                                    width="32"
                                    height="30"
                                />
                            </>
                        ):(
                            <>
                            </>
                        ))
                        )}
  
                        {pers}
                    </li>
                )}
            </ul>
        </div>
    )
}