// [ 제이슨 파일 데이터 문자화하여 불러오기 ] 
// 1. 문자화
let jsn = JSON.stringify(mydata);
// console.log(jsn)

// 2. 로컬스토리지 할당
localStorage.setItem("bdata",jsn)
// console.log(localStorage.getItem("bdata"))

// 3. 로컬스토리지  파싱
// 3-1. 로컬스토리지 데이터 파싱
let bdata = JSON.parse(localStorage.getItem("bdata"))
console.log(bdata)

// 페이지번호
let pgnum = 1

// 페지이단위수
let pgblock = 9



/* bindList */
function bindList(pgnum){
    // 0. 게시판 리스트 생성
    let blist ="";

    // 전체 레코드 개수
    let totnum = bdata.length

    // 1. 
    for(let i =(pgnum-1)*pgblock; i<pgnum*pgblock; i++){
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
    }// for

    // 2. 리스트 코드 테이블에 넣기
    $("#board tbody").html(blist);

    // 3. 페이징 블록 만들기
    // 3-1. 전체 페이지 번호 수 계산
    let pgtotal = Math.floor(totnum/pgblock)
    let pgadd = totnum % pgblock

    // 페이징코드변수
    let pgcode = '';

    // 3-2. 페이징코드 만들기
    if(pgadd!==0) pgtotal++;

    // 코드만들기 for
    for(let i = 1; i<=pgtotal; i++){
        pgcode +=
        Number(pgnum) === i?
        `<b>${i}</b>`:`<a href="#">${i}</a>`;

        if(i!==pgtotal){
            pgcode += " | "
        }
    } // for 

    // 3-3. 페이징코드 넣기
    $(".paging").html(pgcode)

    // 3-4. 이벤트 링크 생성
    $(".paging a").click(function(){
        event.preventDefault();
        bindList($(this).text())
    })// click //
} // bindList 


$(()=>{
    bindList(1)
    console.log("1 제이쿼리로드구역")
})

window.addEventListener("load",()=>{

    console.log("2 자스로드")
})