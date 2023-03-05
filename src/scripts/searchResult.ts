import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { searchDataApi } from "@/api/searchDataApi";

export default {
	setup() {
		const isLoadingResult = ref(true);
		const route = useRoute();
		const router = useRouter();

		const dataset_ownerSelected = ref<string>(route.query.dataset_owner ? route.query.dataset_owner.toString() : "");
		const dataset_nameSelected = ref<string>(route.query.dataset_name ? route.query.dataset_name.toString() : "");		
		const dataset_categoriesSelected = ref<string>(route.query.dataset_categories ? route.query.dataset_categories.toString() : ""); 

		const aggregationsList = ref<any>({
            dataset_owner: Array<any>([]),
            dataset_name: Array<any>([]),
            dataset_categories: Array<any>([]),
        });

		const createAggregationsList = (propName:string, aggregations:any, itemSelected:any) =>{
            let bucketsItem = aggregations[propName].buckets;
            // console.log(`propName, ${propName}`);
            // console.log(`itemSelected`, itemSelected);
            if(bucketsItem.length > 0){                
                aggregationsList.value[propName] = bucketsItem.map((xItem:any) => {
                    return  {
                        ...xItem,
                        selected: (itemSelected && itemSelected === xItem.key ? true : false),
                    }
                });
            }
            else aggregationsList.value[propName] = [];
        }

		const searchInput = ref<any>(null);
		const keyword = ref(route.query.q);
		const querySearch = ref(route.query.q);

		const pagination = ref({
			page: 1,
			size: 20
		});
		const resultSearchData = ref({
			total: {
				value: 8,
				relation: "eq"
			},
			data: []
		})

		const submitSearch = () => {
			let qParam:any = { 
				q: querySearch.value, 
				t: (new Date()).getTime() 
			};
			
			let dSetSelected = aggregationsList.value.dataset_owner.find((xItem:any) =>  xItem.selected);
            if(dSetSelected){
                qParam.dataset_owner = dSetSelected.key;
            }
            
            let dNameSelected = aggregationsList.value.dataset_name.find((xItem:any) =>  xItem.selected);
            if(dNameSelected){
                qParam.dataset_name = dNameSelected.key;
            }
            
            let dCatSelected = aggregationsList.value.dataset_categories.find((xItem:any) =>  xItem.selected);
            if(dCatSelected){
                qParam.dataset_categories = dCatSelected.key;
            }
			router.push({ path: '/search-result', query: qParam });			
		}; 

		onMounted(() =>{
			resultSearchData.value.data = [];
			const searchParams:any =   {
                page: pagination.value.page,
                size: pagination.value.size,
				querySearch: keyword.value,
            }; 
			
			if(dataset_ownerSelected && dataset_ownerSelected.value) searchParams.dataset_owner = dataset_ownerSelected.value;
			if(dataset_nameSelected && dataset_nameSelected.value) searchParams.dataset_name = dataset_nameSelected.value;
			if(dataset_categoriesSelected && dataset_categoriesSelected.value) searchParams.dataset_categories = dataset_categoriesSelected.value;

			searchDataApi.searchData(searchParams).then(({ data }) => {			
				resultSearchData.value.data = data.hits.hits;
				resultSearchData.value.total = data.hits.total;
				createAggregationsList("dataset_owner", data.aggregations, dataset_ownerSelected.value);
				createAggregationsList("dataset_name", data.aggregations, dataset_nameSelected.value);
				createAggregationsList("dataset_categories", data.aggregations, dataset_categoriesSelected.value);
				if(searchInput && searchInput.value) searchInput.value.focus();
				isLoadingResult.value = false;
				
			})
			.catch((error) =>{
				console.error(error);
				isLoadingResult.value = false;
				if(searchInput && searchInput.value) searchInput.value.focus();
			}); 
		});

		const viewDocument = (docItem:any) =>{
            console.log(`viewDocument`, docItem);
			//$('#detailDocModal').modal('show');
			window.open(`/detail-search-result?documentId=${docItem._id}`)
		};

		return {
			isLoadingResult, 
			pagination,
			resultSearchData,
			aggregationsList,
			searchInput,
			keyword,
			querySearch,
			submitSearch,
			viewDocument,
		};
	},
	computed: {
		//...mapState(useDataCategoryStore, ['organization', 'databaseEngineOptions']),

	},
};
