//// 태양계 JS - solar3d.js ////

window.addEventListener("DOMContentLoaded", () => {
  const qs = (x) => document.querySelector(x);
  const qsa = (x) => document.querySelectorAll(x);

  console.log("ready!");

  /************************************* 
        [ 구현내용 ]
        - 축소확대 버튼 클릭 시 표기된 배율만큼
        태양계 전체를 축소/확대 적용한다
        - 이때 클릭된 메뉴는 오버 시 변경색을 유지한다
    *************************************/

  // 1. 대상선정
  const tit = qsa(".tit a");
  const scbx = qs(".scbx");

  for (let x of tit) {
    // console.log(x);
    x.onclick = () => {
      console.log(x);
      const abx = "";
      switch (x) {
        case x === `<a href="#">X 1.5</a>`:
          abx = "1.5";
          break;
        case x === "X 1":
          abx = "1";
          break;
        case x === "X 0.7":
          abx = "0.7";
          break;
        case x === "X 0.5":
          abx = "0.5";
          break;
        case x === "X 0.3":
          abx = "0.3";
          break;
      }
      console.log(abx);
      scbx.style.transform = `scale(${abx})`;
    }; ///////////onclick////////
  } ///////////for of///////////
});
