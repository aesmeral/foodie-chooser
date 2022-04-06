import React from 'react';
import { 
    Button, Input, Container,
    FormLabel, RadioGroup, Radio, 
    FormControlLabel, Grid, ButtonGroup,
    FormHelperText, FormControl
} from '@mui/material';

import { useState } from 'react';

const MenuForm = (props: any) => {
    const [tier, setTier] = useState(1);
    const { latitude, longitude } = props;

    const tierListComments = [
        'Hella cheap',
        'Not cheap, not expensive',
        'Okay, a little expensive',
        'DAMN... you got money'
    ]

    const buttonVariant = (tierLevel: number) => {
        return tier === tierLevel ? 'contained' : 'outlined';
    }

    const handleButtonClick = (tierLevel: number) => {
        setTier(tierLevel);
    }

    return(
        <Container maxWidth="sm" sx={{border: '1px black solid'}}>
            <FormControl margin='normal'>
                <Grid container spacing={3}>
                    <Grid direction='column' item xs={12}>
                        <FormLabel>Type of food </FormLabel>
                        <Input/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel>Options</FormLabel>
                        <RadioGroup 
                            row
                            defaultValue="Restaurants"
                        >
                            <FormControlLabel value="Restaurants" control={<Radio />} label="Resturants" />
                            <FormControlLabel value="Takeout" control={<Radio />} label="Takeout" />
                            <FormControlLabel value="Fast Food" control={<Radio />} label="Fast Food" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel>How much we spending? </FormLabel>
                        <ButtonGroup>
                            <Button variant={buttonVariant(1)} onClick={() =>handleButtonClick(1)}>$</Button>
                            <Button variant={buttonVariant(2)} onClick={() =>handleButtonClick(2)}>$$</Button>
                            <Button variant={buttonVariant(3)} onClick={() =>handleButtonClick(3)}>$$$</Button>
                            <Button variant={buttonVariant(4)} onClick={() =>handleButtonClick(4)}>$$$$</Button>
                        </ButtonGroup>
                        <FormHelperText>{tierListComments[tier - 1]}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained">Send IT</Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Container>
    )
}

export default MenuForm;