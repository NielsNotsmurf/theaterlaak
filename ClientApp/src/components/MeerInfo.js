import React from "react";
import { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";

export function MeerInfo(props) {
    const [moment, setMoment] = useState("");
    useEffect(() => {
        setMoment(props.moment);
    });
    return(
        <></>
    );
}
