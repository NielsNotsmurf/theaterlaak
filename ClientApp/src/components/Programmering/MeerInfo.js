import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/programmering.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, FormLabel, IconButton, styled, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function MeerInfo(props) {
    const [moment, setMoment] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setMoment(props.moment);
        setLoading(false);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [props.moment]);
    if (isLoading) {
        return (
        <div className="empty-contentbox"></div>
        );
      }
      return (
        <>
            <IconButton onClick={(a)=>props.callback("")}>
                        <ArrowBackIcon />
            </IconButton>
            <div className="meerinfo-contentbox">
                
                <img id="filmfoto" src={moment.voorstellingAfbeelding}></img>
                <button props={moment} id="bestellen" alt="bestel tickets" onClick={(a)=>props.callback("koopTicket")}>Tickets Bestellen</button>
            </div>
        </>
      );
}
