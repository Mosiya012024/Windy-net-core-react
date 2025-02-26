class Prep extends React.Component {
    /**
     *
     */
    constructor() {
        super();
        this.state = {
            place: ""
        }
        
    }
    componentDidMount = () => {
        const obj = {
            name: 'Mosiya',
            FullName: {
                firstName: "Syeada",
                lastName: 'Mosiya'
            }
        }
        let allKeys = [];
        const recur = (data,allKeys) => {
            Object.keys(data).map((x)=>{
                if(typeof(x) !== 'object') {
                    allKeys.push(x);
                }
                else {
                    allKeys.push(x);
                    this.recur(x,allKeys);
                }
            })
        }
        recur(obj,allKeys);


    }

    componentDidUpdate = () => {
        const handler = setTimeout(()=>{
            if(place) {
                console.log("waiting");
                //make a http request

            }
        }, 50000);
        return () => clearTimeout(handler);
    }

    
}