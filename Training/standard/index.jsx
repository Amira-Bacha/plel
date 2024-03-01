import styles from "./styles.module.css";
import { Link,
	useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import img from '../../assets/courseImg.png'
import {SiFacebook,SiTwitter,SiLinkedin} from 'react-icons/si';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import  {FaOpencart} from 'react-icons/fa' 
import  {BiCustomize} from 'react-icons/bi' 
import  {BsArrowDownRightCircleFill} from 'react-icons/bs' 
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {GrValidate} from 'react-icons/gr'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import { margin } from "@mui/system";
import Tooltip from '@mui/material/Tooltip';
import Footer from "../../footer"
import SliderNav from '../../slider'
import imgUK from "../../assets/UK.svg"
import Loading from '../../Loading'
import Avatar from '@mui/material/Avatar';
import imgLogo from '../../assets/logo.jpg'
import Nav from "../../Nav"


const StandardTraining = (props) =>{

    const [user,SetUser]=useState()
    const [isLoading, setLoading] = useState(true);
    const [Evaluations, setEvaluations] = useState([])
    const [EvaluationsCompleated, setEvaluationsCompleated] = useState([])
    const [usersLimited, setUsersLimited] = useState([])
    let { id } = useParams();
    const token = localStorage.getItem("token")

    useEffect(()=>{
        if(token){
            const config = {
                headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
                "withCredentials": true
            };
            const url2 = `${process.env.REACT_APP_API}/api/userData`;
            try{
                axios.post(url2,{},config)
                .then(response => {
                    
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                    SetUser(response.data.data)
                    console.log(response.data.data.cartCourses)
                    console.log(id)
                    if(response.data.data.cartCourses.includes(id)){
                        console.log('includes')
                        setEnrollementButtonState(false)
                    }
                    setLoading(false)
                    
                })
                }catch (err) {
                        console.log(err)
                    }
        }else{
            setLoading(false)
        }
    },[])


	const [error, setError] = useState("");
	
	const [Data, setData] = useState({
        _id:"",
		Title: "",
		Trainer: "",
		Description: "",
		Goals: "",
		WhoShouldAttend: "",
		TrainingContent: "",
		PracticalWork: "",
		Category: "",
		Price:"",
		Thumbnail: "",
    	Level: "",
    	Reference: "",
		Date:[],
        enrolled:[],
        enrolledPaid:[],
        state:"",
        certificate:"",
        evaluate: [],
        rating: 0,

	});
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

      useEffect(()=>{
        setCustomizeNotif({...CustomizeNotif, user:user})
      },[user])

      const initialNotif = {
        user: user,
        training: Data,
        date: [null, null],
        time: new Date(''),
        duration : "",
        message: "",
        NotifType:"Customization"
    }

    const [openCustom, setOpenCustom] = React.useState(false);
    const handleOpenCustom = () => {
        if(token){
            setOpenCustom(true);
        }else {
            window.location="/login"
        }
    };
    const handleCloseCustom = () => {
        setOpenCustom(false);
        setSelectedOptions([])
        setCustomizeNotif(initialNotif)
    };

    
    const Custom = ['Horaire','Date','format','durée de la formation', 'Autre...' ]

    const [selectedOptions, setSelectedOptions]=useState([])

    useEffect(() => {
	}, [selectedOptions]);


    const handleChangeSelected = (e, newValue) =>{
            setSelectedOptions([newValue])
    }


	const [mobile, setMobile] = useState(false);

	
    // const [dateCust, setDateCust] = useState([null, null]);
	
    // const [Time, setTime] = useState(new Date(''));

    // const [durée, setDurée] = useState();

    // const [message, setMessage] = useState();

    const  [CustomizeNotif ,setCustomizeNotif ]=useState({
        user: user,
        course: Data,
        date: [null, null],
        time: new Date(''),
        duration : "",
        message: "",
        NotifType:"Customization"
    })

    const handleSend = async (e) => {
        e.preventDefault();
        const config = {
			headers: {authorization: `Bearer ${localStorage.getItem("token")}`,'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
			"withCredentials": true 
		};
        const url=`${process.env.REACT_APP_API}/api/notifications/saveNotifications`
        axios.post(url,CustomizeNotif, config)
        .then(res=>{
            handleCloseCustom()
            
        })
		
    }

    const handleChangeCustom = (e) => {
        console.log(e)
		setCustomizeNotif({ ...CustomizeNotif, [e.target.name]: e.target.value });

	};

    useEffect(() => {
		console.log(CustomizeNotif)
        
	}, [CustomizeNotif]);

   




    const [date, setDate] = React.useState('date1');


    const handleChange = (event) => {
        setDate(event.target.value);
    };
/*///////////////////////////////////*/
	
	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
		window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// useEffect(()=>{
	// 	if(scrollPosition>=300){
	// 		window.document.getElementsByClassName(styles.scndInfos)[0].style.marginTop=-320 + "px"
	// 	}else{
	// 		window.document.getElementsByClassName(styles.scndInfos)[0].style.marginTop=0 + "px"
	// 	}
	// },[scrollPosition])
/*///////////////////////////////////*/

const GetUsers=(ids)=>{
    const config={
        headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
        "withCredentials": true 
    }
    axios.post(`${process.env.REACT_APP_API}/api/Candidat/returnCandidatForRatingInfo`, {ids:ids},config)
        .then(res=>{
            setUsersLimited(res.data.usersLimited)
            console.log(res.data.usersLimited)
        });

}


useEffect(async ()=>{
    const ids = Evaluations.map(e=>{
        return e.id
    })
    GetUsers(ids)
},[Evaluations])


useEffect(async ()=>{
    var list =[]
    Evaluations.map(e=>{
        usersLimited.map(u=>{
                if(u._id===e.id){
                    list.push({
                        id:e.id,
                        message:e.message,
                        rate:e.rate,
                        name:u.userName,
                        image: u.image
                    })
                }
            }
        )
    })
    setEvaluationsCompleated(list)
},[usersLimited])




/*********************************************** */
	useEffect(() => {
        handleCourse()
		if(token){
            setCustomizeNotif({...CustomizeNotif, course:Data})
            console.log(user)
        }
	}, []);

	const handleCourse=()=>{
		axios.get(`${process.env.REACT_APP_API}/api/trainings/specific`, {params:{id:id},headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}}, { "withCredentials": true })
			.then(res=>{
				setData(res.data.data)
                setEvaluations(res.data.data.evaluate)
				console.log(Data)
                
			});
	
	}

    const TimeperDay = new Date(Data.TimePerDay)
    const time = `${TimeperDay.getHours()<10 ? "0"+TimeperDay.getHours(): TimeperDay.getHours()}:${TimeperDay.getMinutes()<10 ? "0"+TimeperDay.getMinutes() : TimeperDay.getMinutes()}`
console.log("time: ",time)
    const datesDisplay = Data.Date.map(date=>{
        // console.log("date: ",date)
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const dateFormated1 = new Date(date[0])
        // console.log("date1: ",dateFormated1.getDate())
        const dateFormated2 = new Date(date[1])
        // console.log("date2: ",dateFormated2.getMonth())
        return (
            <p className={styles.radioLable}> {`from ${months[dateFormated1.getMonth()]},${dateFormated1.getDate()} ${dateFormated1.getFullYear()} to ${months[dateFormated2.getMonth()]},${dateFormated2.getDate()} ${dateFormated2.getFullYear()}`}</p>
        )
    })


	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
        window.location = "/login"
	};

    const [enrollementButtonState,setEnrollementButtonState] = useState(true)

    // useEffect(()=>{
    //     if(!enrollementButtonState){
    //         handleDisabled()
    //     }
    // },[enrollementButtonState])

    useEffect(()=>{
        if(user){
            if(user.cartCourses){
                if(user.cartCourses.includes(Data._id)){
                    setEnrollementButtonState(false)
                }
            }
        }
    },[Data])

    

	
	const TextRating = (value,avis) => {
        return (
            <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
            >
            <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>({avis} avis)</Box>
            </Box>
        );
        }
        const [Enrolled, setEnrolled] =useState(false)


        useEffect(()=>{
            if(Enrolled){

            }
        },[Enrolled])


        const handleCloseEnrolled = ()=>{
            setEnrolled(false)


        }
        //var list = []
        const handleOpenEnrolled = ()=>{
            setData({...Data, enrolled:[...Data.enrolled, user._id]})
            setEnrolled(true)
        }

       

        useEffect(()=>{
            handleLastSeen()
        },[])

        const handleLastSeen = async () => {
            const config = {
            headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
        };
            try {
            const url = `${process.env.REACT_APP_API}/api/Candidat/lastSeenTraining`;
            console.log(url)
            axios.post(url,{lastSeen: id},config)
            .then(async res => {
                //console.log(res)
                
            
            })
            } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                // setError(error.response.data.message);
            }
            }
        };

        const handleCart = async () => {
            const config = {
                headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
                "withCredentials": true
            };
            try {
            const url = `${process.env.REACT_APP_API}/api/Candidat/cart`;
            console.log("enrolled request: ",Data.enrolled)
            axios.post(url,{ type:"training", enrolled: user._id, courseId: Data._id},config)
            .then(async res => {
                //console.log(res)
                window.location.reload(true)

                 
            })
            } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                // setError(error.response.data.message);
            }
            }
        };

        // useEffect(()=>{
            
        // },[Data])
        

        const handleEnroll = async() =>{
            if(token){
                handleOpenEnrolled()

            }else {
                window.location="/login"
            }
        }

        const [tool, setTool] = useState(false);
        const toolClose = () => {
            setTool(false);
          };
        
          const toolOpen = () => {
            setTool(true);
          };
/************///////////////////////// */
const [WindowWidth, setWindowWidth] = useState(0);
const handleWidthChange = () => {
    const currentWidth = window.innerWidth;
    setWindowWidth(currentWidth);
    
};

useEffect(() => {
    handleWidthChange()
    window.addEventListener('resize', handleWidthChange);
    return () => {
    window.removeEventListener('resize', handleWidthChange);
    };
}, []);
const [mobileView, setMobileView]=useState(false)
useEffect(()=>{
    //console.log(WindowWidth)
        if(WindowWidth<=756){
            setMobileView(true)
        }else{
            setMobileView(false)
        }
    
},[])
useEffect(()=>{
    console.log(WindowWidth)
        if(WindowWidth<=756){
            setMobileView(true)
        }else{
            setMobileView(false)
        }
    
},[WindowWidth])

    if(isLoading){
        return (
            <Loading/>
        )
    }
    return(
		<React.Fragment>
			                <Nav/>

			<main className={styles.MotherDivCourse}>
				<div className={styles.MainDivCourse}>
					<div className={styles.leftSectionCourse}>
						<div className={styles.FirsSectionInfoCourse}>
                            {
                                Data.Thumbnail==="qqq" ? 
                                    <img src={`${process.env.REACT_APP_API}/uploads/courseImg.png`} alt="" className={styles.imgCourse} />
                                :
                                    <img src={`${process.env.REACT_APP_API}/${Data.Thumbnail.filePath}`} alt=""  className={styles.imgCourse}  />
                            }

							<div className={styles.FirsSectionInfoCourseTitle}>
								<h1>{Data.Title}</h1>
								{Data.rating?TextRating(Data.rating,Data.evaluate.length):TextRating(0,0)}

							</div>
						</div>
                        <div className={styles.ScndSectionInfoCourse}>
                            <div  className={styles.DescriptionInfoCourse}>
                                <div className={styles.DescriptionInfoCourseTitle}>
                                    <BsArrowDownRightCircleFill color="#1C4B82" size={30}/>
                                    <h1>Description</h1>
                                </div>
                                <div className={styles.DescriptionInfoCourseText}>
                                <p>
                                    {Data.Description}
                                </p>
                                </div>
                            </div>
                            <div  className={styles.DescriptionInfoCourse}>
                                <div className={styles.DescriptionInfoCourseTitle}>
                                    <BsArrowDownRightCircleFill color="#1C4B82" size={30}/>
                                    <h1>Goals</h1>
                                </div>
                                <div className={styles.DescriptionInfoCourseText}>
                                <p>
                                    {Data.Goals}
                                </p>
                                </div>
                            </div>
                            <div  className={styles.DescriptionInfoCourse}>
                                <div className={styles.DescriptionInfoCourseTitle}>
                                    <BsArrowDownRightCircleFill color="#1C4B82" size={30}/>
                                    <h1>Who Should Attend</h1>
                                </div>
                                <div className={styles.DescriptionInfoCourseText}>
                                <p>
                                    {Data.WhoShouldAttend}
                                </p>
                                </div>
                            </div>
                            <div  className={styles.DescriptionInfoCourse}>
                                <div className={styles.DescriptionInfoCourseTitle}>
                                    <BsArrowDownRightCircleFill color="#1C4B82" size={30}/>
                                    <h1>Course Content</h1>
                                </div>
                                <div className={styles.DescriptionInfoCourseText}>
                                <p>
                                    {Data.CourseContent}
                                </p>
                                </div>
                            </div>
                            <div  className={styles.DescriptionInfoCourse}>
                                <div className={styles.DescriptionInfoCourseTitle}>
                                    <BsArrowDownRightCircleFill color="#1C4B82" size={30}/>
                                    <h1>PracticalWork</h1>
                                </div>
                                <div className={styles.DescriptionInfoCourseText}>
                                <p>
                                    {Data.PracticalWork}
                                </p>
                                </div>
                            </div>
                            <div  className={styles.DescriptionInfoCourse}>
                                <div className={styles.DescriptionInfoCourseTitle}>
                                    <BsArrowDownRightCircleFill color="#1C4B82" size={30}/>
                                    <h1>Certificate</h1>
                                </div>
                                <div className={styles.DescriptionInfoCourseText}>
                                <p>
                                    {Data.certificate}
                                </p>
                                </div>
                            </div>
                            {
                                Data.evaluate.length>0 ?
                                    <div  className={styles.OpinionsCourse}>
                                        <div className={styles.OpinionsCourseTitle}>
                                            <BsArrowDownRightCircleFill color="#1C4B82" size={30}/>
                                            <h1>Users Opinion</h1>
                                        </div>
                                        {EvaluationsCompleated.map(e=>{
                                           return( 
                                          <React.Fragment>
                                               <div className={styles.opinion}>
                                                    <div className={styles.opinionHeader}>
                                                    {
                                                        token?
                                                            <React.Fragment>
                                                                {e.image ?
                                                                <Avatar
                                                                alt="Remy Sharp"
                                                                src={`${process.env.REACT_APP_API}/${e.image.filePath}`}
                                                                sx={{ width: 24, height: 24 }}/>
                                                                :
                                                                <Avatar
                                                                alt="Remy Sharp"
                                                                src={`${process.env.REACT_APP_API}/uploads/2022-03-25T09-59-55.836Z-avatar.png`}
                                                                sx={{ width: 24, height: 24 }}/>}
                                                            </React.Fragment>
                                                        :
                                                            <React.Fragment>
                                                                <Avatar
                                                                alt="Remy Sharp"
                                                                src={`${process.env.REACT_APP_API}/uploads/2022-03-25T09-59-55.836Z-avatar.png`}
                                                                sx={{ width: 24, height: 24 }}/>
                                                            </React.Fragment>
                                                        }
                                                        <h5>{e.name}</h5>
                                                    </div>
                                                    <div className={styles.opinionBody}>
                                                        <p>{e.message}</p> 
                                                        <Rating name="read-only" value={e.rate} readOnly precision={0.5} />
                                                    </div>
                                                    
                                                </div>
                                                <hr className={styles.opinionHr} />
                                          </React.Fragment>
                                        )})}
                                    </div>
                                :""
                            }
                        </div>
					</div>
					<div className={styles.rightSectionCourse}>
						<div className={styles.scndInfos} >
                            <div  className={styles.InfosRefDur}>
                                <p>Reference: <span>{Data.Reference}</span></p>
                                <p>Duration: <span> 2 hours/Day</span></p>
                                <p>Time: <span> {time}</span></p>
                            </div>
                            
                            <div className={styles.InfosDates}>
                                <h1 className={styles.radioTitle} id="demo-controlled-radio-buttons-group">Date :</h1>
                                {Data.state!=="expired"?
                                    <p>{datesDisplay}</p> 
                                :
                                    <p>session concluded</p>
                                }
                                    
                            </div>
                            <div className={styles.CoursePriceInfoPage}>
                                <p>{Data.Price} TTC</p>
                            </div>
                            <div className={styles.CourseButtonsInfoPage}>
                                {user?
                                    <React.Fragment>
                                        {Data.state!=="expired"?

                                            <React.Fragment>
                                                {!user.cartTrainings.includes(Data._id) ?
                                                    <button  onClick={handleEnroll} id={styles.CourseButtonsInfoPageB1}>
                                                        <p>Add To Cart</p>
                                                        <FaOpencart size={20} /> 
                                                    </button>
                                                    :

                                                    <Tooltip  title="You don't have permission to do this" followCursor>
                                                        <button disabled={true}   id={styles.CourseButtonsInfoPageB1Mod}>{/*onClick={handleDisabled} */}
                                                            <p>Add To Cart</p>
                                                            <FaOpencart size={20} /> 
                                                        </button>
                                                    </Tooltip>
                                                }
                                            </React.Fragment>

                                            :

                                            <button disabled={true}   id={styles.CourseButtonsInfoPageB1Mod}>{/*onClick={handleDisabled} */}
                                                <p>Add To Cart</p>
                                                <FaOpencart size={20} /> 
                                            </button>

                                        }
                                    </React.Fragment>
                                    
                                :

                                    <React.Fragment>
                                        {Data.state!=="expired"?

                                                    <button  onClick={handleEnroll} id={styles.CourseButtonsInfoPageB1}>
                                                        <p>Add To Cart</p>
                                                        <FaOpencart size={20} /> 
                                                    </button>
                                            

                                            :

                                            <button disabled={true}   id={styles.CourseButtonsInfoPageB1Mod}>{/*onClick={handleDisabled} */}
                                                <p>Add To Cart</p>
                                                <FaOpencart size={20} /> 
                                            </button>

                                        }
                                    </React.Fragment>
                                    
                            }
                                
                                <Modal
                                sx={{p:1}}
                                open={Enrolled}
                                onClose={handleCloseEnrolled}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                >

                                    <Box  sx={{ ...style, width: 450, display:'flex'
                                        ,flexDirection: 'column', overflowY:'auto', overflowX:'hidden', maxHeight:'85vh',alignItems:'center' }}>
                                           
                                        <div className={styles.ModalComponent}>
                                        <h3 id="parent-modal-title" className={styles.ModalTitle}>Course added to the cart successfully</h3>
                                            <p sx={{ textAlign:'center' }} id="parent-modal-description">
                                            Your registration request for this course is being processed. </p>
                                            
                                            <Divider variant="inset" sx={{  width: '100%', height:'3px', margin:0 }}  />

                                            <p sx={{ textAlign:'center' }} id="parent-modal-description">
                                                you can track your registration status through your profile,   
                                                <a href="/profile" > quick access to profile </a>
                                            </p>
                                        </div>
                                        <br />
                                        <Button onClick={handleCart} variant="contained">
                                            Enroll Now
                                        </Button>
                                    </Box>


                                </Modal>
                                {user?
                                    <React.Fragment>
                                        {Data.state!=="expired"?

                                            <React.Fragment>
                                                {!user.cartTrainings.includes(Data._id) ?
                                                    <button  onClick={handleOpenCustom} id={styles.CourseButtonsInfoPageB2}>
                                                        <p>Customize</p>
                                                        <BiCustomize size={20} /> 
                                                    </button>
                                                    :

                                                    <Tooltip  title="You don't have permission to do this" followCursor>
                                                        <button disabled={true}   id={styles.CourseButtonsInfoPageB2Mod}>{/*onClick={handleDisabled} */}
                                                            <p>Customize</p>
                                                            <BiCustomize size={20} /> 
                                                        </button>
                                                    </Tooltip>
                                                }
                                            </React.Fragment>

                                            :

                                            <button disabled={true}   id={styles.CourseButtonsInfoPageB2Mod}>{/*onClick={handleDisabled} */}
                                                <p>Customize</p>
                                                <BiCustomize size={20} /> 
                                            </button>

                                        }
                                    </React.Fragment>
                                    
                                :

                                    <React.Fragment>
                                        {Data.state!=="expired"?

                                            <button  onClick={handleOpenCustom} id={styles.CourseButtonsInfoPageB2}>
                                                <p>Customize</p>
                                                <BiCustomize size={20} /> 
                                            </button>
                                            

                                            :

                                            <button disabled={true}   id={styles.CourseButtonsInfoPageB2Mod}>{/*onClick={handleDisabled} */}
                                                <p>Customize</p>
                                                <BiCustomize size={20} /> 
                                            </button>

                                        }
                                    </React.Fragment>
                                    
                            }
                                
                                <Modal
                                sx={{p:1}}
                                open={openCustom}
                                onClose={handleCloseCustom}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                >
                                <Box  sx={{ ...style, width: 400, display:'flex'
                            ,   flexDirection: 'column', overflowY:'auto', overflowX:'hidden', maxHeight:'85vh' }}>
                                    <div className={styles.ModalComponent}>
                                    <h2 id="parent-modal-title" className={styles.ModalTitle}>Customize</h2>
                                    <p id="parent-modal-description">
                                        What do you want to customize ?
                                    </p>
                                    <Autocomplete
                                    sx={{ width: 400, m:1 }}
                                        multiple
                                        id="tags-outlined"
                                        options={Custom}
                                        getOptionLabel={(option) => option}
                                        filterSelectedOptions
                                        onChange={handleChangeSelected}
                                        renderInput={(params) => (
                                        <TextField                                        
                                            {...params}
                                            label="Customize"
                                            placeholder="I want to customize..."
                                        />
                                        )}
                                    />

                                    { selectedOptions[0] && selectedOptions[0].includes('Date') ?
                                        
                                        <div className={styles.Date}>
                                            <div className={styles.DatePicker}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <Stack spacing={2}>
                                                        {mobile &&
                                                        
                                                            <MobileDateRangePicker 
                                                            name="date"
                                                            startText="start"
                                                            value={CustomizeNotif.date}
                                                            onChange={(newDate)=>{
                                                                setCustomizeNotif({...CustomizeNotif, date:newDate})
                                                            }}
                                                            renderInput={(startProps, endProps) => (
                                                                <React.Fragment>
                                                                <TextField {...startProps} />
                                                                <Box sx={{ mx: 1 }}> to </Box>
                                                                <TextField {...endProps} />
                                                                </React.Fragment>
                                                            )}
                                                            />

                                                        }
                                                        <DesktopDateRangePicker
                                                        name="date"
                                                        startText="Select Start Date"
                                                        endText="Select End Date"
                                                        value={CustomizeNotif.date}
                                                        onChange={(newDate)=>{
                                                            setCustomizeNotif({...CustomizeNotif, date:newDate})
                                                        }}
                                                        renderInput={(startProps, endProps) => (
                                                            <React.Fragment>
                                                            <TextField {...startProps} />
                                                            <Box sx={{ mx: 1 }}> to </Box>
                                                            <TextField {...endProps} />
                                                            </React.Fragment>
                                                        )}
                                                        />
                                                    </Stack>
                                                </LocalizationProvider>
                                            </div>
                                            
                                        </div>
                                        :""
                                    }

                                    { selectedOptions[0] && selectedOptions[0].includes('Horaire') ?
                                        
                                        <div className={styles.Date}>
                                            <div className={styles.DatePicker}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <Stack spacing={2}>
                                                        {mobile &&
                                                        
                                                        <MobileTimePicker
                                                            name="time"
                                                            label="Select Time"
                                                            value={CustomizeNotif.time}
                                                            onChange={(newTime)=>{
                                                                setCustomizeNotif({...CustomizeNotif, time:newTime})
                                                            }}                                                            renderInput={(params) => <TextField {...params} />}
                                                        />

                                                        }
                                                        <DesktopTimePicker
                                                            name="time"
                                                            label="Select Time"
                                                            value={CustomizeNotif.time}
                                                            onChange={(newTime)=>{
                                                                setCustomizeNotif({...CustomizeNotif, time:newTime})
                                                            }}                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </Stack>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        :""
                                    }

                                    { selectedOptions[0] && selectedOptions[0].includes('durée de la formation') ?
                                        
                                        <div className={styles.Date}>
                                            <div className={styles.DatePicker}>
                                            <TextField
                                                label="durée de la formation"
                                                id="outlined-start-adornment"
                                                sx={{ m: 1, width: '25ch' }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">hrs</InputAdornment>,
                                                }}
                                                name="duration"
                                                value={CustomizeNotif.duration}
                                                onChange={handleChangeCustom}
                                            />
                                            
                                            </div>
                                        </div>
                                        :""
                                    }
                                    { selectedOptions[0] && selectedOptions[0].includes('Autre...') ?
                                        
                                        <div className={styles.Date}>
                                            <div className={styles.DatePicker}>
                                                <FormControl className={styles.FormControl} sx={{ m: 1, minWidth: "80%" }}>
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
                                                            name="message"
                                                            id="outlined-basic" 
                                                            label="Message" 
                                                            value={CustomizeNotif.message}
                                                            onChange={handleChangeCustom} 
                                                            variant="outlined" 
                                                        />
                                                    </Box>
                                                </FormControl>
                                            </div>
                                        </div>
                                        :""
                                    }
                                    <LoadingButton
                                    sx={{ m:1 }}
                                        onClick={handleSend}
                                        type="submit"
                                        endIcon={<SendIcon />}
                                        // loading={loading}
                                        // loadingPosition="end"
                                        variant="contained"
                                    >
                                        Send
                                    </LoadingButton>
                                    </div>
                                </Box>
                                
                                </Modal>
                            </div>
                        </div>
					</div>
				</div>
						
			</main>
			<Footer/>
		</React.Fragment>
    )
}

export default StandardTraining;