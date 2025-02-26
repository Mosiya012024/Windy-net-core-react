import React, { Component } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import TempAndDetails from "./TempAndDetails";
import { LocationsModal, WeatherModal } from "../models/Weather";
import { toast } from "react-toastify";
import { red } from "@mui/material/colors";

const StyledHome = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    height: 100vh;
    color: white;
    font-family: sans-serif;
    
    .main {
        height: 93vh;
        background-color: #1E88E5;
        width: 45vw;
        box-shadow: 0px 0px 10px 0px grey;
        padding:15px;
    }
    .cities-list {
        display:flex;
        justify-content:space-evenly;
        align-items: center;
        cursor: pointer;
    }
    input {
        width: 20vw;
        height: 6vh;
        border: none;
        
    }
    .inputs {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 20px;
        // margin-left:60px;
        // margin-right: 60px;
        > div > button {
            background-color: inherit;
            border: none;
            color: white;
            
        }
        // > div >  button: hover {
        //     font-size: 5vh;
        // }
    }
    input:focus-visible {
        outline: none;
    }
    .btn-active {
        cursor: pointer;
        font-size: large;
    }
    .btn-inactive {
        cursor: pointer;
    }
    .favourite-active {
        color: #ffab00;
        cursor: pointer;
        font-size: 3vh;
    }
    .favourite-inactive {
        cursor: pointer;
        font-size: 3vh;
    }
    .fav-dropdown-item {
        border: 1px solid black;
        background-color: white;
        color: black;
        width: 100%;
    }
    .fav-dropdown-item: hover {
        background-color: grey;
    }
    .fav-btn {
        border: 0.5px solid white;
        background-color: inherit;
        color: white;
        width: 100px;
    }
    .fav-dropdown {
       position: absolute;
        left: 61.7%;
        top: 14%;
        width: 100px;
    }
    .save-btn {
        font-size: 20px;
    }
    .save-btn: active {
        background-color: white;
        color: blue;
    }

    
`;

type HomeState = {
    weatherData: WeatherModal,
    tempType: string,
    city:string,
    lattitude: string,
    longitude: string,
    currentFavourite: string,
    showFavouritesDialog: boolean,
    favouriteSelectedFromList: string,
    savedLocations: string[],
    previousCurrentFavourite: string,
    sdata:{}
}
class Home extends Component<{},HomeState> {
    private debounceTimeout: ReturnType<typeof setTimeout> | null = null;
    constructor(props:any) {
        super(props);
        this.state = {
            weatherData: {} as WeatherModal,
            tempType: "C",
            city: "Hyderabad",
            lattitude: "",
            longitude: "",
            currentFavourite:"",
            showFavouritesDialog: false,
            favouriteSelectedFromList: "Favourites list",
            savedLocations: [],
            previousCurrentFavourite: "",
            sdata:{},
        }
    } 

    findAllKeys = (data:any,allKeys: string[]) => {
        
        Object.keys(data).map((x)=>{
            let value = data[x];
            if(typeof value !== 'object') {
                allKeys.push(x);
            }
            else {
                allKeys.push(x);
                this.findAllKeys(value,allKeys);
            }
        })
    }

    componentDidMount() {
        let data = {
            hourlyForecast: {
                localTimes: "12:00:PM",
                localDates: {
                    localExactTime: "12 bja rhe hain",
                    localExactDate: "Bohot bura time chal riya hai"
                },
                icons: "04d",
                temps: 25.5,
                messages: {
                    firstMessage: "Baadalon mein apni life",
                    secondMessage: "Khandon mein life dhoond rhi hun",
                }
            },
            name: "Hyderabad",
            country: "IN",
            lattitude: 17.3753,
            longitude: 78.4744,
            localTime: "08:20 PM",
            localDate: "Saturday, 17 Aug 2024",
            sunriseDateTime: "05:59 AM",
            sunsetDateTime: "06:40 PM",
            description : "Haze",
            temp: 27.230000000000018,
            temp_min: 24.730000000000018,
            temp_max: 27.230000000000018,
            real_feel: 30.05000000000001,
            speed: 4.12,
            humidity: 78,
            icon: "50n",
        }

        //finding all the keys of an object even find the keys of nested object if the application scales we have to get every key in the object
        //done through the some function
        console.log(typeof(data.hourlyForecast))
        let allKeys:string[] = []

        this.findAllKeys(data,allKeys);
        console.log(allKeys);
        
        //using some function to get the first n elements of array or to get the elements till paticular element I can use some or slice or splice
        //here I want to get elements till Alizeh so in some function if I return true then the function stops
        //some function doesn't change the original array
        let duplicateDetails = ["Ayaan","Sanger","Alizeh","Khan","DJ","Ali","Tahir","Taliyar","Khan"];
        let resultDetails:string[] = [];
        
        duplicateDetails.some((x:string)=>{
            if(x === "Alizeh") return true;
            else {
                resultDetails.push(x);
            }
        })
        console.log(resultDetails);

        
        let index:number = duplicateDetails.indexOf("Ali");
        console.log(index);

        //using slice to get the first n elements
        //slice doesn't modify the array and returns a new array that contains elements according to the given conditions.
        let slicedArray = duplicateDetails.slice(0,5);
        console.log(slicedArray);
        console.log(duplicateDetails);

        //using splice to get the first n elements
        //splice modifies the original array that contains elements = (parentArray - array satisfying the conditions) and doesn't returns a new array .
        let splicedArray = duplicateDetails.splice(0,5);
        console.log(splicedArray);
        console.log(duplicateDetails);

        //map function which transforms the array elements
        let transformedArray = duplicateDetails.map((x)=>
        {
            return x+"Taang Utha ke";
        })
        console.log(transformedArray);

        //fill method modifies the orignal array and doesn't return a new array
        //fill method which changes certain elements to a particular value if start index and end index is specified otherwise changes the whole array to a particular value
        let ages = [23,45,12,70,334,76,32,40,123];
        ages.fill(143,2,4);//fills only the second and third index with the value
        console.log(ages);
        
        let allAges = [34,76,32,40,123,345,564,322,654];
        allAges.fill(786);
        console.log(allAges);

        //every method doesn't return a new array and it iterates on all elements of array and returns true if all the elements satisfy the condition other wise returns false.
        let aboveAges = ages.every(x=>x>10);
        console.log(aboveAges);
        console.log(ages.every(x=>x>10));

        //filter method returns a new array and that array will have the elements which pass the condition and doesn't modify the original array
        let allAgesToFilter = [34,76,32,40,123,345,564,322,654];
        let filteredArray = allAgesToFilter.filter((x) => x%4 === 0);
        console.log(filteredArray);

        //find method returns one element which is the first element which satisfies the condition and  applies the test on all elements and doesn't change the original array
        let findArray = [3, 10, 18, 20];
        let findArrayAnswer = findArray.find(x=>x>10);
        console.log(findArrayAnswer);

        //findLast method returns one element which is the last element which satisfies the condition and  applies the test on all elements and doesn't change the original array
        //here the answer is not coming because it is an error of typescript version something but it works in Javascript I swear
        //let findLastArray:number[] = [3, 15, 18, 20];
        // let findLastArrayAnswer = findLastArray.findLast((x:number)=>x>10)
        // console.log(findLastArrayAnswer);

        //findIndex method is use to give the index of the first element which statifies the condition and returns -1 if no element satisfies the condition and this findIndex applies the condition for all elements
        let findIndexArray = [31, 410, 18, 20, 32];
        let findIndexArrayAnswer = findIndexArray.findIndex((x:number)=>x>10);
        console.log(findIndexArrayAnswer);

        //findIndex method is use to give the index of the first element which statifies the condition and returns -1 if no element satisfies the condition and this findIndex applies the condition for all elements
        //here the answer is not coming because it is an error of typescript version something but it works in Javascript I swear
        // let findLastIndexArray = [31, 410, 18, 20, 32];
        // let findLastIndexArrayAnswer = findLastIndexArray.findLastIndex((x:number)=>x>10);
        // console.log(findLastIndexArrayAnswer);

        //from method converts any object which is having a length property to char array and it returns a new array Example here string is an object which has length property like string.length
        let fromArray = Array.from("Mosiya" );
        console.log(fromArray);
        console.log(Array.from(["Puraani Delhi","New Delhi"]));

        //includes method applicable to arrays btw all most all of the above are applicable to arrays only returns a boolean value
        let includesArray =  ['Apple', 'Mango', 'Banana', 'Orange'];
        console.log(includesArray.includes("Mango"))
        console.log(includesArray.includes("Bruno"))

        //indexOf returns the index of that element in array or indexOf of that character in that string
        let name = "Mosiya";
        console.log(name.indexOf('s'))
        let allNames = ['Apple', 'Mango', 'Banana', 'Orange'];
        console.log(allNames.indexOf('Orange'))

        //lastIndexOf returns the last index of that element in array or last index of that character in that string
        let lastname = "Mosiyas";
        console.log(lastname.lastIndexOf('s'))
        let allLastNames = ['Apple', 'Mango', 'Banana', 'Orange','Apple',"djwe"];
        console.log(allLastNames.lastIndexOf('Apple'))

        //isArray() checks if the current object is an array or not
        let checkArray:boolean =  Array.isArray(allNames)
        console.log(checkArray)

        //join method applied only for arrays and returns a string , and doesn't modify the original array
        let tobeJoinArray = ["I","am","Mosiya"];
        let joined = tobeJoinArray.join(" ");
        console.log(joined);

        //pop method - removes the last element from array and returns that
        let fruits = ['Apple', 'Mango', 'Banana', 'Orange'];
        let removed = fruits.pop();
        console.log(removed);

        //push adds the elements to the end of array and returns nothing
        let fruitss = ['Apple', 'Mango', 'Banana', 'Orange'];
        fruitss.push('Mosia')
        console.log(fruitss);

        //reduce - takes an array and returns  a single element and does not change the original array 
        //example can be used in case of summing up the array without using total variable as in for loop we use total+=arr[i];
        let reduceAgesArray = [25,34,56,74,89,32,56,19.8,121];
        let x = 0;
        let reducedNumber = reduceAgesArray.reduce((accumulator,currentValue)=>accumulator+currentValue,x);
        console.log(reducedNumber);

        //reduceRight - takes an array and returns a single element and it works from right to left and does not change the original array 
        //effective if you want to subtract all the elements in an array and array is in ascending order.
        let reduceRightAgesArray = [2, 45, 30, 100]; //answer is 23
        let reducedRightNumber = reduceRightAgesArray.reduceRight((accumulator,currentValue)=>accumulator-currentValue);
        console.log(reducedRightNumber);

        //reverse() - reverses the original array and modifies the original array
        let numbers = [1,2,3,4,5,6,7,8,9];
        numbers.reverse();
        console.log(numbers);

        //toReversed - reverses the array and returns the reversed array and doesn't modify the original array
        //this doesn't work in typescript due to version but try in programiz compiler it works
        // let numbers1 = [1,2,3,4,5,6,7,8,9];
        // let reversedArray = numbers1.toReversed;
        // console.log(reversedArray);
        // console.log(numbers1);

        //sort - arranges the array as strings in ascending order and if it is string array it arranges in alphabetical order and modifies teh original array
        let numbers3 = [15,10,3,5,9,20,34,23,67,35];
        numbers3.sort()
        console.log(numbers3);

        let numbers4 = ["Banana", "Orange", "Apple", "Mango"];
        numbers4.sort()
        console.log(numbers4);

        // //toSorted - arranges the array as strings in ascending order and if it is string array it arranges in alphabetical order and does not modifies the original array and returns the new array
        // let numbers5 = [15,10,3,5,9,20,34,23,67,35];
        // let tosortedArray = numbers5.toSorted()
        // console.log(numbers5);
        // console.log(tosortedArray);

        // let numbers6 = ["Banana", "Orange", "Apple", "Mango"];
        // let tosortedArray1 = numbers6.toSorted()
        // console.log(numbers6);
        // console.log(tosortedArray1);

        //toSpliced - get some portion of the array based on index and same as splice and returns a new array and doesn't modify the original array
        // let numbers7 = ["Banana", "Orange", "Apple", "Mango"];
        // let tosortedArray1 = numbers7.toSpliced(1,3)
        // console.log(numbers7);
        // console.log(tosortedArray1);

        //toString - converts anything to string ex- char, number, double only
        let stringName = 2323;
        console.log(stringName.toString())
        console.log(232.55465.toString());
        console.log('Mosiya'.toString());

        //shift() - removes the first element of array and returns removed element and changes the original array
        let numbers8 = ["Banana", "Orange", "Apple", "Mango"];
        let shiftedElement = numbers8.shift();
        console.log(numbers8);
        console.log(shiftedElement);

        //unshift() - adds new elements to the start of the array and modifies the original array and we can any number of elements
        let numbers9 = ["Banana", "Orange", "Apple", "Mango"];
        numbers9.unshift("I","me","Anything");
        console.log(numbers9);

        //with() - array.with(index, value) replaces the elemnet with specified index with the given value and returns a new array and doesn't modify the original array
        //not working here but works with the correct typescript version I swear
        // let numbers10 = ["Banana", "Orange", "Apple", "Mango"];
        // let modifiedArray = numbers10.with(1,"Mosiya");
        // console.log(modifiedArray);
        // console.log(numbers10);







        this.fetchApiData();
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<HomeState>, snapshot?: any): void {
        if((prevState.city !== this.state.city && this.state.city !== "") || prevState.tempType !== this.state.tempType) {
            // setTimeout(() => {
            //     this.fetchApiData();
            // }, 5000); 

            //it waits for 5000 milliseconds after the user stops typing before making the API call.
            //once the user stops typing , it waits for 5s and then makes API call, this means the user has to continuously type, if he types something
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
              }
        
              // Set a new timeout
              this.debounceTimeout = setTimeout(() => {
                this.fetchApiData();
              }, 3000); // Adjust the timeout duration as needed

           
        }
    }

    fetchApiData = () => {
        let filterData = "";
        if(this.state.city !== "") {
            filterData += `&city=${this.state.city}`
        }
        if(this.state.lattitude !== "") {
            filterData += `&lattitude=${this.state.lattitude}`
        }
        if(this.state.longitude !== "") {
            filterData += `&longitude=${this.state.longitude}`
        }
        axios.get(`https://localhost:7115/get/Weather?&tempType=${this.state.tempType}`+filterData)
        .then((res)=>{
            console.log(res);
            console.log(res?.data?.data);
            this.setState({weatherData: res?.data?.data});
            let area = this.state.city === "" ? "current location" : this.state.city;
            toast.success(`Successfully fetched weather for ${area}`!,{
                autoClose: 5000
            });
        })
        .catch((response)=>{
            const errorMsg:string = response?.response?.data?.errors[0];
            toast.error(errorMsg,{
                autoClose: 5000,
            });
            throw new Error("I crashed the application")
        })


        axios.get(`https://localhost:7115/api/WeatherForecast/get/user/favourites`)
        .then((result)=>{
            console.log(result?.data?.data);
            let locationsData: LocationsModal =  result?.data?.data?.filter((item:LocationsModal) => item.username === "Mosiya")[0];
            console.log(locationsData);
            this.setState({savedLocations: locationsData.favourites});
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    setInputField = (value: any) => {
        this.setState({city: value,favouriteSelectedFromList:""});
    }

    handleSearch = () => {
        if(!this.state.savedLocations.includes(this.state.city)) 
            this.setState({currentFavourite:""})
        //this.fetchApiData();
    }

    handleParticularCityOrTempType =(type:string,value: string) => {
        if(type === "city") {
            this.setState(
                {city: value,currentFavourite:this.state.savedLocations.includes(value) ? value : "",favouriteSelectedFromList:"",lattitude:"",longitude:""},
                // ()=>{this.fetchApiData();}
            );
            // this.setState((prevState)=>({
            //     currentFavourite: prevState.currentFavourite === "" ? "" : ""
            // }))
        }
        else {
            this.setState(
                {tempType: value,lattitude:"",longitude:""},
                // ()=>{this.fetchApiData();}
            );
        }
        
    }

    handleCurrentLocationClick = () => {
        if (navigator.geolocation) {
          toast.info("Fetching users location.");
          
          navigator.geolocation.getCurrentPosition((position) => {
            toast.success("Location fetched!");
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log(lon, lat);
            this.setState(
                {city: "",lattitude: lat.toString(),longitude:lon.toString()},
                ()=>{this.fetchApiData()}
                
            )
          });
        }
    };
    addLocationToFavourites = () => {
        console.log(this.state.currentFavourite)
        if(this.state.currentFavourite === "") 
            this.setState({currentFavourite: this.state.city});
        else {
            this.setState((prevState)=>({
                previousCurrentFavourite: prevState.currentFavourite,
                currentFavourite: "",
            }))
        }
            
    }

    handleFavouriteBtn = () => {
        this.setState({showFavouritesDialog: !this.state.showFavouritesDialog})
    }

    setFavouriteFromLocations = (value:string) => {
        this.setState({favouriteSelectedFromList: value,showFavouritesDialog:false});
        if(value !== "Favourites list") {
            this.setState({city: value,currentFavourite:value},
                // ()=>this.fetchApiData()
            );
        }
    }

    handleSaveLocations = () => {
        if(this.state.savedLocations.includes(this.state.previousCurrentFavourite) && this.state.currentFavourite === "") {
            axios.delete(`https://localhost:7115/api/WeatherForecast/delete/user/favourite?favouriteData=${this.state.previousCurrentFavourite}&name=Mosiya`)
            .then((result) => {
                console.log(result?.data?.data);
                console.log(result?.data?.data[0]);
                let locationsData: LocationsModal = result?.data?.data;
                this.setState({savedLocations: locationsData.favourites});
            })
        }
        if(this.state.currentFavourite !== "" && !this.state.savedLocations.includes(this.state.currentFavourite)) {
            axios.put(`https://localhost:7115/api/WeatherForecast/put/user/favourite?favouriteData=${this.state.currentFavourite}&name=Mosiya`)
            .then((result) => {
                console.log(result?.data?.data);
                console.log(result?.data?.data[0]);
                let locationsData: LocationsModal = result?.data?.data;
                this.setState({savedLocations: locationsData.favourites});
            })
        }
    }

    
    render() {
        const cities = [
            "London","Paris","Tokyo","Toronto"
        ];
        console.log(this.state.currentFavourite)
        let favouriteLocations = ["Favourites list","Hyd","Bangalore","Mysore","Karnataka"];
        console.log(this.state.savedLocations);
        if(this.state.currentFavourite === "London") {
            throw new Error('I crashed!');
        }

        return(
            <StyledHome>
                <div className="main">
                    <div className="cities-list">
                        {cities.map((x)=>{
                            return (<div style={{cursor: 'pointer'}} onClick={()=>this.handleParticularCityOrTempType("city",x)}>{x}</div>)
                        })}
                    </div>
                    <div className="inputs">
                        <input type="search" onChange={(e)=>{this.setInputField(e.target.value)}} placeholder="search for city..." value={this.state.city} >
                        </input>
                        <IoSearchOutline style={{fontSize:'5vh', cursor:'pointer'}} onClick={this.handleSearch}></IoSearchOutline>
                        <MdMyLocation style={{fontSize:'5vh',cursor:'pointer'}} onClick={this.handleCurrentLocationClick}></MdMyLocation>
                        <div>
                            <button disabled={this.state.tempType === "C"} onClick={()=>this.handleParticularCityOrTempType("tempType","C")} className={this.state.tempType === "C" ? "btn-active": "btn-inactive"} >°C</button>
                            <span>|</span>
                            <button disabled={this.state.tempType === "F"} onClick={()=>this.handleParticularCityOrTempType("tempType","F")} className={this.state.tempType === "F" ? "btn-active": "btn-inactive"} > °F</button>
                        </div>
                        <FaStar className={this.state.currentFavourite !== "" || (this.state.currentFavourite !== "" && this.state.savedLocations.includes(this.state.currentFavourite))? "favourite-active" : "favourite-inactive"}  onClick={this.addLocationToFavourites}></FaStar>
                        <span><button className="fav-btn" onClick={()=>{this.handleFavouriteBtn()}}>{!this.state.savedLocations.includes(this.state.favouriteSelectedFromList)  ? "Favourites list" : this.state.favouriteSelectedFromList}</button></span>
                        <CiBookmark className="save-btn" onClick={this.handleSaveLocations}></CiBookmark>
                        <div className="fav-dropdown">
                            {this.state.showFavouritesDialog && 
                            this.state.savedLocations?.map((x)=>{
                                return (<div className="fav-dropdown-item" onClick={()=>{this.setFavouriteFromLocations(x)}}>{x}</div>)
                            })}
                        </div>
                    </div>
                    <div className="current-date-time">{this.state.weatherData?.localDate} | Local Time: {this.state.weatherData.localTime}</div>
                    <h3>{this.state.weatherData.name}, {this.state.weatherData.country}</h3>
                    <TempAndDetails data={this.state.weatherData}></TempAndDetails>
                </div>
            </StyledHome>
        )
    }
}

export default Home;