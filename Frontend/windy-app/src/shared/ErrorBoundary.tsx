import React, { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

interface ErrorBoundaryProps {
    children: ReactNode
}
interface ErrorBoundaryState {
    hasError: boolean,
}
class ErrorBoundary extends Component<ErrorBoundaryProps,ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error caught by Error Boundary:", error, errorInfo);
    }

    redirectToHome = () => {
        window.open('/', '_self');
    }

    render() {
        console.log(this.state.hasError);
        if(this.state.hasError) {
            return (
                <>
                 <div>Hello error coming up here</div>
                 <button style={{width:'50px',height:'50px',color:'greenyellow'}} onClick={()=>this.redirectToHome()}>Back to Home</button>
                </>
            )
        }
        return this.props.children;
        
    }
}
export default ErrorBoundary;