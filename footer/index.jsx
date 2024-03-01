import styles from "./styles.module.css";
import {SiFacebook,SiTwitter,SiLinkedin} from 'react-icons/si';
import axios from 'axios'
import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Footer = ()=>{
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,

      };

      const  [saved, setSaved]=useState(false)
    const [email, setEmail]=useState({email:""})

    const handleChange=async (e)=>{
        setEmail({email:e.target.value})
    }

    const handleNewsletter = async () =>{
        const config = {
                headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
                "withCredentials": true
            };
            try {
                const url = `${process.env.REACT_APP_API}/api/newsletter/`
                await axios.post(url, {email: email}, config )
                .then(async res=>{
                    setSaved(true)
                    setEmail({email:""})
                    await new Promise(r => {
                        setTimeout(r, 2000)
                    });
                    setSaved(false)
                })
            }catch(error){
            }
    }

    return(
        <footer className={styles.footer}>
            <div className={styles.FstPart}>
                <div className={styles.FooterLogo}>
                    <h1>
                        skillzone
                    </h1>
                    <p>
                        © Copyright skillzone 2022
                    </p>
                </div>
                <div className={styles.Adress}>
                    <p>(+216) 53 533 554</p>
                    <p>
                        av yesser arafet, imm <br/>bouhejeb - sahloul - sousse
                    </p>
                    <p>support@skillzone.tn</p>
                </div>
            </div>
            <div className={styles.ScPart}>
                <h1>Quicklinks</h1>
                <p>About us</p>
                <p>Login</p>
                <p>Signup</p>
                <p>Contact</p>
            </div>
            <div className={styles.ThrdPart}>
                <h1>Social Media </h1>
                <div className={styles.social}>
                    <SiFacebook/>
                    <SiTwitter/>
                    <SiLinkedin/>
                </div>
            </div>
            <div className={styles.FrthPart}>
                <h1>
                signup to get Latest <br/>
                Updates of our courses
                </h1>
                <div className={styles.SignUpFooter}>
                    <input value={email.email} onChange={(e)=>handleChange(e)} type="text" 
                    placeholder="YourMail@example.com"
                    />
                    <button onClick={handleNewsletter} className={styles.SignUpButtonFooter} >
                        <p>Subscribe</p>
                    </button>
                </div>
            </div>
            <Modal
                sx={{p:1}}
                open={saved}
                onClose={()=>setSaved(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                >

                    <Box  sx={{ ...style, width: 450, display:'flex'
                        , overflowY:'auto', overflowX:'hidden', maxHeight:'85vh',alignItems:'center', justifyContent:"center" }}>

                    <CheckCircleOutlineIcon  color="success" />                         
                    <h3>You have subscribed successfully</h3>
                                            
                </Box>
            </Modal>
        </footer>
    )
}


export default Footer