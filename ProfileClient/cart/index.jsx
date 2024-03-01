import React, { useEffect, useState, useRef } from "react";
import { Link, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import img from '../../assets/profileImgNoUp.svg'
import imgcard from "../../assets/courseImg.svg"
import { motion } from "framer-motion"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Loading from "../../Loading"

const Cart = ({user}) =>{

    const token = localStorage.getItem("token")

	const [Data, setData] = useState(user);
    const [loadingTraining, setLoadingTraining] = useState(true)
    const [loadingCourses, setLoadingCourses] = useState(true)

    useEffect(()=>{
    },[])
    
    var CartIds=[...new Set(user.cartCourses)]
    var CartTrainingsIds=[...new Set(user.cartTrainings)]

    // var uniquecartCourses = user.cartCourses.filter((value, index) => {
    //     const _value = JSON.stringify(value);
    //     return index === user.cartCourses.findIndex(obj => {
    //       return JSON.stringify(obj) === _value;
    //     });
    //   });

      
        // for(var i in CartCoursesIds){
        //     var count =0
        //     const uniquecartCourses = user.cartCourses.filter(course=>{
        //         if(i.equals(course.course)){
        //             if(count===0 && course.state==="paid"){
        //                 count = count+1
        //                 return course
        //             }
        //         }
        //     })
        // }

    var uniqueCartCoursesIds = CartIds.filter((item, index) => CartIds.indexOf(item) === index);


    const [cart, setCart] = useState([])
    const [cartCourses, setCartCourses] = useState([])
    

    useEffect(()=>{
        handleCardCourses()
    },[])
        
    const handleCardCourses = async () => {
        const config = {
            headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
        };
        try {
        const url = `${process.env.REACT_APP_API}/api/trainings/specificGroupe`;
        await axios.post(url,{cardIds:CartTrainingsIds}, config)
        .then(res => {
            setCart(res.data.data)
            setLoadingTraining(false)
        })
        const urlCourses = `${process.env.REACT_APP_API}/api/courses/specificGroupe`;
        await axios.post(urlCourses,{cardIds:uniqueCartCoursesIds}, config)
        .then(res => {
            setCartCourses(res.data.data)
            setLoadingCourses(false)

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

    // const handleBuy = async (courseId) =>{
    //     const config = {
    //         headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
    //         "withCredentials": true
    //     };
    //     try {
    //         const url = `${process.env.REACT_APP_API}/api/Candidat/buyInCart`
    //         await axios.post(url, {courseId: courseId}, config )
    //         .then(res=>{
    //             window.location.reload(true)

    //         })
            
    //     }catch(error){
    //     }
    // }





    const handleBuySTRIPE = async (courseId) =>{
        const config = {
            headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
        };
        try {
            const url = `${process.env.REACT_APP_API}/api/payment/course`
            await axios.post(url, {courseId: courseId}, config )
            .then(res=>{
                
                window.location = res.data.url  
            })
        }catch(error){
            // console.error(error)
        }
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

    const handleCourse = (id) =>{
        window.location = `/course/${id}`
    }

    const handleTraining = (id) =>{
        window.location = `/training/${id}`
    }



    const ListTrainingsCart = cart.map((element) => {
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
                                                {element.enrolledPaid.includes(user._id)?
                                                    <Button sx={{}} onClick={()=>{handleTraining(element._id)}} variant="contained" >Training</Button>
                                                :
                                                    <Button sx={{}} onClick={()=>{handleBuySTRIPE(element._id)}} variant="contained" >Pay fees</Button>
                                            }
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

      const ListCoursesCart = cartCourses.map((element) => {
        
        return(
            
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
                                <Link key={element._id}  to={{pathname : `/Course/${element._id}` }} onClick={()=>{
                    
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
                            {
                                        
                                        CartIds.map(course=>{
                                            if(course===element._id){
                                                if(!user.CoursesPaid.includes(element._id)){
                                                    return (    
                                                        <React.Fragment>

                                                            <div className={styles.stateDanger}>
                                                                <FiberManualRecordIcon sx={{ fontSize: 10 }}/>
                                                                <p>Unpaid</p>
                                                            </div>
                                                            <Button onClick={()=>{handleBuySTRIPE(element._id)}} variant="contained" >Pay Now</Button>
                                                        </React.Fragment>
                                                        )
                                                }else{
                                                    return (
                                                        <React.Fragment>


                                                            <div className={styles.statePrimary}>
                                                                <FiberManualRecordIcon sx={{ fontSize: 10 }}/>
                                                                <p>Paid</p>
                                                            </div>
                                                            <Button onClick={()=>{handleCourse(element._id)}} variant="contained" >Go Course</Button>
                                                        </React.Fragment>
                                                        )}
                                                    }   
                                        })


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
                <h2 className={styles.CartDivH2}>Cart Trainings</h2>
                <div className={styles.carouselDiv}>
                    {loadingTraining?
                        <Loading/>
                     :
                        ListTrainingsCart
                    }
                </div>
            </div>

            <div className={styles.CartDiv}>
                <h2 className={styles.CartDivH2}>Cart Courses</h2>
                <div className={styles.carouselDiv}>
                    {loadingCourses?
                        <Loading/>
                     :
                        ListCoursesCart
                    }
                </div>
            </div>
                
        </div>
    )
}

export default Cart;