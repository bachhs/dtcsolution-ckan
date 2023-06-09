import { createApp, defineAsyncComponent } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import axios from 'axios';
import App from './App.vue';
import router from './router';
//import NoData from "@/components/NoData.vue";
import CKEditor from '@ckeditor/ckeditor5-vue';
import { Waypoint } from 'vue-waypoint';
//import ReadmoreModal from "@/components/modals/ReadmoreModal.vue";
import VueLazyLoad from 'vue3-lazyload';
import TextClamp from 'vue3-text-clamp';
//import TagsEdit from '@/components/TagsEdit.vue';
import SkeletonBoxWithoutLoading from '@/components/SkeletonBoxWithoutLoading.vue';
import VueEllipsis3 from 'vue-ellipsis-3';
import moment from 'moment';
import '@/assets/styles/custom.scss';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(CKEditor);
app.use(VueLazyLoad);
app.use(TextClamp);
app.use(VueEllipsis3);
app.component(
    'no-data',
    defineAsyncComponent({
        loader: () => import('@/components/NoData.vue'),
        loadingComponent: SkeletonBoxWithoutLoading,
    })
);
app.component('Waypoint', Waypoint);
app.component(
    'ReadmoreModal',
    defineAsyncComponent({
        loader: () => import('@/components/modals/ReadmoreModal.vue'),
        loadingComponent: SkeletonBoxWithoutLoading,
    })
);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.directive('highlight', {
    beforeMount(el, binding) {
        try{
            if(binding && binding.value && binding.value.keyword && binding.value.keyword !== ''){
                el.innerHTML = el.innerHTML.replace(new RegExp(binding.value.keyword, "gi"), (match:any) => {
                    return '<span class="highlightText">' + match + '</span>';
                });//el.innerHTML.replace(binding.value.keyword, `<em>${binding.value.keyword}</em>`);
            }
        }catch{

        }
    }
});


app.config.globalProperties.$filters = {
    prettyDate(value: any) {
        if (!value) value = new Date();
        return moment(value).calendar(null, {
            sameDay: '[Hôm nay] HH:mm:ss',
            lastDay: '[Hôm qua] HH:mm:ss',
            lastWeek: 'DD/MM/YYYY HH:mm:ss',
            sameElse: 'DD/MM/YYYY HH:mm:ss',
        });
    },
    prettyDateUnix(value: any) {
        if (!value) return '--';
        return moment.unix(value).calendar(null, {
            sameDay: '[Hôm nay] HH:mm:ss',
            lastDay: '[Hôm qua] HH:mm:ss',
            lastWeek: 'DD/MM/YYYY HH:mm:ss',
            sameElse: 'DD/MM/YYYY HH:mm:ss',
        });
    },
    durationToStr(startDate:string, endDate:string) {
        // TIP: to find current time in milliseconds, use:
        // var  current_time_milliseconds = new Date().getTime();
        var diff = moment.duration(moment(startDate).diff(moment(endDate)));
        let milliseconds:number = diff.asMilliseconds();
    
        function numberEnding (number:number) {
            return (number > 1) ? 's' : '';
        }
    
        var temp = Math.floor(milliseconds / 1000);
        var years = Math.floor(temp / 31536000);
        if (years) {
            return years + ' năm';
        }
        //TODO: Months! Maybe weeks? 
        var days = Math.floor((temp %= 31536000) / 86400);
        if (days) {
            return days + ' ngày';
        }
        var hours = Math.floor((temp %= 86400) / 3600);
        if (hours) {
            return hours + ' giờ';
        }
        var minutes = Math.floor((temp %= 3600) / 60);
        if (minutes) {
            return minutes + ' phút';
        }
        var seconds = temp % 60;
        if (seconds) {
            return seconds + ' giây';
        }
        return ''; //'just now' //or other string you like;
    }
};
app.config.globalProperties.$router = router;

axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.withCredentials = true;
//http://14.225.11.182:8081/swagger-ui/index.html
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(
    function (config) {
        //config.headers.Authorization = ``;
        const source = axios.CancelToken.source();
        config.cancelToken = source.token;
        //store.commit('ADD_CANCEL_TOKEN', source);
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('axios.interceptors', error);
        //if (error && ((error.response && error.response.status && error.response.status === 401))) {
        //    window.location = '/login';
        //}
        return error;
    }
);

app.config.globalProperties.axios = axiosInstance;
app.config.globalProperties.$http = axiosInstance;
app.provide('axios', axiosInstance);

app.mount('#vue-app');
