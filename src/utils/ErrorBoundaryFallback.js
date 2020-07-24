import React from "react";
import './ErrorBoundary.css';
import { Button } from "@material-ui/core";

const ErrorBoundaryFallback = ({componentStack,error}) => {

    const handleGoBack = () => {
        window.location.href = '/bookdashboard';
    }

    return <>
    <div className="error-container">
        <div sm={4} className="bg-container"></div>
        <div sm={8} className="msg-container">
            <h1 className="oops">Oops...</h1>
            <h3 className="err-message">Something went wrong</h3>
            <Button  size="small" onClick={handleGoBack} variant="contained" color="primary"> 
                Back to dashboard
            </Button>
        </div>
    </div>
    </>
}

export default ErrorBoundaryFallback;