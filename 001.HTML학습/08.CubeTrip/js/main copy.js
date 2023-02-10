// 큐브트립 메인 JS ///////////////////////

/***************************************** 
    [ 구현 요구사항 ]
    - 도시별 메뉴버튼 클릭 시 해당 도시의 데이터를 큐브회전 후 도시와 매칭하여 정보를 화면에 출력한다!
*****************************************/

// 로딩구역 ////////////////////////////////
window.addEventListener("DOMContentLoaded", loadFn);

function loadFn() {
    console.log("로딩완료");

    const qs = (x) => document.querySelector(x);
    const qsa = (x) => document.querySelectorAll(x);
    // qs, qsa 이렇게 줄여 놓으려면 함수로 만들어놔라!!!

    // 1. 대상선정
    // 1-1. 이벤트대상 : .city a
    const menu = qsa(".city a");

    // 1-2. 변경대상1 : 큐브.cube
    const cube = qs(".cube");

    // 1-3. 변경대상2 : 도시명 .cname
    const cname = qs(".cname");

    // 1-4. 변경대상3 : 도시정보 .cinfo
    const cinfo = qs(".cinfo");

    // 1-5. 변경대상4 : 도시정보박스 .cbx
    const cbx = qs(".cbx");

    // console.log(cname);

    // 2. 메뉴 클릭이벤트
    for (let x of menu) {
        // x는 각각의 a요소

        // 1. 클릭 이벤트 설정
        x.onclick = () => {
            // 1. 메뉴 텍스트 읽기
            let mtxt = x.innerText;
            // console.log(mtxt);

            // 2. 회전값 셋팅하기
            // 회전값변수
            let setval;

            switch (mtxt) {
                case "출발":
                    setval = "rotateX(0deg) rotateY(0deg)";
                    break;
                case "서울":
                    setval = "rotateX(-90deg) rotateY(-360deg)";
                    break;
                case "뉴욕":
                    setval = "rotateX(360deg) rotateY(-90deg)";
                    break;
                case "파리":
                    setval = "rotateX(-360deg) rotateY(90deg)";
                    break;
                case "베를린":
                    setval = "rotateX(720deg) rotateY(-180deg)";
                    break;
                case "런던":
                    setval = "rotateX(450deg) rotateY(360deg)";
                    break;
                default:
                    setval = "rotateX(0deg) rotateY(0deg)";
                    break;
            } ///////// switch case ///////////////

            // console.log(setval);

            // 회전값 적용
            cube.style.transform = setval;
            cube.style.transition = "1s ease-in-out";

            if (mtxt === "출발") return;

            // 4. 도시정보 셋팅하기
            cname.innerText = mtxt;
            cinfo.innerText = city[mtxt];

            // 5. 도시정보박스 보이기
            // 대상 : .cbx
            // 내용 : 큐브 1.5초 회전 후 도시정보박스가 보여야한다
            // 1.5초 후에 코드를 실행한다 -> setTimeout(함수,시간)

            setTimeout(() => {
                cbx.style.opacity = 1;
                cbx.style.transition = "opacity .8s ease-in-out";
            }, 1500);
        }; ////////// click event ////////////////
    } ///////// for of /////////////
} /////////// loadFn 함수 /////////////////
