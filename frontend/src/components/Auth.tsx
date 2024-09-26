import { SignupInput } from "@vaibhavpal99/common_2";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    });

    async function sendRequest() {
        try {
            console.log(postInputs);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            console.log(response);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            alert("An Error has occurred");
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <div className="text-3xl font-extrabold text-center mb-4">
                    Create an account
                </div>
                <div className="text-center text-slate-500 mb-6">
                    Already have an account? 
                    <Link className="pl-2 underline text-blue-600 hover:text-blue-800" to={"/signin"}>Login</Link>
                </div>
                <div>
                    <LabelledInput 
                        label="Name" 
                        placeholder="John Doe" 
                        onChange={(e) => {
                            setPostInputs({ ...postInputs, name: e.target.value });
                            localStorage.setItem("name", e.target.value);
                        }}
                    />
                    <LabelledInput 
                        label="Email" 
                        placeholder="johndoe@gmail.com" 
                        onChange={(e) => {
                            setPostInputs({ ...postInputs, email: e.target.value });
                        }}
                    />
                    <LabelledInput 
                        label="Password" 
                        type={"password"} 
                        placeholder="Your Password" 
                        onChange={(e) => {
                            setPostInputs({ ...postInputs, password: e.target.value });
                        }}
                    />
                    <div className="pt-4">
                        <button 
                            onClick={sendRequest} 
                            type="button" 
                            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300 ease-in-out"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="mb-4">
            <label className="block mb-1 text-sm text-black font-bold">{label}</label>
            <input 
                onChange={onChange} 
                type={type || "text"} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors duration-300 ease-in-out" 
                placeholder={placeholder} 
                required 
            />
        </div>
    );
}
