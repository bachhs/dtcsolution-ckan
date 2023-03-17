<script lang="ts" src="@/scripts/detailSearchResult.ts"></script>

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
                <div class="position-relative w-100 h-100">
                    <h1 class="text-primary text-center mt-4 mb-4 font-Roboto">Chi tiết văn bản</h1>
                    <div v-if="documentDetailData" class="text-center">
                        <div>Tên: {{ documentDetailData.name }}</div>
                        <div>Tên đầy đủ: {{ documentDetailData.fullyQualifiedName }}</div>
                        <div>Version: {{ documentDetailData.version }}</div>
                        <div>Loại bảng: {{ documentDetailData.tableType }}</div> 
                        <div class="mt-3">
                            <div>Các cột dữ liệu </div>
                            <table class="table table-bordered mt-2">
                                <thead>
                                    <tr>
                                        <th>Tên cột</th>
                                        <th>Kiểu dữ liệu</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="column in documentDetailData.columns" :key="column.name">
                                        <td>{{ column.name }}</td>
                                        <td>{{ column.dataType }}({{ column.dataLength }})</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
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
</style>