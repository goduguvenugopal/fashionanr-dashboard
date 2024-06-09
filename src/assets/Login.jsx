import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { passwordContext } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {

    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useContext(passwordContext)
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate();
     

    const API = "https://fashionkart-server.onrender.com"

    // password verification function  
    const formFunc = async (e) => {
        e.preventDefault()
        setSpinner(true)

        try {
            const response = await axios.post(`${API}/product/login`,{password : password})

            if (response) {
                setSpinner(false)
                alert("Logged in Successfully")
                localStorage.setItem("password", "password")
                setPassword1("password")
                setPassword("")

            } 
        }
        catch (error) {
            console.log(error)
            setSpinner(false)
             alert("Please Enter Valid password, if not registered seller account please Contact us")
        }
    }

    useEffect(() => {
        if (password1) {

            navigate("/")
        }
    }, [password1])





    return (
        <div className='bg-dark  d-flex justify-content-center align-items-center ' style={{ width: "100vw", height: "100vh" }}>
            <div className=''>
                <form className='login-card' onSubmit={formFunc}>
                    <h4>Seller Login </h4>
                    <hr className='mb-1' />
                    <label className='label'>Enter Password</label><br />

                    <input required value={password} name='password' onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Password' className='input-box' /><br />
                    {spinner ? <button style={{ width: "5rem" }} className="mt-3 btn btn-primary" type="button" disabled="">
                        <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                    </button>
                        : <button type='submit' style={{ width: "5rem" }} className='mt-3 btn bg-primary text-white fw-bold'>Log in</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default Login