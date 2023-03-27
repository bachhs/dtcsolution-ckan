import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { searchDataApi } from "@/api/searchDataApi";

export default {
	setup() {
		const isLoadingResult = ref(true);
		const route = useRoute();
		const router = useRouter();
		const documentId = ref<string>(route.query.documentId ? route.query.documentId.toString() : "");
		const documentDetailData:any = ref(null); 

		const searchInput = ref<any>(null);
		const querySearch = ref(""); 

		const getSampleData = () => {
			if(documentDetailData.value && documentDetailData.value != null){
				searchDataApi.fetchSampleData(
					documentDetailData.value.service.name,
					documentDetailData.value.database.name,
					documentDetailData.value.databaseSchema.name,
					documentDetailData.value.name
				).then(({ data }) => {	
					console.log('fetchSampleData', data.sampleData);
					documentDetailData.value.sampleData = data.sampleData;
				})
				.catch((error) =>{
					console.error(error);
				}); 
			}
		}

		const submitSearch = () => {
			router.push({ path: '/search-result', query: { q: querySearch.value } });		
		}; 

		onMounted(() =>{ 
			searchDataApi.getDocumentDetail(documentId.value).then(({ data }) => {			
				documentDetailData.value = data;
				getSampleData();
				isLoadingResult.value = false;
				
			})
			.catch((error) =>{
				console.error(error);
				isLoadingResult.value = false;
			}); 
		}); 

		return {
			isLoadingResult, 
			searchInput, 
			querySearch,
			submitSearch,
			documentDetailData,
		};
	}, 
};
