import React, { useEffect, useState } from 'react';
import GeneralPurposeHttpService from 'http_services/GeneralPurposeHttpService';
import YelpHttpService from 'http_services/yelp.http_services/YelpHttpServices';
import MenuForm from 'components/MenuForm/MenuForm';
import BusinessCard from 'components/BusinessCard/BusinessCard';
import { Grid, Container, Button } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const App = (props: any) => {

  const [message, setMessage] = useState<Promise<void> | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [prev, setPrev] = useState<any>([]);
  const [curr, setCurr] = useState<any>(null);
  const [next, setNext] = useState<any>([]);

  const request = GeneralPurposeHttpService;

  useEffect(() => {
    const fetchCompliment = async () => {
      const response = await request.get('https://complimentr.com/api');
      setMessage(response.data.compliment);
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    });

    fetchCompliment();
  }, [])

  const dataRefresh = () => {
    setPrev([]);
    setCurr(null);
    setNext([]);
  };

  const fetchData = async (query: string) => {
    const response = await YelpHttpService.getBusinessSearch(query);
    const businesses = await response.businesses;
    const randomIndex = Math.floor(Math.random() * businesses.length);

    if (businesses.length === 0) return;

    dataRefresh();
    setCurr(businesses[randomIndex]);
    setNext(businesses.filter((value: number, index: number) => randomIndex !== index));
  }

  const clickNext = () => {
    prev.push(curr);
    setCurr(next.shift());
  }

  const clickBack = () => {
    next.unshift(curr);
    setCurr(prev.pop())
  }

  const noNext = () => {
    return next.length === 0;
  }

  const noBack = () => {
    return prev.length === 0;
  }

  if (message === null) return null;  // need to make a loading page? 

  return (
    <div>
      <MenuForm longitude={longitude} latitude={latitude} submitHandler={fetchData} />
      <Grid
        container
        justifyContent='center'
      >
        <BusinessCard currentCard={curr} />
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent="center"
        spacing={20}
      >
        <Grid item>
          <Button variant="outlined" disabled={noBack()} onClick={clickBack}><ArrowBackIosNewIcon /></Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" disabled={noNext()} onClick={clickNext}><ArrowForwardIosIcon /></Button>
        </Grid>
      </Grid>
    </div >
  )
}

export default App;