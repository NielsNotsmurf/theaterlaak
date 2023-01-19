import React, { useEffect, useState } from 'react';
import logoLaak from '../images/laak.jpeg';
import ReactSearchBox from "react-search-box";
import momentService from './Services/momentService';

export default function Home() {
  const [momenten, setMomenten] = useState([]);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  useEffect(() => {
    async function getMomenten() {
      const response = await momentService.GetMomenten();
      setMomenten(await response);
    };

    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!momenten) {
      getMomenten();
    }
  })
  return (
    <div>
      <div className='flex-item-main'>
        <img src={logoLaak} alt='Theater Laak logo' />
      </div>
      {/* <div>
        <input type="text" value={value} onChange={handleChange} />
        <ReactSearchBox
          value={""}
          data={[]}
          callback={results => (
            <div>
              {results.map(mo => (
                <div>
                  <span>{mo.name}</span>
                  <span>{mo.email}</span>
                </div>
              ))} 
            </div>
          )}
        />
      </div> */}
    </div>
  );
}