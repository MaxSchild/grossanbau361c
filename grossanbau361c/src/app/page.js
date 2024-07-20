"use client";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'
import WaterDropIcon from '@mui/icons-material/WaterDrop';

import IconButton from '@mui/material/IconButton';

import { useUser } from "@clerk/nextjs";
import { waterPlants, getWateringStatus } from '@/app/actions/watering.js'
import { checkForEmailOnWhitelist } from '@/app/actions/whitelist.js'

import { useState, useEffect } from "react";


export default function Home({ data }) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [wateringStatus, setWateringStatus] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  const [checkedForWhitelist, setCheckedForWhitelist] = useState(false);
  const [userIsOnWhiteList, setUserIsOnWhiteList] = useState(false);


  //const { isLoaded, userId, sessionId, getToken } = useUser();
  const user = useUser();

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

  useEffect(() => {
    if (user.isLoaded) {
      console.log("User: ", user);
      const email = user.user.primaryEmailAddress.emailAddress;
      console.log("Email: ", email);
      checkForEmailOnWhitelist(email).then(
        (res) => {
          setUserIsOnWhiteList(res.isOnWhitelist);
          setCheckedForWhitelist(true);
        }
      )
    }
  }, [user])
  return (
    <>
      {
        (!user.isLoaded || !checkedForWhitelist) && <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      }
      {
        (user.isLoaded && checkedForWhitelist &&
          !userIsOnWhiteList) &&
        <>
          <Typography>
            Deine Email-Adresse steht leider nicht auf der Whitelist. Bitte schicke eine Whats App an Tim
          </Typography>
        </>
      }
      {(user.isLoaded && checkedForWhitelist &&
        userIsOnWhiteList) &&
        <Stack direction="column">
          <Typography variant="h2">
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
      }




    </>
  );
}
