import React, {Component} from 'react'
import { useState } from "react";
import { useEffect } from "react";
import SeatPicker from 'react-seat-picker';
import '../styles/StoelenMenu.css';

export default function StoelenMenu(props) {
  let [moment, setMoment] = useState({});
  let [loading, setLoading] = useState(false);
  let [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    setMoment(props.moment);
    setLoadingPage(false);
  }, [props.moment]);

  function addSeatCallbackContinousCase ({ row, number, id }, addCb, params, removeCb) {
    (async () => {
      setLoading(true)
      if (removeCb) {
        await new Promise(resolve => setTimeout(resolve, 750))
        console.log(`Removed seat ${params.number}, row ${params.row}, id ${params.id}`)
        removeCb(params.row, params.number)
      }
      await new Promise(resolve => setTimeout(resolve, 750))
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      const newTooltip = `tooltip for id-${id} added by callback`
      addCb(row, number, id, newTooltip)
      setLoading(false)
    })();
  }
 
  function removeSeatCallback ({ row, number, id }, removeCb) {
    (async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
      // A value of null will reset the tooltip to the original while '' will hide the tooltip
      const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
      removeCb(row, number, newTooltip)
      setLoading(false)
    })();
  }
    const rows = [
      [
        null,
        { id: 1, number: 1 },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        null,
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        { id: 8, number: 8 },
        { id: 9, number: 9 },
        { id: 10, number: 10 },
        null,
      ],
      [
        null,
        { id: 11, number: 1 },
        { id: 12, number: 2 },
        { id: 13, number: 3 },
        { id: 14, number: 4 },
        { id: 15, number: 5 },
        null,
        { id: 16, number: 6 },
        { id: 17, number: 7 },
        { id: 18, number: 8 },
        { id: 19, number: 9 },
        { id: 20, number: 10 },
        null,
      ],
      [
        null,
        { id: 21, number: 1 },
        { id: 22, number: 2 },
        { id: 23, number: 3 },
        { id: 24, number: 4 },
        { id: 25, number: 5 },
        null,
        { id: 26, number: 6 },
        { id: 27, number: 7 },
        { id: 28, number: 8 },
        { id: 29, number: 9 },
        { id: 30, number: 10 },
        null,
      ],
      [
        null,
        { id: 31, number: 1 },
        { id: 32, number: 2 },
        { id: 33, number: 3 },
        { id: 34, number: 4 },
        { id: 35, number: 5 },
        null,
        { id: 36, number: 6 },
        { id: 37, number: 7 },
        { id: 38, number: 8 },
        { id: 39, number: 9 },
        { id: 40, number: 10 },
        null,
      ],
      [
        null,
        { id: 41, number: 1 },
        { id: 42, number: 2 },
        { id: 43, number: 3 },
        { id: 44, number: 4 },
        { id: 45, number: 5 },
        null,
        { id: 46, number: 6 },
        { id: 47, number: 7 },
        { id: 48, number: 8 },
        { id: 49, number: 9 },
        { id: 50, number: 10 },
        null,
      ],
      [
        null,
        { id: 51, number: 1 },
        { id: 52, number: 2 },
        { id: 53, number: 3 },
        { id: 54, number: 4 },
        { id: 55, number: 5 },
        null,
        { id: 56, number: 6 },
        { id: 57, number: 7 },
        { id: 58, number: 8 },
        { id: 59, number: 9 },
        { id: 50, number: 10 },
        null,
      ],
      [
        null,
        { id: 61, number: 1 },
        { id: 62, number: 2 },
        { id: 63, number: 3 },
        { id: 64, number: 4 },
        { id: 65, number: 5 },
        null,
        { id: 66, number: 6 },
        { id: 67, number: 7 },
        { id: 68, number: 8 },
        { id: 69, number: 9 },
        { id: 70, number: 10 },
        null,
      ],
      [
        null,
        { id: 70, number: "1. [♿]", tooltip: "Invalide Zitplaats"},
        { id: 71, number: "2. [♿]" },
        { id: 72, number: 3 },
        { id: 73, number: 4 },
        { id: 74, number: 5 },
        null,
        { id: 76, number: 6 },
        { id: 77, number: 7 },
        { id: 78,number: 8 },
        { id: 79,number: "9. [♿]" },
        { id: 79,number: "10. [♿]" }
      ]
    ];
    if (loadingPage) {
      return (
      <div className="empty-contentbox"></div>
      );
      }
      return (
        <div className='StoelenMenu'>
          <h1 id='filmtitel'>{props.moment.voorstelling.titel}</h1>
          <p style={{marginBottom: '25px'}} id='filmdatetime'>{props.moment.dateTime}</p>
          <div id='screen'>Beeldscherm</div>
          <div style={{marginTop: '75px'}}>
            <SeatPicker
              addSeatCallback={addSeatCallbackContinousCase}
              removeSeatCallback={removeSeatCallback}
              rows={rows}
              maxReservableSeats={4}
              alpha
              visible
              selectedByDefault
              loading={loading}
              tooltipProps={{multiline: true}}
              continuous
            />
          </div>
        </div>
      )
  }