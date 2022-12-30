import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import image from '../../images/bg.jpeg'
import Faculty from "../../pages/Faculty";

const AppLayout = () => {
    return <div style={{
        padding: '50px 0px 0px 370px'
    }}>
        <Sidebar />
        <Outlet />
        {
            useLocation().pathname.split("/")[1].length == 0 ? 
            <div class="container">
                <img src={image} alt="image" style={{ height: "100vh", width: "100%", marginTop: -50, objectFit: "cover" }} />
                <div class="top-left"><h1 style={{ fontSize: 50, width: "60%" }}>Welcome to Faculty Management Portal</h1></div>
            </div>: <></>
        }
    </div>;
};

export default AppLayout;
