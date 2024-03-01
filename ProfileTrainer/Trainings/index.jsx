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
import Loading from "../../Loading"
import { Link, useParams} from "react-router-dom";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';

const Trainings = ({user}) =>{

    const idsTrainings = user.Trainings
    const [Data, setData]=useState([])
    const [loadingTraining, setLoadingTraining] = useState(true)
    const token = localStorage.getItem("token")
    useEffect(()=>{
        handleTrainings()
    },[])

    const handleTrainings= async ()=>{
        const config={
            headers: {authorization: `Bearer ${token}`,'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
            "withCredentials": true 
        }
        const url = `${process.env.REACT_APP_API}/api/trainings/specificGroupe`
        await axios.post(url,{cardIds:idsTrainings}, config)
        .then(res=>{
            setData(res.data.data)
            setLoadingTraining(false)
        })
    }
    

    

    const handleTraining = async (id) =>{
        window.location = `/training/${id}`
    }

    const TextRating2 = (value,avis) => {
        return (
            <Box
            sx={{
                width: 80,
                display: 'flex',
                alignItems: 'center',
                ml: 1,
            }}
            >
            <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box  ><p className={styles.MuiBox}>({avis} avis)</p></Box>
            </Box>
        );
    }

    const ListTrainingsCart = Data.map((element) => {
        console.log(element)
        var styleField = styles.styleField
        var CourseState =""
        if(element.state==="confirmed"){
            styleField = styles.statePrimary
            CourseState='confirmed'
        } else if(element.state==="processing"){
            styleField = styles.stateSecondary
            CourseState = "processing"
        }else if(element.state==="expired"){
            styleField = styles.stateDanger
            CourseState="expired"
        }
        return(
           
            <div key={element._id}  className={styles.Courses}>
            <div className={styles.display}>
                <img 
                    className={styles.imgCourse}
                    src={imgcard}
                />
                <div className={styles.ListCoursesInfoCourse}>
                    
                    <Typography
                        className={styles.ListCoursesCardCategory} noWrap>
                        {element.Category}
                    </Typography>
                        
                    <hr  className={styles.ListCoursesCardCategoryHr}/>
                    <Link key={element._id}  to={{pathname : `/Training/${element._id}` }} onClick={()=>{
        
                        window.scrollTo(0, 0);
                    }}>
                        <Typography
                            className={styles.ListCoursesCardTitle} noWrap>
                            {element.Title}
                        </Typography>
                    </Link>
                    <hr  className={styles.ListCoursesCardCenterHr}/>
                    <p  className={styles.ListCoursesCardLevel}>
                        {/* Level: <span>Hard</span> */}
                        <Typography noWrap>Level: <span>{element.Level}</span></Typography>
                    </p>
                    
                </div>
                <div className={styles.stateFieldDiv}>
                    <div className={styleField}>
                                        <FiberManualRecordIcon sx={{ fontSize: 10 }}/>
                                        <p>{CourseState}</p>
                                    </div>
                                    {CourseState==="confirmed"? 
                                            <React.Fragment>
                                                
                                                <Button sx={{}} onClick={()=>{handleTraining(element._id)}} variant="contained" >Training</Button>
                                             
                                            </React.Fragment>
                                            :""
                                            
                                    }
                    </div>
                </div>
                <div className={styles.ListCoursesFooter}>
                    <div className={styles.ListCoursesCardRating}>
                    {TextRating2(element.rating,element.evaluate.length)}
                        {/* {TextRating2(element.note,element.avis)} */}
                    </div>
                        {/* <p className={styles.priceFooter}>1600 $ HT</p> */}
                    <p className={styles.priceFooter}>{element.Price} TTC</p>
                </div>
            
        </div>
        )
      })


    return(
        <div className={styles.leftSectionProfile}>
            
            <div className={styles.CartDiv}>
                <h2 className={styles.CartDivH2}>Trainings Confirmed</h2>
                <div className={styles.carouselDiv}>
                    {loadingTraining?
                        <Loading/>
                     :
                        ListTrainingsCart
                    }
                </div>
            </div>
                
        </div>
    )
}

export default Trainings;