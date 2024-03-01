import styles from "./styles.module.css";
import { Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {IoIosArrowForward,IoMdArrowDropright} from "react-icons/io"

const Login = () =>{
    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"
				}, 
				"withCredentials": true 
			}
			const url = `${process.env.REACT_APP_API}/api/auth`;
			await axios.post(url,data, config)
			.then(async res => {
				localStorage.setItem("token", res.data.data);
				console.log("success")

				const config = {
					headers: { 
						authorization: `Bearer ${res.data.data}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" 
					},
					"withCredentials": true
				};
				const url = `${process.env.REACT_APP_API}/api/userData`;
				await axios.post(url,{},config)
				.then(response => {
					
					localStorage.setItem("user", JSON.stringify(response.data.data));
					localStorage.setItem("login",true)
					if(response.data.data.firstConnection){
						window.location = "/completeInfo"
					}else{
						window.location = "/profile"
					}

					if(response.data.data.userType==="Admin"){
						window.location = "/admin"
					}
					 
				  })

			})
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
    return(
        <div className={styles.backLogin}>
            <div className={styles.loginContainer}>
                <Link className={styles.Close} to="/">
                    Home<IoIosArrowForward size={30}/>
                </Link>
                <div className={styles.Title}>
                    <p>Login</p>
                </div>
                <form className={styles.form_container} onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
                        <div className={styles.options} >
                           <div className={styles.checkBox} >
                                <input type="checkbox" name="remember" />
                                <label htmlFor="remember">Remember me</label>
                           </div>
                            <Link  to="/ResetPassword">Forgot Password ?</Link>
                        </div>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.Login_btn}>
							Login
						</button>
                        <Link className={styles.signup} to="/signup">
                            Create an account <IoMdArrowDropright/>
                        </Link>
                        
				</form>
            </div>
        </div>
    )
}

export default Login;