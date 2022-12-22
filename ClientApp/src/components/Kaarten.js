import { Component } from "react";
import kaarten from "./kaarten.json";
 
export class Kaarten extends Component {
    render() 
    {
        return (
            <div>
                <h1>Kaarten</h1>
                <ul>
                    {kaarten.map((record) => <p><b>Voorstelling:</b> {record.voorstelling} <b>Stoel:</b> {record.Stoel}{record.Rang} <b>Datum:</b> {record.datum} </p>)}
                </ul>
            </div>
        );
    }
}

export default Kaarten;