import React, { useEffect, useState } from "react";
import doubleTickLogo from "/doubleTick.png"
import './PageHeader.css'
import { getCustomerCount } from "../../data/api";

const PageHeader = ({count = 1234}) => {

    return(
        <div>
            <div className="pageHeader">
                <img src={doubleTickLogo} className="logo" alt="logo" />
                <span className="company-name">DoubleTick</span>
            </div>
            <div className="pageHeader">
                <span className="customer-heading">All Customers</span>
                <span className="customer-count">{count}</span>
            </div>        
        </div>
    );
}

export default PageHeader;