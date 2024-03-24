import {useState} from "react";
import {Link} from "react-router-dom";
import axiosInstance from "../config/AxiosInstance.ts";

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const login =async ()=>{
        const data = {
            "email":email,
            "password":password,

        }
        try{
            const response = await axiosInstance.post("/users/login",data);
            if (response.status == 200){
                setEmail("")
                setPassword("");
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate()+2);
                const cookieValue = encodeURIComponent("token")+"="+encodeURIComponent(response.data.token)+";expires="+expirationDate.toUTCString()+";path=/";
                document.cookie = cookieValue;
            }else{
                console.log(response)
            }
        }catch (e){
            console.log(e)
        }
    }

    return (
        <>
            <br/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <div className={"form-group"}>
                            <label htmlFor={"email"}>Email</label>
                            <input type={"email"} onChange={(e)=>setEmail(e.target.value)} className={"form-control"} placeholder={"Email"}/>
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"form-group"}>
                            <label htmlFor={"password"}>Password</label>
                            <input type={"password"} onChange={(e)=>setPassword(e.target.value)} className={"form-control"} placeholder={"Password"}/>
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <br/>
                        <button onClick={login} className={"btn btn-primary col-12"}>Login</button>
                        <br/>
                        <br/>
                        <Link to={"/signup"} className={"btn btn-outline-dark col-12"}>Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
