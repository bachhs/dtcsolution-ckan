<script lang="ts" src="@/scripts/dashboard.ts"></script>

<template>

    <section>
        <!-- Header Start -->
        <div class="jumbotron jumbotron-fluid position-relative overlay-bottom" style="margin-bottom: 90px;">
            <div class="container text-center my-5 py-5">
                <h1 class="text-white mt-4 mb-4 font-Roboto">Bắt đầu tìm kiếm dữ liệu..</h1>
                <!-- <h5 class="text-white display-4 mb-5 font-Roboto"><strong>DTC SOLUTION</strong></h5> -->
                <div class="mx-auto mb-5" style="width: 100%; max-width: 600px;">
                    <div class="input-group">
                        <!-- <div class="input-group-prepend">
                        <button class="btn btn-outline-light bg-white text-body px-4 dropdown-toggle" type="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Courses</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Courses 1</a>
                            <a class="dropdown-item" href="#">Courses 2</a>
                            <a class="dropdown-item" href="#">Courses 3</a>
                        </div>
                    </div> -->
                        <input type="text" ref="searchInput"
                            v-model="querySearch"
                            class="form-control border-light" 
                            style="padding: 30px 25px;"
                            placeholder="Nhập từ khoá để tìm kiếm.."
                            @keyup.enter="submitSearch">
                        <div class="input-group-append">
                            <button class="btn btn-secondary px-4 px-lg-5 font-Roboto" @click="submitSearch">Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Header End -->
        <!-- About Start -->
        <div class="container-fluid pb-5">
            <div class="container pb-1">
                <div>
                    <h3 class="mb-3"><i class="fas fa-angle-double-right text-primary"></i> XU HƯỚNG</h3>
                    <div class="row">
                        <div class="col-lg-5 mb-5 mb-lg-0" style="min-height: 500px;">
                            <div class="position-relative h-100">
                                <img class="position-absolute w-100 h-100"
                                    src="https://znews-photo.zingcdn.me/w360/Uploaded/mdf_uswreo/2023_02_06/7DHMSRJDQNHQFN3LI6364IQ54E.jpg"
                                    style="object-fit: cover;">
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="section-title position-relative mb-4">
                                <h1 class="display-4">Rivers of Data – Inland Electronic Navigation Charts</h1>
                            </div>
                            <p>Nautical charts provide critical information to mariners in support of safe navigation.  Historically these charts have been printed and distributed on paper, but modern communications systems allow for electronic charts that are able to be updated as new information becomes available.  The National Oceanic and Atmospheric Administration (NOAA) Office of Coast Survey produces charts for coastal and Great Lakes areas, and the U.S. Army Corps of Engineers produces charts for America’s inland rivers through the Inland Electronic Navigation Chart program.  The Inland Electronic Navigation Chart (IENC) program covers thousands of miles of navigable waterways.  America’s inland waterways move millions of tons of commodities every year, and the work of surveying, charting, and dredging sediment is continually ongoing due to the dynamic conditions and constant change happening along any given river.</p>
                            <p>Rivers included in the Inland Electronic Navigation Chart (IENC) program include the Allegheny River, Arkansas River, Atchafalaya River, Black Warrior-Tombigbee Rivers, Cumberland River, Green River, Illinois River, Kaskaskia, Kanawha River, Lower Mississippi River, Missouri River, Monongahela River, Ohio River, Ouachita River, Red River, Tennessee River (including the Tellico, Hiwassee, Clinch and Emory Rivers), Tennessee-Tombigbee Waterway, Upper Mississippi River, and the White River.  Anyone can access the navigation charts for these rivers, which show depth contours, buoys, lights, known hazards, and reference landmarks.</p>
                            <p>References and Data.Gov Links:</p>
                            <p>Inland Electronic Navigational Charts (IENC), https://catalog.data.gov/dataset/inland-electronic-navigational-charts-ienc</p>
                            <p>USACE Inland Electronic Navigation Charts Homepage, http://ienccloud.us/</p>
                            <p>NOAA Electronic Navigational Charts (ENC), https://catalog.data.gov/dataset/noaa-electronic-navigational-charts-enc7cce5</p>
                            <p>NOAA Raster Navigational Charts (RNC), https://catalog.data.gov/dataset/noaa-raster-navigational-charts-rnc7af22</p>
                        </div>
                    </div>
                </div>
                <div class="mt-5">                    
                    <h3 class="mb-3"><i class="fas fa-angle-double-right text-primary"></i> CẬP NHẬT</h3>
                    <div>
                        <el-card class="mb-3" v-for="item in 5">
                            <div>
                                <a href="/"><strong>Hydrosurvey Data Archive for Federal Navigation Projects</strong></a>
                            </div>
                            <div><i class="fas fa-calendar-alt tex-primary mr-2"></i><small class="text-muted">July 27, 2021  By Marin Kress, Research Scientist, U.S. Army Corps of Engineers</small></div>
                            <div class="mt-1 text-muted text-justify" style="font-size: 90%;">
                                The U.S. Army Corps of Engineers (USACE) performs hydrographic surveys (hydrosurveys) for federal navigation projects around the U.S. Federal navigation projects include an estimated 25,000 miles of channels and form a key part of U.S. maritime infrastructure in both coastal 
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
        <!-- About End -->
    </section>
</template>

<style scoped lang="scss">
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

.docs-overview .card-icon-holder {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    padding-top: 1rem;
    display: inline-block;
}

svg:not(:host).svg-inline--fa,
svg:not(:root).svg-inline--fa {
    overflow: visible;
    box-sizing: content-box;
}

.svg-inline--fa {
    display: inline-block;
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
}
</style>