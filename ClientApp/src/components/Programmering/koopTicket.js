import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/programmering.css";

export function KoopTicket(props) {
    const [moment, setMoment] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setMoment(props.moment);
        setLoading(false);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [props.moment]);
    if (isLoading) {
        return <div className="empty-contentbox"></div>;
      }
      return (
        <div className="KoopTicket-contentbox">

        </div>
      );
}
