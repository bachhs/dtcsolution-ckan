<template>
    <section>
        <div class="position-fixed d-flex align-items-center justify-content-center" 
            v-if="isLoadingResult"
            style="top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9999; background-color: rgba(255, 255, 255, 0.9);">
            <div class="text-center">
                <div class="lds-dual-ring"></div>
                <h4>Đang tải dữ liệu...</h4>
            </div>
        </div>
        <!-- Header Start -->
        <div class="jumbotron jumbotron-fluid position-relative overlay-bottom" style="margin-bottom: 30px;">
            <div class="container d-flex text-center py-0">
                <!-- <h1 class="m-0 mt-2 mb-2 text-uppercase text-white"><strong>Wiki DTC SOLUTION</strong></h1> -->
                <div class="mx-auto mb-3" style="width: 100%; max-width: 600px;">
                    <div class="input-group">
                        <input ref="searchInput" type="text" v-model="querySearch" @keyup.enter="submitSearch"
                            class="form-control border-light" style="padding: 30px 25px;"
                            placeholder="Nhập từ khoá để tìm kiếm..">
                        <div class="input-group-append">
                            <button class="btn btn-secondary px-4 px-lg-5 font-Roboto" 
                                @click="submitSearch">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Header End -->

        <div class="container-fluid pb-lg-0 px-lg-5">
            <div class="mx-lg-5 pb-lg-0">
                <div class="row row-eq-height px-lg-5">
                    <div class="col-lg-3 col-sm-4 mb-5 mb-lg-0 d-none d-md-flex" style="min-height: 500px;">
                        <el-card class="position-relative w-100 h-100">
                            <!-- <div class="topic-list mt-2">
                                <ul>
                                    <li v-for="topicItem in topicsList" :key="topicItem.value"
                                        v-bind:class="{ 'selected': topicItem.value === topicItemSelected }"
                                        @click="changedTopic(topicItem.value)">
                                        <a href="javascript:void(0)">
                                            <span class="theme-icon-holder card-icon-holder me-2">
                                                <i :class="topicItem.icon"></i>
                                            </span>
                                            <span class="card-title-text">{{ topicItem.name }}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div> -->
                            <div class="mb-3" v-if="aggregationsList.dataset_owner.length > 0">
                                <div class="section-title position-relative mb-1">
                                    <h4><i class="fas fa-filter text-primary"></i> Dataset owner</h4>
                                </div>
                                <div class="topic-list mt-2">
                                    <ul>
                                        <li v-for="filterItem in aggregationsList.dataset_owner" :key="filterItem.key"
                                            v-bind:class="{ 'selected': filterItem.selected }"
                                            @click="filterItem.selected = !filterItem.selected; submitSearch();">
                                            <a href="javascript:void(0)">
                                                <div  class="d-flex align-items-center">
                                                    <div class="theme-icon-holder card-icon-holder me-2">
                                                        <i v-bind:class="{ 'fas fa-cubes': !filterItem.selected, 'fas fa-check': filterItem.selected }"></i>
                                                    </div>
                                                    <div class="flex-fill card-title-text">{{ filterItem.key }}</div>
                                                    <div>
                                                        <span class="ml-1 mr-2 bage-count badge">
                                                            {{filterItem.doc_count}}
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-3"  v-if="aggregationsList.dataset_name.length > 0">
                                <div class="section-title position-relative mb-1">
                                    <h4><i class="fas fa-filter text-primary"></i> Dataset name</h4>
                                </div>
                                <div class="topic-list mt-2">
                                    <ul>
                                        <li v-for="filterItem in aggregationsList.dataset_name" :key="filterItem.key"
                                            v-bind:class="{ 'selected': filterItem.selected }"
                                            @click="filterItem.selected = !filterItem.selected; submitSearch();">
                                            <a href="javascript:void(0)">
                                                <div  class="d-flex align-items-center">
                                                    <div class="theme-icon-holder card-icon-holder me-2">
                                                        <i v-bind:class="{ 'fas fa-cubes': !filterItem.selected, 'fas fa-check': filterItem.selected }"></i>
                                                    </div>
                                                    <div class="flex-fill card-title-text">{{ filterItem.key }}</div>
                                                    <div>
                                                        <span class="ml-1 mr-2 bage-count badge">
                                                            {{filterItem.doc_count}}
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-3"  v-if="aggregationsList.dataset_categories.length > 0">
                                <div class="section-title position-relative mb-1">
                                    <h4><i class="fas fa-filter text-primary"></i> Dataset categories</h4>
                                </div>
                                <div class="topic-list mt-2">
                                    <ul>
                                        <li v-for="filterItem in aggregationsList.dataset_categories" :key="filterItem.key"
                                            v-bind:class="{ 'selected': filterItem.selected }"
                                            @click="filterItem.selected = !filterItem.selected; submitSearch();">
                                            <a href="javascript:void(0)">
                                                <div  class="d-flex align-items-center">
                                                    <div class="theme-icon-holder card-icon-holder me-2">
                                                        <i v-bind:class="{ 'fas fa-cubes': !filterItem.selected, 'fas fa-check': filterItem.selected }"></i>
                                                    </div>
                                                    <div class="flex-fill card-title-text">{{ filterItem.key }}</div>
                                                    <div>
                                                        <span class="ml-1 mr-2 bage-count badge">
                                                            {{filterItem.doc_count}}
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="col-12 col-lg-9 col-sm-8 pl-lg-0 d-flex flex-column">
                        <el-card class="w-100 flex-fill d-flex flex-column">
                            <div class="section-title position-relative mb-4">
                                <h4>{{resultSearchData.total.value}} dữ liệu được tìm thấy cho từ khoá "<strong
                                        class="text-primary">{{ keyword }}</strong>"</h4>
                            </div>
                            <div class="flex-fill" style="min-height: 30rem;">
                                <div v-if="resultSearchData.data.length > 0">
                                    <el-card v-for="itemData in resultSearchData.data" :key="itemData._id"
                                        class="w-100 mb-3 result-item-wrapper cursor-pointer">
                                        <a class="d-block w-100" target="_blank" :href="`/detail-search-result?documentId=${itemData._id}`">
                                            <div >
                                                <h5><span class="text-primary mr-2">#{{itemData._id}}</span>{{ itemData._source.file_name }}</h5>
                                            </div>
                                            <div class="text-muted">
                                                <div>Dataset: {{ itemData._source.dataset.name }} | Type: {{ itemData._type }} | Score: {{ itemData._score }}</div>
                                                <div>Directory: {{ itemData._source.dataset.directory }}</div>
                                            </div>
                                        </a>
                                    </el-card>
                                </div>
                                <div v-else class="mt-3">
                                    <no-data/>
                                </div>
                            </div>
                            <div v-if="resultSearchData.data.length > 0">
                                <el-pagination v-model:current-page="pagination.page" 
                                    v-model:page-size="pagination.size" 
                                    :page-sizes="[20, 50, 100, 200, 300, 400]"
                                    :small="small" 
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="resultSearchData.total.value" 
                                    @size-change="submitSearch" 
                                    @current-change="submitSearch" />
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="detailDocModal" tabindex="-1" role="dialog" aria-labelledby="detailDocModal"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" src="@/scripts/searchResult.ts"></script>

<style scoped lang="scss">

.bage-count{
    background-color: #2878eb !important;
    font-size: 0.8rem;
    color: #fdfdfd;
} 
.section-no-scroller{
    max-height: 100vh;
    overflow: hidden;
}
.result-item-wrapper {
    cursor: pointer;
    &:hover {
        background-color: #c6ddff;
    }
    a{
        text-decoration: none;;
    }
}

.topic-list {
    ul {
        list-style: none;
        list-style-position: outside;
        margin: 0;
        padding: 0;

        li {
            padding: 0.5rem 0.5rem;
            margin-bottom: 0.2rem;
            border-radius: 8px;
            transition: all 0.2s;
            cursor: pointer;

            &:hover,
            &.selected {
                background-color: #c6ddff;
            }

            a {
                font-size: 1.4rem;
                color: #141414;
                font-family: 'Roboto', sans-serif;

                &:hover {
                    text-decoration: none;
                }

                i {
                    color: #2878EB;
                }
            }

            .me-2 {
                margin-right: 0.5rem !important;
            }

            .theme-icon-holder {
                display: inline-block;
                background: #f1f7ff;
                color: #3e86e3;
                width: 32px;
                height: 32px;
                padding-top: 4px;
                font-size: 1rem;
                text-align: center;
                border-radius: 50%;
            }

            .card-icon-holder {
                width: 50px;
                height: 50px;
                font-size: 1.5rem;
                padding-top: 0.5rem;
                display: inline-block;
            }
        }
    }
}

.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;

    &:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #2878EB;
        border-color: #2878EB transparent #2878EB transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}


.el-card {
    &.d-flex {
        .el-card__body {
            display: -ms-flexbox !important;
            display: flex !important;
        }
    }

    &.flex-fill {
        .el-card__body {
            ms-flex: 1 1 auto !important;
            flex: 1 1 auto !important;
        }
    }

    &.justify-content-center {
        .el-card__body {
            -ms-flex-pack: center !important;
            justify-content: center !important;
        }
    }

    &.flex-column {
        .el-card__body {
            -ms-flex-direction: column !important;
            flex-direction: column !important;
        }
    }
}

@media screen and (min-width: 576px) {
    .jumbotron {
        padding: 2rem 2rem 4rem 2rem;
    }
}
</style>