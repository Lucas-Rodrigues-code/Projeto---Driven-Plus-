import { createContext, useState} from "react";

export const UserContext = createContext();

export default function UserProvider({children}){

    const listaLogin = localStorage.getItem("login");
    const loginDeserializado = JSON.parse(listaLogin)

    const [login, setLogin] = useState(loginDeserializado)

    localStorage.setItem("login",JSON.stringify(login))
    
    return(
        <UserContext.Provider value={{login,setLogin}}>
            {children}
        </UserContext.Provider>
    )

}


