import React, { useEffect, useState } from 'react';
import GeneralPurposeHttpService from './http_services/GeneralPurposeHttpService';
import YelpHttpService from './http_services/yelp.http_services/YelpHttpServices';
import { Container, Typography } from '@mui/material';
const App = (props: any) => {

  const [message, setMessage] = useState<Promise<void> | null >(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [prev, setPrev] = useState([]);
  const [curr, setCurr] = useState(null);
  const [next, setNext] = useState([]);

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

  if (message === null) return null;

  return (
      <Typography variant="body2">{`${message}. Now lets choose something to eat!`}</Typography>
  )
}

export default App;