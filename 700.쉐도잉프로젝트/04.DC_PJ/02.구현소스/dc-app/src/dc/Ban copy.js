// 배너 컴포넌트 - Ban.js
// 배너 CSS
import './css/ban.css'
// 배너 데이터
import ban_data from './data/banner';

// 반복리스트 코드 생성 컴포넌트
function MakeList(props){
    return(
        <li>
            <img className='banimg' src={props.rec} alt="배너"/>
            <section>
                <h3>{props.rec[0]["src"]}</h3>
                <h2></h2>
                <p></p>
                <button></button>
            </section>
        </li>
    )
}// MakeList 

// 배너출력용 컴포넌트
function Ban(props){
    return(
        <>
            <MakeList rec = {props.cat}/>
        </>
    )
}

export default Ban;