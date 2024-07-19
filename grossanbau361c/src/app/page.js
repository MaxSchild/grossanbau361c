"use client";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

import IconButton from '@mui/material/IconButton';
import { waterPlants } from '@/app/actions/watering.js'
export default function Home() {
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
