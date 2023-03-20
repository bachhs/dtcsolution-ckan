<template>
    <section class="search-result-view">
        <div class="position-fixed d-flex align-items-center justify-content-center" v-if="isLoadingResult"
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
                        <input ref="searchInput" type="text" v-model="querySearch" @keyup.enter="submitSearch(true)"
                            class="form-control border-light" style="padding: 30px 25px;"
                            placeholder="Nhập từ khoá để tìm kiếm..">
                        <div class="input-group-append">
                            <button class="btn btn-secondary px-4 px-lg-5 font-Roboto" @click="submitSearch(true)">
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
                    <div class="col-lg-3 col-sm-4 mb-5 mb-lg-0 pr-0 pr-md-4 d-none d-md-flex" style="min-height: 500px;">
                        <FilterAggregation :submitSearch="submitSearch" :countFilterSelected="countFilterSelected"
                            :aggregationsList="aggregationsList" :aggregationKeys="aggregationKeys" />
                    </div>
                    <div class="col-12 col-lg-9 col-sm-8 pl-lg-0 d-flex flex-column">
                        <div class="w-100 flex-fill d-flex flex-column">
                            <div class="d-flex align-items-center mb-3">
                                <div class="flex-fill section-title position-relative">
                                    <h4 class="mb-0">{{ resultSearchData.total.value }} dữ liệu được tìm thấy cho từ khoá
                                        "<strong class="text-primary">{{ keyword }}</strong>"</h4>
                                </div>
                                <div class="d-block d-md-none">
                                    <el-button @click="toggleFilterBlock">
                                        <i class="fas fa-filter text-muted"></i>
                                    </el-button>
                                </div>
                            </div>
                            <div class="flex-fill" style="min-height: 30rem;">
                                <div v-if="resultSearchData.data.length > 0">
                                    <el-card v-for="itemData in resultSearchData.data" :key="itemData._id"
                                        class="w-100 mb-3 result-item-wrapper cursor-pointer">
                                        <a class="d-block w-100" target="_blank" :href="`/detail-search-result?documentId=${itemData._id}`">
                                            <div>
                                                <h5>
                                                    <span class="text-primary mr-2" v-highlight="{ keyword: keyword }">
                                                        #{{ itemData._source.name }}
                                                    </span>
                                                    <!-- <span>- 10 lượt xem</span> -->
                                                </h5>
                                            </div>
                                            <div class="text-muted" style="font-size: 85%;">
                                                <div class="mt-1 w-100" style="word-break: break-all;">
                                                    {{ itemData._source.fullyQualifiedName }}
                                                </div>
                                                <div class="mt-1">Kiểu bảng dữ liệu: {{ itemData._source.tableType }} |
                                                    Version: {{ itemData._source.version }} | Số cột dữ liệu: {{
                                                        itemData._source.columns.length }} cột</div>
                                            </div>
                                            <div class="mt-3" style="font-size: 85%;">
                                                <span class="label label-primary mr-1"
                                                    v-for="tagItems in itemData._source.tags">
                                                    {{ tagItems.tagFQN }}
                                                </span>
                                            </div>
                                        </a>
                                    </el-card>
                                </div>
                                <div v-else class="mt-3">
                                    <no-data />
                                </div>
                            </div>
                            <div v-if="resultSearchData.data.length > 0">
                                <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.size"
                                    :page-sizes="[20, 50, 100, 200, 300, 400]" :small="small"
                                    layout="total, sizes, prev, pager, next, jumper" :total="resultSearchData.total.value"
                                    @size-change="submitSearch" @current-change="submitSearch" hide-on-single-page />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <Transition>
            <div class="filter-fixed d-flex flex-column d-md-none"
                v-if="isToggleFilterBlock">
                <div class="mb-3 d-flex align-items-center mb">
                    <div class="flex-fill">
                        <h4 class="mb-0"><i class=" fas fa-filter text-primary mr-2"></i> <strong>Lọc dữ liệu</strong></h4>
                    </div>
                    <div>
                        <el-button type="danger" @click="toggleFilterBlock">
                            <i class="fas fa-times text-white"></i>
                        </el-button>
                    </div>
                </div>
                <div class="flex-fill d-flex flex-column" style="margin-right: -15px;">
                    <el-scrollbar class="flex-fill pr-3" style="height: 1px;">
                        <FilterAggregation :submitSearch="submitSearch" :countFilterSelected="countFilterSelected"
                                    :aggregationsList="aggregationsList" :aggregationKeys="aggregationKeys" />
                    </el-scrollbar>
                </div>
            </div>
        </Transition>
    </section>
</template>
<script lang="ts" src="@/scripts/searchResult.ts"></script>

<style lang="scss">
.search-result-view {
    .filter-fixed{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        padding: 1rem;
        background-color: #fff; 
        height: 100vh; 
    }

    .bage-count {
        background-color: #2878eb !important;
        font-size: 0.8rem;
        color: #fdfdfd;
        padding-top: 0.3rem;
        border-radius: 50px;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    .section-no-scroller {
        max-height: 100vh;
        overflow: hidden;
    }

    .result-item-wrapper {
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;
        border-radius: 15px;
        cursor: pointer;

        &:hover {
            background-color: #c6ddff;
        }

        a {
            text-decoration: none;
            ;
        }
    }

    .topic-list {
        ul {
            list-style: none;
            list-style-position: outside;
            margin: 0;
            padding: 0;

            li {
                padding: 0 0.5rem;
                margin-bottom: 0;
                border-radius: 15px;
                transition: all 0.2s;
                cursor: pointer;
 
                a {
                    font-size: 1rem; 
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

    .filter-group-block {
        border: 0px solid rgb(41, 89, 122);
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;

        .filter-group-header {
            background: rgb(95, 156, 198);
            background: -moz-linear-gradient(90deg, rgba(27, 89, 133, 1) 0%, rgba(48, 125, 179, 1) 100%);
            background: -webkit-linear-gradient(90deg, rgba(27, 89, 133, 1) 0%, rgba(48, 125, 179, 1) 100%);
            background: linear-gradient(90deg, rgba(27, 89, 133, 1) 0%, rgba(48, 125, 179, 1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#5f9cc6", endColorstr="#307db3", GradientType=1);
            -webkit-border-top-left-radius: 17px;
            -webkit-border-top-right-radius: 17px;
            -moz-border-radius-topleft: 17px;
            -moz-border-radius-topright: 17px;
            border-top-left-radius: 17px;
            border-top-right-radius: 17px;
            padding: 0.6rem 1rem;

            h4 {
                color: #fff !important;
                margin-bottom: 0;
                font-size: 1.2rem !important;
            }
        }

        .filter-content-block {
            background-color: #f0f0f0;
            -webkit-border-bottom-right-radius: 20px;
            -webkit-border-bottom-left-radius: 20px;
            -moz-border-radius-bottomright: 20px;
            -moz-border-radius-bottomleft: 20px;
            border-bottom-right-radius: 20px;
            border-bottom-left-radius: 20px;
        }
    }
}
</style>