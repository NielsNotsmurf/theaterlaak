import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import KaartenComponent from "./KaartenComponent";
import reserveringService from "../Services/reserveringService";

export function Kaarten(props) 
{
    const [isLoading, setIsLoading] = useState(false);
    const [kaartenLijst, setKaartenLijst] = useState([]);

    useEffect(() => {
        fetchKaartenList();
    }, [])

    async function fetchKaartenList() {
        setIsLoading(true);

        try {
            // setKaartenLijst(fetchlist);
            await setKaartenLijst
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <div className="Loading" style={{color:"grey"}}>Kaarten laden...</div>;
    }


    return (
        <div>
            <h1>Kaarten</h1>
            <ul>
                {kaartenLijst.map((record, index) =>
                    <div key={index}>
                        <KaartenComponent kaart={record} />
                    </div>
                )}
            </ul>
        </div>
    );
}