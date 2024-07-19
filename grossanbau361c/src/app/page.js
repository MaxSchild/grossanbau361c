"use client";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

import IconButton from '@mui/material/IconButton';
import { waterPlants, getWateringStatus } from '@/app/actions/watering.js'

import { useState, useEffect } from "react";


export default function Home() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      const values = getWateringStatus();

      console.log("Loaded Values into client:");
      console.log(values);
      setIsLoaded(true);
    }
  }, [isLoaded]);
  return (
    <>

      <Stack direction="column">
        <Typography variant="h1">
          Gegossen?
        </Typography>

        <IconButton aria-label="waterPlants" onClick={async () => {

          waterPlants();
        }} color="success">
          <WaterDropIcon />
        </IconButton>


        <Typography >
          Done
        </Typography>
      </Stack>

    </>
  );
}
