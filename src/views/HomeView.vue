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
                        <input type="text" ref="searchInput" v-model="querySearch" class="form-control border-light"
                            style="padding: 30px 25px;" placeholder="Nhập từ khoá để tìm kiếm.."
                            @keyup.enter="submitSearch">
                        <div class="input-group-append">
                            <button class="btn btn-secondary px-4 px-lg-5 font-Roboto" @click="submitSearch">Tìm
                                kiếm</button>
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
                    <!-- <h3 class="mb-3"><i class="fas fa-angle-double-right text-primary"></i> XU HƯỚNG</h3> -->
                    <div>
                        <div>
                            <div class="section-title text-center position-relative mb-4">
                                <h3>DỮ LIỆU THEO CHỦ ĐỀ</h3>
                            </div>
                            <hr />
                        <!-- <img  src="https://tuyenquang.gov.vn/noidung/tintuc/PublishingImages/1%20tuongdai.jpg"
                                    style="object-fit: cover; width: 500px; float: left; margin-right: 20px; margin-bottom: 10px; max-width: 100%;;">
                            <div class="text-justify">
                                <p>Tuyên Quang là tỉnh miền núi nằm ở phía Bắc Việt Nam, có diện tích: 5.867,9 Km2, dân số: 784.811 người (Theo Cuộc tổng điều tra dân số và nhà ở năm 2019)</p>
                                <p>Trong cách mạng Tháng Tám, Tuyên Quang vinh dự là Thủ đô Khu giải phóng, được Trung ương Đảng và Bác Hồ chọn làm trung tâm của cách mạng cả nước. Tại Tân Trào-Sơn Dương - Tuyên Quang đã diễn ra nhiều sự kiện lịch sử gắn liền với vận mệnh dân tộc: Hội nghị toàn quốc của Đảng quyết định chủ trương lãnh đạo toàn dân Tổng khởi nghĩa giành chính quyền và cử ra Uỷ ban khởi nghĩa toàn quốc; Quốc dân Đại hội họp tại đình Tân Trào thành lập Uỷ ban dân tộc giải phóng tức Chính phủ lâm thời do Bác Hồ làm Chủ tịch.</p>
                                <p>Trong những năm trường kỳ kháng chiến chống thực dân Pháp xâm lược, Tuyên Quang là Thủ đô Kháng chiến, nơi đồng bào cả nước "trông về Việt Bắc mà nuôi chí bền"; nhân dân các dân tộc Tuyên Quang đã luôn luôn làm tròn nhiệm vụ thiêng liêng: Xây dựng, bảo vệ An toàn khu (ATK); bảo vệ Bác Hồ, Trung ương Đảng, Quốc hội, Chính phủ, Mặt trận cùng nhiều bộ, ban, ngành Trung ương; bảo vệ các cơ quan đầu não của Cách mạng Lào. Đảng bộ và nhân dân các dân tộc Tuyên Quang đóng góp phần quan trọng, to lớn vào cuộc đấu tranh giành độc lập dân tộc, lập nhiều chiến công vang dội trên chiến trường, đập tan các cuộc tấn công lên Việt Bắc của giặc Pháp. Bình Ca, Cầu Cả, Khe Lau..., là những địa danh lịch sử làm rạng rỡ tinh thần chiến đấu quả cảm, mưu trí, sáng tạo của quân, dân Tuyên Quang trong chiến dịch Việt Bắc (Thu - Đông 1947).</p>
                                    <p>Trong công cuộc đổi mới, Đảng bộ và nhân dân các dân tộc Tuyên Quang tiếp tục phát huy truyền thống vẻ vang của quê hương cách mạng, quyết tâm vượt qua mọi khó khăn, khai thác tiềm năng, phát huy thế mạnh của địa phương, chủ động hội nhập kinh tế, tạo bước đột phá mạnh mẽ trong phát triển kinh tế - xã hội, tranh thủ sự đóng góp, giúp đỡ của Trung ương và các bộ, ngành, các địa phương trong cả nước và các tổ chức quốc tế, thực hiện thắng lợi các mục tiêu, nhiệm vụ do Đại hội đại biểu Đảng bộ tỉnh lần thứ XVII đề ra, phấn đấu đưa Tuyên Quang trở thành tỉnh phát triển khá trong các tỉnh miền núi phía Bắc, xứng đáng với truyền thống quê hương cách mạng, Thủ đô khu giải phóng, Thủ đô kháng chiến.</p>
                                </div> -->
                            <div class="row container-12 views-row-1 views-row-first">
                                <div class="col-xs-6 col-sm-4 col-md-2 views-column-1 views-column-first  text-center">
                                    <div class="views-field views-field-field-image">
                                        <div class="field-content"></div>
                                    </div>
                                    <div class="topic-icon">
                                        <div>
                                            <a href="#"
                                                class="font-icon-select-1 font-icon-select-1-e91e">
                                                <i class="far fa-chart-bar fa-5x"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="views-field views-field-name mt-1"> 
                                        <a href="#">Đầu tư</a>
                                    </div>
                                </div> 
                                <div class="col-xs-6 col-sm-4 col-md-2 views-column-1 views-column-first  text-center">
                                    <div class="views-field views-field-field-image">
                                        <div class="field-content"></div>
                                    </div>
                                    <div class="topic-icon">
                                        <div>
                                            <a href="#"
                                                class="font-icon-select-1 font-icon-select-1-e91e">
                                                <i class="fas fa-briefcase-medical fa-5x"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="views-field views-field-name mt-1"> 
                                        <a href="#">Y tế</a>
                                    </div>
                                </div> 
                                <div class="col-xs-6 col-sm-4 col-md-2 views-column-1 views-column-first  text-center">
                                    <div class="views-field views-field-field-image">
                                        <div class="field-content"></div>
                                    </div>
                                    <div class="topic-icon">
                                        <div>
                                            <a href="#"
                                                class="font-icon-select-1 font-icon-select-1-e91e">
                                                <i class="fas fa-globe-europe fa-5x"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="views-field views-field-name mt-1"> 
                                        <a href="#">Thị trường</a>
                                    </div>
                                </div> 
                                <div class="col-xs-6 col-sm-4 col-md-2 views-column-1 views-column-first  text-center">
                                    <div class="views-field views-field-field-image">
                                        <div class="field-content"></div>
                                    </div>
                                    <div class="topic-icon">
                                        <div>
                                            <a href="#"
                                                class="font-icon-select-1 font-icon-select-1-e91e">
                                                <i class="fas fa-leaf fa-5x"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="views-field views-field-name mt-1"> 
                                        <a href="#">Môi trường</a>
                                    </div>
                                </div> 
                                <div class="col-xs-6 col-sm-4 col-md-2 views-column-1 views-column-first  text-center">
                                    <div class="views-field views-field-field-image">
                                        <div class="field-content"></div>
                                    </div>
                                    <div class="topic-icon">
                                        <div>
                                            <a href="#"
                                                class="font-icon-select-1 font-icon-select-1-e91e">
                                                <i class="fas fa-sun fa-5x"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="views-field views-field-name mt-1"> 
                                        <a href="#">Khí hậu</a>
                                    </div>
                                </div> 
                                <div class="col-xs-6 col-sm-4 col-md-2 views-column-1 views-column-first  text-center">
                                    <div class="views-field views-field-field-image">
                                        <div class="field-content"></div>
                                    </div>
                                    <div class="topic-icon">
                                        <div>
                                            <a href="#"
                                                class="font-icon-select-1 font-icon-select-1-e91e">
                                                <i class="fas fa-graduation-cap fa-5x"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="views-field views-field-name mt-1"> 
                                        <a href="#">Giáo dục</a>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            <div style="clear: both;"></div>
            <div class="mt-5">                    
                <h3 class="section-title text-center position-relative mb-4">TIN TỨC MỚI NHẤT</h3>
                <hr/>
                <div>
                    <el-card class="mb-3" :key="item" v-for="item in updateNews">
                        <div class="d-flex">
                            <div>
                                <a href="#">
                                    <img class="story-image-teaser" 
                                        typeof="foaf:Image" 
                                        :src="item.imgUrl" 
                                        width="180" height="120" alt="">
                                </a>
                            </div>
                            <div class="ml-3">
                                <div>
                                    <a href="#"><strong>{{item.title}}</strong></a>
                                </div>
                                <div class="d-flex mt-1 align-items-center"><el-icon><Clock /></el-icon><small class="ml-1 text-muted">July 27, 2021</small></div>
                                <div class="mt-1 text-muted text-justify" style="font-size: 90%;">
                                    <vue-ellipsis-3 :text="item.description" :visibleLine="3" :useInnerHtml="true" />
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
    <!-- About End -->
</section></template>

<style scoped lang="scss">.me-2 {
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
}</style>