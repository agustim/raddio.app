import React from "react";
// import Link from "next/link";
// import {
//     BlockTitle
// } from "konsta/react";

export const Radios = (props) => {
    const radios = props.llista;
    const status = props.status;
    const active = props.active;

    let styleRadioList = "";
    if (status == 'playing') {
        styleRadioList = '--selected: var(--playing)';
    }
    if (status == 'buffering') {
        styleRadioList = '--selected: var(--buffering)';
    }
    if (status == 'error') {
        styleRadioList = '--selected: var(--error)';
    }

    return (
        <div id="radioList"
            className={styleRadioList}
        >
                {radios.map((radio, index) => (
                    <img key={index} src={'img/' + radio.image} 
                        alt={radio.name} 
                        title={radio.name}
                        className={index == active ? 'radio-icon selected' : 'radio-icon'}
                        onClick={() => { props.changeChannel(index); } } />
                    ))
                }
        </div>
    );


};

