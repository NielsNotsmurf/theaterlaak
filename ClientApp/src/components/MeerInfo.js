import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./styles/programmering.css";

export function MeerInfo(props) {
    const [moment, setMoment] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setMoment(props.moment);
        setLoading(false);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [props.moment]);
    if (isLoading) {
        return <div className="Loading" style={{color:"grey"}}>Voorstelling gegevens laden...</div>;
      }
      return (
        <div className="meerinfo-contentbox">
            <img src={moment.voorstelling.img} style={{height: 300, width: '50%', position: "absolute"}}></img>
            <div className="meerinfo-contentbox-child1">
                <p id="titel">{moment.voorstelling.titel}</p>
                <p>Exclusief in theater laak</p>
            </div>
            <div className="meerinfo-contentbox-child2">
                <p id="omschrijving">{moment.voorstelling.omschrijving}</p>
                <button id="bestellen" alt="bestel tickets">Tickets Bestellen</button>
            </div>
        </div>
      );
}
