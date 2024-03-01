import React , {useState, useEffect,useRef} from 'react'
import styles from "./styles.module.css";
import axios from "axios";

import img from '../../assets/profileImgNoUp.svg'
import { motion } from "framer-motion"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { singleFileUpload } from "../../UploadFunctions/data/api";
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import countryList from '../../res/countries'
import Languages from '../../res/languages'
import Programs from '../../res/programs'
import Autocomplete from '@mui/material/Autocomplete';
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
        const user = JSON.parse(localStorage.getItem("user"))
        const [singleFile, setSingleFile] = useState('');
        const [singleProgress, setSingleProgress] = useState(0);
        const [Data, setData] = useState(user);
        const [valueParams, setValueParams] = useState([]);

        const token = localStorage.getItem("token")
        
  


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
        },[singleFile])

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

        const languages = Languages.map((language) =>{
            return(
                <MenuItem key={language.code} value={language.code}>{language.name}</MenuItem>
            )
        })

        const countries = countryList.map(country=>{
            return(
                <MenuItem key={country.number} value={country.code}>{country.name}</MenuItem>
            )
        })

        const handleChange = (e) => {
            setData({ ...Data, [e.target.name]: e.target.value });
        };

        useEffect(()=>{
            const listProgs = []
            valueParams.map(pr=>{
                listProgs.push(pr.title)
            })
            setData({ ...Data, programs: listProgs });
    
        },[valueParams])


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
                const url = `${process.env.REACT_APP_API}/api/Trainer/updateTrainers`;
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
                    <h1>{Data.name} {Data.surname}</h1>
                    <p>{Data.description}</p>

                </div>
            </div>
            <div className={styles.ScndSectionInfoProfile}>
                <div className={styles.ScndSectionInfoProfileContainer}>
                    
                    {
                    edit?
                    <React.Fragment>
                        <form onSubmit={handleEdit} action="">
                            <div className={styles.InfosSuction}>
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
											
											name="name"
											id="outlined-basic" 
											label="name" 
											value={Data.name} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
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
											
											name="surname"
											id="outlined-basic" 
											label="surname" 
											value={Data.surname} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
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
											
											name="userName"
											id="outlined-basic" 
											label="userName" 
											value={Data.userName} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
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
											
											name="phone"
											id="outlined-basic" 
											label="phone" 
											value={Data.phone} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
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
											maxRows={3}
											name="adresse"
											id="outlined-basic" 
											label="adresse" 
											value={Data.adresse} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
								
								<FormControl  sx={{ m: 1, minWidth: "80%" }}>
									<Box
										component="form"
										sx={{
											'& > :not(style)': {  width: '100%' },
										}}
										Validate
										autoComplete="off"
									>
										<TextField 
											name="description"
											id="outlined-basic" 
											label="description" 
											value={Data.description} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
								<FormControl sx={{ m: 1, minWidth: "80%" }}>
									<InputLabel id="demo-simple-select-autowidth-label">animation Language</InputLabel>
									<Select
										labelId="demo-simple-select-autowidth-label"
										id="demo-simple-select-autowidth"
										value={Data.animationLanguage}
										onChange={(e)=>handleChange(e)}
										name="animationLanguage"
										label="Animation Language"
									>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
										{languages}
									</Select>
								</FormControl>
								<FormControl sx={{ m: 1, maxWidth: "80%",minWidth: "80%" }}>
									<Autocomplete
										multiple
										id="tags-outlined"
										options={Programs}
										value={valueParams}
										name="programs"
										getOptionLabel={(option) => option.title}
										onChange={(event, newValue) => {
											setValueParams(newValue);
										  }} 
										filterSelectedOptions
										renderInput={(params) => (
										<TextField
											{...params}
											name="programs"
											label="programs"
											placeholder="programs"
										/>
										)}
									/>
									
								</FormControl>
								<FormControl sx={{ m: 1, minWidth: "80%" }}>
									<InputLabel id="demo-simple-select-autowidth-label">connecting Metropolis</InputLabel>
									<Select
										labelId="demo-simple-select-autowidth-label"
										id="demo-simple-select-autowidth"
										value={Data.connectingMetropolis}
										onChange={(e)=>handleChange(e)}
										name="connectingMetropolis"
										label="connecting Metropolis"
									>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
										{countries}
									</Select>
								</FormControl>
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
											name="monthlyBandwidth"
											id="outlined-basic" 
											label="Monthly Bandwidth" 
											value={Data.monthlyBandwidth} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
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
											name="RCS"
											id="outlined-basic" 
											label="RCS" 
											value={Data.RCS} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
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
											name="SIRET"
											id="outlined-basic" 
											label="SIRET" 
											value={Data.SIRET} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
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
											name="socialReason"
											id="outlined-basic" 
											label="Social Reason" 
											value={Data.socialReason} 
											onChange={(e)=>handleChange(e)} 
											variant="outlined" 
										/>
									</Box>
								</FormControl>
                                <FormControl className={styles.FormControl} sx={{ m: 1, minWidth: "80%" }}>

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
                        <p>Adresse: <span>{Data.adresse}</span></p>
                        <p>phone: <span>{Data.phone}</span></p>
                        <p>E-mail: <span>{Data.email}</span></p>
                        <p>Connecting Metropolis: <span>{Data.connectingMetropolis}</span></p>
                        <p>Monthly Bandwidth: <span>{Data.monthlyBandwidth}</span></p>
                        <p>Animation Language: <span>{Data.animationLanguage}</span></p>
                        <p>Programs: 
                            <span>
                                {Data.programs.map(prog=>{
                                    return(<p key = {prog}>{prog}</p>)
                                })}
                            </span>
                        </p>
                        
                        <p>charge TVA: <span>{Data.chargeTVA}</span></p>
                        <p>RCS: <span>{Data.RCS}</span></p>
                        <p>SIRET: <span>{Data.SIRET}</span></p>
                        <p>Social Reason: <span>{Data.socialReason}</span></p>
                    </React.Fragment>
                    
                    }
                </div>
            </div>
        </div>
    )
}

export default InfoUser;