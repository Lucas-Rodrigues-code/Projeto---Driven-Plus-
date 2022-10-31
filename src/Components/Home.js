import styled from "styled-components"

import planoPlus from "../Img/plus.png"
import planoPlatinum from "../Img/Group 3.png"
import planoGold from "../Img/Group 2.png"
import user from "../Img/Vector.png"

import React, { useContext } from 'react';
import { UserContext } from "../Context/Context";
import axios from "axios"

import { useNavigate } from 'react-router-dom';

export default function Home() {

    const {
        login,
        plano,
        nomeCartao,
        digitoCartao,
        codigo,
        validade,
        planoEscolhido,
    } = useContext(UserContext);


    const navigate = useNavigate()

    function cancelarPlano() {
        const config = {
            headers: {
                "Authorization": `Bearer ${login.token}`
            }
        }
        const deletar = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", config)
        deletar.then((res) => {
            console.log(res.data, "aqui")
            navigate("/subscriptions")
        })
        deletar.catch(() => alert("erro"))
    }

    function mudarPlano() {
        const config = {
            headers: {
                "Authorization": `Bearer ${login.token}`
            }
        }

        const body = {
            membershipId: planoEscolhido.id,
            cardName: nomeCartao,
            cardNumber: digitoCartao,
            securityNumber: codigo,
            expirationDate: validade
        }

        const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", body, config)
        requisicao.then(() => {
            navigate("/subscriptions")
        })
        requisicao.catch(() => alert("erro"))
    }
    console.log(planoEscolhido)
    if (planoEscolhido === null) {
        return (
            <ContainerLoading>
                <img src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif" alt="loading" />
            </ContainerLoading>
        )
    }

    return (
        <>
            <ContainerLOgo>
                {
                    plano?.id === 1
                        ? <img src={planoPlus} alt="plano PLus" />
                        : plano?.id === 2
                            ? <img src={planoGold} alt="plano Gold" />
                            : <img src={planoPlatinum} alt="plano Planoplatinum" />
                }
                <User>
                    <img src={user} alt="user" />
                </User>


            </ContainerLOgo>
            <ContainerBeneficios>
                <h1>Olá, {login?.name}</h1>

                {planoEscolhido.membership.perks.map((perk, i) => <Beneficios key={i}><a href={perk.link}>{perk.title}</a></Beneficios>)}
            </ContainerBeneficios>
            <ContBotao>
                <BotaoMudar onClick={mudarPlano}>Mudar plano</BotaoMudar>
                <BotaoCancelar onClick={cancelarPlano}>Cancelar plano</BotaoCancelar>
            </ContBotao>

        </>
    )
}

const ContainerLOgo = styled.div`
    width:100%;
    height:82px;
    margin-top:10px;

    display:flex;
    justify-content: space-between;
    align-items:center;

    img{
        width:90px;
        height:auto;
        margin-left:38px;
    }
`
const User = styled.div`
   

    img{
        width:70px;
        height:70px;
        border-radius:50%;
        background-color:blue;
        margin-right:38px;
    }

`
const ContainerBeneficios = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;

        color: #FFFFFF;

        margin-top:32px;
        margin-bottom:53px;

    }

  

`
const Beneficios = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;

    width: 299px;
    height: 52px;
    margin-top:8px;
    

    background: #FF4791;
    border-radius: 8px;

   

    a{
        text-decoration: none;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;

        color: #FFFFFF;
    }

`
const ContBotao = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
 

    position:fixed;
    left:0;
    right:0;
    bottom:12px;

`
const BotaoMudar = styled.button`
    width: 299px;
    height: 52px;
    left: 38px;
    top: 543px;

    background: #FF4791;
    border-radius: 8px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;

    color: #FFFFFF;
    border: none;
`
const BotaoCancelar = styled.button`
    width: 299px;
    height: 52px;
    margin-top:8px;
   

    background: #FF4747;
    border-radius: 8px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;

    color: #FFFFFF;
    border: none;

`
const ContainerLoading = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:700px;


`
