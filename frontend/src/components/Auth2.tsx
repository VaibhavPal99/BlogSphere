import { SigninInput } from "@vaibhavpal99/common_2";
import { ChangeEvent, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth2 = () => {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: "",
    });

    async function sendRequest(){
        try{
            const response = await  axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs);
            console.log(response);
            const jwt = response.data.jwt;
            const name= response.data.name;
            localStorage.setItem("token",jwt);
            localStorage.setItem("name",name);

            navigate("/blogs")
        }catch(e){
            alert("Not able to Log in");
        }

    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Welcome Back
                    </div>
                    <div className=" text-slate-500">
                        Don't have an account? 
                        <Link className="pl-2 underline" to={"/signup"}>Sign up</Link>
                    </div>
                </div>
                <div className="pt-8" >
                    {/* <LabelledInput label="Name" placeholder="John Doe" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value,
                        })
                    }}
                    ></LabelledInput> */}
                    <LabelledInput label="Email" placeholder="johndoe@gmail.com" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value,
                        })
                    }}
                    ></LabelledInput>
                    <LabelledInput label="Password" type={"password"} placeholder="Your Password" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value,
                        })
                    }}
                    ></LabelledInput>
                    <div className="pt-4">
                    <button onClick={sendRequest} type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType{
    label : string;
    placeholder : string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-bold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
         focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        
    </div>

}