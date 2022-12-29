import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DatePicker from '../components/datepicker/DatePicker'

const faculty_data = [
    { id: 1, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 2, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 3, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 4, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 5, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 6, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 7, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 8, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 9, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 10, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 11, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 12, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 13, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 14, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" },
    { id: 15, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1"},
    { id: 16, name: 'Snow', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A1" }
];

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'time',
    headerName: 'Time',
    width: 150,
    editable: true,
  },
  {
    field: 'venue',
    headerName: 'Venue',
    width: 150,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Full name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 220,
    editable: true,
  },
  {
    field: 'entry',
    headerName: 'Entry time',
    width: 150,
    editable: true,
  },
  {
    field: 'exit',
    headerName: 'Exit time',
    width: 150,
    editable: true,
  }
];

export default function DataGridDemo() {
    const [data, setData] = useState([]);
    const [date, setDate] = useState("")

    const getDate = () => {
        const today = new Date().toDateString();
        let parts = today.split(" ");
        return parts[0] + ", " + parts[2] + "-" + parts[1] + "-" + parts[3];
    }
    useEffect(()=>{
        setDate(getDate());
    }, []);

    useEffect(()=>{
        async function fetchData(){
            // call api and pass date.split(", ")[1]
            // const response = await axios.get(PASS DATE HERE);
            // setData(response.data)
            setData(faculty_data)
        }
        fetchData();
    }, [date])

    return (
        <>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "95%"}}>
            <h1 style={{fontSize:30}}>Attendance Report:</h1>
            <DatePicker setDate={setDate} />
        </div>
        <h1 style={{fontSize:20, paddingBottom: 20}}>{`${date}`}</h1>
        <Box sx={{ height: 578, width: '95%', marginBottom: 10 }}>
        <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
        />
        </Box>
        </>
    );
}
