import styled from "styled-components"
import backgroundImg from '../img/background.jpg'

export const BlockContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url(${backgroundImg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: invert(1);

`

export const Mode = styled.div`
    margin-top: 1rem;
    width: 160px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: black;
    color: white;
    border-radius: 0.5rem;
`

export const Title = styled.div`
    font-size: 82px;
    font-weight: bold;
    color: black;
    font-family: 'Tangerine', cursive;
`

export const ContainerBlurredBackground = styled.div`
    background-color: rgb(0,0,0,0);
    width: 80vw;
    height: 50vh;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ContainerBackground = styled.div`
    background-color: transparent;
    width: 95%;
    height: 90%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const InputsContainer = styled.div`
    height: 90%;
    width: 95%;
    padding: 10px;
`

export const ButtonContainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-around;
`

export const ButtonActive = styled.button`
    width: 200px;
    height: 72px;
    border-radius: 5px;
    border: 0.1px solid black;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        background-color: black;
        color: white;
    }
`

export const ButtonInactive = styled.button`
    width: 200px;
    height: 72px;
    border-radius: 5px;
    border: 0.1px solid black;
    background-color: transparent;
    filter: invert(50%);
`

export const ButtonText = styled.div`
    font-size: 64px;
    font-weight: bold;
    font-family: 'Tangerine', cursive;
`