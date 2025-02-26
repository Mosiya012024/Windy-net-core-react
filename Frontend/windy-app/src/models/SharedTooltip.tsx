import { ClickAwayListener, StyledEngineProvider } from "@mui/material";
import  Tooltip  from "@mui/material/Tooltip";
import React from "react";
import './SharedTooltip.css'
//import styled from "styled-components";


// const StyledSharedTooltip = styled.div`
//     .whiteTooltip {
        
//     }
    
//     .MuiTooltip-tooltip {
//         padding:10px;
//         font-size: 13px;
//         background-color: white;
//         color: blue;
//     }
// `;
interface SharedTooltipProps {
    title:string;
    children: React.ReactElement<any,any>;
    placement:"bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "right-start" | "right" | "top-end" | "top-start" | "top" | undefined;
}

interface SharedTooltipState {
    show: boolean;
}
class SharedTooltip extends React.Component<SharedTooltipProps,SharedTooltipState> {
    constructor(props:any) {
        super(props);
        this.state ={
            show: false,
        }
    }

    handleOpenTooltip = () => {
        this.setState({show: true})
    }

    handleCloseTooltip = () => {
        this.setState({show: false})
    }
    render() {
        
        
        return(
            <>
                <ClickAwayListener onClickAway={()=>this.handleCloseTooltip()}>
                    <Tooltip 
                        classes={{
                            
                            tooltip:"tooltip-bg",
                            arrow:"arrow-bg"
                        }}
                        title={this.props.title} 
                        placement={this.props.placement} 
                        arrow
                        disableFocusListener
                        disableHoverListener
                        onClose={()=>this.handleCloseTooltip()}
                        open={this.state.show}
                    >
                        <div onClick={this.handleOpenTooltip}>{this.props.children}</div>
                    </Tooltip>
                </ClickAwayListener>
            </>
        )
    }
    
}

export default SharedTooltip;