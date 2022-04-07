class YelpHttpService {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:8080/https://api.yelp.com/v3/';
    };

    headers(): any {
        return {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
            "Access-Control-Allow-Origin": "*"
        }
    }
    async getBusinessSearch(query: any) {
        if ((query['latitude'] === undefined && query['longitude'] === undefined) && query['location'] === undefined) {
            throw new Error('UNKNOWN_LOCATION');
        }
        const queryString = Object.keys(query)
            .map((key) => key + "=" + query[key])
            .join('&');
        const finalPath = `${this.baseUrl}/businesses/search?${queryString}`;
        return await this.getRequest(finalPath);
    }

    async getRequest(fullUrl: string) {
        const response = await fetch(fullUrl, {
            method: 'GET',
            mode: 'cors',
            headers: { ...this.headers(), 'Content-Type': ' application/json' }
        });
        const data = await response.json();
        //TODO: catch 400 - 500 http request
        return await data;
    }
}


export default new YelpHttpService();
