
import React, {useState, useEffect, useRef} from 'react'
import styles from "./styles.module.css"
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios'
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';

const Evaluate = ({openEvaluate, setOpenEvaluate, courseId}) =>{
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token")

    const [Data, setData] = useState({
        id:user._id,
        message:"",
        rate:0
    });
    
    const handleSend = async (e) => {
        e.preventDefault();
        console.log(Data)
        const config = {
			headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
		};
        const url=`${process.env.REACT_APP_API}/api/courses/Evaluate`
        axios.post(url,{Data:Data, courseId:courseId}, config)
        .then(async res=>{
            setData({
                id:"",
                message:"",
                rate:0
            })
            setOpenEvaluate(false)
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

      const valuetext=(value)=>{
          return value
      }

    return (  
    <Modal
        sx={{p:1}}
        open={openEvaluate}
        onClose={()=>{setOpenEvaluate(false)}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >

        <Box  sx={{ ...style, width: 450, display:'flex'
            ,flexDirection: 'column', overflowY:'auto', overflowX:'hidden', maxHeight:'85vh',alignItems:'center' }}>
                
                        <h2 className={styles.TitleContact}>Evaluate Course</h2>
                            <div className={styles.ContactPartInfoTextField}>
                                <div className={styles.ContactPartInfoTextFieldInter}>
                                <Rating name="read-only" value={Data.rate} readOnly precision={0.5} />
                                    <Slider
                                        sx={{marginTop:"20px"}}
                                        aria-label="Small steps"
                                        defaultValue={Data.rate}
                                        getAriaValueText={()=>{ return Data.rate}}
                                        onChange={(e)=>setData({...Data , rate:e.target.value})}
                                        step={0.5}
                                        marks
                                        min={0}
                                        max={5}
                                        valueLabelDisplay="auto"
                                    />
                                    <TextField multiline rows={2} className={styles.InfoArea} id="standard-basic" label="Message" variant="standard" value={Data.message}
                                    onChange={(e)=>setData({...Data , message:e.target.value})}/>
                                </div>
                            </div>
                            
                            <div className={styles.sendMessageDiv}>
                                <button onClick={handleSend} className={styles.btnSend} >
                                    Save
                                </button>
                            </div>

        </Box>


    </Modal>

)}


export default Evaluate