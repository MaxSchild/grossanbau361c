"use client";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'
import WaterDropIcon from '@mui/icons-material/WaterDrop';

import IconButton from '@mui/material/IconButton';
import { waterPlants, getWateringStatus } from '@/app/actions/watering.js'

import { useState, useEffect } from "react";


export default function Home({ data }) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [wateringStatus, setWateringStatus] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      getWateringStatus().then(
        (res) => {
          console.log("Loaded Values into client:");
          console.log(res);
          setIsLoaded(true);
          setWateringStatus(res)
        }
      )


    }
  }, [isLoaded]);
  return (
    <>

      <Stack direction="column">
        <Typography variant="h1">
          Gegossen?
        </Typography>
        {
          (!isLoaded || wateringStatus === null || wateringStatus === undefined) ?
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            :
            <><IconButton aria-label="waterPlants" disabled={isDisabled || wateringStatus.wasWateredToday} onClick={async () => {
              setIsDisabled(true);
              waterPlants();
              getWateringStatus().then(
                (res) => {
                  console.log("Loaded Values into client:");
                  console.log(res);
                  setWateringStatus(res)
                  setIsDisabled(false);
                });

            }} color={wateringStatus.wasWateredToday ? "success" : "error"}>
              <WaterDropIcon />
            </IconButton>
              <Typography >
                {wateringStatus.wasWateredToday ? "Fertig" : "Bitte noch gießen!"}
              </Typography>

            </>
        }
      </Stack >




    </>
  );
}
