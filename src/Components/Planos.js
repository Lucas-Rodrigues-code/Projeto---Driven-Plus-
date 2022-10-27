import styled from "styled-components"
import planoPlus from "../Img/plus.png"
import plano2 from "../Img/Group 2.png"
import plano3 from "../Img/Group 3.png"
import axios from "axios"

import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../Context/Context"


export default function Planos() {




    const [plano, setPlano] = useState("")


    const { login } = useContext(UserContext);

    const navigate = useNavigate()
    console.log(plano[0]?.id)

    useEffect(() => {

        if (login === null) {
            navigate("/")
        }
        if (login.membership !== null) {
            navigate("/home")
        }

    }, [])

    const config = {
        headers: {
            "Authorization": `Bearer ${login.token}`
        }
    }

    useEffect(() => {
        const request = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config)
        request.then((res) => {

            setPlano(res.data)
        })
        request.catch((res) => {
            console.log(res, "erro")
        })




    }, [])


    return (
        <Container>
            <h1>Escolha seu Plano</h1>
            <Link to={`/subscriptions/${plano[0]?.id}`} >
                <Plano>
                    <img src={planoPlus} />
                    <h2>R$ {plano[0]?.price}</h2>
                </Plano>
            </Link>
            <Link to={`/subscriptions/${plano[1]?.id}`}>
                <Plano>
                    <img src={plano2} />
                    <h2>R$ {plano[1]?.price}</h2>
                </Plano>
            </Link>
            <Link to={`/subscriptions/${plano[2]?.id}`}>
                <Plano>
                    <img src={plano3} />
                    <h2>R$ {plano[2]?.price}</h2>
                </Plano>
            </Link>
        </Container>
    )
}

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;

        color: #FFFFFF;

        margin-top:29px;
    }
`
const Plano = styled.div`
    width: 290px;
    height: 180px;

    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;

    margin-top:24px;

    display:flex;
    align-items:center;
    justify-content:center;

    h2{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;

        color: #FFFFFF;
        padding-left:20px;
    }

`