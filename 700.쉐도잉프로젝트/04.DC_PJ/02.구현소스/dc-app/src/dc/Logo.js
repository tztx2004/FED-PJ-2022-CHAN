// DC로고 컴포넌트
import React from 'react';
import isrc from './imgSrc';

const Logo = ()=>{
    //객체형 스타일적용: 속성명이 틀리면 아예 출력되지 않는다!
    const mystyle={
        width:"56px",
        height:"56px",
        marginRight:"80px",
        borderRadius:"50%"
        // outline:"3px solid lime"
    };

    return(
        <h1 style={mystyle}>
            <img src={isrc.logo} style={{width:"56px"}}/>
        </h1>
    );
}; ///////// Logo //////////

export default Logo;