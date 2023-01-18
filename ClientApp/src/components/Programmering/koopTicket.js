import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/programmering.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IconButton} from '@mui/material';
import StoelenMenu from './StoelenMenu';

export function KoopTicket(props) {
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
        <IconButton onClick={(a)=>props.callback("meerInfo")}>
                    <ArrowBackIcon />
        </IconButton>
        <div className="KoopTicket-contentbox">
          <StoelenMenu id="seatpicker" moment={moment}/>
        </div>
        
        </>
      );
}
