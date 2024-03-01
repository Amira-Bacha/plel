import React, { useState, useEffect } from 'react';
import { multipleFilesUpload } from '../data/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'

import styles from './styles.module.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const Input = styled('input')({
    display: 'none',
});

const FileUploadScreen = (props) => {

    const [course, setCourse] = React.useState('');
    const [courses, setCourses] = React.useState([]);
    const [multipleFiles, setMultipleFiles] = useState('');
    const [title, setTitle] = useState('');

    const [multipleProgress, setMultipleProgress] = useState(0);
    const token = localStorage.getItem("token")

    useEffect(() => {
        const config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post(`${process.env.REACT_APP_API}/api/trainings`)
            .then(res => {
                setCourses(res.data.data)
            })

    }, [])



    const MultipleFileChange = (e) => {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
    }

    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }

    const UploadMultipleFiles = async() => {
        const formData = new FormData();
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);
        }
        await multipleFilesUpload(formData, mulitpleFileOptions);
        props.getMultiple();
    }







    return ( <
        div className = { styles.RessourcesParams } >

        <
        div className = { styles.InputsRessources } >


        <
        Box className = { styles.FileSelector } >
        <
        label htmlFor = "contained-button-file" >
        <
        Input accept = "*/*"
        id = "contained-button-file"
        multiple type = "file"
        onChange = {
            (e) => MultipleFileChange(e)
        }
        />  <
        Button variant = "contained"
        component = "span" >
        select files <
        /Button>  < /
        label > {
            /* <input 
                                        multiple  
                                        label="Select files"
                                        type="file"  
                                        sx={{width:"90%", margin:"auto" ,"& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            border:"1.2px solid #d0d0d0"
                                            
                                          }
                                        
                                          ,"& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                                            color:"#363636"
                                            
                                          }
                                        
                                        }} 
                                        focused   
                                        id="outlined-basic"  
                                        onChange = { (e) => MultipleFileChange(e) }
                                        
                                    />
                                     */
        } <
        /Box>

        <
        /div>                      <
        div className = { styles.UploadButtons } >



        <
        div className = { styles.btnUpload } >
        <
        Button variant = "contained"
        onClick = {
            () => UploadMultipleFiles()
        } > Upload < /Button>  

        <
        /div >

        <
        /div>   < /
        div >

    );
}

export default FileUploadScreen;