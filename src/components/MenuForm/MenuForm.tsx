import React from 'react';
import { 
    Button, TextField, Container,
    FormLabel, Grid, ButtonGroup,
    FormHelperText, FormControl,
    Slider,
} from '@mui/material';

import { useState } from 'react';

const MenuForm = (props: any) => {
    const [tier, setTier] = useState<number>(1);
    const [term, setTerm] = useState<string>('');
    const [distance, setDistance] = useState<number>(5);
    const [message, setMessage] = useState<string>('really close');
    const [location, setLocation] = useState<string>('');
    const { latitude, longitude } = props;
    // categoies = FOOD

    const tierListComments = [
        'Hella cheap',
        'Not cheap, not expensive',
        'Okay, a little expensive',
        'DAMN... you got money'
    ]

    const sliderMessage = [
        'really close',
        'somewhat close?',
        'we getting some distance for sure',
        'THIS PLACE IS FAR',
        'ITS FAR FAR...'
    ]
    const buttonVariant = (tierLevel: number) => {
        return tier === tierLevel ? 'contained' : 'outlined';
    }

    const handleButtonClick = (tierLevel: number) => {
        setTier(tierLevel);
    }

    const handleTextChange = (event: any) => {
        if(event.target.id === "term") setTerm(event.target.value);
        else setLocation(event.target.value);
    }

    const handleSlider = (event: Event, newValue: number | number[]) => {
        setDistance(newValue as number);
        if(newValue <= 5) setMessage(sliderMessage[0]);
        else if(newValue <= 10) setMessage(sliderMessage[1]);
        else if(newValue <= 15) setMessage(sliderMessage[2]);
        else if(newValue <= 20) setMessage(sliderMessage[3]);
        else if(newValue <= 25) setMessage(sliderMessage[4]);
    }

    const buttonMessage = () => {
        if (term === '') return 'Explore'
        else return 'Send it'
    }

    const handler = () => {
        const payload : any = {
            term: term,
            price: tier,
            open_now: true,
            radius: distance * 1609,
            categories: 'food',
        }
        if (location === ''){ 
            payload.longitude = longitude;
            payload.latitude = latitude;
        } else {
            payload.location = location;
        }
        props.submitHandler(payload);
    }

    console.log(longitude)

    return(
        <Container maxWidth="sm" sx={{border: '1px black solid'}}>
            <FormControl margin='normal'>
                <Grid container spacing={3}>
                    <Grid item xs={12} container direction="column">
                        <FormLabel>Type of food </FormLabel>
                        <TextField
                            placeholder="What we feeling today?"
                            type="text"
                            margin="dense"
                            variant="standard"
                            id="term"
                            value={term}
                            onChange={handleTextChange}
                        />
                    </Grid>
                    <Grid item xs={6} container direction="column">
                        <FormLabel>How much we spending? </FormLabel>
                        <ButtonGroup>
                            <Button variant={buttonVariant(1)} onClick={() =>handleButtonClick(1)}>$</Button>
                            <Button variant={buttonVariant(2)} onClick={() =>handleButtonClick(2)}>$$</Button>
                            <Button variant={buttonVariant(3)} onClick={() =>handleButtonClick(3)}>$$$</Button>
                            <Button variant={buttonVariant(4)} onClick={() =>handleButtonClick(4)}>$$$$</Button>
                        </ButtonGroup>
                        <FormHelperText>{tierListComments[tier - 1]}</FormHelperText>
                    </Grid>
                    <Grid item xs={6} container direction="column">
                        <FormLabel>Distance (miles)</FormLabel>
                        <Slider
                            value={distance}
                            valueLabelDisplay="auto"
                            min={1}
                            max={25}
                            onChange={handleSlider}
                        />
                        <FormHelperText>{message}</FormHelperText>
                    </Grid>
                    {latitude === null && <Grid item xs={12} container direction="column">
                        <FormLabel>Location</FormLabel>
                        <TextField
                            placeholder="Where you at?"
                            type="text"
                            margin="dense"
                            variant="standard"
                            id="location"
                            value={location}
                            onChange={handleTextChange}
                        />
                    </Grid> }
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" onClick={handler}>{buttonMessage()}</Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Container>
    )
}

export default MenuForm;