import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {IoIosArrowForward,IoMdArrowDropright} from "react-icons/io"
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () =>{
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [newPassword, setNewPassword] = useState("")
	const [ConfirmPassword, setConfirmPassword] = useState("")
	const handleChange = async ({ currentTarget: input }) => {
		setEmail(input.value);
	};
	useEffect(()=>{
	},[email])

	const handleVerify = ({ currentTarget: input }) => {
		setVerificationCode(input.value);

	};

	const handleNewPassword = ({ currentTarget: input }) => {
		setNewPassword(input.value);

	};
	
	const handleConfirmPassword = ({ currentTarget: input }) => {
		setConfirmPassword(input.value);

	};

	const [PasswordForm, setPasswordForm]=useState(false)

	const [resetEmailStatus, setResetEmailStatus] = useState(false)
	const [emailError, setEmailError] = useState()
	const [codeVerificationError, setCodeVerificationError] = useState()
	const [PassVerificationError, setPassVerificationError] = useState()

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"
				}, 
				"withCredentials": true 
			}
			const url = `${process.env.REACT_APP_API}/api/auth/VerifyEmailForPassword`;
			await axios.post(url,{email:email}, config)
			.then(async res => {
				if(res.data.status){
					setResetEmailStatus(true)
					setVerificationCode()
					setVerificationCode("")
				}else{
					setEmailError(res.data.message)
				}

			})
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setEmailError(error.response.data.message);
			}
		}
	};

	const handleVerifCode = async (e) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"
				}, 
				"withCredentials": true 
			}
			const url = `${process.env.REACT_APP_API}/api/auth/VerifyCodeForPassword`;
			await axios.post(url,{code:verificationCode}, config)
			.then(async res => {

					if(res.data.status){
						setPasswordForm(true)
					}

			})
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setEmailError(error.response.data.message);
			}
		}
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		if(ConfirmPassword === newPassword){

			try {
				const config = {
					headers: {
						'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"
					}, 
					"withCredentials": true 
				}
				const url = `${process.env.REACT_APP_API}/api/auth/ResetPassword`;
				await axios.post(url,{new: newPassword, email: email}, config)
				.then(async res => {

						if(res.data.status){
							window.location.replace(`${process.env.REACT_APP_DOMAIN}/Login`)
						}

				})
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setEmailError(error.response.data.message);
				}
			}

		}else{
			setPassVerificationError("password verification error ! retype your password")
		}
	};


    return(
        <div className={styles.backLogin}>
			<div className={styles.loginContainer}>
			<Link className={styles.Close} to="/">
                    Home<IoIosArrowForward size={30}/>
                </Link>
				<h1 className={styles.Title}>Forgot your password</h1>
				<form className={styles.form_container} onSubmit={handleSubmit}>
							{!resetEmailStatus? 
								<React.Fragment>
									<p className={styles.explication}>
										enter the email address you used when registering on SKILLZONE
									</p>
									<input
										type="email"
										placeholder="Email"
										name="email"
										onChange={handleChange}
										value={email}
										required
										className={styles.input}
									/>
									{emailError && <div className={styles.error_msg}>{emailError}</div>}
									<button type="submit" className={styles.Login_btn}>
										Reset Password
									</button>
								</React.Fragment>	
							:
								<React.Fragment>
									{!PasswordForm ?
										<React.Fragment>
											<p className={styles.explication}>
												We have send a verification code to verify your email. enter your code in the field below. 
											</p>
											<input
												type="VerificationCode"
												placeholder="VerificationCode"
												name="VerificationCode"
												onChange={handleVerify}
												value={verificationCode}
												required
												className={styles.input}
											/>
											{codeVerificationError && <div className={styles.error_msg}>{codeVerificationError}</div>}
											<button onClick={handleVerifCode} className={styles.Login_btn}>
												Verify
											</button>
										</React.Fragment>	
									:
										<React.Fragment>
											<input
												type="password"
												placeholder="newPassword"
												name="newPassword"
												onChange={handleNewPassword}
												value={newPassword}
												required
												className={styles.input}
											/>
											<input
												type="password"
												placeholder="ConfirmPassword"
												name="ConfirmPassword"
												onChange={handleConfirmPassword}
												value={ConfirmPassword}
												required
												className={styles.input}
											/>
											{PassVerificationError && <div className={styles.error_msg}>{PassVerificationError}</div>}
											<button onClick={handleResetPassword} className={styles.Login_btn2}>
												Change Password
											</button>
										</React.Fragment>	
									}
								</React.Fragment>
						
						}
				</form>
			</div>
        </div>
    )
}

export default ResetPassword;