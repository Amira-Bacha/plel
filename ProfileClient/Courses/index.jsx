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

const Courses = ({user}) =>{

    const token = localStorage.getItem("token")
    const [isLoading, setLoading] = useState(true);

	const [Data, setData] = useState(user);

    useEffect(()=>{
    },[])
    
    var CartIds=user.CoursesPaid

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
        const url = `${process.env.REACT_APP_API}/api/courses/specificGroupe`;
        await axios.post(url,{cardIds:CartIds}, config)
        .then(async res => {
            console.log("response: ",res.data.data)
            setCart(res.data.data)
            setLoading(false)
            
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




    return(
        
            <div className={styles.leftSectionProfile}>
                <div className={styles.RoomsDiv}>
                    
                        {isLoading?

                            <Loading/>
                        :
                            
                        cart.map(d=>{
                            return(
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
                                                    
                                                    <Typography onClick={()=>window.location=`/Course/${d._id}`}
                                                        className={styles.RoomDivInfoTextsTitle} noWrap>
                                                        {d.Title}
                                                    </Typography>
                                                    <hr  className={styles.RoomDivInfoTextsCenterHr}/>
                                                    {/* <p><strong>trainer ID : </strong>{user.name}</p> */}
                                                </div>
                                                <div className={styles.RoomDivInfoTextsVerticalHr}></div>

                                                
                                                <div className={styles.RoomDivInfoTextsRoomInfo}>
                                                    <p  className={styles.RoomDivInfoTextsCategory}>
                                                    Level: {d.Level}
                                                    </p>
                                                    <Typography  >
                                                    Type Of Ressources: {d.Videos.length>0? "Videos":""} {d.Videos.length>0&&d.Ressources.length>0? "/":""} {d.Ressources.length>0? "Files":""}
                                                    </Typography>
                                                </div>
                                            </div>

                                            <div style={{flex:1,display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", width:"100%", height:"90%"}}>
                                                <Button
                                                    //disabled={course.state=="confirmed"}
                                                    sx={{width:"90%",height:"40px", ml:2}}
                                                    onClick={()=>window.location=`/Course/${d._id}`}
                                                    variant="contained"
                                                    endIcon={<SendIcon />}>
                                                    Go Course
                                                </Button>
                                                {/* <Button
                                                    //disabled={course.state=="confirmed"}
                                                    sx={{width:"90%",height:"40px", ml:2}}
                                                    onClick={()=>handleRoom(d.Room[0].urlId)}
                                                    variant="contained"
                                                    endIcon={<FolderZipIcon />}>
                                                    Ressources
                                                </Button> */}
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    
                                </React.Fragment>
                            )
                        })
                            
                        }
                                             
                </div>
            </div>
                
    )
}

export default Courses;