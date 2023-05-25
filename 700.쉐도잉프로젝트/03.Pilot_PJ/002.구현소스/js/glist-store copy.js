// 전체 리스트 페이지 뷰엑스 스토어 셋팅 JS - glist-store.js

import gdata from "./gdsData/glist-items.js"

const store = new Vuex.Store({
    state: {
        // 서브데이터 셋업
        // 전체상품정보 전역화
        gdata:gdata,
        // 필터데이터용 배열변수
        chkarr:[true,true,true],
        // 필터데이터용 배열입력값 변수
        selnm:["","",""],
        // 페이징용 변수
        pnum:0,
        // 모어용 변수
        mnum:0,
        // 모어버튼 표시변수
        mbtn:true,


    },
    // state 데이터변경 메서드 구역!
    mutations: {
        resCheck(dt){
            console.log(dt.chkarr)

            dt.chkarr.forEach((v,i)=>{
                if(v){
                    dt.selnm[i] = i===0?"men":i===1?"women":"style";
                }
                else{
                    dt.selnm[i]=""
                }
            })
        }, /// resCheck ////
        // 페이징 변수 업데이트 메서드
        updatePaging(dt,pm){
            dt.pnum = pm

        },//// updatePaging
        updateMore(dt,pm){
            dt.mnum = pm
            if(dt.mbtn>=25) dt.mbtn = false;
        },/// updateMore ///
        setData(dt,pm){
            console.log("구니셋",pm)
            console.log("선택gdata",dt.gdata[pm])
            console.log("카트전",localStorage.getItem("cart"))

            // 로컬스 데이터 cart없으면 [] 배열형식으로 문자넣기
            if(localStorage.getItem("cart")===null){
                localStorage.setItem("cart","[]")
            }
            console.log("카트후",localStorage.getItem("cart"))

            // 로컬스토리지 객체데이터 가져오기
            // 입력된 데이터는 문자형 객체이므로
            // 다시 파싱하여 원래 객체로 복원한다
            let org = localStorage.getItem("cart");
            org =JSON.parse(org);
            console.log("org",org);

            // 이미 선택한 상품일 경우 분기
            // 저장상태변수
            let save = true
            org.forEach(v=>{
                if(v.idx===dt.gdata[pm].idx){
                    alert("이미 선택하신 상품입니다.")
                    save = false;
                }
            })

            if(save){
                org.push(dt.gdata[pm])
                console.log("변환객체",org);

                localStorage
                .setItem("cart",JSON.stringify(org));
                console.log("반영후로칼쓰",localStorage.getItem("cart"))

                // 카트 애니메이션 버튼 등장
                this.commit('cartAni',org.length)
                
            }
        },///setData///
        clearData(){
            localStorage.removeItem("cart")
            console.log("cart지움")
        },
        cartAni(dt,pm){
            // 0. 생성된 카트이미지 지우고 시작!
            $("#mycart").remove();
            console.log("카트애니!",pm)

            // 1. gif
            $("body").append(`
            <img id="mycart" src="./images/mycart.gif" title="${pm}개의 상품이 카트에 있습니다">
            `)

            // 추가한 이미지 화면중앙에 위치
            $("#mycart").css({
                position:"fixed",
                top:"50%",
                
            })


        },
    },

    },
);
export default store;