import React, { useEffect } from 'react';

import { withRouter } from 'react-router-dom'

//redux store


/**
 * Logouts the user
 * @param {*} props 
 */
function logoutUser(history ) {
    try {
        localStorage.removeItem("authUser");
        history.push("/login");
       
    } catch (error) { }
}

const Logout = (props) => {
    useEffect(() => {
        logoutUser(props.history);
    }, [props]);

    return (<React.Fragment></React.Fragment>)
}

export default withRouter(Logout);