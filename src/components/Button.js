import React from "react"
import styled from "styled-components"

const InputButton = styled.button`
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    margin-left: 20px;
    font-weight: bold;
    font-family: Arial;
    &:hover {
        cursor: pointer;
    }
`

const Button = () => {
    return <InputButton>OK</InputButton>
}

export default Button