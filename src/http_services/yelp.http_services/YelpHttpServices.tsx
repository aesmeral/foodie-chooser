import axios, { Axios } from 'axios';

class YelpHttpService{
    instance: Axios;

    constructor(){
        const config = {
            headers: {
                Authorization : `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
            },
            baseURL: `https://api.yelp.com/v3/`
        }
        this.instance = axios.create(config);
    };

    async getBusinessSearch(query: any){
        if ((query['latitude'] && query['longitude'] == undefined) || query['location'] === undefined){
            throw new Error('UNKNOWN_LOCATION');
        }
        const queryString = Object.keys(query)
            .map((key) => key + "=" + query[key])
            .join('&');
        const finalPath = `/business/search?${queryString}`;
        return await this.instance.get(finalPath);
    }
}


export default new YelpHttpService();
