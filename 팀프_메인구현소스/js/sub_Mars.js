/* 화성 JS */

// 로드 ///////////
window.addEventListener("DOMContentLoaded", setMars);

// 화성 로딩 - setMars ///
function setMars() {
  console.log("로딩완료!");

  // header 영역 스크롤시 배경색, 찾기버튼 색변경 변수
  const searchbx = document.querySelector(".searchbx");
  const sbx = document.querySelector(".sbx");
  const sicon = document.querySelector(".sicon");

  /****************************************************
        [ GNB메뉴 스크롤 시 색변경 ]
    ******************************************************/
  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      document.querySelector(".top").classList.add("on");
      // document.querySelector('.active').classList.remove("on");
      searchbx.style = "background-color: #506a7e;";
      sicon.style = "background-color: #506a7e";
    } else {
      document.querySelector(".top").classList.remove("on");
      searchbx.style = "background-color: #575a5ecb;";
      sicon.style = "background-color: #575a5ecb;";
    }
  });

  /****************************************************
        [ 검색창 클릭시 열고 닫기 ]
    ******************************************************/

  sicon.onclick = () => {
    sbx.classList.toggle("on");
  };

  /************************************************* 
     함수명: chgMenu
     기능: 전체메뉴 보이기/숨기기
     *************************************************/
  // 햄버거버튼요소
  const ham = document.querySelector(".ham");
  // console.log("햄버거있니?",ham);

  // 햄버거요소에 이벤트 설정하기 //////
  ham.onclick = chgMenu;
  function chgMenu() {
    // 1. 호출확인
    // console.log("나야나!");

    // 2. 대상선정 : .top 요소
    var tg = document.querySelector(".top");

    // 3. 변경내용 : 대상에 클래스 "on"넣기
    tg.classList.toggle("active");
  } /////////////////// chgMenu 함수 ///////////////
  //////////////////////////////////////////////////

  //___________________________메인________________________________

  // console.log("화성 로딩완료");

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100); // .1초 정도는 줘야 효과있음

  // 1. 대상선정
  ///////////////////////// 여기는 보류 /////////////////////////////
  // 2. 함수호출
  // copyFt.forEach((ele)=>scFn(ele));
  //   window.addEventListener("scroll", () => {
  // let scHere = window.scrollY;
  // console.log("scHere", scHere);

  /************************************* 
        함수 : scFn
        기능 : 높이값에 따른 글씨 애니메이션, 색상변경
        변수 : 높이값(scFn), 색상(ftC)
    *************************************/
  // function scFn(scVal, ftC) {
  //   if (scHere >= scVal) {
  //     for (let x of copyFt) {
  //     //   console.log(x);
  //       // 글씨 나타남
  //       x.style.opacity = 1;
  //       // 글씨 위로 올라옴
  //       x.style.top = 0 + "px";
  //       // 약간의 시간 후 색상 변경
  //     } /////////// for of /////////////
  //   } /////////// if //////////////////
  //   if (scHere >= scVal + 1000) {
  //     for (let x of copyFt) {
  //       // console.log(x);
  //       // 글씨 나타남
  //       x.style.opacity = 1;
  //       // 글씨 위로 올라옴
  //       x.style.top = 0 + "px";
  //       // 약간의 시간 후 색상 변경
  //       setTimeout(() => {
  //         x.style.color = ftC;
  //       }, 800); //////// setTimeout ///
  //     } /////////// for of /////////////
  //   } /////////// if //////////////////
  // } //////////// scFn //////////////////////

  // if(scHere >= 1400) scFn(1400, "#fff");

  // 임시호출
  // for (let x of copyFt) {
  //   if (scHere >= 1400 && scHere <= 2500) {
  //       x.classList.remove("copyFt");
  //       x.classList.add("copyFtA");
  //   } else if (scHere > 2500) {
  //     x.classList.remove("copyFtA");
  //     x.classList.add("copyFt");
  //   }
  // }

  /***************************************** 
     함수 : scrollList
     기능 : 스크롤높이에 따라 클래스넣어줌(.copyFt)
     *****************************************/
  //  function scrollList() {}
  //}); ////////////// scroll /////////////////
  ////////////////////// 여기까지 보류 //////////////////////////////////

  //_____________________1pg_______________________________
  // 1. 대상선정
  const md_h3 = document.querySelector(".model h3");
  const imodel = document.querySelector(".imodel");
  const copyFt = document.querySelectorAll(".copyFt");
  const mars_copy3 = document.querySelectorAll(".mars_copy3 h2")
  const Mars3d = document.querySelectorAll(".Mars3d")

  // 2. 이벤트설정 (스크롤)
  /************************************************ 
  함수 : scFn
  기능 : 나타나는효과
  변수 : 화면높이값,글자요소,iframe,글자색상
************************************************/

  // window.scrollTo()
  window.addEventListener("scroll", () => {
    // 효과함수 ///////////////
    function scFn(scVal, Val_mars, ifr, ftC) {
      // 스크롤 위치값 변수
      let scHere = window.scrollY;
      console.log(scHere);
      // 스크롤 위치값이 1300넘어가면 효과줌
      if (scHere >= scVal) {
        appr(ifr);
      }
      // else if 주면 아래 조건 안먹음
      if (scHere >= scVal + 500) appr(Val_mars);

      // 3. 함수설정(appr)
      function appr(ele) {
        // 글씨 나타남
        ele.style.opacity = 1;
        // 글씨 위로 올라옴
        ele.style.top = 0 + "px";
        // 약간의 시간 후 색상 변경
        setTimeout(() => {
          ele.style.color = ftC;
        }, 800);
      } ////////////// appr ///////////////
    } //////////////// scFn //////////////////
    // 초기화 함수

    // 임시 미디어 쿼리 (1페이지 효과)
    const wW_mars = window.innerWidth;
    // console.log("hi",wW_mars);

    // 함수호출
    if (wW_mars > 1600) {
      scFn(1300, md_h3, imodel, "#fff");
      mars_copy3.forEach((ele)=>{
        // console.log("mars_copy3",ele);
        scFn(5000,ele,false,"#000");
      })
    }
  }); /////////// scroll ///////////////

  // else if(wW_mars <= 1600 && wW_mars > 1400) scFn(1000,"#fff");
  // else if(wW_mars <= 1400 && wW_mars > 1200) scFn(800,"#fff");
  // else if(wW_mars <= 1200 && wW_mars > 800) scFn(600,"#fff");
  // else if(wW_mars <= 800 && wW_mars > 600) scFn(400,"#fff");
  // else if(wW_mars <= 600) scFn(200,"#fff");

  // ________________________ 2pg ______________________________

  // 미디어쿼리
  window.addEventListener("resize", () => {
    const nWidth = window.innerWidth;
    if (matchMedia("screen and (max-width: 600px)").matches) {
      console.log("mobile");
    } ////////// 600px ///////////
    else if (matchMedia("screen and (max-width: 900px)").matches) {
      console.log("tablet");
    } ////////// 900px ///////////
    else if (matchMedia("screen and (max-width: 1100px)").matches) {
      console.log("desktop");
    } ////////// 1100px ///////////
  }); /////////////// resize //////////////

  /* ______________________하단___________________________ */

  /***************************************************
        [ 좌우뚫려있는 자유로운 행성박스 ]
    ***************************************************/

  // 좌우 화살표 변수 mbtn
  const mbtn = document.querySelectorAll(".mbtn");
  // 행성슬라이드 변수 mslide
  const mslide = document.querySelector("#mslide");
  // 광클금지 변수
  let prott = 0;

  const gs = (seq) => {
    if (prott) return;
    prott = 1;
    setTimeout(() => {
      prott = 0;
    }, 400); //timeout ////

    // li리스트 변수
    let clist = mslide.querySelectorAll("#mslide li");

    // 오른쪽 버튼
    if (seq) {
      // 한박스가아니라 박스기준1/3 만 이동해야하므로 33%
      mslide.style.left = "-33.33%";
      mslide.style.transition = ".4s ease-in-out";
      setTimeout(() => {
        mslide.appendChild(clist[0]);
        mslide.style.left = "0";
        mslide.style.transition = "none";
      }, 400); //timeout////

      // 600이하 미디어쿼리
      if (window.innerWidth < 600) {
        mslide.style.left = "-83%";
      }
    } // if ////

    // 왼쪽버튼
    else {
      mslide.insertBefore(clist[clist.length - 1], clist[0]);
      // 한박스가아니라 박스기준1/3 만 이동해야하므로 33%
      mslide.style.left = "-33.33%";
      mslide.style.transition = "none";
      setTimeout(() => {
        mslide.style.left = "0";
        mslide.style.transition = ".4s ease-in-out";
      }, 0); //timeout////

      // 600이하 미디어쿼리
      if (window.innerWidth < 600) {
        mslide.style.left = "-83%";
      }
    } // else ////
  }; //gs////

  // 실행코드
  mbtn.forEach((ele, idx) => {
    ele.onclick = () => {
      gs(idx);
    }; //onclick////
    ele.onmouseover = () => {
      ele.style.cursor = "pointer";
    }; //onmouseover ////
  }); //forEach////
} ////////// setMars ////////////
