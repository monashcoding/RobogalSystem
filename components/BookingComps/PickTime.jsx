import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

function PickTime({ startTime, setStartTime, endTime, setEndTime }) {
  const [endTimeMinTimeError, setEndTimeMinTimeError] = useState(false);

  /*---------------------------------------------*/
  return (
    <div className="flex flex-col flex-wrap items-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Start time picker */}
        <div className="mb-5">
          <TimePicker
            label="Start Time"
            value={startTime}
            minutesStep={5}
            onChange={(newTime) => {
              setStartTime(newTime);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                  placeholder: "hh/mm (A|P)M",
                }}
              />
            )}
          />
        </div>

        {/* End time picker*/}
        <div className="">
          <TimePicker
            label="End Time"
            value={endTime}
            minutesStep={5}
            minTime={dayjs(startTime).add(30, "minutes")}
            onChange={(newTime) => {
              setEndTimeMinTimeError(false);
              setEndTime(newTime);
            }}
            onError={(reason) => {
              if (reason == "minTime") {
                setEndTimeMinTimeError(true);
              }
            }}
            renderInput={(params) => (
              <TextField
                error
                helperText={
                  endTimeMinTimeError && "End Time must be after Start Time"
                }
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                  placeholder: "hh/mm (A|P)M",
                }}
              />
            )}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default PickTime;
