import React, { useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from './UserService'
import { err } from "react-native-svg/lib/typescript/xml";


const AppContext = createContext();

export const AppContextProvider =props =>{
    const {children}= props;
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [user, setUser] = useState({})

 
    const onRegister =async (email,password,name)=>{
        try{
            const result = await register(email,password,name);
            if(result.result== true)
            {
                return true;
            }
        }catch(error){
            console.log(error)
        }
        
        return false;
    }
    const onLogin =async (email,password)=>{
        try{
            const result = await login(email,password);
            console.log("Onlogin "+result);
            if(result.result==true)
            {
                setisLoggedIn(true);
                //setUser(result.data);
                await AsyncStorage.setItem('token',result.data.token)
                return true;
            }
        }catch(error)
        {
            console.log(error)
        }
       
        return false;
    }

    return( 

        <AppContext.Provider value={[isLoggedIn,onLogin,onRegister]}>
            {children}
        </AppContext.Provider>
    )
}