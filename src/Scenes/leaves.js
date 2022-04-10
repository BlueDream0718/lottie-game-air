import React, { useState, useRef, useEffect, useContext } from 'react';
import loadAnimation from '../utils/loadAnimation'
import { returnAudioPath } from "../components/CommonFunctions"
import "../stylesheets/styles.css";
import { UserContext } from '../components/BaseShot';
import { Player } from '@lottiefiles/react-lottie-player';
import { prePathUrl } from '../components/CommonFunctions';
import Lottie from "react-lottie-segments";

let timerList = []
export default function Scene2({ nextFunc, _geo, _baseGeo, startTransition }) {

    const audioList = useContext(UserContext)
    const playerRefList = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

    function returnOption(index) {
        return {
            loop: index != 0 ? true : false,
            autoplay: true,
            animationData: animationList[index],
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
    }

    useEffect(
        () => {

            timerList[0] = setTimeout(() => {
                playerRefList[0].current.play();
                timerList[1] = setTimeout(() => {
                    playerRefList[1].current.play();
                    timerList[2] = setTimeout(() => {
                        playerRefList[2].current.play();
                        timerList[3] = setTimeout(() => {
                            playerRefList[3].current.play();
                            timerList[4] = setTimeout(() => {
                                playerRefList[4].current.play();
                                timerList[5] = setTimeout(() => {
                                    playerRefList[5].current.play();
                                    timerList[6] = setTimeout(() => {
                                        playerRefList[6].current.play();
                                    }, 1100);
                                }, 1100);
                            }, 1100);
                        }, 1200);
                    }, 800);
                }, 800);
            }, 500);

            return () => {
                timerList.map(timer => {
                    clearTimeout(timer)
                })

                audioList.bodyAudio1.pause()
                audioList.bodyAudio2.pause()
                audioList.bodyAudio3.pause()
            }
        }, []
    )


    return (
        <div className="aniObject">

            <div style={{
                position: "fixed", width: _baseGeo.width * 1.1 + "px",
                left: (0.0) + "px"
                , bottom: (_baseGeo.height * 1) + "px",
                pointerEvents: 'none',
            }}>

                <Player
                    ref={playerRefList[0]}
                    loop
                    speed={0.4}
                    src={prePathUrl() + 'lottieFiles/last/leaf_1.json'}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

            <div style={{
                position: "fixed", width: _baseGeo.width * 1.2 + "px",
                left: _baseGeo.left + _baseGeo.width * -0.1 + "px"
                , bottom: (_baseGeo.height * 1.17) + "px",
                pointerEvents: 'none'
            }}>

                <Player
                    ref={playerRefList[1]}
                    loop
                    speed={0.4}
                    src={prePathUrl() + 'lottieFiles/last/leaf_2.json'}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>
            <div style={{
                position: "fixed", width: _baseGeo.width * 1.2 + "px",
                left: _baseGeo.left + _baseGeo.width * -0.1 + "px"
                , bottom: (_baseGeo.height * 1.2) + "px",
                pointerEvents: 'none'
            }}>

                <Player
                    ref={playerRefList[2]}
                    loop
                    speed={0.4}
                    src={prePathUrl() + 'lottieFiles/last/leaf_3.json'}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

            <div style={{
                position: "fixed", width: _baseGeo.width * 1.2 + "px",
                left: _baseGeo.left + _baseGeo.width * -0.1 + "px"
                , bottom: (_baseGeo.height * 1.25) + "px",
                pointerEvents: 'none'
            }}>

                <Player
                    ref={playerRefList[3]}
                    loop
                    speed={0.5}
                    src={prePathUrl() + 'lottieFiles/last/leaf_4.json'}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

            <div style={{
                position: "fixed", width: _baseGeo.width * 1.2 + "px",
                left: _baseGeo.left + _baseGeo.width * -0.1 + "px"
                , bottom: (_baseGeo.height * 1.2) + "px",
                pointerEvents: 'none'
            }}>

                <Player
                    ref={playerRefList[4]}
                    loop
                    speed={0.5}
                    src={prePathUrl() + 'lottieFiles/last/leaf_1.json'}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

            <div style={{
                position: "fixed", width: _baseGeo.width * 1.2 + "px",
                left: _baseGeo.left + _baseGeo.width * -0.1 + "px"
                , bottom: (_baseGeo.height * 1.1) + "px",
                pointerEvents: 'none'
            }}>

                <Player
                    ref={playerRefList[5]}
                    loop
                    speed={0.4}
                    src={prePathUrl() + 'lottieFiles/last/leaf_2.json'}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>
            <div style={{
                position: "fixed", width: _baseGeo.width * 1.2 + "px",
                left: _baseGeo.left + _baseGeo.width * -0.1 + "px"
                , bottom: (_baseGeo.height * 1.2) + "px",
                pointerEvents: 'none'
            }}>

                <Player
                    ref={playerRefList[6]}
                    loop
                    speed={0.4}
                    src={prePathUrl() + 'lottieFiles/last/leaf_3.json'}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

        </div>
    );
}
