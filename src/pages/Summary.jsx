import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import DatePicker from "../components/datepicker/DatePicker";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import image from "../images/report.jpeg";
import ReplayIcon from "@mui/icons-material/Replay";
import IconButton from "@mui/material/IconButton";
import { getAllSlots, getAllVenues, getSummary } from "../api/client.js";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "time",
    headerName: "Time",
    width: 150,
    editable: true,
  },
  {
    field: "VenueName",
    headerName: "Venue",
    width: 150,
    editable: true,
  },
  {
    field: "Name",
    headerName: "Full name",
    width: 150,
    editable: true,
  },
  {
    field: "Email",
    headerName: "Email",
    type: "email",
    width: 220,
    editable: true,
  },
  {
    field: "checkInTime",
    headerName: "Entry time",
    width: 150,
    editable: true,
  },
  {
    field: "checkOutTime",
    headerName: "Exit time",
    width: 150,
    editable: true,
  },
];

export default function DataGridDemo() {
  const [data, setData] = useState([]);
  const [copy, setCopy] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("All time slots");
  const [venue, setVenue] = useState("All venues");
  const [name, setName] = useState("");
  const [slots, setSlots] = useState([]);
  const [venues, setVenues] = useState([]);

  const getDate = () => {
    const today = new Date().toDateString();
    let parts = today.split(" ");
    return parts[0] + ", " + parts[2] + "-" + parts[1] + "-" + parts[3];
  };
  useEffect(() => {
    setDate(getDate());
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
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const tempdate = date.split(", ")[1];
        if (tempdate) {
          // console.log(tempdate);
          //  call api and pass date.split(", ")[1]
          // const response = await axios.get(PASS DATE HERE);
          // setData(response.data)
          const res = await getSummary(tempdate);

          setData(res.data.data);
          setCopy(res.data.data);
        }
      } catch (err) {
        toast.error(err.response.data.detail, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
    fetchData();
  }, [date]);

  useEffect(() => {
    if (name.length) {
      setData(
        copy.filter((val) => {
          if (
            val.Name.toLowerCase().includes(name.toLowerCase()) &&
            (time === "All time slots" || val.time.startsWith(time)) &&
            (venue === "All venues" || val.VenueName.includes(venue))
          ) {
            return true;
          }
          return false;
        })
      );
    } else {
      setData(
        copy.filter((val) => {
          return (
            (time === "All time slots" || val.time.startsWith(time)) &&
            (venue === "All venues" || val.VenueName.includes(venue))
          );
        })
      );
    }
  }, [name]);

  useEffect(() => {
    setData(
      copy.filter((val) => {
        if (
          (time === "All time slots" || val.time.startsWith(time)) &&
          (venue === "All venues" || val.VenueName.includes(venue))
        ) {
          if (name === "") {
            return true;
          } else {
            if (val.Name.toLowerCase().includes(name.toLowerCase())) {
              return true;
            }
            return false;
          }
        }
        return false;
      })
    );
  }, [time]);

  useEffect(() => {
    setData(
      copy.filter((val) => {
        if (
          (venue === "All venues" || val.VenueName.includes(venue)) &&
          (time === "All time slots" || val.time.startsWith(time))
        ) {
          if (name === "") {
            return true;
          } else {
            if (val.Name.toLowerCase().includes(name.toLowerCase())) {
              return true;
            }
            return false;
          }
        }
        return false;
      })
    );
  }, [venue]);

  const handleQuery = async (e) => {
    setName(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handlVenueChange = (e) => {
    setVenue(e.target.value);
  };

  const resetFilter = () => {
    setName("");
    setTime("All time slots");
    setVenue("All venues");
  };

  return (
    <>
      <div class="container">
        <img
          src={image}
          alt="summary"
          style={{
            height: 400,
            width: "100%",
            marginTop: -50,
            objectFit: "cover",
          }}
        />
        <div class="bottom-left">
          <h1 style={{ fontSize: 50 }}>Attendance Report</h1>
        </div>
        <div class="bottom-right" style={{ color: "black" }}>
          <DatePicker setDate={setDate} />
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
              width: "95%",
              alignItems: "center",
            }}
          >
            <h1
              style={{ fontSize: 30, paddingBottom: 20, marginTop: 30 }}
            >{`${date}`}</h1>
            <div>
              <IconButton aria-label="reset" color="primary">
                <ReplayIcon
                  onClick={resetFilter}
                  style={{ marginRight: 8 }}
                  fontSize="large"
                />
              </IconButton>

              <TextField
                style={{ marginTop: 8, paddingRight: 8 }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={handleQuery}
              />

              <Select
                value={time}
                style={{ marginTop: 8 }}
                onChange={handleTimeChange}
              >
                <MenuItem value={"All time slots"}>All time slots</MenuItem>
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
                onChange={handlVenueChange}
              >
                <MenuItem value={"All venues"}>All venues</MenuItem>
                {venues.map((venue) => {
                  return (
                    <MenuItem value={venue.VenueName} key={venue.id}>
                      {venue.VenueName}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
          <Box
            sx={{
              height: "80%",
              width: "80%",
            }}
          >
            {data.length === 0 ? (
              <p
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40%",
                  fontWeight: "bold",
                }}
              >
                Upload the Video Or Video is Processing
              </p>
            ) : (
              <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                // checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
