import styled from "styled-components"
import logo from "../Img/Driven.png"

import React, { useContext } from 'react';
import { UserContext } from "../Context/Context";

export default function Login(){

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const { login, setLogin } = useContext(UserContext);

    function fazerLogin(e) {
        e.preventDefault()
        const body = {
            email: email,
            password: senha

        }
        const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", body)
        requisicao.then((res) => {
            setLogin(res.data)
            navigate("/subscriptions")
        })

        requisicao.catch(() => {
            alert("Opss! Email ou senha errados")
            window.location.reload()
        })
    }

    return(
        <Container>
            <img src={logo}/>
            <Formulario>
               <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
               <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}/>
               <button onClick={fazerLogin}>ENTRAR</button>
            </Formulario>
            <h1>Não possuí uma conta? Cadastre-se</h1>

        </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    img{
        margin-top:134px;
    }
    h1{
        margin-top:24px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: underline;

        color: #FFFFFF;  
    }





`
const Formulario = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:100px;

    input{
        margin-bottom:16px;
        width:299px;
        height:52px;
        background: #FFFFFF;
        border-radius: 8px;

        ::placeholder{ 
            color:#7E7E7E;
            padding-left:14px;

            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
        }
        
    }
    button{
        width:298px;
        height:52px;
        background: #FF4791;
        border-radius: 8px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;

        color: #FFFFFF;
    }
`