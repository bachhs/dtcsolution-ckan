<template>
    <div class="w-100 h-100">
        <div class="mb-3" v-if="countFilterSelected > 0">
            <el-button size="large" class="w-100" round @click="submitSearch(true)">
                <el-icon>
                    <CircleClose />
                </el-icon>
                <span class="ml-2">Xoá các bộ lọc</span>
            </el-button>
        </div>
        <div v-for="aggregationKey in aggregationKeys" :key="aggregationKey">
            <div class="mb-4 filter-group-block" v-if="aggregationsList[aggregationKey].length > 0">
                <div class="section-title filter-group-header position-relative text-white">
                    <h4><i class="fas fa-angle-double-right"></i> {{ aggregationKey.split(/(?=[A-Z])/).join(' ') }}</h4>
                </div>
                <div class="topic-list mt-0 p-2 filter-content-block">
                    <ul>
                        <li v-for="filterItem in aggregationsList[aggregationKey]" :key="filterItem.key">
                            <a href="javascript:void(0)"
                                @click="filterItem.selected = !filterItem.selected; submitSearch();">
                                <div class="pl-2 d-flex align-items-center">
                                    <div>
                                        <el-checkbox class="m-0" size="large" :checked="filterItem.selected" />
                                        <!-- <i v-bind:class="{ 'fas fa-hand-point-right': !filterItem.selected, 'fas fa-check': filterItem.selected }"></i> -->
                                    </div>
                                    <div class="ml-2 flex-fill text-muted card-title-text">
                                        <div style="max-width: 100%; overflow-x: hidden;">
                                            <el-tooltip :content="filterItem.key">
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
</template>
<script lang="ts" setup>
const props = defineProps({
    submitSearch: { type: Function, required: true },
    countFilterSelected: { type: Number, required: true, default: 0 },
    aggregationsList: { type: Object, required: true },
    aggregationKeys: { type: Array<string>, required: true },
})
</script>