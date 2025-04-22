import { createContext,useState ,useEffect,useContext} from "react"

const AuthContext = createContext();

export default function AuthProvider({children}) {

    const [token,setToken] = useState(()=>localStorage.getItem("token")) ;
    const [user,setUser] = useState(null);

    useEffect(()=>{
        if(token){
            setUser({});
        }
    },[token])

    const login = (jwt) => {
        setToken(jwt);
        localStorage.setItem("token",jwt)
    }
    const logout = () => {
        setToken(null)
        setUser(null);
        localStorage.removeItem("token")
    }

  return (
    <AuthContext.Provider value={{token,user,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;   //custom hook to use the auth context
}
