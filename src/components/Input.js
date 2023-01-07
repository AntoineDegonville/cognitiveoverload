import React from "react"
import styled from "styled-components"
import './Input.scss'

const Container = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 80px;
`

const Values = styled.div`
    width: 30%;
    height: 100%;
    color: black;
`

const Description = styled.div`
    font-family: Dancing Script, recursive;
    font-size: 16px;
    color: black;
`

const Input = ({title, description, inputValue, values}) => {

    return (
        <Container>
            <div className="form__group field">
                <input onChange={(e) => {
                            switch(title) {
                                case 'Bpm:': 
                                    inputValue(e.target.value)
                                    break
                                case 'Duration:':
                                    inputValue(e.target.value ? parseFloat(e.target.value) : 0)
                                    break
                                case 'Range:': 
                                    inputValue(e.target.value)
                                    break
                                default:
                                    break
                            }
                }} type="input" className="form__field" placeholder="Name" name="name" id='name' required />
                <label htmlFor="name" className="form__label">{title}</label>
                <Description>{description}</Description>
            </div>
            <Values>
                {values}
            </Values>
        </Container>
    )
}

export default Input