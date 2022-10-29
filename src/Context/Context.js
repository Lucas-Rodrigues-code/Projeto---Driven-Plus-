import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const listaLogin = localStorage.getItem("login");
    const loginDeserializado = JSON.parse(listaLogin)

    const [login, setLogin] = useState(loginDeserializado)

    localStorage.setItem("login", JSON.stringify(login))

    const [nomeCartao, setNomeCartao] = useState("")
    const [digitoCartao, setDigitoCartao] = useState("")
    const [codigo, setCodigo] = useState()
    const [validade, setValidade] = useState("")

    const [planoEscolhido, setPlanoEscolhido] = useState()

    const [plano, setPlano] = useState(null)

    return (
        <UserContext.Provider value={
            {
                plano, setPlano,
                login, setLogin,
                nomeCartao,setNomeCartao,
                digitoCartao,setDigitoCartao,
                codigo,setCodigo,
                validade,setValidade,
                planoEscolhido, setPlanoEscolhido
            }
        }>
            {children}
        </UserContext.Provider>
    )

}


