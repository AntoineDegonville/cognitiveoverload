import React, { useState, useRef } from "react"
import {BlockContainer, Mode, Title, ContainerBackground, ContainerBlurredBackground, ButtonActive, ButtonContainer, ButtonInactive, ButtonText} from './styledComponents'
import LoopGenerator from "../components/LoopGenerator"


const Container = () => {

    const [isCountDown, setIsCountDown] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)
    const [mode, setMode] = useState(false)
    const [hasToStop, setHasToStop] = useState(false)

    let interval = useRef(null)

    const handleStart = () => {
        setIsCountDown(true)
    }

    const handleStop = () => {
        console.log('stop pls')
        setHasToStop(!hasToStop)
        return clearInterval(interval.current)
    }

    return (
        <BlockContainer>
            <Title>Cognitive Overload</Title>
            <Mode>
                Duo Mode
                <input type="checkbox" onClick={() => setMode(!mode)} />
            </Mode>
            <ContainerBlurredBackground>
                <ContainerBackground>
                    <LoopGenerator
                        enabled={setIsEnabled}
                        countDown={isCountDown}
                        setCount={setIsCountDown}
                        stereoMode={{isStereo: mode, isLeft: true}}
                        hasToStop={hasToStop}
                    />
                    {mode ? 
                        <LoopGenerator
                            enabled={setIsEnabled}
                            countDown={isCountDown}
                            setCount={setIsCountDown}
                            stereoMode={{isStereo: true, isLeft: false}}
                            hasToStop={hasToStop}
                        />
                    : null}
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