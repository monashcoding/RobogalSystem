import { Image } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import React from "react";

function FullSessionInfoComp({ moreInfo, setMoreInfo, info }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={moreInfo}
        onClose={() => setMoreInfo(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {info.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {info.longDescription}
          </Typography>
          <button className="greenButton"> Select This Session</button>
        </Box>
      </Modal>
    </div>
  );
}

export default FullSessionInfoComp;
