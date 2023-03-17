import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { searchDataApi } from "@/api/searchDataApi";
export default {
	setup() {
		const timeProcColorMap = ["muted",  "primary", "orange", "indigo", "info", "success"];

		const isLoadingResult = ref(true);
		const route = useRoute();
		const router = useRouter();

		const DatabaseSelected = ref<string>(route.query.Database ? route.query.Database.toString() : "");		
		const EntityTypeSelected = ref<string>(route.query.EntityType ? route.query.EntityType.toString() : ""); 
		const ServiceSelected = ref<string>(route.query.Service ? route.query.Service.toString() : "");
		const ServiceCategorySelected = ref<string>(route.query.ServiceCategory ? route.query.ServiceCategory.toString() : ""); 
		const ServiceNameSelected = ref<string>(route.query.ServiceName ? route.query.ServiceName.toString() : ""); 
		const TagsSelected = ref<string>(route.query.Tags ? route.query.Tags.toString() : "");
		const TierSelected = ref<string>(route.query.Tier ? route.query.Tier.toString() : "");  

		const aggregationsList = ref<any>({
            Database: Array<any>([]),
            EntityType: Array<any>([]), 
            Service: Array<any>([]),
            ServiceCategory: Array<any>([]),
            ServiceName: Array<any>([]),
            Tags: Array<any>([]),
            Tier: Array<any>([]),
        });

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
			
			let dSetSelected = aggregationsList.value.Service.find((xItem:any) =>  xItem.selected);
            if(dSetSelected) qParam.Service = dSetSelected.key;
            
            let dbSelected = aggregationsList.value.Database.find((xItem:any) =>  xItem.selected);
            if(dbSelected) qParam.Database = dbSelected.key;
            
            let qEntityTypeSelected = aggregationsList.value.EntityType.find((xItem:any) =>  xItem.selected);
            if(qEntityTypeSelected) qParam.EntityType = qEntityTypeSelected.key;

			router.push({ path: '/search-result', query: qParam });			
		}; 

		onMounted(() =>{
			resultSearchData.value.data = [];
			const searchParams:any =   {
                page: pagination.value.page,
                size: pagination.value.size,
				querySearch: keyword.value,
            }; 
			
			if(ServiceSelected && ServiceSelected.value) searchParams.Service = ServiceSelected.value;
			if(DatabaseSelected && DatabaseSelected.value) searchParams.schemas = DatabaseSelected.value;
			if(EntityTypeSelected && EntityTypeSelected.value) searchParams.EntityType = EntityTypeSelected.value;

			searchDataApi.searchData(searchParams).then(({ data }) => {			
				resultSearchData.value.data = data.hits.hits;
				resultSearchData.value.total = data.hits.total;
				createAggregationsList("Service", data.aggregations, ServiceSelected.value);
				createAggregationsList("Database", data.aggregations, DatabaseSelected.value);
				createAggregationsList("EntityType", data.aggregations, EntityTypeSelected.value);
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
