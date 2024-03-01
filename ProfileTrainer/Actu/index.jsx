import React,{useState,useEffect} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import styles from "./styles.module.css";
import axios from 'axios'
import { borderRight, height } from '@mui/system';
import Button from '@mui/material/Button';
import {GiConfirmed} from 'react-icons/gi'
import {RiCloseCircleLine} from 'react-icons/ri'
import {GoIssueOpened} from 'react-icons/go'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const Actu =({user,setActu}) =>{
	const [openChange, setOpenChange] = useState(false);
    const [valueComment,setValueComment]=useState({Creator:"Me",Comment:""})
    const [data, setData] = useState([])
    const [comments,setComments]=useState([])
    const [currentElement,setCurrentElement]=useState("")

    

    const token = localStorage.getItem("token")
    const handleChange = (e) => {
		setValueComment({...valueComment, Comment:e.target.value} );
	};
    const getNotifTrainer = async() =>{
        const config = {
            headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
        };
        try {
                await axios.get(`${process.env.REACT_APP_API}/api/Trainer/GetNotifTrainer`,config).then((res)=>{
                setData(res.data.data)
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


    useEffect(()=>{
        getNotifTrainer()
    },[])
    
    useEffect(()=>{
    },[data])
    

    // renderCell: (params) => {
                
    //     const onClick = async (e,state) => {
    //       e.stopPropagation(); // don't select this row after clicking
          
    //       if(state==="CFR"){
    //         setOpCFR("100%")
    //         setOpANL("20%")
    //         setOpEATT("20%")
    //       }else if(state==="ANL"){
    //         setOpCFR("20%")
    //         setOpANL("100%")
    //         setOpEATT("20%")
    //       }else {
    //         setOpCFR("20%")
    //         setOpANL("20%")
    //         setOpEATT("100%")
    //       }
    //     };
  
    //     return <React.Fragment>
    //         <Button sx={{ minWidth:'10px', width:'70px'}} onClick={(e)=>onClick(e,"CFR")}> <CheckCircleOutlineIcon sx={{color:"green",opacity:opCFR, width:'50px'}}/> </Button>
    //         <Button sx={{ minWidth:'10px', width:'70px'}} onClick={(e)=>onClick(e,"ANL")}> <HighlightOffIcon sx={{color:"red", width:'50px',opacity:opANL}}/> </Button>
    //         <Button sx={{ minWidth:'10px', width:'70px'}} onClick={(e)=>onClick(e,"EATT")}> <ErrorOutlineOutlinedIcon sx={{color:"#ff9100", width:'50px',opacity:opEATT}}/> </Button>
    //     </React.Fragment>
    //   },

    const handleUpdate = async (id,status,price) =>{
        const config = {
            headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
        };
        try {
            const url = `${process.env.REACT_APP_API}/api/Trainer/UpdateNotifTrainer`;
            
            await axios.post(url,{data: {id:id, reponseFormateur:status,prixFormateur:price }},config)
            .then( res=>{
                window.location.reload(true)

            })
        } catch(error){
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                // setError(error.response.data.message);
            }
        }
    }



    const renderResponseButton = (params) => {
        var disable=false
        var opCFR="20%"
        var opANL="20%"
        var opEATT="100%"
        if(params.row.statusMandat==="confirmed"||params.row.statusMandat==="closed")
        {
            disable=true
            if(params.row.statusMandat==="confirmed"){
                opCFR="100%"
                opANL="20%"
                opEATT="20%"
            }else{
                opCFR="20%"
                opANL="20%"
                opEATT="20%"
            }
        }else{
            if(params.row.reponseFormateur==="confirmed"){
                disable=true
                opCFR="100%"
                opANL="20%"
                opEATT="20%"
            }else if(params.row.reponseFormateur==="rejected"){
                disable=true
                opCFR="20%"
                 opANL="100%"
                opEATT="20%"
            }else {
                opCFR="20%"
                 opANL="20%"
                opEATT="100%"
            }
        }
        
        return (
            <React.Fragment>

                <Button  sx={disable?{ "&.Mui-disabled": {
                                            pointerEvents: "auto", 
                                            cursor: "not-allowed",
                                            minWidth:'10px', 
                                            width:'70px',}}
                                            :
                                            {   minWidth:'10px', 
                                                width:'70px',
                                                cursor: 'pointer'}} 
                                            disabled={disable}
                onClick={() => {
                    handleUpdate(params.row.id,"confirmed", params.row.TJ)
                    }}>   

                    <CheckCircleOutlineIcon sx={{color:"green",opacity:opCFR, width:'50px'}}/> 

                </Button>

                <Button sx={disable?{ "&.Mui-disabled": {
                                            pointerEvents: "auto", 
                                            cursor: "not-allowed",
                                            minWidth:'10px', 
                                            width:'70px',}}
                                            :
                                            {   minWidth:'10px', 
                                                width:'70px',
                                                cursor: 'pointer'}} 
                                            disabled={disable}
                onClick={() => {
                    handleUpdate(params.row.id,"rejected")
                    }}>

                    <HighlightOffIcon sx={{color:"red", width:'50px',opacity:opANL}}/> 

                </Button>

                <Button sx={disable?{ "&.Mui-disabled": {
                                            pointerEvents: "auto", 
                                            cursor: "not-allowed",
                                            minWidth:'10px', 
                                            width:'70px',}}
                                            :
                                            {   minWidth:'10px', 
                                                width:'70px',
                                                cursor: 'pointer'}} 
                                            disabled={disable}
                onClick={() => {
                    handleUpdate(params.row.id,"waiting")
                    }}>

                    <ErrorOutlineOutlinedIcon sx={{color:"#ff9100", width:'50px',opacity:opEATT}}/> 
                    
                </Button>

            </React.Fragment>
        )
    }

    const renderBCButton = (params) => {
        var disable=true
        if(params.row.statusMandat==="confirmed"){
            disable=false
        }
        return (

                <Button  sx={disable?{ "&.Mui-disabled": {
                                            pointerEvents: "auto", 
                                            cursor: "not-allowed",
                                            margin:"auto"
                                            }}
                                            :
                                            {   
                                                cursor: 'pointer',margin:"auto"}} 
                                            disabled={disable}
                >   

                    <PictureAsPdfIcon sx={disable?{ color:"#7C99AC"}
                                            :
                                            {color:"#B33030"}    }    /> 

                </Button>
        )
    }

    const renderCommentButton = (params) => {
        
        return (

                <Button  sx={{color:'red',margin:"auto"}} onClick={()=>{
                    setCurrentElement(params.row.id)
                    setComments(params.row.comments)
                    setOpenChange(true);
                
                }}>Explore</Button>
        )
    }

    const renderTJValue = (params) =>{
        
    }
    const columns=[
        {field:"subject",headerName:"Subject", width:140,
            headerClassName: 'super-app-theme--header',
            editable: false,

        },
        {field:"date",headerName:"Date", width:150,
        headerClassName: 'super-app-theme--header',
        editable: false,

        },
        {field:"TJ",headerName:"TJ(Frais inclus)", width:150,
            headerClassName: 'super-app-theme--header',
            renderCell:renderTJValue,
            editable: true,

        },
        {field:"statusMandat",headerName:"Status Mandat", width:150,
            headerClassName: 'super-app-theme--header',
            editable: false,

        },
        {field:"NB",headerName:"NB d'inscrit", width:130,
            headerClassName: 'super-app-theme--header',
            editable: false,

        },
        {field:"RF",headerName:"Réponse Formateur", width:190,
            headerClassName: 'super-app-theme--header',
            renderCell: renderResponseButton,
            disableClickEventBubbling: true,
            
        },
        {field:"BC",headerName:"Bon de commande", width:190,
                headerClassName: 'super-app-theme--header',
                renderCell: renderBCButton,
                disableClickEventBubbling: true,

        },
        {field:"commentaire",headerName:"Commentaire", width:190,
            headerClassName: 'super-app-theme--header',
            renderCell: renderCommentButton,
            disableClickEventBubbling: true,

        },
        
        // {
        //     field: "country",
        //     editable: true,
        //     type: "singleSelect",
        //     valueOptions: ["United Kingdom", "Spain", "Brazil"],
            
        // },
    ]
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const rows = data.map((row)=>(
        
        {
        id: row._id,
        subject: row.courseCertif,
        date: `${(new Date(row.courseDate[0])).getDay()}/${(new Date(row.courseDate[0])).getMonth()+1}->${(new Date(row.courseDate[1])).getDay()}/${(new Date(row.courseDate[1])).getMonth()+1} - ${(new Date(row.courseDate[1])).getFullYear()}`,
        TJ: row.prixFormateur,
        statusMandat: row.StatusMandate,
        NB: row.nbInscrit,
        reponseFormateur : row.reponseFormateur,
        comments: row.comments
    }))

  


    const columnsComments=[
        {field:"Creator",headerName:"Creator", width:140,
            headerClassName: 'super-app-theme--header',
            editable: false,

        },
        {field:"Comment",headerName:"Comment", width:640,
        headerClassName: 'super-app-theme--header',
        editable: false,

        },
    ]

    const rowsComments = comments.map((row,index)=>({
        id: index,
        Creator: row.Creator,
        Comment: row.Comment,
        
    }))

    useEffect(()=>{
    },[rowsComments])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 2, 
        border:'none',
        minHeight:200,
        height:"auto"
      };
      
      const handleCloseChange = () => {
        setOpenChange(false);
    };

    const SendComment= async () =>{

        const config = {
            headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
        };
        try {
            const url = `${process.env.REACT_APP_API}/api/Trainer/UpdateCommentsNotifTrainer`;
            await axios.post(url,{data: {id:currentElement, comments:valueComment}},config)
            .then( res=>{
                localStorage.setItem("Window State" , "actu")
                getNotifTrainer()
                window.location.reload(true)
                
            })
        } catch(error){
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                // setError(error.response.data.message);
            }
        }
    }
    
    return(
        <div className={styles.leftSectionProfile} >
            <div className={styles.ActuDiv}>
                <DataGrid
                sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'dark',
                    fontWeight:'bolder',
                    
                    '& .MuiDataGrid-cell:hover': {
                      color: 'rgba(85, 85, 85, 0.753)',
                    },
                    '& .super-app-theme--header': {
                      color: 'black',
                      fontSize:17,
                      
                      },

                      '.MuiDataGrid-columnSeparator': {
                        color: 'black',
                        
                      },

                      '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell, .MuiDataGrid-columnHeaders': {
                        borderBottom: `1px solid #000`,
                      },

                      
                      '& .MuiButtonBase-root-MuiIconButton-root': {
                            backgroundColor: '#5e5e5e3d',
                            color:'black',
                      },

                      
                      
                  }}

                // isCellEditable={}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                >

                </DataGrid>
            </div>
            <Modal
                sx={{p:1 }}
                open={openChange}
                onClose={handleCloseChange}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box  sx={{ ...style, width: 800, display:'flex'
            ,   flexDirection: 'column', overflowY:'auto', overflowX:'hidden', maxHeight:'85vh' }}>
                    <div className={styles.ModalComponent}>
                        <h2 id="parent-modal-title" className={styles.ModalTitle}>Comments</h2>
                        <DataGrid
                            sx={{mt:2,
                                minHeight:200, height:650}}
                            onCellEditCommit={renderTJValue}
                            // isCellEditable={}
                            rows={rowsComments}
                            columns={columnsComments}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            >

                        </DataGrid>
                        <Box className={styles.addComment} sx={{width:"100%" , mt:2}}>
                            <TextField value={valueComment.Comment} onChange={handleChange}  multiline sx={{width:"75%"}} id="outlined-basic" label="Outlined" variant="outlined" />
                            <Button sx={{width:"22%",height:"56px", ml:2}} onClick={SendComment} variant="contained" endIcon={<SendIcon />}>Add Comment</Button>
                        </Box>
                    </div>
                </Box>
                        
            </Modal>
        </div>
    )
}

export default Actu