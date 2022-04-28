import "../stylesheets/styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import BaseImage from "../components/BaseImage"
import { UserContext } from "../components/BaseShot";
import { returnAudioPath, playEnvirAni, pauseEnvirAni } from "../components/CommonFunctions";
import Lottie from "react-lottie-segments";
import loadAnimation from '../utils/loadAnimation'

let stepCount = 0;
let prefix = 'SB39_Interactive_Icon_0'
let timerList = []
let aniNum = 0
let turnList = [
    0, 1, 3, 2, 6, 4, 5, 7
]

const animationList = []

let subInterval
export default function Scene3({ nextFunc, _geo, _baseGeo }) {

    const audioList = useContext(UserContext)

    const bgRef = useRef()
    const showingImgList = [
        Array.from({ length: 20 }, ref => useRef()),
        Array.from({ length: 20 }, ref => useRef())
    ]
    const subRefList = [useRef(), useRef()]
    const soundList = [10, 11, 12, 13, 14, 15, 16, 17]
    const imgCountList = [
        9, 8, 9, 13, 20, 14, 9, 8
    ]

    const indexList = [
        1, 2, 4, 3, 7, 5, 6, 8
    ]

    useEffect(() => {

        Array.from(Array(imgCountList[0]).keys()).map((value, index) =>
            showingImgList[1][index].current.setUrl(
                'circles/' + prefix + '1/' + prefix + '1_F0' + (value + 1) + ".svg"))

        Array.from(Array(imgCountList[1]).keys()).map((value, index) =>
            showingImgList[0][index].current.setUrl(
                'circles/' + prefix + '2/' + prefix + '2_F0' + (value + 1) + ".svg"))

        audioList.bodyAudio1.src = returnAudioPath(soundList[0])

        setTimeout(() => {
            playCart()
            aniNum = playEnvirAni(showingImgList[1].slice(0, imgCountList[0] - 1), 300)
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
                subRefList[0].current.setClass('hide')
                showingImgList[judgeNum].map((item, index) => {
                    if (item.current)
                        item.current.setClass('hide')
                })

                if (stepCount == 5)
                    bgRef.current.setClass('hide')

                timerList[0] = setTimeout(() => {

                    showingImgList[showNum][0].current.setClass('show')

                    if (stepCount == 1)
                        bgRef.current.setClass('show')


                    timerList[5] = setTimeout(() => {
                        aniNum = playEnvirAni(showingImgList[showNum].slice(0, imgCountList[stepCount - 1] - 1), 300)
                        if (stepCount == 8) {
                            let count = 0
                            subInterval = setInterval(() => {

                                if (count > 2)
                                    count = 0
                                else
                                    count++
                            }, 300);
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
                        Array.from(Array(imgCountList[stepCount]).keys()).map((index) => {
                            showingImgList[judgeNum][index].current.setUrl(
                                'circles/' + prefix + indexList[stepCount] + '/' + prefix + indexList[stepCount] +
                                (index > 8 ? '_F' : '_F0') + (index + 1) + ".svg")
                            console.log('circles/' + prefix + indexList[stepCount] + '/' + prefix + indexList[stepCount] +
                                (index > 8 ? '_F' : '_F0') + (index + 1) + ".svg")
                        }
                        )

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
                    Array.from(Array(20).keys()).map
                        (value =>
                            < BaseImage
                                ref={showingImgList[1][value]}
                                className={value > 0 ? 'hideObject' : ''}
                            />
                        )
                }
                {
                    Array.from(Array(20).keys()).map(value =>
                        <BaseImage
                            ref={showingImgList[0][value]}
                            className='hideObject'
                        />
                    )
                }

                <BaseImage
                    ref={subRefList[0]}
                    className={'halfOpacity'}
                    scale={0.19}
                    style={{ transform: 'rotate(-5deg)' }}
                    posInfo={{ l: 0.18, t: 0.158 }}
                    url={'Animation/Other/SB39_ Icon_Cloud_05.svg'}
                />

            </div>
        </div>
    );
}
