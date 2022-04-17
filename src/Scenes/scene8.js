import "../stylesheets/styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import BaseImage from "../components/BaseImage"
import { UserContext } from "../components/BaseShot";
import { returnAudioPath, playEnvirAni, pauseEnvirAni } from "../components/CommonFunctions";
import Lottie from "react-lottie-segments";
import loadAnimation from '../utils/loadAnimation'

let stepCount = 0;
let prefix = 'interactive/SB39_Interactive_Icon_'
let timerList = []
let aniNum = 0
let turnList = [
    0, 1, 3, 2, 6, 4, 5, 7
]

const animationList = []

new loadAnimation('last/bubble_1.json').then(result => {
    animationList[0] = result;
}, () => { });
let subInterval
export default function Scene3({ nextFunc, _geo, _baseGeo }) {

    const audioList = useContext(UserContext)

    const bgRef = useRef()
    const bubbleAniRef = useRef()
    const bubbleEffectRef = useRef();
    const showingImgList = [
        [useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef()]
    ]
    const subRefList = [useRef(), useRef()]
    const soundList = [10, 11, 12, 13, 14, 15, 16, 17]
    const featherEffect = useRef()

    function returnOption(index) {
        return {
            loop: true,
            autoplay: true,
            animationData: animationList[index],
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
    }

    useEffect(() => {

        audioList.bodyAudio1.src = returnAudioPath(soundList[0])

        setTimeout(() => {

            playCart()
            aniNum = playEnvirAni(showingImgList[1], 300)


        }, 1000);



        return () => {
            timerList.map(timer => {
                clearTimeout(timer)
            })
        }
    }, [])

    const playCart = () => {

        pauseEnvirAni(aniNum)
        clearInterval(subInterval)

        let judgeNum = stepCount % 2;
        let timeDuration = 0;

        let showNum = judgeNum + 1;
        if (showNum == 2)
            showNum = 0

        stepCount++

        if (stepCount > 8)
            nextFunc()
        else {
            if (stepCount > 1) {
                bubbleEffectRef.current.className = 'hide'
                subRefList[0].current.setClass('hide')
                showingImgList[judgeNum].map(item => item.current.setClass('hide'))
                if (stepCount == 5)
                    bgRef.current.setClass('hide')
                if (stepCount == 6) {
                    bubbleEffectRef.current.className = 'hide'
                }
                if (stepCount == 7) {
                    featherEffect.current.className = 'hide'
                }


                timerList[12] = setTimeout(() => {
                    if (stepCount == 5) {
                        bubbleEffectRef.current.className = 'show'
                    }
                    if (stepCount == 6) {
                        featherEffect.current.className = 'show'
                    }
                }, 300);
                timerList[0] = setTimeout(() => {


                    showingImgList[showNum][0].current.setClass('show')

                    if (stepCount == 1)
                        bgRef.current.setClass('show')
                    if (stepCount == 8)
                        subRefList[1].current.className = 'show'

                    timerList[5] = setTimeout(() => {
                        aniNum = playEnvirAni(showingImgList[showNum], 300)
                        if (stepCount == 8) {
                            let count = 0

                            subInterval = setInterval(() => {
                                if (count > 2)
                                    subRefList[1].current.className = 'showObject'
                                else
                                    subRefList[1].current.className = 'hideObject'
                                if (count > 2)
                                    count = 0
                                else
                                    count++
                            }, 300);
                        }
                        else {
                            subRefList[1].current.className = 'hide'

                        }

                    }, 500);
                }, 500);
            }


            timerList[1] = setTimeout(() => {
                if (judgeNum == 0) {
                    audioList.bodyAudio1.play()
                    timeDuration = audioList.bodyAudio1.duration * 1000
                }

                else {
                    audioList.bodyAudio2.play()
                    timeDuration = audioList.bodyAudio2.duration * 1000
                }

                timerList[2] = setTimeout(() => {
                    playCart();
                }, timeDuration + 2000);

            }, 1300);



            if (stepCount < 8) {

                if (stepCount > 1)
                    timerList[3] = setTimeout(() => {
                        showingImgList[judgeNum].map((item, index) => item.current.setUrl(
                            prefix + (turnList[stepCount] > 9 ? '' : '0') + (turnList[stepCount] + 1) + '_F' + (index + 1) + ".svg"))
                    }, 1000);

                if (judgeNum == 0)
                    audioList.bodyAudio2.src = returnAudioPath(soundList[stepCount])
                else
                    audioList.bodyAudio1.src = returnAudioPath(soundList[stepCount])

            }

        }
    }

    return (
        <div className="aniObject">
            <div style={{
                position: 'absolute', width: _baseGeo.width + 'px', height: _baseGeo.height + 'px',
                left: _baseGeo.left + 'px', top: _baseGeo.bottom + 'px'
            }}>
                <BaseImage
                    ref={bgRef}
                    url={'BG/SB39_Sky_BG_03.svg'}
                    className='hideObject'
                />
            </div>
            <div
                style={{
                    position: "fixed", width: _geo.width * 0.4 + "px",
                    height: _geo.width * 0.4 + "px"
                    , left: _geo.left + _geo.width * 0.3 + "px",
                    top: _geo.top + _geo.height * 0.15 + "px",
                }}>
                {
                    [0, 1, 2, 3].map(value =>
                        < BaseImage
                            ref={showingImgList[1][value]}
                            url={prefix + '01_F' + (value + 1) + ".svg"}
                            className={value > 0 ? 'hideObject' : ''}
                        />
                    )
                }
                {
                    [0, 1, 2, 3].map(value =>
                        <BaseImage
                            ref={showingImgList[0][value]}
                            url={prefix + '02_F' + (value + 1) + ".svg"}
                            className='hideObject'
                        />
                    )
                }

                <BaseImage
                    ref={subRefList[0]}
                    className={'halfOpacity'}
                    scale={0.205}
                    style={{ transform: 'rotate(-5deg)' }}
                    posInfo={{ l: 0.144, t: 0.164 }}
                    url={'Animation/Other/SB39_ Icon_Cloud_05.svg'}
                />
                <div
                    ref={subRefList[1]}
                    className='hideObject'
                    style={{
                        position: "absolute", width: "100%",
                        height: "100%"
                        , left: 0 + "px",
                        top: 0 + "px",
                    }}
                >
                    <BaseImage
                        scale={0.185}
                        style={{ opacity: 0.8, transform: 'rotate(-5deg)' }}
                        posInfo={{ l: 0.166, t: 0.264 }}
                        url={'Animation/Other/SB39_ Icon_Cloud_05.svg'}
                    />
                    <BaseImage
                        scale={0.18}
                        style={{ opacity: 0.8, transform: 'rotate(-5deg)' }}
                        posInfo={{ l: 0.724, t: 0.460 }}
                        url={'Animation/Other/SB39_ Icon_Cloud_05.svg'}
                    />
                </div>
            </div>

            <div
                ref={bubbleEffectRef}
                className='hideObject'
                style={{
                    position: "fixed", width: _geo.width * 0.319 + "px",
                    height: _geo.width * 0.319 + "px"
                    , left: _geo.left + _geo.width * 0.34 + "px",
                    top: _geo.top + _geo.height * 0.194 + "px",
                    borderRadius: '50%',
                    overflow: 'hidden'
                }}>
                < BaseImage
                    style={{ transform: 'scale(1.25) translateY(1.6%)' }}
                    url={"Prop interactive/SB_31_CI_Blue Circle.svg"}
                />
                <div
                    style={{
                        position: 'absolute',
                        width: '50%',
                        height: '100%',
                        left: '20%',
                        top: '0%',
                    }}
                >
                    <Lottie autoplay options={returnOption(0)}
                        mouseDown={false}
                        loop={true}
                        speed={0.25}
                        isClickToPauseDisabled={true}
                    />
                </div>

            </div>
            <div
                ref={featherEffect}
                className='hideObject'
                style={{
                    position: "fixed", width: _geo.width * 0.319 + "px",
                    height: _geo.width * 0.319 + "px"
                    , left: _geo.left + _geo.width * 0.34 + "px",
                    top: _geo.top + _geo.height * 0.194 + "px",
                    borderRadius: '50%',
                    overflow: 'hidden'
                }}>
                < BaseImage
                    style={{ transform: 'scale(1.25) translateY(1.6%)' }}
                    url={"Prop interactive/SB_31_CI_Blue Circle.svg"}
                />
                < BaseImage
                    className={'featherAni'}
                    scale={0.35}
                    posInfo={{ l: 0.3, t: 1 }}
                    url={"Prop interactive/feather.svg"}
                />
            </div>
        </div>
    );
}
