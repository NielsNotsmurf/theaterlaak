import '../master.css';
export default function KaartenComponent(props)
{
    const {kaart} = props;
        return (
            <div id="kaart-design">
                <h5><i>Voorstelling:</i></h5>
                <p>{kaart.voorstelling}</p>
                <h5><i>Stoel:</i></h5>
                <p>{kaart.Stoel}{kaart.Rang}</p>
                <h5><i>Zaal:</i></h5>
                <p>{kaart.Zaal}</p>
            </div>
        );
}