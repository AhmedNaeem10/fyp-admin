import { useState } from "react";
import * as React from "react";
import dayjs from "dayjs";
import image from "../images/upload.jpeg";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getAllSlots, getAllVenues, uploadVideo } from "../api/client";
import { toast, ToastContainer } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import "./Timetable.css";
import "./Faculty.css";

export default function Upload() {
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState("Select Time");
  const [venue, setVenue] = useState("Select Venue");
  const [file, setFile] = useState();
  const [source, setSource] = React.useState();
  const inputRef = React.useRef();
  const toastId = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState([]);
  const [venues, setVenues] = useState([]);
  const handleReset = () => {
    setDate(dayjs());
    setTime("Select Time");
    setFile();
    setSource();
    setVenue("Select Venue");
  };
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [res1, res2] = await Promise.allSettled([
          getAllSlots(),
          getAllVenues(),
        ]);
        if (res1.status === "fulfilled") {
          setSlots(res1.value.data);
        } else {
          throw new Error(res1.reason.response.data.detail);
        }
        if (res2.status === "fulfilled") {
          setVenues(res2.value.data);
        } else {
          throw new Error(res2.reason.response.data.detail);
        }
      } catch (err) {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(err, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      toastId.current = null;
      e.preventDefault();
      setLoading(!loading);
      const stringified = String(date);
      let parts = stringified.split(" ");
      const parsed = parts[1] + "-" + parts[2] + "-" + parts[3];
      //const data = { date: parsed, time, venue, file };
      const formData = new FormData();
      formData.append("day", parsed);
      formData.append("starttime", time);
      formData.append("venue", venue);
      formData.append("file", file);
      formData.append("source", source);
      // call an API
      const res = await uploadVideo(formData, toastId, toast);
      setLoading(false);
      toastId.current = null;
      handleReset();
      if (res.data.status) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } catch (err) {
      setLoading(false);
      handleReset();
      toastId.current = null;
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(err.response.data.detail, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  return (
    <div>
      <div className="container">
        <img
          src={image}
          alt="backgroundimage"
          style={{
            height: 400,
            width: "100%",
            marginTop: -50,
            objectFit: "cover",
          }}
        />
        <div className="bottom-left">
          <h1 style={{ fontSize: 50 }}>Upload video here</h1>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "95%" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            style={{ marginTop: 50 }}
            onReset={handleReset}
          >
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={setDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Select
                value={time}
                style={{ marginTop: 8 }}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              >
                <MenuItem value={"Select Time"}>Select Time</MenuItem>
                {slots.map((slot) => {
                  return (
                    <MenuItem value={slot.StartTime} key={slot.id}>
                      {slot.StartTime}
                    </MenuItem>
                  );
                })}
              </Select>

              <Select
                value={venue}
                style={{ marginTop: 8, marginLeft: 8 }}
                onChange={(e) => {
                  setVenue(e.target.value);
                }}
              >
                <MenuItem value={"Select Venue"}>Select Venue</MenuItem>
                {venues.map((venue) => {
                  return (
                    <MenuItem value={venue.VenueName} key={venue.id}>
                      {venue.VenueName}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </Box>
          <div style={{ marginTop: 50 }}>
            {!file && (
              <div className="VideoInput">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer  hover:bg-gray-300 dark:border-gray-600 dark:hover:border-gray-600 dark:hover:bg-gray-300"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        MP4, MOV(MAX: 1GB)
                      </p>
                    </div>
                    <input
                      ref={inputRef}
                      className="hidden"
                      id="dropzone-file"
                      type="file"
                      onChange={handleFileChange}
                      accept=".mov,.mp4"
                    />
                  </label>
                </div>
              </div>
            )}

            {source && (
              <video
                className="VideoInput_video"
                width="100%"
                height={200}
                controls
                src={source}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <div>
              {loading === true ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                >
                  Processing...
                </LoadingButton>
              ) : (
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
              {/* <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button> */}
              <Button
                variant="contained"
                color="error"
                onClick={handleReset}
                style={{ margin: 20 }}
              >
                Reset
              </Button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
