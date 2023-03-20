<template>
    <div class="w-100 h-100 d-flex flex-column">
        <div class="flex-fill d-flex flex-column">
            <div class="mb-4 filter-group-block flex-fill  d-flex flex-column">
                <div class="section-title filter-group-header position-relative text-white">
                    <h4><i class="fas fa-angle-double-right"></i> Bộ lọc dữ liệu</h4>
                </div>
                <div class="topic-list mt-0 p-2 filter-content-block flex-fill">                    
                    <div class="ml-3 mr-3 mb-3 mt-2" v-if="countFilterSelected > 0">
                        <el-button size="large" class="w-100" @click="submitSearch(true)">
                            <el-icon>
                                <CircleClose />
                            </el-icon>
                            <span class="ml-2">Xoá các bộ lọc</span>
                        </el-button>
                    </div>
                    <div v-for="aggregationKey in aggregationKeys" :key="aggregationKey"
                        class="mt-2"> 
                        <div v-if="aggregationsList[aggregationKey].length > 0"
                            class="mb-2">
                            <div class="pl-3 text-primary">
                                <strong>{{ aggregationKey.split(/(?=[A-Z])/).join(' ') }}</strong>
                            </div>
                            <ul class="mt-1">
                                <li v-for="filterItem in aggregationsList[aggregationKey]" :key="filterItem.key">
                                    <a href="javascript:void(0)"
                                        @click="selectAggItem(aggregationsList[aggregationKey], filterItem)">
                                        <div class="pl-2 d-flex align-items-center pt-1 pb-1">
                                            <div>
                                                <el-checkbox class="m-0 h-auto" size="large" :checked="filterItem.selected" />
                                                <!-- <i v-bind:class="{ 'fas fa-hand-point-right': !filterItem.selected, 'fas fa-check': filterItem.selected }"></i> -->
                                            </div>
                                            <div class="ml-2 flex-fill text-muted card-title-text">
                                                <div style="max-width: 100%; overflow-x: hidden;">
                                                    <el-tooltip :content="filterItem.key" placement="right">
                                                        <vue-ellipsis-3 :text="filterItem.key" />
                                                    </el-tooltip>
                                                </div>
                                            </div>
                                            <div>
                                                <span class="ml-1 mr-2 bage-count badge">
                                                    {{ filterItem.doc_count }}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    submitSearch: { type: Function, required: true },
    countFilterSelected: { type: Number, required: true, default: 0 },
    aggregationsList: { type: Object, required: true },
    aggregationKeys: { type: Array<string>, required: true },
});
const selectAggItem = (aggregationItems:Array<any>, newItemSelected:any) => {
    if(aggregationItems && aggregationItems.length > 0){
        aggregationItems.filter(aggItem => aggItem.key !== newItemSelected.key).forEach(aggItem => {
            aggItem.selected = false;
        })
    }
    if(newItemSelected) newItemSelected.selected = !newItemSelected.selected;
    props.submitSearch();
};
</script>