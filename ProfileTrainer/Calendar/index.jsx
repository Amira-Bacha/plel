import React,{useState,useEffect} from 'react'
import styles from "./styles.module.css";
import axios from 'axios'
import Demo from "./demo";
import Loading from '../../Loading'
export const user = () => {return JSON.parse(localStorage.getItem("user")).userType;}


const Calendar =({user}) =>{


    const idsTrainings = user.Trainings
    const [Data, setData]=useState([])
    const [loadingTraining, setLoadingTraining] = useState(true)
    const [state, setstate] = useState(false)
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
        .then(async res=>{
            setData(res.data.data)
            localStorage.setItem("calendarData", JSON.stringify(res.data.data))
            setstate(true)
        })
    }


    useEffect(()=>{
        console.log("test: ",JSON.parse(localStorage.getItem("calendarData")))
        setLoadingTraining(false)
    },[state])
    


    return(
        <div className={styles.leftSectionProfile} >
            <div className={styles.CalendarDiv}>
            {loadingTraining?
                    <Loading/>
                :
                    <Demo/>
            }
                
            </div>
        </div>
    )
}

export default Calendar