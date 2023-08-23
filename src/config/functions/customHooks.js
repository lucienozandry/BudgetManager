import React from "react";

export function useResize(){
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    window.addEventListener('resize', function(){
        setScreenWidth(window.innerWidth);
    });

    return screenWidth;
}