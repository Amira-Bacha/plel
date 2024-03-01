import React, { useEffect, useState, useRef } from "react";
import { Link, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import imgcard from "../../assets/courseImg.svg"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { stepperClasses } from "@mui/material";
import Loading from '../../Loading'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const Trainings = ({user}) =>{

    const token = localStorage.getItem("token")
    const [isLoading, setLoading] = useState(true);

	const [Data, setData] = useState(user);

    useEffect(()=>{
    },[])
    
    var CartIds=user.TrainingsPaid

    const [cart, setCart] = useState([])
    

    useEffect(()=>{
        handleCardCourses()
    },[])

    var carts = []
    const [ct, setCt]=useState([])

    const handleCardCourses = async () => {
        const config = {
            headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
        };
        try {
        const url = `${process.env.REACT_APP_API}/api/trainings/specificGroupe`;
        await axios.post(url,{cardIds:CartIds}, config)
        .then(async res => {
            setCart(res.data.data)
            await res.data.data.map(async (element) => {
    
                        try {
                            const config = {
                                headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
                                "withCredentials": true
                            };
                        const url = `${process.env.REACT_APP_API}/api/Room/getRoom`;
                        await axios.post(url,{course:element._id}, config)
                        .then( async res => {
                              element.Room = await res.data.data
                              
                        })
                        } catch (error) {
                        if (
                            error.response &&
                            error.response.status >= 400 &&
                            error.response.status <= 500
                        ) {
                        }
                        }
                        if(element.Room){
                            carts.push(element)
                        }
                    
                        setCt(carts)
                        setLoading(false)
                
            })
            
        })
        } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
        }
        }
    };



const handleRoom = (url)=>{
    window.open(`${process.env.REACT_APP_DOMAIN}/room/${url}`,'_blank');
}

const [open,setOpen]=useState(false)


    
    const RoomsBlocks = ct.map(  d=>{
        if(d.state==="confirmed" && d.Room){
                const copy = document.getElementById("copy")
                if(copy){
                    copy.addEventListener("mouseleave", ()=>{
                        setOpen(false)
                    })
                }
                const startDate = new Date(d.Date[0][0])
                const endDate = new Date(d.Date[0][1])

            return (
                <React.Fragment>
                    <div key={d._id} className={styles.RoomDiv}>
                        <div  className={styles.RoomDivConfig}>

                            <div className={styles.RoomDivInfo}>
                                <img 
                                    className={styles.imgCourse}
                                    src={imgcard}
                                />
                                <div className={styles.RoomDivInfoTexts}>
                                    {/* <p><strong>room ID : </strong>{d._id}</p> */}
                                    <p  className={styles.RoomDivInfoTextsCategory}>
                                        {d.Category}
                                    </p>
                                    <hr  className={styles.RoomDivInfoTextsCategoryHr}/>
                                    
                                    <Typography
                                        className={styles.RoomDivInfoTextsTitle} noWrap>
                                        {d.Title}
                                    </Typography>
                                    <hr  className={styles.RoomDivInfoTextsCenterHr}/>
                                    {/* <p><strong>trainer ID : </strong>{user.name}</p> */}
                                </div>
                                <div className={styles.RoomDivInfoTextsVerticalHr}></div>

                                
                                <div className={styles.RoomDivInfoTextsRoomInfo}>
                                    <div style={{display:"flex" , width: "100%", justifyContent:"flex-start", alignItems:"center"}}>
                                        <DateRangeIcon/>
                                        <p>
                                            {startDate.getUTCDate()}/{startDate.getUTCMonth()+1}-{endDate.getUTCDate()}/{endDate.getUTCMonth()+1}/{endDate.getFullYear()}
                                        </p>
                                    </div>
                                    <div style={{display:"flex" , width: "110%", justifyContent:"flex-start", alignItems:"center"}}>
                                        <AccessTimeIcon/>
                                        <p>
                                            10:00 &#8594; 12:00 AM/Day
                                            {/* 10:00 &#8594; 12:00 AM/<sub>Day</sub> */}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={{flex:1,display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", width:"100%", height:"90%"}}>
                                <Button
                                    //disabled={course.state=="confirmed"}
                                    sx={{width:"90%",height:"40px", ml:2}}
                                    onClick={()=>handleRoom(d.Room[0].urlId)}
                                    variant="contained"
                                    endIcon={<SendIcon />}>
                                    Go Room
                                </Button>
                                <Button
                                    //disabled={course.state=="confirmed"}
                                    sx={{width:"90%",height:"40px", ml:2}}
                                    onClick={()=>window.open(`${process.env.REACT_APP_DOMAIN}/training/${d.Room[0].courseId}`,'_blank')}
                                    variant="contained"
                                    endIcon={<HistoryEduIcon />}>
                                    Training
                                </Button>
                            </div>
                        </div>
                        
                        <div className={styles.copyDiv}>
                            <p style={{flex:1, fontSize:"12px", fontWeight:"700"}}>
                                If the button doesn't work, click here to copy link: 
                            </p>

                            
                                <div id="copy" style={{cursor:"pointer",flex:4,margin:"5px",width:"100%", border:"2px solid #000", borderRadius:"15px"}}>
                                    <Tooltip
                                    TransitionComponent={Zoom}
                                    PopperProps={{
                                    disablePortal: true,
                                    }}
                                    open={open}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title="Copied"
                                >
                                        <p
                                        style={{margin:"5px 10px"}}
                                        onClick={() => {
                                        setOpen(true)
                                        navigator.clipboard.writeText(`${process.env.REACT_APP_DOMAIN}/room/${d.Room[0].urlId}`)


                                        }

                                        }>{process.env.REACT_APP_DOMAIN}/room/{d.Room[0].urlId}</p>
                                    </Tooltip>
                                </div>
                            
                            
                        </div>
                    </div>
                    
                </React.Fragment>
            )
        }
    })

 
    useEffect(()=>{
    },[RoomsBlocks])

useEffect(()=>{
},[carts])


    return(
        
            <div className={styles.leftSectionProfile}>
                <div className={styles.RoomsDiv}>
                    
                        {isLoading?

                            <Loading/>
                        :
                            RoomsBlocks
                            
                        }
                                             
                </div>
            </div>
                
    )
}

export default Trainings;