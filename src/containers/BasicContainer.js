import React, { useEffect, useRef, useState } from "react"
import {BlockContainer, Title, ContainerBackground, ContainerBlurredBackground, ButtonActive, ButtonContainer, ButtonInactive, ButtonText, InputsContainer} from './styledComponents'
import Input from "../components/Input"
import Countdown from "react-countdown"
import PropagateLoader from "react-spinners/PropagateLoader"
import metro from '../sounds/bleep.mp3'
import one from '../sounds/1.mp3'
import two from '../sounds/2.mp3'
import three from '../sounds/3.mp3'
import four from '../sounds/4.mp3'
import five from '../sounds/5.mp3'
import six from '../sounds/6.mp3'
import seven from '../sounds/7.mp3'
import eight from '../sounds/8.mp3'
import nine from '../sounds/9.mp3'
import ten from '../sounds/10.mp3'


const Container = () => {

    const [bpmValue, setBpmValue] = useState()
    const [durationValue, setDurationValue] = useState(0)
    const [rangeValue, setRangeValue] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)
    const [isCountDown, setIsCountDown] = useState(false)

    const metronomy = new Audio(metro)

    const audioNumbers = {
        '1': new Audio(one),
        '2': new Audio(two),
        '3': new Audio(three),
        '4': new Audio(four),
        '5': new Audio(five),
        '6': new Audio(six),
        '7': new Audio(seven),
        '8': new Audio(eight),
        '9': new Audio(nine),
        '10': new Audio(ten),
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
        if (setup.bpm.value !== '' && !isNaN(setup.duration) && setup.range.length > 1) {
            setIsEnabled(true)
        } else {
            setIsEnabled(false)
        }

    }, [setup.bpm.value, setup.duration, setup.range.length])

    useEffect(() => {

        if (isCountDown) {
            let c = 4
            countdown.current = setInterval(() => {
                if (c > 0) {
                    console.log('countdown ', c)
                    metronomy.play()
                    c--
                } else {
                    clearInterval(countdown.current)
                    setIsCountDown(false)
                    setIsActive(true)
                    ref.current.start()
                }
                
            }, setup.bpm.interval);
        }

        if (isActive) {
            let i = 1
            let started = false;
            let indexA = Math.floor(Math.random() * setup.range.length)
            let indexB = Math.floor(Math.random() * setup.range.length)

            // play sound for the first 4 bar
            audioNumbers[setup.range[indexB]].play()
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

                        // play the next index sound
                    }
                }
            }, setup.bpm.interval)
        }
    // eslint-disable-next-line
    }, [isActive, isCountDown])

    const handleStart = () => {
        setIsCountDown(true)
    }

    const handleStop = () => {
        ref.current.stop()
        setIsActive(false)
        return clearInterval(interval.current)
    }

    return (
        <BlockContainer>
            <Title>Cognitive Overload</Title>
            <ContainerBlurredBackground>
                <ContainerBackground>
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
                </ContainerBackground>
            </ContainerBlurredBackground>
                <ButtonContainer>
                {isEnabled ? 
                    <>
                        <ButtonActive onClick={() => {handleStart()}}>
                            <ButtonText>Start</ButtonText>
                        </ButtonActive>
                        <ButtonActive onClick={() => {handleStop()}}>
                            <ButtonText>Stop</ButtonText>
                        </ButtonActive>
                    </>
                :
                    <>
                        <ButtonInactive>
                            <ButtonText>Start</ButtonText>
                        </ButtonInactive>
                        <ButtonInactive>
                            <ButtonText>Stop</ButtonText>
                        </ButtonInactive>
                    </>
                }

                </ButtonContainer>
        </BlockContainer>
    )
}

export default Container