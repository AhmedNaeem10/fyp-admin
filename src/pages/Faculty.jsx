import { useEffect } from "react";
import { useState } from "react";
import FileUpload from "react-material-file-upload";
import image from '../images/faculty.jpeg';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import dummy from '../images/dummy.jpeg'
import './Timetable.css';
import './Faculty.css';

export default function Faculty() {
  const [file, setFile] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [preview, setPreview] = useState();

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("");
    setGender("");
    setFile()
  }

  const handleSubmit = () => {
    const data = { firstName, lastName, age, email, gender, file };
    console.log(data);
    // call an API
  }

  useEffect(()=>{
    console.log(file)
  }, [file])

  return (
    <div>
      <div class="container">
        <img src={image} alt="image" style={{ height: 300, width: "105%", marginLeft: -50, marginTop: -50, objectFit: "cover" }} />
        <div class="bottom-left"><h1 style={{ fontSize: 50 }}>Upload new faculty member here:</h1></div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
            <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
            <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
          </div>
          <div>
            <TextField id="outlined-basic" type={"email"} label="Email" variant="outlined" style={{ width: "40ch" }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <TextField id="outlined-basic" type={"number"} label="Age" variant="outlined" style={{ width: "10ch" }} value={age} onChange={(e) => { setAge(e.target.value) }} />
          </div>
          <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginLeft: 10 }}>Gender</FormLabel>
          <RadioGroup
            style={{ marginLeft: 10 }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" onSelect={() => { setGender("F") }} />
            <FormControlLabel value="male" control={<Radio />} label="Male" onSelect={() => { setGender("F") }} />
          </RadioGroup>
        </Box>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          {/* <img src={dummy} style={{ width: 200, height: 200, borderRadius: 200 }} /> */}
          <div class="flex items-center justify-center">
                <a class="relative block group" 
                    >
                    <img class="absolute inset-0 object-cover 
                               group-hover:opacity-50"
                        src={file? preview: dummy} style={{width: 300, height: 300, borderRadius: 200}} />
                    <div class="relative p-5">
                        <div class="mt-40">
                            <div class="transition-all transform 
                                translate-y-8 opacity-0 
                                group-hover:opacity-100 
                                group-hover:translate-y-0">
                                <div class="p-2">
                                    <p class="text-lg text-white" style={{color: "black", marginLeft: 30}}>
                                        Click to upload image
                                    </p>
                                    <input type="file" name="file" accept=".jpg,.jpeg,.png" style={{marginLeft: 20}} onChange={(e)=>{
                                      const objectUrl = URL.createObjectURL(e.target.files[0])
                                      setPreview(objectUrl)
                                      setFile(e.target.files[0])}
                                      }/>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
      </div>
      <div style={{ width: "95%" }}>
        <></>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
          <div></div>
          <div>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button variant="contained" color="error" onClick={handleReset} style={{ margin: 20 }}>Reset</Button>
          </div>
        </div>
      </div>
      {/* <img src={image} style={{width: "60%", height: "100%"}} alt="image" /> */}
    </div>
  );
}

