// DC 메인 페지 컴포넌트
import React from "react";
import Ban from "./modules/Ban";
import VidIntro from "./modules/VidIntro";

const Games = ()=>{
    return(
        <>
            <Ban cat="GAMES"/>
            <VidIntro pg="GAMES" mm="on"/>
        </>
    );
}////////// Games ///////////

export default Games;