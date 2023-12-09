import radioList from '../data/radio-list.json'
import { Radios } from '../components/radios'
import { RadioInformation } from '../components/radioInformation'
import { useGlobalContext } from '../hooks/useGlobalContext';
import React,{ useEffect, useRef, useState } from 'react'

export default function Home() {

    const { currentRadio, setCurrentRadio } = useGlobalContext();
    const [radioName, setRadioName] = useState('');
    const [radioLocation, setRadioLocation] = useState('');
    const [statusRadioList, setStatusRadioList] = useState(''); // playing, buffering, error, paused
    const radioPlayer = useRef(null);
    const contentDiv = useRef(null);

    // When change currentRadio, update radio information
    useEffect(() => {
        const rp = radioPlayer.current;

        if (!currentRadio || currentRadio == 'undefined' || currentRadio == -1) {
            return;
        }
        // // Radio Name
        setRadioName(radioList[currentRadio].name);
    
        // // Radio Location
        if (radioList[currentRadio].infoLocation) {
            setRadioLocation(radioList[currentRadio].infoLocation);
        } else {
            setRadioLocation('~');
        }
        
        if (statusRadioList === 'error') {
            setStatusRadioList('paused');
        }

        rp.src = radioList[currentRadio].streamUrl;

        if (rp.paused) {
            rp.play();
        }
    }, [currentRadio]);

    useEffect(() => {
        setCurrentRadio(0);
        const rp = radioPlayer.current;
        rp.addEventListener('play', () => {
            if (rp.readyState >= 3) {
                setStatusRadioList('playing');
            } else {
                setStatusRadioList('buffering');
            }
            rp.addEventListener('canplay', () => {
                if (!rp.paused) {
                    setStatusRadioList('playing');
                }
            });
        });

        rp.addEventListener('pause', () => {
            if (rp.error) {
                setStatusRadioList('error');
             } else {
                setStatusRadioList('paused');
            }
        });

        rp.addEventListener('ended', () => {
            if (rp.error) {
                setStatusRadioList('error');
            } else {
                setStatusRadioList('paused');
            }
        });

        rp.addEventListener('error', (event) => {
            const errorCode = event.target.error.code;
            console.error('Error during audio playback:', errorCode);
            setStatusRadioList('error');
        });
        // Give focus to the content div to capture keydown events.
        contentDiv.current.focus();

    }, []);

    const keyDownHandler = (event) => {
        const rp = radioPlayer.current;
        switch (event.key) {
            case ' ':
            case 'Enter':
                if (rp.paused) {
                    setStatusRadioList('playing');
                    rp.play();
                } else {
                    setStatusRadioList('paused');
                    rp.pause();
                }
                break;
            case 'p':
                rp.paused()
                setStatusRadioList('paused');
                break;
            case 'h':
            case 'ArrowLeft':
                changeChannel(currentRadio - 1);
                break;
            case 'l':
            case 'ArrowRight':
                changeChannel(currentRadio + 1);
                break;
            case 'w':
                openRadioInfo();
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                changeChannel(parseInt(event.key) - 1);
                break;
            case '0':
                changeChannel(9);
                break;
        }
    }

    const changeChannel = (index) => {
        setCurrentRadio(index < 0 ? radioList.length - 1 : index % radioList.length);
    }

    const openRadioInfo = () => {
        if (radioList[currentRadio].infoUrl) {
            window.open(radioList[currentRadio].infoUrl, '_blank');
        }
    }

    return (
        <div id="content" tabIndex="0" onKeyDown={keyDownHandler} ref={contentDiv}>
            <div id="header">lofi moai</div>
            <Radios llista={radioList} status={statusRadioList} active={currentRadio} changeChannel={changeChannel} />
            <RadioInformation radio={radioList[currentRadio]} radioName={radioName} radioLocation={radioLocation}/>
            <div id="selectedRadioInfo"></div>
            <audio id="radioPlayer" ref={radioPlayer}>
                <source src="" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <a id="footer" href="https://github.com/4itor/raddio.app" target="_blank">
                <img src="img/github-mark-white.svg" alt="GitHub"/>
            </a>
        </div>
    );
}
