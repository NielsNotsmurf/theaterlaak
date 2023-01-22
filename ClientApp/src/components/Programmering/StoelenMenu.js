import React, { Component } from 'react'
import { useState } from "react";
import { useEffect } from "react";
import SeatPicker from 'react-seat-picker';
import '../styles/StoelenMenu.css';
import reserveringService from '../Services/reserveringService';
import momentService from '../Services/momentService';
import {formatDateTime} from '../Helpers/format';
import SnackbarManager from '../Componenten/Snackbar/SnackbarManager';
import { getLocalUser } from '../Helpers/storageHelper';

export default function StoelenMenu(props) {
  const [moment, setMoment] = useState(null);
  const [rijen, setRijen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [reserveringStoelen, setReserveringStoelen] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])
  useEffect(() => {
    if (moment) {
      populateRijen();
    }
  }, [moment])
  async function fetchData() {
    setLoadingPage(true);
    try {
      const fetchResponse = await momentService.GetMomentById(props.moment.id);
      await setMoment(fetchResponse);
    } catch (error) {
      console.log(error);
    }
  }
  async function populateRijen() {
    let tempRijen = [];
    let x;
    moment.zaalPlaatsen.forEach(zaalPlaats => {
      x = Math.max(zaalPlaats.rij);
    });

    for (var i = 0; i < x; i++) {
      tempRijen.push([])
    };
    //plaats stoelen in desbetreffende rij.
    moment.zaalPlaatsen.forEach(zaalPlaats => {
      tempRijen[zaalPlaats.rij - 1].push({ row: zaalPlaats.rij, number: zaalPlaats.zitPlaats, id: zaalPlaats.id, isReserved: zaalPlaats.bezet, tooltip: zaalPlaats.TypeStoel });
    });

    setRijen(tempRijen);
    setLoadingPage(false)
  }

  const addSeatCallback = ({ row, number, id }, addCb) => {
    (async () => {
      setLoading(true)
      console.log(id)
      await new Promise(resolve => setTimeout(resolve, 100))//joeri gaat de stoel op selected zetten
      const newTooltip = `Deze stoel heeft u geselecteerd`
      if (reserveringStoelen.length <= 9) {
        let tempListReserveringStoelen = reserveringStoelen
        moment.zaalPlaatsen.forEach(zaalPlaats => {
          if (zaalPlaats.id == id) {
            setReserveringStoelen(tempListReserveringStoelen.concat(zaalPlaats));
          }
        })
        addCb(row, number, id)
      } else {
        SnackbarManager.showInfo('Je kunt maar tot een maximum van 10 stoelen reserveren.');
      }
      setLoading(false)
    })();

  }


  function removeSeatCallback({ row, number, id }, removeCb) {
    (async () => {
      setLoading(true)
      console.log(id)
      await new Promise(resolve => setTimeout(resolve, 100))//joeri gaat de stoel op niet meer dselected zetten
      const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
      removeCb(row, number, newTooltip)
      setReserveringStoelen((current) =>
        current.filter((stoel) => stoel.id !== id)
      );
      setLoading(false);
    })();
  }

  let onSubmit = (e) => {
    e.preventDefault();
    var reserveringStoelenId = reserveringStoelen.map((reserveringStoel) => reserveringStoel.id);
    console.log(reserveringStoelenId);
    reserveringService.AddReservering(getLocalUser().id, moment.id, reserveringStoelenId).then((response) => {
      if (response.status == 200) {
        SnackbarManager.showInfo('Reservering succesvol geplaatst');
      }
      else {
        SnackbarManager.showWarning('Er is iets fout gegaan');
      }
    }
    )
  }

  if (loadingPage) {
    return (
      <div className="empty-contentbox"></div>
    );
  }
  return (
    <div className='StoelenMenu'>
      <h1 id='filmtitel'>{moment.voorstellingTitel}</h1>
      <h1 id='zaalnaam'>{moment.zaalType}</h1>
      <p style={{ marginBottom: '25px' }} id='filmdatetime'>{formatDateTime(new Date(moment.startDateTime))}</p>
      <div id='screen'>Podium</div>
      <div style={{ marginTop: '75px' }}>
        <SeatPicker
          addSeatCallback={addSeatCallback}
          removeSeatCallback={removeSeatCallback}
          rows={rijen}
          maxReservableSeats={10}
          visible
          selectedByDefault
          loading={loading}
          continuous
        />
      </div>
      <div id='entrance'>Ingang     |    Ingang</div>
      {reserveringStoelen ? reserveringStoelen.map((reserveringStoel, index) => {
        return (
          <>
            <b>zitplaats {index + 1}:</b><br />
            Rij: {reserveringStoel.rij}<br />
            Stoel: {reserveringStoel.zitPlaats}<br />
            Rang: {reserveringStoel.stoelRang}<br />
          </>
        )
      }) : <div />}
      <form onSubmit={onSubmit}>
        <button type='submit'>reserveren</button>
      </form>
    </div>

  )
}