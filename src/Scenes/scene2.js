import React, { useState, useRef, useEffect, useContext } from 'react';
import loadAnimation from '../utils/loadAnimation'
import { returnAudioPath } from "../components/CommonFunctions"
import "../stylesheets/styles.css";
import { UserContext } from '../components/BaseShot';
import { Player } from '@lottiefiles/react-lottie-player';
import { prePathUrl } from '../components/CommonFunctions';
import Lottie from "react-lottie-segments";

const animationList = []

new loadAnimation('last/feather.json').then(result => {
    animationList[0] = result;
}, () => { });


new loadAnimation('recent/Girl_front_pose.json').then(result => {
    animationList[1] = result;
}, () => { });


new loadAnimation('recent/SB39_Girl_pose.json').then(result => {
    animationList[2] = result;
}, () => { });

new loadAnimation('recent/boy_front_pose.json').then(result => {
    animationList[3] = result;
}, () => { });


new loadAnimation('recent/SB39_Boy_pose.json').then(result => {
    animationList[4] = result;
}, () => { });

loadAnimation('main/feather01.json').then(result => {
    animationList[5] = result;
}, () => { });
loadAnimation('main/feather02.json').then(result => {
    animationList[6] = result;
}, () => { });


let timerList = []
export default function Scene2({ nextFunc, _geo, _baseGeo, startTransition }) {

    const audioList = useContext(UserContext)

    const boyAniList = [useRef(), useRef()]
    const girlAniList = [useRef(), useRef()]

    const [speakingStop, setSpeakingStop] = useState(false)

    const [leaveNum, setLeaveNum] = useState(0)

    const playerRefList = [useRef(), useRef(), useRef(), useRef()]

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

            audioList.bodyAudio1.src = returnAudioPath('02')
            audioList.bodyAudio2.src = returnAudioPath('03')
            audioList.bodyAudio3.src = returnAudioPath('04')

            girlAniList[1].current.className = 'hideObject'
            boyAniList[1].current.className = 'hideObject'

            audioList.windAudio.play()


            timerList[0] = setTimeout(() => {

                setSpeakingStop(true)
                boyAniList[0].current.className = 'hideObject'
                boyAniList[1].current.className = 'showObject'

                setSpeakingStop(false)
                audioList.bodyAudio1.play()

                timerList[1] = setTimeout(() => {


                    boyAniList[1].current.className = 'hideObject'
                    boyAniList[0].current.className = 'showObject'
                    setSpeakingStop(true)

                    timerList[2] = setTimeout(() => {

                        girlAniList[1].current.className = 'showObject'
                        girlAniList[0].current.className = 'hideObject'

                        timerList[9] = setTimeout(() => {

                            setSpeakingStop(false)
                            audioList.bodyAudio2.play()

                            timerList[3] = setTimeout(() => {

                                audioList.bodyAudio3.play();

                                // setSpeakingStop(true)

                                // girlAniList[0].current.className = 'showObject'
                                // girlAniList[1].current.className = 'hideObject'

                                // timerList[10] = setTimeout(() => {
                                // girlAniList[1].current.style.transform = 'translateX(' + _geo.width * -0.2 + 'px)'

                                // girlAniList[1].current.style.transition = '0.5s'
                                // boyAniList[0].current.className = 'hideObject'
                                // boyAniList[1].current.className = 'showObject'

                                // setSpeakingStop(false)
                                // audioList.bodyAudio3.play();

                                timerList[4] = setTimeout(() => {
                                    setSpeakingStop(true)
                                    timerList[5] = setTimeout(() => {
                                        startTransition(2);

                                        timerList[6] = setTimeout(() => {
                                            nextFunc()
                                            audioList.wooAudio.play()
                                        }, 300);
                                    }, 300);
                                }, audioList.bodyAudio3.duration * 1000 + 500);
                                // }, 300);
                            }, audioList.bodyAudio2.duration * 1000);
                        }, 300);

                    }, 500);

                }, audioList.bodyAudio1.duration * 1000);

            }, 2000);

            timerList[7] = setTimeout(() => {
                playerRefList[0].current.play();
                timerList[8] = setTimeout(() => {
                    playerRefList[1].current.play();
                    timerList[9] = setTimeout(() => {
                        playerRefList[2].current.play();
                        timerList[10] = setTimeout(() => {
                            playerRefList[3].current.play();
                        }, 1500);
                    }, 1500);
                }, 1500);
            }, 1000);

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
                    keepLastFrame={true}
                    speed={0.4}
                    src={prePathUrl() + 'lottieFiles/last/feather.json'}
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
                    ref={playerRefList[1]}
                    keepLastFrame={true}
                    speed={0.5}
                    src={prePathUrl() + 'lottieFiles/last/feather.json'}
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
                    keepLastFrame={true}
                    speed={0.5}
                    src={prePathUrl() + 'lottieFiles/last/feather.json'}
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
                , bottom: (_baseGeo.height * 0.95) + "px",
                pointerEvents: 'none'
            }}>

                <Player
                    ref={playerRefList[3]}
                    keepLastFrame={true}
                    speed={0.5}
                    src={prePathUrl() + 'lottieFiles/last/feather.json'}
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



            <div
                ref={girlAniList[0]}
                style={{
                    position: "fixed", width: _geo.width * 0.55 + "px",
                    left: (_geo.width * 0.0 + _geo.left) + "px"
                    , bottom: (_geo.height * -0.56) + "px",
                    overflow: 'hidden',
                    pointerEvents: 'none'
                }}>

                <Lottie loop options={returnOption(1)}
                    mouseDown={false}
                    isStopped={true}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div
                ref={girlAniList[1]}
                style={{
                    position: "fixed", width: _geo.width * 0.55 + "px",
                    left: (_geo.width * 0.00 + _geo.left) + "px"
                    , bottom: (_geo.height * -0.56) + "px",
                    overflow: 'hidden',
                    pointerEvents: 'none'
                }}>

                <Lottie autoplay loop options={returnOption(2)}
                    mouseDown={false}
                    isStopped={speakingStop}
                    isClickToPauseDisabled={true}
                />
            </div>

            <div
                ref={boyAniList[0]}
                style={{
                    position: "fixed", width: _geo.width * 0.4 + "px",
                    left: (_geo.width * 0.55 + _geo.left) + "px"
                    , bottom: (_geo.height * -0.65) + "px",
                    overflow: 'hidden',
                    pointerEvents: 'none'
                }}>

                <Lottie loop options={returnOption(3)}
                    mouseDown={false}
                    isStopped={true}
                    isClickToPauseDisabled={true}
                />
            </div>

            <div
                ref={boyAniList[1]}
                style={{
                    position: "fixed", width: _geo.width * 0.64 + "px",
                    left: (_geo.width * 0.39 + _geo.left) + "px"
                    , bottom: (_geo.height * -0.62) + "px",
                    overflow: 'hidden',
                    pointerEvents: 'none'
                }}>

                <Lottie autoplay loop options={returnOption(4)}
                    mouseDown={false}
                    isStopped={speakingStop}
                    isClickToPauseDisabled={true}
                />
            </div>
        </div>
    );
}
