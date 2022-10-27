import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import { useNavigate, Link } from 'react-router-dom';

export default function Cadastro() {
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const navigate = useNavigate()

    function fazerCadastro(e) {
        e.preventDefault()
        const body = {
            email: email,
            name: nome,
            cpf: cpf,
            password: senha

        }
        const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", body)
            .then(() => {
                navigate("/")
            })
            .catch((res) => {
                console.log(res)
                alert("Opss! Algo deu errado, verifique seus dados")
                window.location.reload()
            })
    }

    return (
        <Container>
            <Formulario>
                <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
                <input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
                <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                <button onClick={fazerCadastro}>CADASTRAR</button>
            </Formulario>
            <Link to={"/"}>
            <h1>Já possuí uma conta? Entre</h1>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

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