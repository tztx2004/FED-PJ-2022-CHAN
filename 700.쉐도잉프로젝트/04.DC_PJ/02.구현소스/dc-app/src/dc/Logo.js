// DC로고 컴포넌트
import React from 'react';
import isrc from './imgSrc';

const Logo = (props)=>{
    //객체형 스타일적용: 속성명이 틀리면 아예 출력되지 않는다!
    const mystyle={
        width:"56px",
        height:"56px",
        marginRight:"80px",
        borderRadius:"50%"
        // outline:"3px solid lime"
    };

    // 자식컴포넌트 처리용함수
    const nayana = (x)=>{
        // 속성전달을 통한 부모함수 호출 및 값 전달
        return props.tt(x)
    };

    return(
        <h1 style={mystyle} onClick={()=>nayana('나야나')}>
            <img src={isrc.logo} style={{width:"56px"}}/>
        </h1>
    );
}; ///////// Logo //////////

export default Logo;