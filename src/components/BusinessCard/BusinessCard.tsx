import React from 'react';
import { Typography } from '@mui/material'

const BusinessCard = (props: any) => {
    const { currentCard } = props;

    if (currentCard === null) return <h1>No Results</h1>
    return (
        <div>
            <Typography variant="overline">
                {currentCard.name}
            </Typography>
        </div>
    )
}

export default BusinessCard;