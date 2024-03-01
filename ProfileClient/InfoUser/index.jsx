import React, { useEffect, useState, useRef } from "react";
import { Link, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import img from '../../assets/profileImgNoUp.svg'
import imgcard from "../../assets/courseImg.svg"
import { motion } from "framer-motion"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { singleFileUpload } from "../../UploadFunctions/data/api";
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';

import SaveIcon from '@mui/icons-material/Save';


const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

const Input = styled('input')({
    display: 'none',
  });

const InfoUser = (props) =>{
    const [singleFile, setSingleFile] = useState('');
    const [singleProgress, setSingleProgress] = useState(0);

	const [Data, setData] = useState(props.user);
	const [allCourses, setAllCourses] = useState();
	const [allTrainings, setAllTrainings] = useState();

    var lastSeen=[]
    var lastSeenTrainings=[]

    const token = localStorage.getItem("token")

    useEffect(()=>{
        handleSubmit()
    },[])

    const handleSubmit = async () => {
        try {
        const url = `${process.env.REACT_APP_API}/api/courses`;
        await axios.post(url, {headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}}, { "withCredentials": true })
        .then(res => {
            setAllCourses(res.data.data)
        })
        const url2 = `${process.env.REACT_APP_API}/api/trainings`;
        await axios.post(url2, {headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}}, { "withCredentials": true })
        .then(res => {
            setAllTrainings(res.data.data)
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



    const lastSeenIds=Data.lastSeen
        if(allCourses){
            lastSeen = allCourses.filter(course=>lastSeenIds.includes(course._id)&&!lastSeen.includes(course))
            lastSeen = lastSeen.slice(0,5)
        }

        if(allTrainings){
            lastSeenTrainings = allTrainings.filter(course=>lastSeenIds.includes(course._id)&&!lastSeen.includes(course))
            lastSeenTrainings = lastSeenTrainings.slice(0,5)
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
    const [width, setWidth] = useState(0)

    const carousel = useRef()
    useEffect(()=>{
        if(carousel){
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
        }
    },[])


    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
    }


    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData,Data._id);

    window.location.reload(true)
    }

const [changeImage, setChangeImage] = useState(false)
useEffect(()=>{
    uploadSingleFile()
},[,singleFile])

useEffect(()=>{
    const url = `${process.env.REACT_APP_API}/api/userData`;
    const config = {
        headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
        "withCredentials": true
    };
    axios.post(url,{},config)
    .then(response => {

        localStorage.setItem("user", JSON.stringify(response.data.data));
        setData(response.data.data)
    })
},[])

    const ListCoursesLastSeen = lastSeen.map((element) => {
        return(
            <motion.div>
                <Link key={element._id}  to={{pathname : `/Course/${element._id}` }} onClick={()=>{

                    window.scrollTo(0, 0);
                }}>
                    <div key={element._id}  className={styles.Courses}>
                        <div className={styles.display}>
                            <img
                                className={styles.imgCourse}
                                src={imgcard}
                            />
                            <div className={styles.ListCoursesInfoCourse}>
                                <p  className={styles.ListCoursesCardCategory}>
                                    {element.Category}
                                </p>
                                <hr  className={styles.ListCoursesCardCategoryHr}/>

                                <Typography
                                    className={styles.ListCoursesCardTitle} noWrap>
                                    {element.Title}
                                </Typography>
                                <hr  className={styles.ListCoursesCardCenterHr}/>
                                <p  className={styles.ListCoursesCardLevel}>
                                    {/* Level: <span>Hard</span> */}
                                    Level: <span>{element.Level}</span>
                                </p>

                            </div>
                        </div>
                        <div className={styles.ListCoursesFooter}>
                            <div className={styles.ListCoursesCardRating}>
                                {TextRating2(element.rating, element.evaluate.length)}
                                {/* {TextRating2(element.note,element.avis)} */}
                            </div>
                                {/* <p className={styles.priceFooter}>1600 TTC</p> */}
                            <p className={styles.priceFooter}>{element.Price} TTC</p>
                        </div>

                    </div>
                </Link>
            </motion.div>
        )
      })




    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

      const [edit, setEdit] = useState(false)
      const [loading, setLoading] = useState(false)

      const handleEdit = async (e) =>{
          setLoading(true)
          e.preventDefault();
          const config = {
              headers: {authorization: `Bearer ${localStorage.getItem("token")}`,'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
              "withCredentials": true 
          };
          try {
              const url = `${process.env.REACT_APP_API}/api/Candidat/updateCandidat`;
              axios.post(url, Data, config)
              .then(async res=>{
                  const config = {
                      headers: {authorization: `Bearer ${localStorage.getItem("token")}`,'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                      "withCredentials": true 
                  };
                  const url = `${process.env.REACT_APP_API}/api/userData`;
                  axios.post(url,{},config)
                  .then(response => {
                      localStorage.removeItem("user")
                      localStorage.setItem("user", JSON.stringify(response.data.data));
                      setLoading(false)
                      setEdit(false)
                                          
                  })
          // 		window.scrollTo(0, 0)
          // 		setSaved(true);
          // 		await new Promise(r => {
          // 			setTimeout(r, 20000)
          //		});
          // 		setSaved(false);
                  
              })
              .catch(err=>{
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

      const ListCoursesLastSeenTrainings = lastSeenTrainings.map((element) => {
        return(
            <motion.div>
                <Link key={element._id}  to={{pathname : `/Course/${element._id}` }} onClick={()=>{

                    window.scrollTo(0, 0);
                }}>
                    <div key={element._id}  className={styles.Courses}>
                        <div className={styles.display}>
                            <img
                                className={styles.imgCourse}
                                src={imgcard}
                            />
                            <div className={styles.ListCoursesInfoCourse}>
                                <p  className={styles.ListCoursesCardCategory}>
                                    {element.Category}
                                </p>
                                <hr  className={styles.ListCoursesCardCategoryHr}/>

                                <Typography
                                    className={styles.ListCoursesCardTitle} noWrap>
                                    {element.Title}
                                </Typography>
                                <hr  className={styles.ListCoursesCardCenterHr}/>
                                <p  className={styles.ListCoursesCardLevel}>
                                    {/* Level: <span>Hard</span> */}
                                    Level: <span>{element.Level}</span>
                                </p>

                            </div>
                        </div>
                        <div className={styles.ListCoursesFooter}>
                            <div className={styles.ListCoursesCardRating}>
                                {TextRating2(element.rating, element.evaluate.length)}

                                {/* {TextRating2(element.note,element.avis)} */}
                            </div>
                                {/* <p className={styles.priceFooter}>1600 TTC</p> */}
                            <p className={styles.priceFooter}>{element.Price} TTC</p>
                        </div>

                    </div>
                </Link>
            </motion.div>
        )
      })
    return(
        <div className={styles.leftSectionProfile}>
            <div className={styles.FirsSectionInfoProfile}>

                <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <SmallAvatar alt="icon"  sx={{ boxShadow:"0 0 4px 2px rgba(0,0,0,0.26),-1px -1px 4px 2px rgba(255,255,255,0.26) ", backgroundColor:"white", width: 50, height: 50 }}  >
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => SingleFileChange(e)} />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera sx={{ width: 35, height: 35 }} />
                                    </IconButton>
                                </label>
                            </SmallAvatar>
                        }
                        >

                {
                    Data.image ?

                        <Avatar alt="icon" src={`${process.env.REACT_APP_API}/${Data.image.filePath}`} sx={{ width: 200, height: 200 }} />

                    :

                        <Avatar alt="icon" src={img} sx={{ width: 200, height: 200 }} />

                }


                </Badge>
                <div className={styles.FirsSectionInfoProfileName}>
                    <h1>{Data.name} </h1>

                </div>
            </div>
            <div className={styles.ScndSectionInfoProfile}>
                <div className={styles.ScndSectionInfoProfileContainer}>
                {
                    edit?
                    <React.Fragment>
                        <form onSubmit={handleEdit} className={styles.InfosSuctionForm} action="">
                            <div className={styles.InfosSuction}>
                                <FormControl className={styles.FormControl} sx={{m:1, ml: 6, minWidth: "80%" }}>
									<Box
										component="form"
										sx={{
											'& > :not(style)': {  width: '100%' },
										}}
										noValidate
										autoComplete="off"
									>
										<TextField 
											multiline
											name="name"
											id="outlined-basic" 
											label="name" 
											value={Data.name} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
                                <FormControl className={styles.FormControl} sx={{ m: 1, ml: 6, minWidth: "80%" }}>
									<Box
										component="form"
										sx={{
											'& > :not(style)': {  width: '100%' },
										}}
										noValidate
										autoComplete="off"
									>
										<TextField 
											multiline
											name="phone"
											id="outlined-basic" 
											label="phone" 
											value={Data.phone} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
                                <FormControl className={styles.FormControl} sx={{ m: 1,ml: 6, minWidth: "80%" }}>
									<Box
										component="form"
										sx={{
											'& > :not(style)': {  width: '100%' },
										}}
										noValidate
										autoComplete="off"
									>
										<TextField 
											multiline
											name="email"
											id="outlined-basic" 
											label="email" 
											value={Data.email} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
                                <FormControl className={styles.FormControl} sx={{ m: 1,ml: 6, minWidth: "80%" }}>

									<Box sx={{ '& > button': { ml:1 } }}>
										<LoadingButton
											color="secondary"
											type="submit"
											loading={loading}
											loadingPosition="start"
											startIcon={<SaveIcon />}
											variant="contained"

										>
											Save
										</LoadingButton>
									</Box>

								</FormControl>
							</div>
                        </form>
                    </React.Fragment>

                    :

                    <React.Fragment>
                        <div className={styles.editIconDiv}>
                            <EditIcon onClick={()=>{setEdit(true)}} className={styles.editIcon}/>
                        </div>
                        <p>phone: <span>{Data.phone}</span></p>
                        <p>E-mail: <span>{Data.email}</span></p>
                    </React.Fragment>

                }
                </div>
            </div>

            <div style={Data.lastSeen.length>0 ? {}:{opacity:0} } className={styles.thrdSectionInfoProfile}>

                <div className={styles.thrdSectionInfoProfileContainer}>
                    <h2 className={styles.thrdSectionInfoProfileContainerH2}>Last Seen Courses</h2>
                    <div className={styles.carouselDiv}>
                        <motion.div ref={carousel} className={styles.carousel} whileTap={{cursor: "grabbing"}}>
                            <motion.div drag="x" dragConstraints={{right:0, left:-width}} className={styles.inner_carousel}>
                            {ListCoursesLastSeen}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

            </div>

            <div style={Data.lastSeen.length>0 ? {}:{opacity:0} } className={styles.thrdSectionInfoProfile}>

                <div className={styles.thrdSectionInfoProfileContainer}>
                    <h2 className={styles.thrdSectionInfoProfileContainerH2}>Last Seen Trainings</h2>
                    <div className={styles.carouselDiv}>
                        <motion.div ref={carousel} className={styles.carousel} whileTap={{cursor: "grabbing"}}>
                            <motion.div drag="x" dragConstraints={{right:0, left:-width}} className={styles.inner_carousel}>
                            {ListCoursesLastSeenTrainings}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoUser;