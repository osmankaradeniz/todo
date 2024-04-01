import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { object, string, number, date, InferType, ref } from 'yup';

let schema = object({
    username: string().required('Username is required'),
    password: string().required('Password is required'),
    passwordConfirmation: string()
        .oneOf([ref('password'), null], 'Passwords must match')
});
export default function Register() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = {
                username: e.target.username.value,
                password: e.target.password.value,
                passwordConfirmation: e.target.passwordConfirmation.value
            };

            await schema.validate(formData);

            await axios.post("http://192.168.1.37:3001/user/register", {
                username: e.target.username.value,
                password: e.target.password.value
            })
            
            navigate("/login")
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", padding: "16px 20px", borderRadius: "16px", backgroundColor: "whitesmoke", minWidth: "360px" }}>
                <div>
                    <h2  className="text-xl font-semibold" style={{ marginTop: 0 }}>Register</h2>
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
                    <div>
                        <label htmlFor="passwordConfirmation">Password Confirmation</label>
                        <input id="passwordConfirmation" name="passwordConfirmation" className='textInput' type="text" />
                    </div>
                    {error && (<div style={{ backgroundColor: "rgba(255, 0, 0, .4)", color: "rgba(255, 0, 0, 1)", padding: "6px", borderRadius: "4px" }}>{error}</div>)}

                    <div>
                        <input className='submitButton' type="submit" value="Register" />
                    </div>
                </form>
                <div>
                    You haven an acoount ? <Link style={{color:"#6171E8",fontWeight:700}} to={"/login"}>Login</Link>

                </div>
            </div>
        </div>
    )
}
