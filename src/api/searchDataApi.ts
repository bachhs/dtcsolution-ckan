import axios from 'axios';
export const searchDataApi = {
    searchData(params: any) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
            q: params.querySearch
        };
        if(params.dataset_owner) requestParams.dataset_owner = params.dataset_owner; 
        if(params.dataset_name) requestParams.dataset_name = params.dataset_name; 
        if(params.dataset_categories) requestParams.dataset_categories = params.dataset_categories;
        return axios.get(`ckan/search`, { params: requestParams });
    },
    getDocumentDetail(docId:number){
        return axios.get(`/doc/${docId}`);
    }
}