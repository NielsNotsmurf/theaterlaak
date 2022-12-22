import { Component } from "react";
 
export class Kaarten extends Component {

    async getData()
    {
        const response = await fetch('./kaarten.json');
        const data = await response.json();
        return this.setState({data});
    }

    componentDidMount() 
    {
        this.getData();
    }

    render() 
    {
        return (
            <div>
                <ul>
                    {this.state.data.map((x, i) => <li key={i}>x.title</li>)}
                </ul>
            </div>
        );
    }
}

export default Kaarten;