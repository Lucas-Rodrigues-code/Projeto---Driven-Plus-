import styled from "styled-components"
import planoPlus from "../Img/plus.png"
import planoPlatinum from "../Img/Group 3.png"
import planoGold from "../Img/Group 2.png"

import { HiOutlineClipboardList } from 'react-icons/hi';
import { FaMoneyBillWave } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdOutlineCancelPresentation } from 'react-icons/md';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import React, { useContext } from 'react';
import { UserContext } from "../Context/Context";

import axios from "axios";

import { Link } from 'react-router-dom';

import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal . setAppElement(".root")

export default function Plano() {

    const navigate = useNavigate()
   
    const [modalIsOpen, setIsOpen] = useState(false);

    const    {
        login,setLogin,
        plano,setPlano,
        nomeCartao,setNomeCartao,
        digitoCartao,setDigitoCartao,
        codigo,setCodigo,
        validade,setValidade,
        setPlanoEscolhido
    } = useContext(UserContext);

    const { ID_DO_PLANO } = useParams();

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${login.token}`
            }
        }
        const request = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${ID_DO_PLANO}`, config)
        request.then((res) => {
            setPlano(res.data)

            
           

        })
        request.catch((res) => {
            console.log(res, "erro")
        })



    }, [])

    function assinar() {
        
        const body = {
            membershipId: plano.id,
            cardName: nomeCartao,
            cardNumber: digitoCartao,
            securityNumber: parseInt(codigo),
            expirationDate: validade
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${login.token}`
            }
        }
        const request = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", body, config)
        request.then((res) => {
           console.log(res.data)
           const listaLogin = localStorage.getItem("login");
            const loginDeserializado = JSON.parse(listaLogin)
            loginDeserializado.membership = res.data.membership
            localStorage.setItem("login", JSON.stringify(loginDeserializado))
            setLogin(loginDeserializado)
            console.log(loginDeserializado)
            setPlanoEscolhido(res.data) 
            
            navigate("/home")

        })
        request.catch((res) => {
            alert("Opss, verifique seus dados estão corretos")
            console.log(res, "erro")
        })

    }

    function openModal(e) {
        e.preventDefault()
        setIsOpen(true);
    }
    
    function closeModal() {
        setIsOpen(false);
    }


    if (plano === null) {
        return (
            <ContainerLoading>
                <img src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif" alt="loading"/>
            </ContainerLoading>
        )
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            
        },
    };


    return (
        <>
            <Cont>
                <Link to={"/subscriptions"}>
                    <IoMdArrowRoundBack color="white" />
                </Link>
            </Cont>
            <Container>

                <ContLogo>
                    {
                        plano?.id === 1
                            ? <img src={planoPlus} alt="plano PLus"/>
                            : plano?.id === 2
                                ? <img src={planoGold} alt="plano Gold"/>
                                : <img src={planoPlatinum} alt="plano Planoplatinum"/>
                    }
                    {
                        plano?.id === 1
                            ? <h1>Driven Plus</h1>
                            : plano?.id === 2
                                ? <h1>Driven Gold </h1>
                                : <h1>Driven Platinium</h1>
                    }
                </ContLogo>
                <ContInfo>
                    <HiOutlineClipboardList color=" #FF4791" onClick={closeModal}/>
                    <span>Benefícios:</span>
                    {plano?.perks.map((perk, i) => <h3 key={i}>{i + 1}. {perk.title}</h3>)}

                    <FaMoneyBillWave color="#FF4791" />
                    <span>Preco:</span>
                    <h3>R$ {plano?.price} cobrados mensalmente</h3>
                </ContInfo>
                <form>
                    <input type="text" placeholder="Nome impresso no cartão" value={nomeCartao} onChange={e => setNomeCartao(e.target.value)} required />
                    <input type="text" placeholder="Digitos do cartão" value={digitoCartao} onChange={e => setDigitoCartao(e.target.value)} />
                    <Dois>
                        <input type="number" placeholder="Código de segurança" value={codigo} onChange={e => setCodigo(e.target.value)} />
                        <input type="text" placeholder="Validade" value={validade} onChange={e => setValidade(e.target.value)} />
                    </Dois>
                    <button onClick={openModal}>ASSINAR</button>
                </form>

            </Container>
            
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <MdOutlineCancelPresentation />
                <ContainerModal>
                
                    <h1>Tem certeza que deseja<br />assinar o plano<br />{ 
                        plano.id === 1
                            ? "Driven Plus"
                            : plano?.id === 2
                                ? "Driven Gold "
                                : "Driven Platinium"
                    } (R$ {plano.price}) ?</h1>
                    <div>
                        <ButtonNão onClick={closeModal}>Não</ButtonNão>
                        <ButtonSim onClick={assinar}>SIM</ButtonSim>
                    </div>
                </ContainerModal>
            </Modal>
        </>


    )
}



const ContLogo = styled.div`
        display:flex;
        flex-direction:column;
        align-items:center;
        margin-top:67px;

        h1{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            line-height: 38px;

            color: #FFFFFF;  
        }
`
const ContInfo = styled.div`
    width:300px;
    margin-top:22px;

      span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #FFFFFF;
        margin-left:8px;
    }
    h3{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #FFFFFF;
    }
    
`
const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;

    form{
        display:flex;
        flex-direction:column;
        align-items:center;
        margin-top:34px; 
    }

    input{
        background: #FFFFFF;
        border-radius: 8px;

        width:299px;
        height:52px;
        margin-top:8px;

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
        width: 299px;
        height: 52px;
        left: 40px;
        top: 581px;

        background: #FF4791;
        border-radius: 8px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;

        color: #FFFFFF;
        margin-top:12px;
    }
`
const Dois = styled.div`
    input{
        background: #FFFFFF;
        border-radius: 8px;

        width:141px;
        height:52px;
        margin-right:4px;
        margin-left:4px;

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

   
`
const Cont = styled.div`
    svg{
        margin-left:20px;
        padding-top:20px;

        width:28px;
        height:28px;
    }

`
const ContainerModal = styled.div`
    width: 248px;
    height: 210px;
    left: 64px;
    top: 229px;

    background: #FFFFFF;
    border-radius: 12px;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    

    div{
        margin-top:47px;
    }

    h1{
        width:248px;
        height:67px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
    }

    button{
        width: 95px;
        height: 52px;
        margin-right:7px;
        margin-left:7px;

        
        border-radius: 8px;

        color: #FFFFFF;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        
       
    }
    svg{
        position:fixed;
        top:10px;
        right:10px;
        
        
    }

`
const ButtonNão = styled.button`
    
    background: #CECECE;
    
`
const ButtonSim = styled.button`
    
    background: #FF4791;
    

`
const ContainerLoading = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:700px;


`


