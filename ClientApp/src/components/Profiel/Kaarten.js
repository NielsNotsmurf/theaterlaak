import { Component } from "react";
 
export class Kaarten extends Component {
    render() 
    {
        return (
            <div>
                <h1>Kaarten</h1>
                <ul>
                    {fetchlist.map((record, index) => 
                    <div key={index}>
                        <p><b>Voorstelling:</b> {record.voorstelling} <b>Stoel:</b> {record.Stoel}{record.Rang} <b>Datum:</b> {record.datum} </p>
                    </div>
                    )}
                </ul>
            </div>
        );
    }
}

const fetchlist = [{
    id : 1,
    Stoel: 25,
    Rang: "a",
    voorstelling: "Elvis", 
    naam: "Henk Krol", 
    datum: "2023-02-01"
},
{
    id : 2,
    Stoel: 15,
    Rang: "b", 
    voorstelling: "Jan", 
    naam: "Henk Krol", 
    datum: "2023-01-01"
}]

export default Kaarten;