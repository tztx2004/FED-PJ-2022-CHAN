// VidIntro 컴포넌트용 데이터

/* 
    [ 데이터 조건 ]
    link 속성 값 셋팅 시 하나의 링크만 셋팅할 것!
    링크가 있을 경우 sum 또는 desc 속성값에 단 하나의 *표시만 어디든지 넣는다
*/

const vidintro_data = {
    main: {
        vsrc: "https://www.youtube.com/embed/jprhe-cWKGs",
        stit: "FEATURED VIDEO",
        btit: "THE FLASH - FINAL TRAILER",
        sum: "Are YOU ready? THE FLASH - Only in Theaters June 16.",
        desc: `Advance tickets available now! ^Visit our official Flash hub^ for tickets and showtimes!`,
        link: "https://www.dc.com/theflash",
    },
    CHARACTERS: {
        vsrc: "유튜브동영상정보",
        stit: "작은타이틀",
        btit: "큰타이틀",
        sum: "요약소개",
        desc: "설명",
        link: "관련링크",
    },
    COMICS: {
        vsrc: "https://www.youtube.com/embed/uGGjQH4YLPU",
        stit: "FEATURED VIDEO",
        btit: "WELCOME TO THE DAWN OF DC - COMIC TRAILER",
        sum: "Welcome to the Dawn of DC! In this yearlong storytelling initiative, DC is forging the future one hero at a time with epic new series, new creative teams and new battles to fight across the DC Universe in comics including ",
        desc: "설명",
        link: "관련링크",
    },
    MOVIES: {
        vsrc: "https://www.youtube.com/embed/r51cYVZWKdY",
        stit: "FEATURED VIDEO",
        btit: "THE FLASH – OFFICIAL TRAILER 2",
        sum: "Watch worlds collide in trailer 2 for The Flash - Only in Theaters June 16.",
        desc: "Warner Bros. Pictures presents The Flash , directed by Andy Muschietti (the IT  films, ). Ezra Miller reprises their role as Barry Allen in the DC Super Hero’s first-ever standalone feature film.",
        link: "관련링크",
    },
    GAMES: {
        vsrc: "https://www.youtube.com/embed/bFmeHsaYn8Y",
        stit: "FEATURED VIDEO",
        btit: "Suicide Squad: Kill the Justice League Official CO-OP GAMEPLAY - 'NO MATTER THE COST'",
        sum: "Stop The Flash and rescue Lex Luthor in the process. No matter the cost. Suicide Squad: Kill the Justice League is available May 26, 2023 on PS5, Xbox Series X|S, and PC.",
        desc: "Learn more: https://www.suicidesquadgame.com/en-us",
        link: ["https://www.suicidesquadgame.com/en-us","https://www.suicidesquadgame.com/en-us"],
    },
    NEWS: {
        vsrc: "유튜브동영상정보",
        stit: "작은타이틀",
        btit: "큰타이틀",
        sum: "요약소개",
        desc: "설명",
        link: "관련링크",
    },
    VIDEO: {
        vsrc: "https://www.youtube.com/embed/qK3WDh0rrE0",
        stit: "FEATURED VIDEO",
        btit: "THE FLASH - DRONE SHOW AT VIVID SYDNEY",
        sum: "In case you missed it - The Flash was included as part of the biggest ever opening weekend of Vivid Sydney where 1,053 drones were used to create the largest drone show in the southern hemisphere!",
        desc: "Visit our Flash Hub for all things The Flash and to find tickets and showtimes near you!",
        link: ["https://www.vividsydney.com/","https://www.dc.com/theflash"],
    },
};

export default vidintro_data;

