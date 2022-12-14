import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { MdLocationOn } from "react-icons/md";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FullSessionInfoComp from "./FullSessionInfoComp";
import { getDocs, collection } from "@firebase/firestore";
import { db } from "../../config/firebase";

function SessionListComp() {
  const [moreInfo, setMoreInfo] = useState(false);
  const [sessionList, setSessionList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "session"));
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push(doc.data());
      });
      setSessionList(tempList);
    };
    return () => {
      getData();
    };
  }, []);

  return (
    <div>
      <div className="grid grid-flow-row grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sessionList.map((sessionObj) => (
          <div
            className="max-w-full flex justify-center"
            key={sessionObj.title}
          >
            <Card
              sx={{ borderRadius: "20px" }}
              className="w-80 sm:w-80 lg:w-96 xl:max-w-xl h-72"
            >
              <CardHeader
                title={
                  <Box className="font-bold h-full">{sessionObj.title}</Box>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography
                  component={"div"}
                  variant="body1"
                  className="overflow-auto text-ellipsis px-1 max-w-xs sm:w-64 lg:w-72 xl:w-full h-20 xl:h-24"
                >
                  {sessionObj.shortDescription}
                </Typography>
                <Typography component={"div"} variant="body1" className="pt-3">
                  <Box className="flex">
                    <MdLocationOn />
                    {sessionObj.location}
                  </Box>
                </Typography>
              </CardContent>
              <CardActions className="w-fit h-fit mx-auto">
                <button
                  className="greenButton w-fit h-fit"
                  onClick={() => {
                    setMoreInfo(true);
                  }}
                >
                  Select This Session
                </button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>

      {/* Overlay/Popup for more Info on the session */}
      <div>
        <FullSessionInfoComp moreInfo={moreInfo} setMoreInfo={setMoreInfo} />
      </div>
    </div>
  );
}

export default SessionListComp;
