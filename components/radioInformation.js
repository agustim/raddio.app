import React from "react";
// import Link from "next/link";
// import {
//     BlockTitle
// } from "konsta/react";

export const RadioInformation = (props) => {

    const radio = props.radio;
    const radioName = props.radioName;
    const radioLocation = props.radioLocation;

    if (!radio || !radioName || !radioLocation || !radio.infoFlag || !radio.infoUrl) {
        return (
            <>
                <div id="selectedRadioName">&nbsp;</div>
                <div id="selectedRadioLocation">&nbsp;</div>
                <div id="selectedRadioInfo">&nbsp;</div>
            </>
        );
    }

    return (
        <>
            <div id="selectedRadioName">{radioName}</div>
            <div id="selectedRadioLocation">{radioLocation}</div>
            <div id="selectedRadioInfo">
                {(radio.infoFlag) && (
                    <img src={'https://flagcdn.com/' + radio.infoFlag + '.svg'}
                        alt={radio.infoFlag}
                        title={radio.infoFlag}
                        style={{ height: '1em', marginRight: '0.5em' }} />
                )}
                {(radio.infoUrl) && (
                    <a href={radio.infoUrl} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={'img/website.svg'}
                            alt="Website Icon"
                            title="Website Icon"
                            color="#eee"
                            style={{ height: '1em' }} />
                    </a>
                ) ||
                    (
                        <span>&nbsp;</span>
                    )
                }
            </div>
        </>
    );


};