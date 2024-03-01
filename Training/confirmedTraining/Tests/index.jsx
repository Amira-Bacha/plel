
import React, {useState, useEffect, useRef} from 'react'
import styles from "./styles.module.css"
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios'
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import QuizIcon from '@mui/icons-material/Quiz';
import Button from '@mui/material/Button';
import { Link, useParams} from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loading from "../../../Loading"

const Tests = ({showTests, setShowTests, courseId}) =>{
    let { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token")
    const [Loading,setLoading] = useState(true)
    const [Data, setData] = useState({
        id:user._id,
        message:"",
        rate:0
    });

    useEffect(async ()=>{
        await HandleTestsForCandidats()
    },[])
    
    const [tests, setTests] =useState([])
    const [usersids, setUsersids] =useState([])
    const [usersLimitedForTests, setUsersLimitedForTests] =  useState([])

    const HandleTestsForCandidats=async()=>{
        const config={
            headers: {authorization: `Bearer ${token}`,'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
            "withCredentials": true 
        }
		await axios.post(`${process.env.REACT_APP_API}/api/evaluations/getEvaluations`, {courseId:id,student:""},config)
			.then(res=>{
				setTests(res.data.Evaluations)
                setUsersids(res.data.Evaluations.map(e=>{
                    return e.student
                }))
			});
    }

    const GetUsers= async()=>{
        const config={
            headers: {authorization: `Bearer ${token}`,'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
            "withCredentials": true 
        }
		await axios.post(`${process.env.REACT_APP_API}/api/Candidat/returnCandidatForRatingInfo`, {ids:usersids},config)
			.then(async res=>{
				setUsersLimitedForTests(res.data.usersLimited)
                console.log(res.data.usersLimited)
			});
	
	}
    
    const HandleTest= async ()=>{
        const config={
            headers: {authorization: `Bearer ${token}`,'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
            "withCredentials": true 
        }
		await axios.post(`${process.env.REACT_APP_API}/api/Trainer/AllowTests`, {courseId:id, state:"closed"},config)
			.then(res=>{
				window.location.reload(true)
				setShowTests(false)
			});
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

      useEffect(()=>{
        console.log("test:",tests)
      },[tests])


      useEffect(async ()=>{
        await GetUsers()
      },[usersids])

      useEffect(async ()=>{
          console.log(usersLimitedForTests)
        setLoading(false)
      },[usersLimitedForTests])

    return (  
    <Modal
        sx={{p:1}}
        open={showTests}
        onClose={()=>{setShowTests(false)}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >

        <Box  sx={{ ...style, width: 450, display:'flex'
            ,flexDirection: 'column', overflowY:'auto', overflowX:'hidden', maxHeight:'85vh',alignItems:'center', justifyContent:"center" }}>
                
                {
                    Loading?
                        <Loading/>

                    :
                    
                        <div className={styles.accordion}>
                            { usersLimitedForTests.length>0&& tests.length>0 ?

                                usersLimitedForTests.map(u=>{
                                    return(
                                        <Accordion key={u._id} sx={{width: "95%"}} >{/* disabled */}
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                >
                                                <Typography> {u.userName} </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>

                                                <Accordion >{/* disabled */}
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                        >
                                                        <Typography> QCM </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                    
                                                        {
                                                            tests.map(t=>{
                                                                console.log("student:",t.student,"user: ",u._id)
                                                                if(t.student===u._id){
                                                                    return(
                                                                        
                                                                        t.Evaluation.QCM.map((qcm,index)=>{
                                                                            return(
                                                                                <Accordion key={t.id} >{/* disabled */}
                                                                                    <AccordionSummary
                                                                                        expandIcon={<ExpandMoreIcon />}
                                                                                        aria-controls="panel1a-content"
                                                                                        id="panel1a-header"
                                                                                        >
                                                                                        <Typography> Question {index+1} </Typography>
                                                                                    </AccordionSummary>
                                                                                    <AccordionDetails>

                                                                                        <Typography>{qcm.Question} </Typography>
                                                                                        <Typography>Response: {qcm.Response} </Typography>

                                                                                        
                                                                                    </AccordionDetails>
                                                                                </Accordion>
                                                                            )
                                                                        })
                                                                        
                                                                        )
                                                                }
                                                            })
                                                        }
                                                    
                                                    </AccordionDetails>
                                                </Accordion>
                                            
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })

                                :

                                <p>No Evalustions Saved: {usersLimitedForTests.length}</p>


                                }


                                <Button sx={{width:"200px"}} onClick={HandleTest} variant="outlined" endIcon={<QuizIcon />}>
                                End Tests &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Button>

                        </div>

                }
        </Box>


    </Modal>

)}


export default Tests