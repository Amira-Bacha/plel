import React, { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import StandardTraining from "./standard"
import PaidTraining from "./paid"
import ConfirmedTraining from "./confirmedTraining"


const  Training = () =>{

    let { id } = useParams();
    const token = localStorage.getItem("token")
	const user = JSON.parse(localStorage.getItem("user"));
    const [paid, setPaid] = useState(false)
    const [trainerConfirmed, setTrainerConfirmed] = useState(false)

    useEffect(()=>{
        if(token){
           if(user.userType==="Student"){
                if(user.TrainingsPaid.includes(id)){
                    setPaid(true)
                }
           }else if(user.userType==="Trainer"){
                if(user.Trainings.includes(id)){
                    setTrainerConfirmed(true)
                }
           }
        }
    },[user])
    

    return (
        <React.Fragment>
            {
                paid ? 
                    <PaidTraining/>
                :
                    <React.Fragment>
                    { trainerConfirmed?
                           <ConfirmedTraining/>     
                        :
                            <StandardTraining/>
                    }
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Training