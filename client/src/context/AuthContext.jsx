import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
       const [user, setUser] = useState(null);
       const [registerError,setRegisterError]=useState(null);
       const [isRegisterloading,setIsRegisterloading] = useState(false);
      const [registerInfo, setRegisterInfo] = useState({
              name: "",
              email: "",
              password: ""
       });
       const [loginError,setLoginError]=useState(null);
       const [isLoginloading,setIsLoginloading] = useState(false);
       
       const [loginInfo, setLoginInfo] = useState({
             
              email: "",
              password: ""
       });
       useEffect(()=>{
              const user=localStorage.getItem("User");
              if(user)
                     setUser(JSON.parse(user));
       },[])

       const updateRegisterInfo = useCallback((info) => {
              setRegisterInfo(info);
       }, [])
       const updateLoginInfo = useCallback((info) => {
              setLoginInfo(info);
       }, [])

       const registerUser = useCallback(async(e)=>{
              e.preventDefault();
              setIsRegisterloading(true);
              setRegisterError(null);
              const response=await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo));
              setIsRegisterloading(false);

              if(response.error)
              {
                     return setRegisterError(response);
              }
              localStorage.setItem('User',JSON.stringify(response))
              setUser(response);

       },[registerInfo]);

       const loginUser=useCallback(async(e)=>{
              
              e.preventDefault();
              setIsLoginloading(true);
              setLoginError(null);

              const response=await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo));
             
              setIsLoginloading(false);

              if(response.error)
              {
                     return setLoginError(response);
              }
              localStorage.setItem('User',JSON.stringify(response))
              setUser(response);
              
       },[loginInfo]);

       const logoutuser=useCallback(()=>{
              localStorage.removeItem("User");
              setUser(null);
       },[])

       return <AuthContext.Provider value={{
              user,
              registerInfo,
              updateRegisterInfo,
              registerUser,
              registerError,
              isRegisterloading,
              logoutuser,
              loginUser,
              loginError,
              loginInfo,
              isLoginloading,
              updateLoginInfo,


       }}>
              {children}

       </AuthContext.Provider>;
}
