import React, { useEffect, useRef, useState } from "react"
import {BlockContainer, Title, ContainerBackground, ContainerBlurredBackground, ButtonActive, ButtonContainer, ButtonInactive, ButtonText, InputsContainer} from './styledComponents'
import Input from "../components/Input"
import Countdown from "react-countdown"
import PropagateLoader from "react-spinners/PropagateLoader"

const Container = () => {

    const [bpmValue, setBpmValue] = useState()
    const [durationValue, setDurationValue] = useState(0)
    const [rangeValue, setRangeValue] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)

    const ref = useRef(null)
    let interval = null

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

        if (isActive) {
            let i = 0
            let started = false;
            let indexA = Math.floor(Math.random() * setup.range.length)
            let indexB = Math.floor(Math.random() * setup.range.length)
    
    
            interval = setInterval(() => {
                if (i < setup.range[indexA]) {
                    if (!started) {} //TODO
                    i++
                    console.log(i, '    ', setup.range[indexA])
                } else {
                    i = 1
                    indexA = indexB
                    indexB = Math.floor(Math.random() * setup.range.length)
                    console.log(setup.range[indexB], '    ', setup.range[indexA])
                }
            }, setup.bpm.interval)
        }
    // eslint-disable-next-line
    }, [isActive])

    const handleStart = () => {
        setIsActive(true)
        ref.current.start()
    }

    const handleStop = () => {
        ref.current.stop()
        setIsActive(false)
        return clearInterval(interval)
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
                                    <PropagateLoader loading={isActive} speedMultiplier={bpmValue / 157.06}></PropagateLoader>
                                </div>
                            }
                        />
                        <Input
                            title={'Range:'}
                            description={'You need to separate each values with a slash'}
                            inputValue={setRangeValue}
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