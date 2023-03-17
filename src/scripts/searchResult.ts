import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { searchDataApi } from "@/api/searchDataApi";
export default {
	setup() {
		const timeProcColorMap = ["muted",  "primary", "orange", "indigo", "info", "success"];

		const isLoadingResult = ref(true);
		const route = useRoute();
		const router = useRouter(); 

		const filterSelected:any = reactive({
			Database : (route.query.Database ? route.query.Database.toString() : ""),		
			EntityType : (route.query.EntityType ? route.query.EntityType.toString() : ""), 
			Service : (route.query.Service ? route.query.Service.toString() : ""),
			ServiceCategory : (route.query.ServiceCategory ? route.query.ServiceCategory.toString() : ""), 
			ServiceName : (route.query.ServiceName ? route.query.ServiceName.toString() : ""), 
			Tags : (route.query.Tags ? route.query.Tags.toString() : ""),
			Tier : (route.query.Tier ? route.query.Tier.toString() : ""),  
		}); 

		const aggregationsList = ref<any>({
            Database: Array<any>([]),
            EntityType: Array<any>([]), 
            Service: Array<any>([]),
            ServiceCategory: Array<any>([]),
            ServiceName: Array<any>([]),
            Tags: Array<any>([]),
            Tier: Array<any>([]),
        });

		const aggregationKeys = ref(Object.keys(aggregationsList.value));

		const createAggregationsList = (propName:string, aggregations:any, itemSelected:any) =>{
            let bucketsItem = aggregations[`sterms#${propName}`].buckets; 
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
			size: 10
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
			
			Object.keys(aggregationsList.value).forEach((aggKey:string) => {
				let aggItemSelected = aggregationsList.value[aggKey].find((xItem:any) =>  xItem.selected);
				if(aggItemSelected) qParam[aggKey] = aggItemSelected.key;
			});						
			router.push({ path: '/search-result', query: qParam });			
		}; 

		onMounted(() =>{
			resultSearchData.value.data = [];
			const searchParams:any =   {
                page: pagination.value.page,
                size: pagination.value.size,
				querySearch: keyword.value,
            }; 
			
			Object.keys(aggregationsList.value).forEach((aggKey:string) => { 
				if(filterSelected[aggKey]) searchParams[aggKey] = filterSelected[aggKey];
			});	 

			searchDataApi.searchData(searchParams).then(({ data }) => {		
				console.log(`searchDataApi`, data);	
				resultSearchData.value.data = data.hits.hits;
				resultSearchData.value.total = data.hits.total;
				Object.keys(aggregationsList.value).forEach((aggKey:string) => {
					createAggregationsList(aggKey, data.aggregations, filterSelected[aggKey]);
				});						 
				if(searchInput && searchInput.value) searchInput.value.focus();
				isLoadingResult.value = false;
				
			})
			.catch((error) =>{
				console.error(error);
				isLoadingResult.value = false;
				if(searchInput && searchInput.value) searchInput.value.focus();
			}); 
		});

		const timeProcessDocument = (documentTimeString:string) => {
			let dptWithoutLastChunk = documentTimeString.slice(0, documentTimeString.lastIndexOf("\n"));
			let dptStepTime:Array<string> = dptWithoutLastChunk.split("\n");
			return dptStepTime.map(xItem => {
				let splitLabel = xItem.split(":");
				return {
					label: splitLabel[0] ? splitLabel[0].trim() : "",
					value: splitLabel[1] ? splitLabel[1].trim() : "",
				}
			});
		}

		const safeText = (textValue:string) => {
			if(textValue) return textValue;
			else return "";
		};

		const viewDocument = (docItem:any) =>{
            console.log(`viewDocument`, docItem);
			//$('#detailDocModal').modal('show');
			window.open(`/detail-search-result?documentId=${docItem._id}`)
		};

		return {
			aggregationKeys,
			safeText,
			timeProcColorMap,
			isLoadingResult, 
			pagination,
			resultSearchData,
			aggregationsList,
			searchInput,
			keyword,
			querySearch,
			submitSearch,
			timeProcessDocument,
			viewDocument,
		};
	},
	computed: {
		//...mapState(useDataCategoryStore, ['organization', 'databaseEngineOptions']),

	},
};
