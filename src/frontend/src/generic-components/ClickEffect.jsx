import React, { useEffect, useRef } from "react";

let timeout = null;
const ClickEffect = (props) => {
    const ref = useRef();

    useEffect(() => {
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const createClickEffect = () => {
        startOver();

        if (!props.disabled) {
            ref.current.classList.add(props.exclusivelymobile === "true" ? "clickEffect-mobile" : "clickEffect");
            timeout = setTimeout(() => {
                startOver();
            }, 600);
        }
    };

    const startOver = () => {
        clearTimeout(timeout);
        try {
            ref.current.classList.remove(props.exclusivelymobile === "true" ? "clickEffect-mobile" : "clickEffect");
        } catch (err) { }
    };

    return (
        <div
            {...props}
            onClick={props.onClick}
            style={props.style}
            ref={ref}
            className={props.className || ''}
            onClick={(e) => {
                if (props.onClick && typeof props.onClick === "function") {
                    props.onClick();
                }
                createClickEffect(e);
            }}
        >
            {props.children}
        </div>
    );
};

export default ClickEffect;
