import React from "react";

const ErrorBoundaryFallback = ({componentStack,error}) => {
    return <>
        <h3>Something went wrong</h3>
        {/* <p> {error} </p> */}
    </>
}

export default ErrorBoundaryFallback;