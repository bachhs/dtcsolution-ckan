<template>
    <section>
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
                        <input ref="searchInput" type="text" v-model="querySearch" @keyup.enter="submitSearch"
                            class="form-control border-light" style="padding: 30px 25px;"
                            placeholder="Nhập từ khoá để tìm kiếm..">
                        <div class="input-group-append">
                            <button class="btn btn-secondary px-4 px-lg-5 font-Roboto" @click="submitSearch">
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
                    <div class="col-lg-3 col-sm-4 mb-5 mb-lg-0 pr-0 pr-md-4 d-none d-md-flex" 
                        style="min-height: 500px;">
                        <div class="position-relative w-100 h-100">
                            <div class="mb-4 filter-group-block" v-if="aggregationsList.Service.length > 0"> 
                                <div class="section-title filter-group-header position-relative text-white">
                                    <h4><i class="fas fa-angle-double-right"></i> Dialects</h4>
                                </div>
                                <div class="topic-list mt-0 p-2 filter-content-block">
                                    <ul>
                                        <li v-for="filterItem in aggregationsList.Service" :key="filterItem.key">
                                            <a href="javascript:void(0)"
                                                @click="filterItem.selected = !filterItem.selected; submitSearch();">
                                                <div class="pl-2 d-flex align-items-center">
                                                    <div>
                                                        <i v-bind:class="{ 'fas fa-hand-point-right': !filterItem.selected, 'fas fa-check': filterItem.selected }"></i>
                                                    </div>
                                                    <div class="ml-2 flex-fill text-muted card-title-text">
                                                        {{ filterItem.key }}
                                                    </div>
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

                            <div class="mb-4 filter-group-block">
                                <div class="section-title filter-group-header position-relative text-white">
                                    <h4><i class="fas fa-angle-double-right"></i> Topic Categories</h4>
                                </div>
                                <div class="topic-list mt-0 p-2 filter-content-block">
                                    <ul>
                                        <li v-for="filterItem in 5" :key="filterItem">
                                            <a href="javascript:void(0)">
                                                <div class="pl-2 d-flex align-items-center">
                                                    <div>
                                                        <i class="fas fa-hand-point-right"></i>
                                                    </div>
                                                    <div class="ml-2 flex-fill text-muted card-title-text">Topic Categories
                                                        {{ filterItem }}</div>
                                                    <div>
                                                        <span class="ml-1 mr-2 bage-count badge">
                                                            99
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mb-4 filter-group-block">
                                <div class="section-title filter-group-header position-relative text-white">
                                    <h4><i class="fas fa-angle-double-right"></i> Dataset Type</h4>
                                </div>
                                <div class="topic-list mt-0 p-2 filter-content-block">
                                    <ul>
                                        <li v-for="filterItem in 5" :key="filterItem">
                                            <a href="javascript:void(0)">
                                                <div class="pl-2 d-flex align-items-center">
                                                    <div>
                                                        <i class="fas fa-hand-point-right"></i>
                                                    </div>
                                                    <div class="ml-2 flex-fill text-muted card-title-text">Dataset Type {{
                                                        filterItem }}</div>
                                                    <div>
                                                        <span class="ml-1 mr-2 bage-count badge">
                                                            99
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mb-4 filter-group-block">
                                <div class="section-title filter-group-header position-relative text-white">
                                    <h4><i class="fas fa-angle-double-right"></i> Tags</h4>
                                </div>
                                <div class="topic-list mt-0 p-2 filter-content-block">
                                    <ul>
                                        <li v-for="filterItem in 5" :key="filterItem">
                                            <a href="javascript:void(0)">
                                                <div class="pl-2 d-flex align-items-center">
                                                    <div>
                                                        <i class="fas fa-hand-point-right"></i>
                                                    </div>
                                                    <div class="ml-2 flex-fill text-muted card-title-text">Tags {{
                                                        filterItem }}</div>
                                                    <div>
                                                        <span class="ml-1 mr-2 bage-count badge">
                                                            99
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mb-4 filter-group-block">
                                <div class="section-title filter-group-header position-relative text-white">
                                    <h4><i class="fas fa-angle-double-right"></i> Formats</h4>
                                </div>
                                <div class="topic-list mt-0 p-2 filter-content-block">
                                    <ul>
                                        <li v-for="filterItem in 5" :key="filterItem">
                                            <a href="javascript:void(0)">
                                                <div class="pl-2 d-flex align-items-center">
                                                    <div>
                                                        <i class="fas fa-hand-point-right"></i>
                                                    </div>
                                                    <div class="ml-2 flex-fill text-muted card-title-text">Formats {{
                                                        filterItem }}</div>
                                                    <div>
                                                        <span class="ml-1 mr-2 bage-count badge">
                                                            99
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mb-4 filter-group-block">
                                <div class="section-title filter-group-header position-relative text-white">
                                    <h4><i class="fas fa-angle-double-right"></i> Organization Types</h4>
                                </div>
                                <div class="topic-list mt-0 p-2 filter-content-block">
                                    <ul>
                                        <li v-for="filterItem in 5" :key="filterItem">
                                            <a href="javascript:void(0)">
                                                <div class="pl-2 d-flex align-items-center">
                                                    <div>
                                                        <i class="fas fa-hand-point-right"></i>
                                                    </div>
                                                    <div class="ml-2 flex-fill text-muted card-title-text">Organization
                                                        Types {{ filterItem }}</div>
                                                    <div>
                                                        <span class="ml-1 mr-2 bage-count badge">
                                                            99
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
                    <div class="col-12 col-lg-9 col-sm-8 pl-lg-0 d-flex flex-column">
                        <div class="w-100 flex-fill d-flex flex-column">
                            <div class="section-title position-relative mb-2">
                                <h4>{{ resultSearchData.total.value }} dữ liệu được tìm thấy cho từ khoá "<strong
                                        class="text-primary">{{ keyword }}</strong>"</h4>
                            </div>
                            <div class="flex-fill" style="min-height: 30rem;">
                                <div v-if="resultSearchData.data.length > 0">
                                    <el-card v-for="itemData in resultSearchData.data" :key="itemData._id"
                                        class="w-100 mb-3 result-item-wrapper cursor-pointer">
                                        <a class="d-block w-100" target="_blank"
                                            :href="`#`">
                                            <div>
                                                <h5>
                                                    <span class="text-primary mr-2" v-highlight="{ keyword: keyword }">
                                                        #{{safeText(itemData._source.metadata.so_ho_so).trim()}}
                                                    </span> 
                                                    <!-- <span>- 10 lượt xem</span> -->
                                                </h5>
                                            </div>
                                            <div class="text-muted"> 
                                                <div>
                                                    <div class="text-muted indent-text" style="font-size: 80%;">- <strong>Số giấy phép:</strong> <span v-highlight="{ keyword: keyword }">{{itemData._source.metadata.so_giay_phep}}</span></div>
                                                    <div class="text-muted indent-text" style="font-size: 80%;">- <strong>Về việc:</strong> <span v-highlight="{ keyword: keyword }">{{itemData._source.metadata.ve_viec}}</span></div>
                                                    <div class="text-muted indent-text" style="font-size: 80%;">- <strong>Bộ phận đang xử lý:</strong> <span v-highlight="{ keyword: keyword }">{{itemData._source.metadata.bo_phan_dang_xu_ly}}</span></div>
                                                    <div class="text-muted indent-text" style="font-size: 80%;">- <strong>Tên tài liệu:</strong> <span v-highlight="{ keyword: keyword }">{{itemData._source.metadata.ten_tai_lieu_xuat_ban}}</span></div>
                                                    <div class="text-muted indent-text" style="font-size: 80%;">- <strong>Mục đích xuất bản:</strong> <span v-highlight="{ keyword: keyword }">{{itemData._source.metadata.muc_dich_xuat_ban}}</span></div>
                                                </div>
                                                <div class="mt-3"  style="font-size: 85%;"> 
                                                    <span class="label label-danger mr-1"
                                                        v-if="itemData._source.metadata.thanh_toan_le_phi">
                                                        {{itemData._source.metadata.thanh_toan_le_phi}}
                                                    </span>
                                                    <span class="label label-primary mr-1"
                                                        v-if="itemData._source.metadata.ten_co_quan_to_chuc">
                                                        {{itemData._source.metadata.ten_co_quan_to_chuc}}
                                                    </span>
                                                    <span class="label label-primary mr-1"
                                                        v-if="itemData._source.metadata.hinh_thuc_phat_hanh">
                                                        {{itemData._source.metadata.hinh_thuc_phat_hanh}}
                                                    </span>
                                                    <span class="label label-primary mr-1"
                                                        v-if="itemData._source.metadata.pham_vi_su_dung">
                                                        Sử dụng {{safeText(itemData._source.metadata.pham_vi_su_dung).trim().toLowerCase()}}
                                                    </span>
                                                    <!-- <span class="label label-info mr-1">HTML</span>
                                                    <span class="label label-success mr-1">XLS</span> -->
                                                </div>
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
                                    @size-change="submitSearch" @current-change="submitSearch" />
                            </div>
                        </div>
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
            padding: 0.3rem 0.5rem;
            margin-bottom: 0.2rem;
            border-radius: 10px;
            transition: all 0.2s;
            cursor: pointer;

            &:hover,
            &.selected {
                background-color: #c6ddff;
            }

            a {
                font-size: 1.2rem;
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
}</style>