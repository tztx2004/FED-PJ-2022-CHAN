// 공통 데이터 - 상단, 하단영역 : common.js


    /* 
        sub:[{
                txt:"",
                link:"",
            }]
    */

    /* GNB메뉴 데이터 구성하기 */
    const gnb_data = [
        // {
        //     txt: "HOME",
        //     link: "/",
        // },
        {
            txt: "CHARACTERS",
            link: "/ct",
        },
        {
            txt: "COMICS",
            link: "/co",
            sub: [
                {
                    txt: "LATEST COMICS",
                    link: "/co1",
                },
                {
                    txt: "DC UNIVERSE INFINITE",
                    link: "/co2",
                },
                {
                    txt: "ALL COMICS SERIES",
                    link: "/co3",
                },
            ],
        },
        {
            txt: "MOVIES & TV",
            link: "/mv",
            sub: [
                {
                    txt: "DC MOVIES",
                    link: "/mv",
                },
                {
                    txt: "DC SERIES",
                    link: "/mv",
                },
                {
                    txt: "DC ON HBO MSX",
                    link: "/mv",
                },
            ],
        },
        {
            txt: "GAMES",
            link: "/gm",
        },
        {
            txt: "NEWS",
            link: "/nw",
        },
        {
            txt: "VIDEO",
            link: "/vd",
        },
    ];

    /* 하단링크 데이터 셋업! */
    const bmenu = [
        {
            txt: "Privacy Policy",
            link: "https://www.warnermediaprivacy.com/policycenter/b2c/WM/",
        },
        {
            txt: "Terms",
            link: "https://www.dcuniverseinfinite.com/terms?_gl=1*1h1bo0c*_gcl_au*OTEwMDIzOTk0LjE2ODQ4MDYwOTM.",
        },
        {
            txt: "Ad Choices",
            link: "https://www.warnermediaprivacy.com/policycenter/b2c/wm/",
        },
        {
            txt: "Accessibility",
            link: "https://policies.warnerbros.com/terms/en-us/#accessibility",
        },
        {
            txt: "Cookie Settings",
            link: "https://www.dc.com/#compliance-link",
        },
    ]

export {gnb_data,bmenu};