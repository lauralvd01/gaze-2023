import Image from "next/image";


export default function Leaderboard({leader_list}){
    return(
        <>
            <ul class="list-group">
                {leader_list.map((pers) => 
                    <li class="list-group-item">
                        <Image
                            src="/../public/fire-exit.png"
                            alt="Bootstrap"
                            width="60"
                            height="60"
                        />
                        {pers}
                    </li>
                )}
            </ul>
        </>
    )
}