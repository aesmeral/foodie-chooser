import axios, { Axios } from 'axios';

class YelpHttpService{
    // instance: Axios;
    baseUrl: string;

    constructor(){
        /* const config = {
            mode: 'no-cors',
            headers: {
                Authorization : `${process.env.REACT_APP_YELP_API_KEY}`
            },
            baseURL: `https://api.yelp.com/v3/`
        } */
        this.baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/';
        // this.instance = axios.create(config);
    };

    headers() : any {
        return { 
            Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
            "Access-Control-Allow-Origin" : "*"
        }
    }
    async getBusinessSearch(query: any){
        if ((query['latitude'] === undefined && query['longitude'] === undefined) && query['location'] === undefined){
            throw new Error('UNKNOWN_LOCATION');
        }
        const queryString = Object.keys(query)
            .map((key) => key + "=" + query[key])
            .join('&');
        const finalPath = `${this.baseUrl}/businesses/search?${queryString}`;
        const response =  await fetch(finalPath, {
            method: 'GET',
            mode: 'cors',
            headers: { ...this.headers(), 'Content-Type':' application/json'}
        })
        const data = await response.json();
        return data;
    }
}


export default new YelpHttpService();
