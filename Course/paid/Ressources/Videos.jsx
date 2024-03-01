import styles from "./styles.module.css";
import { Link, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Videos = () =>{
    let { id } = useParams();
    const token = localStorage.getItem("token")
	const user = JSON.parse(localStorage.getItem("user"));
    const [Videos, setVideos] = useState([])
    const [Data, setData] = useState({
        _id:"",
		Title: "",
		Trainer: "",
		Description: "",
		Goals: "",
		WhoShouldAttend: "",
		CourseContent: "",
		PracticalWork: "",
		Category: "",
		Price:"",
		Thumbnail: {},
		Videos: [],
    	Level: "",
    	Reference: "",
		Date:[],
        enrolled:[],
        state:"",
        certificate:""
	});

    useEffect(() => {
		handleCourse()
	}, []);



    const handleCourse=()=>{
        const config={
            headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": "https://test.urbatil.com/", "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"},
            params:{id:id},
            "withCredentials": true 
        }
		axios.get(`${process.env.REACT_APP_API}/api/courses/specific`,config)
			.then(res=>{
				setData(res.data.data)
                setVideos(res.data.data.Videos)
                console.log(res.data.data)
			});
	
	}



    useEffect(() => {
		console.log(Data)
	}, [Data]);

    const [VideoDisplay, setVideoDisplay] = useState("")

    const handleDisplay = (vid) =>{
        setVideoDisplay(vid.filePath)
        console.log(vid.filePath)
    }

    const ListVideos = Videos.map((element) => {

        return(
            <div className={styles.DivCourse} >
                <Typography noWrap onClick={()=>{handleDisplay(element)}} className={styles.Course}   >{element.fileName}</Typography>
            </div>
        )})



    
       

    return(

        <div className={styles.body}>
            <div className={styles.DisplayRoom}>
                <nav className={styles.nav}>
                    <Link  to={{pathname : `/` }} >
                        <Button startIcon={<ArrowBackIosIcon />}>
                                Home
                        </Button>
                    </Link>
                    <Link  to={{pathname : `/Profile` }} >
                        <Button endIcon={<ArrowForwardIosIcon />}>
                                Profile
                        </Button>
                    </Link>
                </nav>
                <div className={styles.Params}>
                    <div className={styles.list}>
                            {ListVideos}
                    </div>
                    <div className={styles.video}>
                    {
                        VideoDisplay ? 
                        <video 
                        controls 
                        className={styles.Vid}
                        src={`${process.env.REACT_APP_API}/${VideoDisplay}`} ></video> 
                        :
                        <div className={styles.NoVid}>
                            <p>No video selected</p>
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Videos