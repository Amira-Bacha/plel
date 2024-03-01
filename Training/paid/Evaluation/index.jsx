import React, {useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from './styles.module.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const Evaluation = ({testQR, testQCM, testState, setEvaluationResult, evaluationResult}) => {

    const handleResponse = (e) =>{
        console.log(evaluationResult)
        //setEvaluationResult([...evaluationResult, ])
    }

  return (
    <div className={styles.Accordion}>
      <Accordion disabled={testState} >{/*  */}
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Evaluation</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Accordion >{/* disabled */}
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>QCM</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        testQCM?
                            testQCM.map((qcm,index)=>{
                                return(
                                    <Accordion key={qcm.id} >{/* disabled */}
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <Typography>Question {index+1} </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">
                                                <Typography>{qcm.Question} </Typography>
                                            </FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="No response"
                                                name="radio-buttons-group" 
                                                onChange={(e)=>handleResponse(e,qcm.id)}
                                            >

                                                { qcm.Responses ?

                                                        (qcm.Responses.split(',')).map((r,index)=>{
                                                            return(
                                                                <FormControlLabel key={index} value={r} control={<Radio />} label={r} />
                                                            )
                                                        })
                                                    :  ""     

                                                }
                                                
                                            </RadioGroup>
                                        </FormControl>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })

                        :

                            ""


                    }

                    
                </AccordionDetails>
            </Accordion>
            <Accordion >{/* disabled */}
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>QR</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        testQR?
                            testQR.map((qr,index)=>{
                                return(
                                    <Accordion >{/* disabled */}
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <Typography>Question {index+1} </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        
                                        <FormControl>
                                            <FormLabel id="demo-buttons-group-label">
                                                <Typography>{qr.Question} </Typography>
                                            </FormLabel>
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
                                                    // value={Data.name} 
                                                    // onChange={(e)=>handleChange(e)} 
                                                    variant="outlined" 
                                                />
                                            </Box>
                                        </FormControl>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })

                        :

                            ""


                    }

                    
                </AccordionDetails>
            </Accordion>
            <Button sx={{margin:"10px", float:"right"}}  variant="contained" >Submit</Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

