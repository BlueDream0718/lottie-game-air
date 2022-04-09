import React, { useState, useRef, useEffect, useContext } from 'react';
import Lottie from "react-lottie-segments";
import loadAnimation from '../utils/loadAnimation'

import "../stylesheets/styles.css";
import { UserContext } from '../components/BaseShot';
import BaseImage from '../components/BaseImage';
import { returnAudioPath } from '../components/CommonFunctions';

const animationList = []

new loadAnimation('main/leaf.json').then(result => {
    animationList[0] = result;
}, () => { });


new loadAnimation('main/gi.json').then(result => {
    animationList[1] = result;
}, () => { });


new loadAnimation('recent/SB39_Girl_pose.json').then(result => {
    animationList[2] = result;
}, () => { });


new loadAnimation('main/Sc05boy .json').then(result => {
    animationList[3] = result;
}, () => { });


new loadAnimation('main/sc03boy.json').then(result => {
    animationList[4] = result;
}, () => { });


export default function Scene2({ nextFunc, _geo, _baseGeo }) {

    const audioList = useContext(UserContext)


    const [speakingStop, setSpeakingStop] = useState(false)

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

    useEffect(
        () => {
            audioList.bodyAudio1.src = returnAudioPath('34')

            setTimeout(() => {
                setSpeakingStop(true)
            }, 10);

            setTimeout(() => {
                setSpeakingStop(false)
                audioList.bodyAudio1.play();
                setTimeout(() => {
                    setSpeakingStop(true)
                    setTimeout(() => {
                        nextFunc()
                    }, 700);
                }, audioList.bodyAudio1.duration * 1000 - 400);
            }, 1500);
            return () => {
            }
        }, []
    )


    return (
        <div className="aniObject">
            <div
                style={{
                    position: "fixed", width: _geo.width * 0.55 + "px",
                    left: (_geo.width * 0.28 + _geo.left) + "px"
                    , bottom: (_geo.height * -0.56) + "px",
                    overflow: 'hidden',
                    pointerEvents: 'none'
                }}>

                <Lottie autoplay loop options={returnOption(2)}
                    mouseDown={false}
                    isStopped={speakingStop}
                    speed={1.1}
                    isClickToPauseDisabled={true}
                />
            </div>


        </div>
    );
}
