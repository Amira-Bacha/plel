
import React, {useState, useEffect, useRef} from 'react'
import styles from "./styles.module.css"
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios'

const ApplyTrainer = ({openApply, setOpenApply}) =>{
    
    const [Data, setData] = useState({
        name:"",
        surname:"",
        email:"",
        message:"",
        subject:"Request to join as a trainer in Skillzone"
    });

    const [success,setSuccess]=useState({state:false, message: true})
    
    const handleSend = async (e) => {
        e.preventDefault();
        console.log(Data)
        const config = {
			headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
			"withCredentials": true 
		};
        const url=`${process.env.REACT_APP_API}/api/contact/SendRequestTrainer`
        axios.post(url,Data, config)
        .then(async res=>{
            setData({
                name:"",
                surname:"",
                email:"",
                message:"",
                subject:""
            })
            setSuccess({state:true,message:"request sent successfully"})
            await new Promise(r => {
                setTimeout(r, 2000)
            });

            setSuccess({state:false,message:""})
        })
		
        }


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

    return (  
    <Modal
        sx={{p:1}}
        open={openApply}
        onClose={()=>{setOpenApply(false)}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >

        <Box  sx={{ ...style, width: 450, display:'flex'
            ,flexDirection: 'column', overflowY:'auto', overflowX:'hidden', maxHeight:'85vh',alignItems:'center' }}>
                
                        <h2 className={styles.TitleContact}>Apply Now</h2>
                            <div className={styles.ContactPartInfoTextField}>
                                <TextField className={styles.InfoArea} id="standard-basic" label="Name" variant="standard" value={Data.name}
                                onChange={(e)=>setData({...Data , name:e.target.value})}/>
                                <TextField className={styles.InfoArea} id="standard-basic" label="Surname" variant="standard" value={Data.surname}
                                onChange={(e)=>setData({...Data , surname:e.target.value})}/>
                            </div>
                            <div className={styles.ContactPartInfoTextField}>
                                <TextField className={styles.InfoArea} id="standard-basic" label="Email" variant="standard" value={Data.email}
                                onChange={(e)=>setData({...Data , email:e.target.value})}/>
                                <TextField disabled className={styles.InfoArea} id="standard-basic" label="Subject" variant="standard" value={Data.subject}
                                onChange={(e)=>setData({...Data , subject:e.target.value})}/>
                            </div>
                            <div className={styles.ContactPartInfoTextField}>
                                <TextField  className={styles.TextArea}
                                id="standard-multiline-static"
                                label="Message"
                                multiline
                                rows={2}
                                variant="standard"
                                value={Data.message}
                                onChange={(e)=>setData({...Data , message:e.target.value})}
                                />
                            </div>
                            {success.state && <div className={styles.error_msg}>{success.message}</div>}
                            <div className={styles.sendMessageDiv}>
                                <button onClick={handleSend} className={styles.btnSend} >
                                    Send Request
                                </button>
                            </div>

        </Box>


    </Modal>

)}


export default ApplyTrainer