import { useState, useRef } from "react";
import FileUpload from "react-material-file-upload";
import image from "../images/timetable.jpeg";
import Button from "@mui/material/Button";
import { sendFile } from "../api/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import "./Timetable.css";

export default function Timetable() {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const toastId = useRef(null);

  const handleReset = () => {
    setLoading(false);
    setFile();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      toastId.current = null;
      setLoading(!loading);
      const formData = new FormData();
      formData.append("file", ...file);
      const res = await sendFile(formData, toastId, toast);
      handleReset();
      setLoading(false);

      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } catch (err) {
      setLoading(false);
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(err.response.data.detail, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div>
      <div className="container" style={{ backgroundColor: "pink" }}>
        <img
          src={image}
          alt="timetable"
          style={{
            height: 400,
            width: "100%",
            marginTop: -50,
            objectFit: "cover",
          }}
        />
        <div className="bottom-left">
          <h1 style={{ fontSize: 50 }}>Upload the new timetable here</h1>
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
          <div style={{ marginTop: 50 }}>
            <FileUpload value={file} onChange={setFile} />
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
                  Extracting...
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
    </div>
  );
}
