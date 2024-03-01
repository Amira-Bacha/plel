
import React, {useState, useEffect, useRef} from 'react'
import styles from "./styles.module.css"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import download from 'downloadjs';

const Ressources = ({openRessources, setOpenRessources, Ressources, Id}) =>{
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token")

    const [Data, setData] = useState({
        id:user._id,
        message:"",
        rate:0
    });

    const downloadFile = async (id, path, mimetype) => {
        try {
          console.log(id)
          console.log("Data:",Id)
          const result = await axios.post(`${process.env.REACT_APP_API}/api/download/`, {params:{id:Id, fileId:id}}, {headers: {authorization: `Bearer ${token}`,'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}},{responseType: 'blob'}, { "withCredentials": true });
          const split = path.split('/');
          const filename = split[split.length - 1];
          return download(result.data, filename, mimetype);
        } catch (error) {
          if (error.response && error.response.status === 400) {
          }
        }
      };
    
    


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

      const valuetext=(value)=>{
          return value
      }

    return (  
    <Modal
        sx={{p:1}}
        open={openRessources}
        onClose={()=>{setOpenRessources(false)}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >

        <Box  sx={{ ...style, width: 450, display:'flex'
            ,flexDirection: 'column', overflowY:'auto', overflowX:'hidden', maxHeight:'85vh',alignItems:'center' }}>
                
                <h2 className={styles.TitleContact}>Training Ressources</h2>
                <div className={styles.ContactPartInfoTextField}>
                    
                    <div className={styles.ContactPartInfoTextFieldInter}>
                        {
                            Ressources===null?
                                <p>No resources available</p>
                            :
                                <React.Fragment>
                                    

                                    
                                    {Ressources.map(r=> {
                                        const name = r.fileName.split(".").slice(0,(r.fileName.split(".").length-1))
                                        const fileType = r.fileType.split("/")[1]
                                        return(
                                            <div onClick={() => downloadFile(r.id, r.filePath, r.fileType)} className={styles.fileDisplay}>
                                                    {fileType==="pdf"?
                                                        <PictureAsPdfIcon/>
                                                    :
                                                        <React.Fragment>
                                                            {fileType==="doc" || fileType==="docx"?
                                                                <ArticleIcon/>
                                                            :
                                                                <React.Fragment>
                                                                    {r.fileType.split("/")[0]==="video"?
                                                                        <VideoLibraryIcon/>
                                                                    :
                                                                        <InsertDriveFileIcon/>
                                                                    }
                                                                </React.Fragment>
                                                            }
                                                        </React.Fragment>

                                                    }
                                                    <div className={styles.name}>
                                                        <Typography sx={{maxWidth:"300px"}} noWrap >{name.join(".")}</Typography>
                                                        <p>.{fileType}</p>
                                                    </div>
                                                
                                            </div>
                                        )
                                    })}
                                        
                                    
                                </React.Fragment>
                        }
                    </div>
                </div>
        </Box>


    </Modal>

)}


export default Ressources