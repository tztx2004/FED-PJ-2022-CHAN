// 메인 레이아웃 컴포넌트
import Logo from "./Logo";
import "./css/layout.css";
import { Link, Outlet } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

/******************************************************** 
    [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
    1. <Link to="/경로명"></Link>
    -> to속성의 경로는 <Route path="/경로명"> 과 일치함!

    2. <Outlet />
    -> 라우터 연결 컴포넌트 출력자리 컴포넌트
********************************************************/

const Layout = () => {
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


    return (
        <>
            {/* 1. 상단영역 */}
            <header className="top">
                {/* 네비게이션 파트 */}
                <nav className="gnb">
                    <ul>
                        <li>
                            <Link to="/main">
                                <Logo gb="top"/>
                            </Link>
                        </li>
                        {gnb_data.map((v, i) => (
                            <li key={i}>
                                <Link to={v.link}>{v.txt}</Link>
                                {/* {console.log(v.sub)} */}
                                {/* v.sub가 없으면 undefined */}
                                {
                                    // 조건식 && 출력코드
                                    // 조건: sub데이터가 없지않으면
                                    // undefined - 정의되지 않은값
                                    // null - 빈값
                                    // 위의 두가지는 데이터가 없다는 값임!
                                    v.sub != undefined && (
                                        <div className="smenu">
                                            <ol>
                                                {v.sub.map((v, i) => (
                                                    <li key={i}>
                                                        <Link to={v.link}>  {v.txt}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )
                                }
                            </li>
                        ))}
                        <li style={{marginLeft:"auto"}}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </li>
                        <li>
                            <Link to="/mem">
                                JOIN US
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                                LOG IN
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            {/* 2. 메인영역 */}
            <main className="cont">
                {/* 출력파트 : 각 페이지가 컴포넌트가 출력됨 */}
                <Outlet />
            </main>
            {/* 3.하단영역 */}
            <footer className="info">
                <ul>
                    <li>
                        <Logo/>
                    </li>
                    <ol style={{display:"flex"}}>
                    {
                        bmenu.map((x,i)=>
                        <li key={i}>
                            {x.txt}
                        </li>
                        )
                    }
                    </ol>
                </ul>
                All Site Content © &amp; TM DC, unless otherwise noted here.
                <br />
                All rights reserved.
            </footer>
        </>
    );
}; ////// Layout //////

export default Layout;
