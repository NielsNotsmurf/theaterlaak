import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/programmering.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IconButton} from '@mui/material';
import StoelenMenu from './StoelenMenu';

export function KoopTicket(props) {
      return (
        <>
        <IconButton onClick={(a)=>props.callback("meerInfo")}>
                    <ArrowBackIcon />
        </IconButton>
        <div className="KoopTicket-contentbox">
          <StoelenMenu id="seatpicker" moment={props.moment}/>
        </div>
        
        </>
      );
}
