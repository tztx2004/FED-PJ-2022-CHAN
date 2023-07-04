// board 모듈 - board.js
import $, { now } from "jquery";
import { useEffect, useRef, useState } from "react";
import "./css/board.css";
/* 제이슨 불러오기 */
import orgdata from "./data/data.json";

// 컴포넌트에서 제이슨데이터를 담지말고
// 반드시 바깥에서 담을것
// 초기 데이터 처리는 로컬스 'bdata'가 있으면 로컬스를 가져오고
// 없으면 제이슨 데이터를 사용하여 초기화 한다!
let org;
if (localStorage.getItem("bdata")) org = JSON.parse(localStorage.getItem("bdata"));
else org = orgdata;

// 제이슨 데이터 배열정렬하기(내림차순:최신등록순번이 1번)
org.sort((x, y) => {
    return Number(x.idx) == Number(y.idx) ? 0 : Number(x.idx) > Number(y.idx) ? -1 : 1;
});

// 제이쿼리 로드구역 함수
function jqFn() {
    $(() => {}); //// jQB ////
} //////// jqFn ////////

function Board() {
    // Hook 변수구역//
    // [ 제이슨 파일 데이터 로컬스토리지에 넣기 ]
    // 1. 변수에 제이슨 파일 문자화하여 불러오기
    // 상단에서 불러옴!
    // 실시간 데이터 변경 관리를 Hook변수화하여 처리함!
    const [jsn, setJsn] = useState(org);

    const nowmem = 
    useRef(localStorage.getItem("minfo")?JSON.parse(localStorage.getItem("minfo")):'');

    // 게시판 모드별 상태구분 Hook 변수만들기 //
    // 모드구분값 : CRUD (Create,Read,Update,Delete)
    // C - 글쓰기 / R - 글읽기 / U - 글수정 / D - 글삭제(U에 포함!)
    // 상태추가 : L - 글목록
    const [bdmode, setBdmode] = useState("L");

    // 로그인 상태 Hook 변수 만들기 //
    // 상태값 : false - 로그아웃상태 / true - 로그인상태
    const [log, setLog] = useState(false);

    // 쓰기버튼 출력여부상태 : 로그인사용자와 글작성자 일치시 true
    const [wtmode, setWtmode] = useState(false);

    // 수정모드에서 사용할 현재글 정보 셋팅하기 : [idx,uid,tit,cont]
    const [currItem, setCurrItem] = useState([]);

    // 2. 로컬스토리지 변수를 설정하여 할당하기

    localStorage.setItem("bdata", JSON.stringify(jsn));
    // console.log("로컬쓰:",localStorage.getItem("bdata"))

    // 3. 로컬스토리지 데이터를 파싱하여 게시판 리스트에 넣기
    // 3-1.로컬스토리지 데이터 파싱하기
    // let bdata = JSON.parse(localStorage.getItem("bdata"));
    // jsn 변수에 Hook상태처리했으므로 중간 파싱에 필요없음

    // console.log("로컬스파싱",bdata,"/개수",bdata.length);

    // 페이지번호 : 페이지단위별 순서번호
    // let pgnum = 1;

    // 페이지단위수
    let pgblock = 9;

    // 시작번호생성 : (페이지번호-1) * 페이지단위수
    // -> (pgnum-1)*pgblock

    // 끝번호생성 : 페이지번호 * 페이지단위수
    // -> pgnum*pgblock

    /******************************************************* 
            함수명: bindList
            기능: 페이지별 리스트를 생성하여 바인딩함
        *******************************************************/
    function bindList(pgnum) {
        // pgnum - 페이지번호
        console.log("bindList!!");
        // 0. 게시판 리스트 생성하기
        let blist = "";

        // 전체 레코드 개수
        let totnum = jsn.length;

        // 내림차순 정렬
        jsn.sort((x, y) => {
            return Number(x.idx) == Number(y.idx) ? 0 : Number(x.idx) > Number(y.idx) ? -1 : 1;
        });

        // 1. 일반형 for문으로 특정대상 배열 데이터 가져오기
        // 데이터 순서 : 번호, 글제목, 글쓴이, 등록일자, 조회수
        for (let i = (pgnum - 1) * pgblock; i < pgnum * pgblock; i++) {
            // 마지막 번호한계값 조건으로 마지막 페이지 데이터
            // 존재하는 데이터까지만 바인딩하기
            // 순번은 리스트상 순서번호를 넣는다(idx아님!)
            if (i < totnum) {
                blist += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>
                                <a href="#" data-idx="${jsn[i]["idx"]}">
                                    ${jsn[i]["tit"]}
                                </a>
                            </td>
                            <td>${jsn[i]["writer"]}</td>
                            <td>${jsn[i]["date"]}</td>
                            <td>${jsn[i]["cnt"]}</td>
                        <tr>
                    `;
            }
        } /////// for ///////

        // 2. 리스트 코드 테이블에 넣기
        $("#board tbody").html(blist);

        // 3. 페이징 블록 만들기
        // 3-1. 전체 페이지 번호수 계산하기
        // 전체레코드 수 / 페이지단위수 (나머지 있으면 +1)
        // 전체레코드 수 : totnum 변수에 이미 할당
        let pgtotal = Math.floor(totnum / pgblock);
        let pgadd = totnum % pgblock;
        // console.log("페이징 전체수:", pgtotal)
        // console.log("페이징 나머지",pgadd)

        // 페이징코드변수
        let pgcode = "";

        // 3-2. 페이징코드 만들기
        // 나머지가 있으면 1을 더함
        if (pgadd !== 0) pgtotal++;

        // 코드만들기 for문
        for (let i = 1; i <= pgtotal; i++) {
            pgcode +=
                // 페이지번호와 i가 같으면 a링크를 만들지 않는다!
                Number(pgnum) === i ? `<b>${i}</b>` : `<a href="#">${i}</a>`;

            // 사이구분자(마지막번호 뒤는 제외)
            if (i !== pgtotal) {
                pgcode += " | ";
            }
        } /////// for ////////

        // 3-3. 페이징코드 넣기
        $(".paging").html(pgcode);

        // 3-4. 이벤트 링크 생성하기
        $(".paging a").click(function (e) {
            // 기본이동막기
            e.preventDefault();
            // 바인딩함수 호출!(페이지번호 보냄)
            bindList($(this).text());
        }); ////////// click ///////////

        // 3-6. 링크 페이지 보기
        $("#board tbody td a").click(function (e) {
            e.preventDefault();
            // 게시판 상태값 업데이트
            setBdmode("R");

            // 현재 글번호(고유값idx) 읽어오기
            let selnum = $(this).attr("data-idx");

            // 원본데이터에서 해당 idx데이터 찾기
            let seldt = jsn.find((x) => {
                if (x.idx == selnum) return true;
            });

            console.log(selnum, seldt);

            // 글쓴이(seldt.writer)와 현재로그인한 사람(nowmem.uid)가 같으면
            // 수정하기 버튼 상태값 true로 업데이트 아니면 false
            if (seldt.writer === nowmem.current.uid) setWtmode(true);
            else setWtmode(false);

            $(() => {
                $(".readone .name").val(seldt.writer);
                $(".readone .subject").val(seldt.tit);
                $(".readone .content").val(seldt.cont);
                console.log("seldt",nowmem.current.unm, seldt.tit, seldt.cont);

                // 수정모드로 이동 시 읽기에서 기본 데이터 셋팅하여 재사용목적!
                // 저장순서 : 글idx, 글쓴이 아이디, 글제목, 글내용
                setCurrItem([seldt.idx, seldt.writer, seldt.tit, seldt.cont]);
            });
        }); ///////////// click /////////////
    } ///////// bindList //////////

    // 로그인 상태 체크 함수
    const chkLogin = () => {
        // 로컬스에 'minfo'가 있는 지 체크
        let chk = localStorage.getItem("minfo");
        // 로컬스에 셋팅했을 경우 상태 Hook에 true값 업데이트
        if (chk) setLog(true);
        else setLog(false);

        // 현재 로그인한
        nowmem.current = JSON.parse(chk);
        console.log("현재너:", nowmem.current);
    }; //// chkLogin ////

    // 로딩 체크함수 : useEffect에서 호출함!
    const callFn = () => {
        // 리스트 상태일때만 호출!
        console.log("callFn");
        if (bdmode == "L") bindList(1);
        // 로그인 상태 체크함수 호출
        chkLogin();
        console.log("로그인상태:", log, "/보드상태", bdmode);
    };

    // 모드전환함수 //
    const chgMode = (e) => {
        // 기본이동막기(하위a)
        e.preventDefault();

        // 하위 글자읽기
        let txt = $(e.target).text();
        console.log("버튼:", txt);

        // (1) 글쓰기 버튼 클릭
        if (txt == "Write") {
            setBdmode("C");

            // 읽기전용 입력창에 기본정보 셋팅
            $(() => {
                $(".writeone .name").val(nowmem.current.unm);
                $(".writeone .email").val(nowmem.current.eml);
            });
        }
        // (2) 리스트 버튼 클릭
        else if (txt == "List") setBdmode("L");
        // (3) 글쓰기 모드(C)일때 실행(Submit) 버튼클릭
        else if (txt == "Submit" && bdmode == "C") {
            // 타이틀
            let tit = $(".writeone .subject").val();
            // 내용
            let cont = $(".writeone .content").val();

            // 제목/내용 빈값 체크
            if (String(tit).trim() == "" || String(cont).trim() == "") {
                alert("You have to fill title and contents");
            }
            // 통과 시
            else {
                // 날짜데이터
                let today = new Date();
                let yy = today.getFullYear();
                let mm = today.getMonth() + 1;
                mm = mm < 10 ? "0" + mm : mm;
                let dd = today.getDate();
                dd = dd < 10 ? "0" + dd : dd;

                // 1. 원본데이터 변수할당
                let orgtemp = jsn;

                // 2. 임시변수에 입력할 객체 데이터 생성하기
                let temp = {
                    idx: jsn.length + 1, // 현재 개수 +1
                    tit: tit,
                    cont: cont,
                    att: "",
                    date: `${yy}-${mm}-${dd}`,
                    writer: nowmem.current.uid,
                    pwd: nowmem.current.pwd,
                    cnt: "1",
                };

                // 3. 원본임시변수에 데이터 push하기
                orgtemp.push(temp);

                // 4. Hook 관리변수에 최종 업데이트
                setJsn(orgtemp);

                // 5. 로컬스 변수에 반영하기
                localStorage.setItem("bdata", JSON.stringify(jsn));

                console.log(localStorage.getItem("bdata"));

                // 6. 게시판 모드 업데이트('L')
                setBdmode("L");
                // 7. 리스트 바인딩호출
                bindList(1);
            }
            /* 
                    {
                        "idx" : "1",
                        "tit" : "This is a Title1",
                        "cont" : "I wanna talk to you now1",
                        "att" : "",
                        "date" : "2023-06-01",
                        "writer" : "admin",
                        "pwd" : "1111",
                        "cnt" : "1"
                    },
                */
        } ///// 새로입력 /////

        // (4) 수정모드(U) 일때 //////////////
        else if (txt == "Modify") {
            setBdmode("U");

            // currItem 변수에 읽기모드에서 셋팅한 값을 읽어온다!
            $(() => {
                $(".updateone .name").val(currItem[1]);
                $(".updateone .subject").val(currItem[2]);
                $(".updateone .content").val(currItem[3]);
            });
        } //// else if ////
        // (5) 수정모드(U)에서 Submit버튼 클릭 시
        else if (txt == "Submit" && bdmode == "U") {
            // 1. 제목과 내용을 읽어옴!(고친내용읽기)
            let tit = $(".updateone .subject").val();
            let cont = $(".updateone .content").val();

            // 2. 빈값 체크하기
            if (tit.trim() == "" || cont.trim() == "") {
                alert("Title and content are required");
            } // if //
            // 3. 빈값이 아니면 해당 데이터 찾아서 값을 변경하기
            else {
                // 원본데이터에서 idx값이 일치하는 레코드의 값 변경
                jsn.find((v) => {
                    if (v.idx == currItem[0]) {
                        v.tit = tit;
                        v.cont = cont;
                        return true; // 필수!
                    } // if //
                }); //// find ////

                // 4. 게시판 모드 업데이트('L')
                setBdmode("L");

                // 5. 리스트 바인딩호출
                bindList(1);
            }
        } // else if //
        //// (6) 수정모드(U)에서 Delete 버튼 클릭 시
        else if (txt == "Delete" && bdmode == "U") {
            // 확인 대화창을 띄워 OK클릭 시 true처리
            if (window.confirm("Are you sure you want to delete it?")) {
                // 1. 원본데이터에서 해당 항목 레코드를 찾아 삭제함
                jsn.find((v, i) => { // v-값, i-순번
                    if (v.idx == currItem[0]) {
                        console.log(v.idx, currItem[0]);
                        jsn.splice(i, 1);
                        return true;// 필수
                    }/// if ///
                });
                // 2. 게시판 모드 업데이트('L')
                setBdmode("L");

                // 3. 리스트 바인딩호출
                bindList(1);
            }
        }

        $(() => bindList(1));
    }; //// chgMode ////

    // 로딩체크함수 호출
    useEffect(() => {
        callFn();
    }, []);

    // function test(props){
    //     bdata.map((x,i)=>{
    //         console.log(x[props])
    //         return x[props][i]
    //     })
    // }

    return (
        <>
            {/* 모듈코드 */}
            {/* <!-- 1. 게시판 리스트 : 게시판 모드 L일때 출력 --> */}
            {bdmode == "L" && (
                <table className="dtbl" id="board">
                    <caption>OPINION</caption>
                    {/* <!--상단 컬럼명 표시영역--> */}
                    <thead>
                        <tr>
                            <th>NUMBER</th>
                            <th>TITLE</th>
                            <th>WRITER</th>
                            <th>DATE</th>
                            <th>HITS</th>
                        </tr>
                    </thead>

                    {/* <!--중앙 레코드 표시부분--> */}
                    <tbody>
                        <tr>
                            <td colSpan="5">There is no data.</td>
                        </tr>
                    </tbody>

                    {/* <!--하단 페이징 표시부분--> */}
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="paging">
                                {/* <!-- 페이징번호 위치 --> */}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}

            {/* 2. 글쓰기 테이블 : 게시판 모드 "C"일때만 출력 */}
            {bdmode == "C" && (
                <table className="dtblview writeone">
                    <caption>OPINION : Write</caption>
                    <tbody>
                        <tr>
                            <td width="100">Name</td>
                            <td width="650">
                                <input type="text" className="name" size="20" readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input type="text" className="email" size="40" readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>Title</td>
                            <td>
                                <input type="text" className="subject" size="60" />
                            </td>
                        </tr>
                        <tr>
                            <td>Content</td>
                            <td>
                                <textarea className="content" cols="60" rows="10"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
            {/* 3. 읽기 테이블 : 게시판 모드 'R'일때만 출력 */}
            {bdmode == "R" && (
                <table className="dtblview readone">
                    <caption>OPINION : Read</caption>
                    <tbody>
                        <tr>
                            <td width="100">Name</td>
                            <td width="650">
                                <input type="text" className="name" size="20" readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>Title</td>
                            <td>
                                <input type="text" className="subject" size="60" readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>Content</td>
                            <td>
                                <textarea className="content" cols="60" rows="10" readOnly></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
            {/* 4. 수정(삭제) 테이블 : 게시판 모드 'U'일때만 출력 */}
            {bdmode == "U" && (
                <table className="dtblview updateone">
                    <caption>OPINION : Modify</caption>
                    <tbody>
                        <tr>
                            <td width="100">Name</td>
                            <td width="650">
                                <input type="text" className="name" size="20" readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>Title</td>
                            <td>
                                <input type="text" className="subject" size="60" />
                            </td>
                        </tr>
                        <tr>
                            <td>Content</td>
                            <td>
                                <textarea className="content" cols="60" rows="10"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
            <br />
            {/* 버튼 그룹박스 */}
            <table className="dtbl btngrp">
                <tbody>
                    <tr>
                        <td>
                            {
                                // 리스트모드(L)
                                bdmode == "L" && log && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">Write</a>
                                        </button>
                                    </>
                                )
                            }
                            {
                                // 글쓰기모드(C) : 서브밋 + 리스트버튼
                                bdmode == "C" && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">Submit</a>
                                        </button>
                                        <button onClick={chgMode}>
                                            <a href="#">List</a>
                                        </button>
                                    </>
                                )
                            }
                            {
                                // 읽기모드(R) : 리스트
                                bdmode == "U" && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">List</a>
                                        </button>
                                    </>
                                )
                            }
                            {
                                // 읽기모드(R+wtmode가true)
                                // 리스트 + 수정모드버튼
                                bdmode == "R" && wtmode && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">List</a>
                                        </button>
                                        <button onClick={chgMode}>
                                            <a href="#">Modify</a>
                                        </button>
                                    </>
                                )
                            }
                            {
                                // 수정모드(U) : 서브밋 + 삭제 + 리스트버튼
                                bdmode == "U" && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">Submit</a>
                                        </button>
                                        <button onClick={chgMode}>
                                            <a href="#">Delete</a>
                                        </button>
                                        <button onClick={chgMode}>
                                            <a href="#">List</a>
                                        </button>
                                    </>
                                )
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
}

export default Board;
