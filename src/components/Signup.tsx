import {Link} from "react-router-dom";
import {useState} from "react";
import axiosInstance from "../config/AxiosInstance.ts";

const Signup = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [fullName , setFullName] = useState("");
    const signup =async ()=>{
        const data = {
            "fullName":fullName,
            "email":email,
            "password":password,
        }
        try{
            const response = await axiosInstance.post("/users/register",data);
            if (response.status == 201){
                setFullName("")
                setEmail("")
                setPassword("");
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
                    <div className={"col-4"}>
                        <div className={"form-group"}>
                            <label htmlFor={"fullName"}>Full Name</label>
                            <input type={"text"} value={fullName} onChange={(e)=>setFullName(e.target.value)} className={"form-control"} placeholder={"Full Name"}/>
                        </div>
                    </div>
                    <div className={"col-4"}>
                        <div className={"form-group"}>
                            <label htmlFor={"email"}>Email</label>
                            <input type={"email"} value={email} onChange={(e)=>setEmail(e.target.value)} className={"form-control"} placeholder={"Email"}/>
                        </div>
                    </div>
                    <div className={"col-4"}>
                        <div className={"form-group"}>
                            <label htmlFor={"password"}>Password</label>
                            <input type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} className={"form-control"} placeholder={"Password"}/>
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <br/>
                        <button onClick={signup} className={"btn btn-primary col-12"}>Sign Up</button>
                        <br/>
                        <br/>
                        <Link to={"/login"} className={"btn btn-outline-dark col-12"}>Login</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
