import { ref, reactive, onMounted, onUnmounted } from "vue";
import { defineAsyncComponent } from 'vue';
import SkeletonBox from '@/components/SkeletonBox.vue';
import { useRoute, useRouter } from 'vue-router';
import { searchDataApi } from "@/api/searchDataApi";
import { mapState } from 'pinia';
import { useDataCategoryStore } from '@/stores/dataCategory';
export default {
	components: {
		FilterAggregation: defineAsyncComponent({
            loader: () => import('@/views/SearchResultComp/FilterComp.vue'),
            loadingComponent: SkeletonBox,
        }),
	},
	setup() {
		const timeProcColorMap = ["muted",  "primary", "orange", "indigo", "info", "success"];

		const isLoadingResult = ref(true);
		const isToggleFilterBlock = ref(false);

		const toggleFilterBlock = () => {
			isToggleFilterBlock.value = !isToggleFilterBlock.value;
			if(isToggleFilterBlock.value){
				$('body').addClass('search-aggregation-toggled');
			}
			else{
				$('body').removeClass('search-aggregation-toggled');
			}
		}

		const route = useRoute();
		const router = useRouter(); 

		const countFilterSelected = ref(0);
		const filterSelected:any = reactive({
			Database : (route.query.schemas ? route.query.schemas.toString() : ""),		
			//EntityType : (route.query.EntityType ? route.query.EntityType.toString() : ""), 
			Service : (route.query.dialects ? route.query.dialects.toString() : ""),
			//ServiceCategory : (route.query.ServiceCategory ? route.query.ServiceCategory.toString() : ""), 
			ServiceName : (route.query.service_names ? route.query.service_names.toString() : ""), 
			Tags : (route.query.tags ? route.query.tags.toString() : ""),
			//Tier : (route.query.Tier ? route.query.Tier.toString() : ""),  
		}); 

		const aggregationsList = ref<any>({
            Database: Array<any>([]),
            //EntityType: Array<any>([]), 
            Service: Array<any>([]),
            //ServiceCategory: Array<any>([]),
            ServiceName: Array<any>([]),
            Tags: Array<any>([]),
            //Tier: Array<any>([]),
        });

		const aggregationKeys = ref(Object.keys(aggregationsList.value));
		const aggregationFilterParams:any = {
			Database: "schemas",
            //EntityType: Array<any>([]), 
            Service: "dialects",
            //ServiceCategory: Array<any>([]),
            ServiceName: "service_names",
            Tags: "tags",
            //Tier: Array<any>([]),
		};

		const createAggregationsList = (propName:string, aggregations:any, itemSelected:any) =>{
            let bucketsItem = aggregations[`sterms#${propName}`].buckets; 
            if(bucketsItem.length > 0){                
                aggregationsList.value[propName] = bucketsItem.map((xItem:any) => {
                    return  {
                        ...xItem,
                        selected: (itemSelected && itemSelected === xItem.key ? true : false),
                    }
                });				
				countFilterSelected.value += aggregationsList.value[propName].filter((xItem:any) => xItem.selected).length;
            }
            else aggregationsList.value[propName] = [];
        }

		const searchInput = ref<any>(null);
		const keyword = ref(route.query.q);
		const querySearch = ref(route.query.q);
		const filterData = ref({});

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

		const submitSearch = (forceNew:boolean = false) => {
			let qParam:any = { 
				q: querySearch.value, 
				t: (new Date()).getTime() 
			};
			
			if(!forceNew){
				console.log('submitSearch forceNew', forceNew);
				Object.keys(aggregationsList.value).forEach((aggKey:string) => {
					console.log('submitSearch aggKey', aggKey);
					let aggItemSelected = aggregationsList.value[aggKey].find((xItem:any) =>  xItem.selected);
					console.log('submitSearch aggItemSelected', aggItemSelected);
					if(aggItemSelected) {
						qParam[aggregationFilterParams[aggKey]] = aggItemSelected.key;
					}
				});	
			}		
			else{
				countFilterSelected.value = 0;
			}			
			router.push({ path: '/search-result', query: qParam });			
		}; 

		const onWindowResize = () => {
			if(isToggleFilterBlock.value){
				toggleFilterBlock();
			}
		};

		onMounted(() =>{
			window.addEventListener("resize", onWindowResize);
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

		onUnmounted(() => {
			window.removeEventListener("resize", onWindowResize);
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
			filterData,
			aggregationKeys,
			countFilterSelected,
			isToggleFilterBlock,
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
			toggleFilterBlock,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'databaseEngineOptions']),
	},
};
