import React, {useEffect, useState, useRef} from "react"
import {InputsContainer} from '../containers/styledComponents'
import Input from "../components/Input"
import Countdown from "react-countdown"
import PropagateLoader from "react-spinners/PropagateLoader"
import metro from '../sounds/bleep.mp3'
import oneSrc from '../sounds/1.mp3'
import twoSrc from '../sounds/2.mp3'
import threeSrc from '../sounds/3.mp3'
import fourSrc from '../sounds/4.mp3'
import fiveSrc from '../sounds/5.mp3'
import sixSrc from '../sounds/6.mp3'
import sevenSrc from '../sounds/7.mp3'
import eightSrc from '../sounds/8.mp3'
import nineSrc from '../sounds/9.mp3'
import tenSrc from '../sounds/10.mp3'

const LoopGenerator = ({enabled, countDown, setCount, stereoMode, hasToStop}) => {

    const [bpmValue, setBpmValue] = useState()
    const [durationValue, setDurationValue] = useState(0)
    const [rangeValue, setRangeValue] = useState('')
    const [isActive, setIsActive] = useState(false)

    let go = false

    const metronomy = new Audio(metro)


    const audioContext = new AudioContext()
    const panNode = audioContext.createStereoPanner()

    if (stereoMode.isStereo) {
        panNode.pan.value = stereoMode.isLeft ? -1 : 1
    }

    const tmp_metronomy = audioContext.createMediaElementSource(metronomy)
    tmp_metronomy.connect(panNode)
    
    const audioSources = [
        oneSrc, twoSrc, threeSrc, fourSrc, fiveSrc,
        sixSrc, sevenSrc, eightSrc, nineSrc, tenSrc
    ];
    
    const audioElements = []
    
    for (const src of audioSources) {
        const audioElement = new Audio(src)
        const tmp = audioContext.createMediaElementSource(audioElement)
        tmp.connect(panNode)
        audioElements.push(audioElement)
    }

    panNode.connect(audioContext.destination)

    const audioNumbers = {
        '1': audioElements[0],
        '2': audioElements[1],
        '3': audioElements[2],
        '4': audioElements[3],
        '5': audioElements[4],
        '6': audioElements[5],
        '7': audioElements[6],
        '8': audioElements[7],
        '9': audioElements[8],
        '10': audioElements[9]
    }

    const ref = useRef(null)
    let interval = useRef(null)
    let countdown = useRef(null)

    let setup = {
        bpm: {
            value: bpmValue,
            interval: 60000 / parseFloat(bpmValue)
        },
        duration: parseFloat(durationValue) * 60000,
        range: rangeValue.split("/")
    }

    useEffect(() => {
        console.log(setup.bpm.value, setup.duration, setup.range)
        if (setup.bpm.value !== '' && !isNaN(setup.duration) && setup.range.length > 1) {
            enabled(true)
        } else {
            enabled(false)
        }

    }, [setup.bpm.value, setup.duration, setup.range.length])

    useEffect(() => {

        console.log('ISACTIVE ? ', isActive)
        if (countDown) {
            let c = 4
            countdown.current = setInterval(() => {
                if (c > 0) {
                    console.log('countdown ', c)
                    metronomy.play()
                    c--
                } else {
                    clearInterval(countdown.current)
                    setCount(false)
                    setIsActive(true)
                    ref.current.start()
                    go = true
                    console.log('go', go)
                }
                
            }, setup.bpm.interval);
        }

        if (isActive) {

            console.log('coucou')
            let i = 1
            let started = false;
            let indexA = Math.floor(Math.random() * setup.range.length)
            let indexB = Math.floor(Math.random() * setup.range.length)

            // play sound for the first 4 bar
            audioNumbers[setup.range[indexB]].play()
            metronomy.play()
            console.log(setup.range[indexB], '    ')
    
    
            interval.current = setInterval(() => {
                if(!started) {
                    if (i < 4) {
                        i++
                        console.log(i, '    ')
                        metronomy.play()
                    } else {
                        i = 1
                        indexA = indexB
                        indexB = Math.floor(Math.random() * setup.range.length)
                        console.log(setup.range[indexB], '    ', setup.range[indexA])
                        audioNumbers[setup.range[indexB]].play()
                        metronomy.play()
                        started = true
                    }
                } else {
                    if (i < setup.range[indexA]) {
                        i++
                        console.log(i, '    ', setup.range[indexA])
                        metronomy.play()
                    } else {
                        i = 1
                        indexA = indexB
                        indexB = Math.floor(Math.random() * setup.range.length)
                        console.log(setup.range[indexB], '    ', setup.range[indexA])
                        audioNumbers[setup.range[indexB]].play()
                        metronomy.play()
                        // play the next index sound
                    }
                }
            }, setup.bpm.interval)
        }
    // eslint-disable-next-line
    }, [isActive, countDown])

    useEffect(() => {
        console.log('loop', hasToStop)
        setIsActive(false)
        ref.current.stop()
        return clearInterval(interval.current)

    }, [hasToStop])

    const handleStop = () => {
        ref.current.stop()
        setIsActive(false)
        return clearInterval(interval.current)
    }

    return (
        <InputsContainer>
        <Input
            title={'Duration:'}
            description={'Time in minutes. ex: 10.5 = 10min30'}
            inputValue={setDurationValue}
            values={
                <div style={{'fontSize' : '40px'}}>
                    <Countdown ref={ref} onComplete={() => handleStop()} autoStart={false} date={Date.now() + (setup.duration || 0)} />
                </div>
            }
        />
        <Input
            title={'Bpm:'}
            inputValue={setBpmValue}
            values={
                <div style={{'marginTop' : '40px'}}>
                    {
                        isActive ?
                            <PropagateLoader speedMultiplier={bpmValue / 157.06}></PropagateLoader>
                        :
                        <div style={{'marginTop': '-1px'}}>
                            <div style={{'width': '16.5px', 'height': '16.5px', 'backgroundColor':'black', 'borderRadius': '50%', 'marginLeft':'129px'}}></div>
                        </div>
                    }
                    
                </div>
            }
        />
        <Input
            title={'Range:'}
            description={'You need to separate each values with a slash'}
            inputValue={setRangeValue}
            values={
                <div></div>
            }
        />
    </InputsContainer>
    )
}
export default LoopGenerator