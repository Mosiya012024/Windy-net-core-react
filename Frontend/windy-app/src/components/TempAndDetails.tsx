import React from "react";
import styled from "styled-components";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDroplet } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { TbSunset2 } from "react-icons/tb";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { HourlyForecast, WeatherModal } from "../models/Weather";
import { BuildImagefromIconString } from "../shared/Utility";
import SharedTooltip from "../models/SharedTooltip";

const StyledTempAndDetails = styled.div`
    margin: 20px;
    margin-left: 60px;
    margin-right: 60px;
    .round {
        width: 7vh;
        height: 3.3vw;
        background-color: #f17909;
        border-radius: 50%;
        > img {
            position: absolute;
            top: 34.5vh;
            left: 31vw;
         }
    }
    .first-row {
        display:flex;
        justify-content: space-between;
        align-items: center;
        
    }
    .vertical-row {
        display: flex;
        flex-direction: column;
        font-size: x-small;
        .icon {
            margin-top: 2vh;
         }
    }
    .second-row {
        display: flex;
        font-size: small;
        justify-content: space-around;
    }
    .forecast1 {
        text-transform: uppercase;
        text-align: left;
        font-size: small;
        margin: unset;
    }
    .forecast-sub {
        display:flex;
        justify-content: space-between;
       
    }
    .forecast-sub1 {
        display:flex;
        flex-direction: column;
    }

`;

type TempAndDetailsProps = {
    data: WeatherModal
}
class TempAndDetails extends React.Component<TempAndDetailsProps,{}> {
    constructor(props:any) {
        super(props)
        this.state = {

        }

    }
    render() {
        console.log(this.props.data);
        const tempDetails = [
            {
                title: "Real feel",
                value: `${this.props.data.real_feel?.toFixed()}°`,
                icon: FaThermometerEmpty,
            },
            {
                title: "Humidity",
                value: `${this.props.data.humidity}%`,
                icon: BiSolidDroplet,
            },
            {
                title: "Wind",
                value: `${this.props.data.speed}km/h`,
                icon: FaWind
            }
        ]
        const horizontalDetails = [
            {
                title: "Rise",
                value: this.props.data.sunriseDateTime,
                icon: MdOutlineWbSunny
            },
            {
                title: "Set",
                value: this.props.data.sunsetDateTime,
                icon: TbSunset2
            },
            {
                title: "High",
                value: `${this.props.data.temp_max?.toFixed()}°`,
                icon: FaArrowUp
            },
            {
                title: "Low",
                value: `${this.props.data.temp_min?.toFixed()}°`,
                icon: FaArrowDown
            }
        ]
        const data=[1,2,3,4,5];
        return(
            <StyledTempAndDetails>
                <div>
                    <div>{this.props.data.description}</div>
                    <div className="">
                        <div className="first-row">
                            <div className="round"><img src={BuildImagefromIconString(this.props.data.icon)} alt="icon" height={70} width={70}></img></div>
                            <h1 >{this.props.data.temp?.toFixed()}°</h1>
                            <div className="vertical-row">
                                {tempDetails.map((x)=>{
                                    return (<div className="icon"><x.icon></x.icon> {x.title}: {x.value}</div>)
                                })}
                            </div>
                        </div>
                        <br></br>
                        <div className="second-row">
                            {horizontalDetails.map((x)=>{
                                return (<div className="icon"><x.icon></x.icon> {x.title}: {x.value}</div>)
                            })}
                        </div>
                        <br>
                        </br>
                        <div>
                            <h4 className="forecast1">Hourly Forecast</h4>
                            <hr/>
                            <div className="forecast-sub">
                                {
                                    this.props.data.hourlyForecast?.map((x:HourlyForecast)=>{
                                        return (
                                            <div className="forecast-sub1">
                                        <div style={{font:'small-caption'}}>{x.localTime}</div>
                                        <SharedTooltip title={x.message} placement={"top-start"}>
                                            <img style={{cursor:'pointer'}} src={BuildImagefromIconString(x.icon)} alt="icon" height={60} width={60}></img>
                                        </SharedTooltip>
                                        <div>{x.temp?.toFixed()}°</div>
                                        </div>
                                    )
                                    })
                                }
                            </div>
                            
                        </div>
                        <br></br>
                        <div>
                            <h4 className="forecast1">Daily Forecast</h4>
                            <hr/>
                            <div className="forecast-sub">
                                {
                                    this.props.data.dailyForecast?.map((x)=>{
                                        return (
                                            <div className="forecast-sub1">
                                        <div style={{font:'small-caption'}}>{x.localDate}</div>
                                        <SharedTooltip title={x.message} placement={"top-start"}>
                                            <img style={{cursor:'pointer'}} src={BuildImagefromIconString(x.icon)} alt="icon" height={60} width={60}></img>
                                        </SharedTooltip>
                                        <div>{x.temp?.toFixed()}°</div>
                                        </div>
                                    )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </StyledTempAndDetails>
        )
    }
}
export default TempAndDetails;