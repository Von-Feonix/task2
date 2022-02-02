import { Header } from "antd/lib/layout/layout";
import React from "react";
import { withRouter }from "next/router";

const dashboard = ({router})=>{
    
    return (
        <>
        <Header/>
            <div>welcome, {router.query.email}!</div>
        </>
    )
}

export default withRouter(dashboard)