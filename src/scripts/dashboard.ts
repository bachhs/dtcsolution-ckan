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

		const updateNews = [
			{
				title: "Siết chặt, kỷ cương, tăng cường hiệu quả trong ngành Thanh tra",
				description: "Sáng nay 14-3, tại Thanh tra tỉnh đã diễn ra lễ Ký giao ước thi đua năm 2023 giữa ngành Thanh tra của 7 tỉnh trong cụm thi đua số V gồm: Tuyên Quang, Thái Nguyên, Bắc Giang, Bắc Kạn, Hoà Bình, Yên Bái và Phú Thọ.",
			}
		]

		return {
			searchInput,
			querySearch,
			submitSearch,
			updateNews
		};
	},
};
