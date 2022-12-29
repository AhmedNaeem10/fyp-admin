import { useEffect } from "react";
import { useState } from "react";
import FileUpload from "react-material-file-upload";
import image from '../images/timetable.jpeg';
import Button from '@mui/material/Button';
import './Timetable.css';

export default function Timetable() {
    const [file, setFile] = useState();
    useEffect(() => {
        console.log(file)
    }, [file])

    const handleReset = () => {
        setFile()
    }

    const handleSubmit = () => {
        // call an API
    }

    return (
        <div>
            <div class="container">
                <img src={image} alt="image" style={{height: 400, width: "105%", marginLeft: -50, marginTop: -50, objectFit: "cover"}}/>
                <div class="bottom-left"><h1 style={{ fontSize: 50 }}>Upload the new timetable here:</h1></div>
            </div>

            <div style={{width: "95%"}}>
                
                <div style={{ marginTop: 50}}>
                    <FileUpload value={file} onChange={setFile} />
                </div>
                <div style={{display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "space-between"}}>
                    <div></div>
                    <div>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        <Button variant="contained" color="error" onClick={handleReset} style={{margin: 20}}>Reset</Button>
                    </div>
                </div>
            </div>
             {/* <img src={image} style={{width: "60%", height: "100%"}} alt="image" /> */}
       </div>
    );
}

