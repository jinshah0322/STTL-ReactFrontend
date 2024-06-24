import React from "react";
import { Layout } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer"
import { Navigate } from "react-router-dom";
const { Content } = Layout;

const UserPublicRoute = ({ component: Component, ...rest }) => {
    return (
        <div>
            <Navbar />
            <div style={{ padding: "0", marginTop: "16vh" }}>
                <Component />
            </div>
            <Footer/>
        </div>
    );
};

export default UserPublicRoute;