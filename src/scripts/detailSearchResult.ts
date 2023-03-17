import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { searchDataApi } from "@/api/searchDataApi";

export default {
	setup() {
		const isLoadingResult = ref(false);
		const route = useRoute();
		const router = useRouter();
		const documentId = ref<string>(route.query.documentId ? route.query.documentId.toString() : "");
		const documentDetailData:any = ref({}); 

		const searchInput = ref<any>(null);
		const querySearch = ref(""); 

		const submitSearch = () => {
			router.push({ path: '/search-result', query: { q: querySearch.value } });		
		}; 

		onMounted(() =>{ 
			console.log('docId', documentId.value);
			searchDataApi.getDocumentDetail(documentId.value).then(({ data }) => {			
				documentDetailData.value = data;
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
