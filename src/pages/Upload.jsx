import { useEffect } from "react";
import { useState } from "react";
import FileUpload from "react-material-file-upload";
import * as React from 'react';
import dayjs from 'dayjs';
import image from '../images/upload.jpeg';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './Timetable.css';
import './Faculty.css'

export default function Upload() {
    const [date, setDate] = useState(dayjs());
    const [time, setTime] = useState("Select Time");
    const [venue, setVenue] = useState("Select Venue")
    const [file, setFile] = useState();
    const [source, setSource] = React.useState();
    const inputRef = React.useRef();

    const handleReset = () => {
        setDate(dayjs());
        setTime("Select Time");
        setFile();
        setSource();
        setVenue("Select Venue");
    }

    const handleSubmit = () => {
        const stringified = String(date)
        let parts = stringified.split(" ")
        const parsed = parts[1] + "-" + parts[2] + "-" + parts[3]
        const data = { date: parsed, time, venue, file }
        console.log(data);
        // call an API
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file)
        const url = URL.createObjectURL(file);
        setSource(url);
    };

    return (
        <div>
            <div class="container">
                <img src={image} alt="image" style={{ height: 400, width: "100%", marginTop: -50, objectFit: "cover" }} />
                <div class="bottom-left"><h1 style={{ fontSize: 50 }}>Upload video here</h1></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "95%" }}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                            <Select value={time} style={{ marginTop: 8 }} onChange={(e) => { setTime(e.target.value) }}>
                                <MenuItem value={"Select Time"}>Select Time</MenuItem>
                                <MenuItem value={"08:00"}>08:00</MenuItem>
                                <MenuItem value={"08:55"}>08:55</MenuItem>
                                <MenuItem value={"09:50"}>09:50</MenuItem>
                                <MenuItem value={"10:45"}>10:45</MenuItem>
                                <MenuItem value={"11:40"}>11:40</MenuItem>
                                <MenuItem value={"12:35"}>12:35</MenuItem>
                                <MenuItem value={"01:30"}>01:30</MenuItem>
                                <MenuItem value={"02:25"}>02:25</MenuItem>
                                <MenuItem value={"03:20"}>03:20</MenuItem>
                            </Select>

                            <Select value={venue} style={{ marginTop: 8, marginLeft: 8 }} onChange={(e) => { setVenue(e.target.value) }}>
                                <MenuItem value={"Select Venue"}>Select Venue</MenuItem>
                                <MenuItem value={"A-1"}>A-1</MenuItem>
                                <MenuItem value={"A-2"}>A-2</MenuItem>
                                <MenuItem value={"A-3"}>A-3</MenuItem>
                                <MenuItem value={"A-4"}>A-4</MenuItem>
                                <MenuItem value={"A-5"}>A-5</MenuItem>
                                <MenuItem value={"A-6"}>A-6</MenuItem>
                                <MenuItem value={"A-7"}>A-7</MenuItem>
                                <MenuItem value={"A-8"}>A-8</MenuItem>
                                <MenuItem value={"B-9"}>B-9</MenuItem>
                                <MenuItem value={"B-10"}>B-10</MenuItem>
                                <MenuItem value={"B-11"}>B-11</MenuItem>
                                <MenuItem value={"B-12"}>B-12</MenuItem>
                                <MenuItem value={"B-11"}>B-11</MenuItem>
                                <MenuItem value={"C-17"}>C-17</MenuItem>
                                <MenuItem value={"C-18"}>C-18</MenuItem>
                                <MenuItem value={"C-19"}>C-19</MenuItem>
                                <MenuItem value={"C-20"}>C-20</MenuItem>
                                <MenuItem value={"C-22"}>C-22</MenuItem>
                                <MenuItem value={"E1"}>E1</MenuItem>
                                <MenuItem value={"E2"}>E2</MenuItem>
                                <MenuItem value={"E3"}>E3</MenuItem>
                                <MenuItem value={"E4"}>E4</MenuItem>
                                <MenuItem value={"E5"}>E5</MenuItem>
                                <MenuItem value={"E6"}>E6</MenuItem>
                                <MenuItem value={"R7"}>R7</MenuItem>
                                <MenuItem value={"R11"}>R11</MenuItem>
                                <MenuItem value={"R12"}>R12</MenuItem>
                                <MenuItem value={"R109"}>R109</MenuItem>
                                <MenuItem value={"S2"}>S2</MenuItem>
                                <MenuItem value={"Lab-1"}>Lab-1</MenuItem>
                                <MenuItem value={"Lab-3"}>Lab-3</MenuItem>
                                <MenuItem value={"Lab-4"}>Lab-4</MenuItem>
                                <MenuItem value={"Lab-5"}>Lab-5</MenuItem>
                                <MenuItem value={"Lab-6"}>Lab-6</MenuItem>
                                <MenuItem value={"Lab-7"}>Lab-7</MenuItem>
                                <MenuItem value={"Lab-8"}>Lab-8</MenuItem>
                                <MenuItem value={"Lab-10"}>Lab-10</MenuItem>
                                <MenuItem value={"Lab-11"}>Lab-11</MenuItem>
                                <MenuItem value={"Lab-12"}>Lab-12</MenuItem>
                                <MenuItem value={"MPI Lab"}>MPI Lab</MenuItem>
                               
                            </Select>
                        </div>
                    </Box>
                    <div style={{ marginTop: 50 }}>
                        {
                            !file &&
                            <div className="VideoInput">
                                <div class="flex items-center justify-center w-full">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer  hover:bg-gray-300 dark:border-gray-600 dark:hover:border-gray-600 dark:hover:bg-gray-300">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">MP4, MOV(MAX: 1GB)</p>
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
                        }

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
                    <div style={{ display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
                        <div></div>
                        <div>
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                            <Button variant="contained" color="error" onClick={handleReset} style={{ margin: 20 }}>Reset</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}