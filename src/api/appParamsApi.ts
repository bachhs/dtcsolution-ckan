import axios from "axios";
export const appParamsApi = {
    getAllParams(){
        return axios.get(
            `/params`,
            { params: { page: 1, size: 9999999 } }
        );
    },
    getAllParamsPaging(requestData:any){
        return axios.get(
            `/params`,
            { params: { page: requestData.page || 1, size: requestData.size || 20 } }
        );
    },
    getParamById(paramId:number){
        return axios.get(
            `/params/${paramId}`,
        );
    },
    addParam(requestData:{ group:string, type:string, key:string, value:string, label:string }){
        return axios.post(
            `/params`, requestData
        );
    },    
    updateParam(paramId:number, requestData:{ group:string, type:string, key:string, value:string, label:string }){
        return axios.put(
            `/params/${paramId}`, requestData
        );
    },
    deleteParam(paramId:number){
        return axios.delete(
            `/params/${paramId}`,
        );
    }
}