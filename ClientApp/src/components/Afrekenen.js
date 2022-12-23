import { Component } from "react";

export class Afrekenen extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col no-gutters">
                        <Checkout />
                    </div>
                </div>
            </div>
        );
    }
}

const Checkout = (props) => (
    <div className="checkout">
        <div className="checkout-container">
            <h5>betalen</h5>
            <Input label="* Rekeningnummer" type="text" name="rekeningnummer" />
            <Button text="Bevestig Bestelling" />
        </div>
    </div>
);

const Input = (props) => (
    <div className="input">
        <label>{props.label}</label>
        <div className="input-field">
            <input type={props.type} name={props.name} />
        </div>
    </div>
);

const Button = (props) => (
    <button className="checkout-btn" type="button">{props.text}</button>
);


export default Afrekenen;