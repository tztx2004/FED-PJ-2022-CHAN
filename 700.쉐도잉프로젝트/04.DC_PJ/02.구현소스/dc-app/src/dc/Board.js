// board 모듈 - board.js
import $ from "jquery";
import { useEffect } from "react";
import "./css/board.css"
/* 제이슨 불러오기 */
import orgdata from './data/data.json'

// 컴포넌트에서 제이슨데이터를 담지말고
// 반드시 바깥에서 담을것
let jsn = orgdata

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{

    }); //// jQB ////
}//////// jqFn ////////

function Board(){
    
    
        // [ 제이슨 파일 데이터 로컬스토리지에 넣기 ]
        // 1. 변수에 제이슨 파일 문자화하여 불러오기
        // 상단에서 불러옴!
        
        // console.log(jsn);
        
        // 2. 로컬스토리지 변수를 설정하여 할당하기
        localStorage.setItem("bdata",JSON.stringify(jsn));
        // console.log("로컬쓰:",localStorage.getItem("bdata"))
        
        // 3. 로컬스토리지 데이터를 파싱하여 게시판 리스트에 넣기
        // 3-1.로컬스토리지 데이터 파싱하기
        let bdata = JSON.parse(localStorage.getItem("bdata"));
        console.log("로컬스파싱",bdata,"/개수",bdata.length);
        
        
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
        function bindList(pgnum){// pgnum - 페이지번호
            // 0. 게시판 리스트 생성하기
            let blist = "";
        
            // 전체 레코드 개수
            let totnum = bdata.length
        
            // 1. 일반형 for문으로 특정대상 배열 데이터 가져오기
            // 데이터 순서 : 번호, 글제목, 글쓴이, 등록일자, 조회수
            for(let i = (pgnum-1)*pgblock; i<pgnum*pgblock; i++){
                // 마지막 번호한계값 조건으로 마지막 페이지 데이터 
                // 존재하는 데이터까지만 바인딩하기
                if(i<totnum){
                    blist += `
                        <tr>
                            <td>${bdata[i]["idx"]}</td>
                            <td>
                                <a href="view.html?idx=${bdata[i]["idx"]}">
                                    ${bdata[i]["tit"]}
                                </a>
                            </td>
                            <td>${bdata[i]["writer"]}</td>
                            <td>${bdata[i]["date"]}</td>
                            <td>${bdata[i]["cnt"]}</td>
                        <tr>
                    `;
                }
            }/////// for ///////
        
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
            if(pgadd!==0) pgtotal++;
            
            // 코드만들기 for문
            for(let i = 1; i<=pgtotal; i++){
                pgcode += 
                // 페이지번호와 i가 같으면 a링크를 만들지 않는다!
                Number(pgnum) === i?
                `<b>${i}</b>` : `<a href="#">${i}</a>`;
        
                // 사이구분자(마지막번호 뒤는 제외)
                if(i!== pgtotal){
                    pgcode += " | "
                }
            }/////// for ////////
        
            // 3-3. 페이징코드 넣기
            $(".paging").html(pgcode);
        
            // 3-4. 이벤트 링크 생성하기
            $(".paging a").click(function(e){
                // 기본이동막기
                e.preventDefault();
                // 바인딩함수 호출!(페이지번호 보냄)
                bindList($(this).text());
                
            })////////// click ///////////
        
        }///////// bindList //////////
        
        const callFn = ()=> bindList(1)
        useEffect(callFn, []);
        
        
        
        // console.log("코드:",blist);
            
    return(
        <>
            {/* 모듈코드 */}
            {/* <!--게시판 리스트--> */}
        <table className="dtbl" id="board">
            <caption>
                OPINION
            </caption>
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

        <br />
        <table className="dtbl btngrp">
            <tr>
                <td>
                    <button>
                        <a href="list.php">LIST</a>
                    </button>
                    <button className="wbtn">
                        <a href="write.php">WRITE</a>
                    </button>
                </td>
            </tr>
        </table>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
}

export default Board;