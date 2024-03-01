import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './styles.module.css'
import React, {useState, useEffect, useRef} from 'react'
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';
import axios from 'axios'
import { Link,
	useParams} from "react-router-dom";

export const Accept =()=>{
    let { id } = useParams();
    const token = localStorage.getItem("token")
    const config = {
        headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
        "withCredentials": true
    };
    const url = `${process.env.REACT_APP_API}/api/payment/updatePayment`
    axios.post(url, {courseId:id}, config)
    .then(res=>{
        console.log('Course Updated successfully')
    })
    return(
        <div className={styles.big}>
            <div className={styles.titre} >
                <CheckCircleOutlineIcon  color="success"/>
                <h4>payment was successful</h4>

            </div>
            <Button onClick={()=>{window.location = "/profile"}}>Return profile</Button>
        </div>
    )
}


export const Refuse =()=>{
    return(
        <div className={styles.big}>
            <div className={styles.titre} >
                <HighlightOffIcon sx={{ color: pink[500] }}/>
                <h4>payment failed</h4>

            </div>
            <Button onClick={()=>{window.location = "/profile"}}>Return profile</Button>
        </div>
    )
}