import Cadastro from "./Cadastro";
import Home from "./Home";
import Login from "./Login";
import Plano from "./Plano";
import Planos from "./Planos";

import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../Context/Context"
import { useState } from "react";

export default function App() {

    const [login, setLogin] = useState(null)

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <UserContext.Provider value={{login, setLogin}}>
                        <Route path="/" element={<Login />} />
                        <Route path="/sign-up" element={<Cadastro />} />
                        <Route path="/subscriptions/ID_DO_PLANO" element={<Plano />} />
                        <Route path="/subscriptions" element={<Planos />} />
                        <Route path="/home" element={<Home />} />
                    </UserContext.Provider>
                </Routes>
            </BrowserRouter>
        </>
    )
}


const GlobalStyle = createGlobalStyle`
    body {
        box-sizing:border-box;
        margin:0;
        background: #0E0E13;
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a{
        text-decoration:none;
    }
    }`