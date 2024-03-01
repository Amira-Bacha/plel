import React , {useState, useEffect, useRef} from 'react'
import styles from "./styles.module.css";
import axios from 'axios'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Zoom from '@mui/material/Zoom';
import imgcard from "../../assets/courseImg.svg"
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const Rooms = ({user}) =>{

    const [Data, setData] = useState([]);
    const reload = useRef()
    const token = localStorage.getItem("token")
    (user)
    const [test,setTest]=useState(false)

    
    // const getNotifTrainer = async() =>{
    //     ("hello from api")
    //     const config = {
    //     headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
    //     "withCredentials": true
    // };
    //     try {
    //             await axios.get("${process.env.REACT_APP_API}/api/Trainer/GetNotifTrainer",config).then((res)=>{
    //                 (res.data.data)
    //                 var list = res.data.data.map(notif=>{
    //                     if(notif.StatusMandate==="confirmed")
    //                     {
    //                         return notif
    //                     }
    //                 })
    //                 list = list.filter(element => {
    //                     return element !== undefined;
    //                   });
    //                 //("list: ",list)

    //                 setData(list)
    //             })
    //         } catch (error) {
    //         if (
    //             error.response &&
    //             error.response.status >= 400 &&
    //             error.response.status <= 500
    //         ) {
    //         }
    //         }

    // }

    const handleRoom = (url)=>{
        window.open(`${process.env.REACT_APP_DOMAIN}/room/${url}`,'_blank');
    }

    useEffect(async ()=>{
        await getRooms()
        //getNotifTrainer()
        //("hello from useEffect")
    },[])

    const getRooms = async() =>{
        ("hello from api")
        const config = {
            headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
        };
        try {
                await axios.post(`${process.env.REACT_APP_API}/api/Room/getRooms`,{},config).then( (res)=>{
                     setData(res.data.data)
                    (res.data.data)

                })
            } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
            }
            }

    }

    // var list =[]

    // const getCourse = async(id) =>{
    //     var course =""


    // }

const [open,setOpen]=useState(false)
    

    const [roomsData, setRoomsData]=useState()


                const RoomsBlocks = Data.map(  d=>{
                        const copy = document.getElementById("copy")
                        if(copy){
                            copy.addEventListener("mouseleave", ()=>{
                                setOpen(false)
                            })
                        }
                        const startDate = new Date(d.course.Date[0][0])
                        const endDate = new Date(d.course.Date[0][1])
                        (startDate)
                        (startDate.getDate())
                        (startDate.getUTCMonth())
                        (endDate)
                        (endDate.getDate())
                        (endDate.getUTCMonth())

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
                                                {d.course.Category}
                                            </p>
                                            <hr  className={styles.RoomDivInfoTextsCategoryHr}/>
                                            
                                            <Typography onClick={()=>window.location=`/Training/${d.course._id}`}
                                                className={styles.RoomDivInfoTextsTitle} noWrap>
                                                {d.course.Title}
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
                                            <div style={{display:"flex" , width: "100%", justifyContent:"flex-start", alignItems:"center"}}>
                                                <AccessTimeIcon/>
                                                <p>
                                                    10:00 &#8594; 12:00 AM/Jr
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{flex:1,display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", width:"100%", height:"90%"}}>
                                        <Button
                                            //disabled={course.state=="confirmed"}
                                            sx={{width:"90%",height:"40px", ml:2}}
                                            onClick={()=>handleRoom(d.urlId)}
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
                                                navigator.clipboard.writeText(`${process.env.REACT_APP_DOMAIN}/room/${d.urlId}`)


                                                }

                                                }>{process.env.REACT_APP_DOMAIN}/room/{d.urlId}</p>
                                            </Tooltip>
                                        </div>
                                    
                                    
                                </div>
                            </div>
                            
                        </React.Fragment>
                    )
                })




    useEffect(()=>{

        setRoomsData(roomsData)
    },[roomsData])





    return(
        <div className={styles.leftSectionProfile}>
            <div ref={reload} className={styles.RoomsDiv}>
                {RoomsBlocks}
            </div>
        </div>
    )
}

export default Rooms;