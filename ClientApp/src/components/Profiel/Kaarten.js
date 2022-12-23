import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import KaartenComponent from "./KaartenComponent";

const fetchlist = 
[{
                id: 1,
                Stoel: 25,
                Rang: "a",
                Zaal: "Zaal 1",
                voorstelling: "Elvis",
                naam: "Henk Krol",
                datum: "2023-02-01"
            },
            {
                id: 2,
                Stoel: 15,
                Rang: "b",
                Zaal: "Zaal 3",
                voorstelling: "Jan",
                naam: "Henk Krol",
                datum: "2023-01-01"
            }]

export function Kaarten(props) 
{
    const [isLoading, setIsLoading] = useState(false);
    const [kaartenLijst, setKaartenLijst] = useState([]);

    useEffect(() => {
        fetchKaartenList();
    }, [])

    function fetchKaartenList() {
        setIsLoading(true);

        try {
            setKaartenLijst(fetchlist);
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