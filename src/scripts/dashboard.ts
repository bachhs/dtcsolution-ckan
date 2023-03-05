import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
// import { mapState } from "pinia";
// import { useDataCategoryStore } from '@/stores/dataCategory';

export default {
	setup(props: any, { root }: any) {
		const router = useRouter()
		const route = useRoute();
		const searchInput = ref<any>(null);

		const querySearch = ref("");
		const submitSearch = () => {
			router.push({ path: '/search-result', query: { q: querySearch.value } });
		};

		onMounted(() =>{			
			if(searchInput && searchInput.value) searchInput.value.focus();
		});
		return {
			searchInput,
			querySearch,
			submitSearch
		};
	},
};
