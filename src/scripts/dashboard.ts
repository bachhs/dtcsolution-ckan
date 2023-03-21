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
				imgUrl: "https://tuyenquang.gov.vn/noidung/tintuc/PublishingImages/Vu%20Kien/2023/T%203/img_20230314145702%20tt%20cum%20v.jpg",
				title: "Siết chặt, kỷ cương, tăng cường hiệu quả trong ngành Thanh tra",
				description: "Sáng nay 14-3, tại Thanh tra tỉnh đã diễn ra lễ Ký giao ước thi đua năm 2023 giữa ngành Thanh tra của 7 tỉnh trong cụm thi đua số V gồm: Tuyên Quang, Thái Nguyên, Bắc Giang, Bắc Kạn, Hoà Bình, Yên Bái và Phú Thọ.",
			},
			{
				imgUrl: "https://tuyenquang.gov.vn/noidung/tintuc/PublishingImages/Vu%20Kien/2023/T%202/bac-si-la-dang-tai-pho-giam-doc-so-y-te-tuyen-quang-1.jpg",
				title: "Bác sĩ dân tộc Tày và hành trình phát triển đội ngũ Y Bác sĩ vùng cao",
				description: "Hơn 30 năm gắn bó với nghề, trải qua nhiều vị trí công tác trong lĩnh vực chuyên môn, Bác sĩ La Đăng Tái – Phó Giám đốc Sở Y tế Tuyên Quang luôn mang theo trăn trở, làm sao để cải thiện và nâng cao chất lượng khám chữa bệnh cho người dân vùng đồng bào dân tộc, vùng sâu, vùng xa ngày một tốt hơn…",
			},
			{
				imgUrl: "https://tuyenquang.gov.vn/noidung/tintuc/PublishingImages/Yen/img_20230313155023.jpg",
				title: "Cục Thuế tỉnh trao thưởng chương trình Hoá đơn may mắn",
				description: "Chiều 13-3, Cục Thuế tỉnh tổ chức trao thưởng cho các cá nhân, hộ kinh doanh may mắn trúng thưởng trong chương trình Hóa đơn may mắn quý III, IV năm 2022.",
			},
			{
				imgUrl: "https://tuyenquang.gov.vn/noidung/tintuc/PublishingImages/Vu%20Kien/2023/T%203/sequence%2001.still003.jpg",
				title: "Tuyên Quang: Tăng mức trợ cấp cho nhân viên tuần rừng",
				description: "Với tỷ lệ che phủ rừng trên 65%, Những năm qua tỉnh Tuyên Quang đã rất nỗ lực trong việc bảo vệ và phát triển rừng. Cùng với đó lực lượng kiểm lâm là một trong những lực lượng nòng cốt đã góp phần hoàn thành công tác này đó là nhân viên tuần rừng. Không biên chế, không lương, mức tiền công cho lực lượng tuần rừng đã được UBND tỉnh nỗ lực điều chỉnh tăng theo từng năm nhằm ổn định cuộc sống và giúp họ yên tâm giữ rừng.",
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
