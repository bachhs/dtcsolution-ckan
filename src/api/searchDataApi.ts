import axios from 'axios';
const omAxios = axios.create({
    baseURL: import.meta.env.VITE_OPEN_METADATA_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
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
    getDocumentDetail(docId:any){
        return axios.get(`/ckan/detail/${docId}`);
    },
    fetchSampleData( datasourceName: string, databaseName: string, schemaName: string, tableName: string ) {
        return omAxios.get(
            `/tables/name/${datasourceName}.${databaseName}.${schemaName}.${tableName}`,
            {
                params: {
                    fields: 'sampleData',
                },
            }
        );
    },
}