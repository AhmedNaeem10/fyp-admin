import { useState, useRef } from "react";
import image from "../images/faculty.jpeg";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import dummy from "../images/dummy.jpeg";
import { addFaculty } from "../api/client";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import "react-toastify/dist/ReactToastify.css";
import "./Timetable.css";
import "./Faculty.css";

export default function Faculty() {
  const [file, setFile] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [preview, setPreview] = useState();
  const toastId = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("");
    setGender("");
    setFile();
    setPreview();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      toastId.current = null;
      setLoading(!loading);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);

      const res = await addFaculty(formData, toastId, toast);
      toastId.current = null;
      setLoading(false);

      handleReset();
      if (res.data.status === true) {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          throw new Error(res.data.message);
        }
      }
    } catch (err) {
      setLoading(false);
      handleReset();
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div>
      <div className="container">
        <img
          src={image}
          alt="faculty"
          style={{
            height: 400,
            width: "100%",
            marginTop: -50,
            objectFit: "cover",
          }}
        />
        <div className="bottom-left">
          <h1 style={{ fontSize: 50 }}>Add faculty member here</h1>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  type={"email"}
                  label="Email"
                  variant="outlined"
                  style={{ width: "40ch" }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  type={"number"}
                  label="Age"
                  variant="outlined"
                  style={{ width: "10ch" }}
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                style={{ marginLeft: 10 }}
              >
                Gender
              </FormLabel>
              <RadioGroup
                style={{ marginLeft: 10 }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onSelect={() => {
                    setGender("F");
                  }}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onSelect={() => {
                    setGender("F");
                  }}
                />
              </RadioGroup>
            </Box>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              {/* <img src={dummy} style={{ width: 200, height: 200, borderRadius: 200 }} /> */}
              <div className="flex items-center justify-center">
                <a className="relative block group">
                  <img
                    className="absolute inset-0 object-cover 
                               group-hover:opacity-50"
                    src={file ? preview : dummy}
                    style={{ width: 300, height: 300, borderRadius: 200 }}
                    alt="upload"
                  />
                  <div className="relative p-5 ">
                    <div className="mt-40">
                      <div
                        className="transition-all transform 
                                translate-y-8 opacity-0 
                                group-hover:opacity-100 
                                group-hover:translate-y-0"
                      >
                        <div className="p-2">
                          <p
                            className="text-lg text-white"
                            style={{ color: "black", marginLeft: 30 }}
                          >
                            Click to upload image
                          </p>
                          <input
                            type="file"
                            name="file"
                            accept=".jpg,.jpeg,.png"
                            style={{ marginLeft: 20 }}
                            onChange={(e) => {
                              const objectUrl = URL.createObjectURL(
                                e.target.files[0]
                              );
                              setPreview(objectUrl);
                              setFile(e.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "95%" }}>
        <></>
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
                startIcon={<ModelTrainingIcon />}
                variant="outlined"
              >
                Training...
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
          </div>
        </div>
      </div>
    </div>
  );
}
