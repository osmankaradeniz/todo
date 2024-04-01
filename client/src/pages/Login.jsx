import axios from 'axios';
import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom';
import { object, string, number, date, InferType, ref } from 'yup';



let schema = object({
    username: string().required('Username is required'),
    password: string().required('Password is required'),
    passwordConfirmation: string()
        .oneOf([ref('password'), null], 'Passwords must match')
});
export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = {
                username: e.target.username.value,
                password: e.target.password.value,
            };

            await schema.validate(formData);
            const res = await axios.post("http://192.168.1.37:3001/user/login", {
                username: e.target.username.value,
                password: e.target.password.value
            }
            )
            console.log(res.data)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            if (res.data) {
                navigate("/")
            }

        } catch (error) {
            console.log("first")
            setError(error.message)
        }
    }
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", padding: "16px 20px", borderRadius: "16px", backgroundColor: "whitesmoke", minWidth: "360px" }}>
                <div>
                    <h2 className="text-xl font-semibold" style={{ marginTop: 0 }}>Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" className='textInput' type="text" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" className='textInput' type="text" />
                    </div>
                    {error && (<div style={{ backgroundColor: "rgba(255, 0, 0, .4)", color: "rgba(255, 0, 0, 1)", padding: "6px", borderRadius: "4px" }}>{error}</div>)}

                    <div>
                        <input className='submitButton' type="submit" value="Login" />
                    </div>
                </form>
                <div>
                    You haven't an acoount ? <Link style={{ color: "#6171E8", fontWeight: 700 }} to={"/register"}>Register</Link>
                </div>
            </div>
        </div>
    )
}

