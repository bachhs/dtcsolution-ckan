<script lang="ts" src="@/scripts/dashboard.ts"></script>

<template>

    <section>
        <!-- Header Start -->
        <div class="jumbotron jumbotron-fluid position-relative overlay-bottom" style="margin-bottom: 90px;">
            <div class="container text-center my-5 py-5">
                <!-- <h1 class="text-white mt-4 mb-4 font-Roboto">Hệ thống tra cứu thông tin</h1>
                <h1 class="text-white display-1 mb-5 font-Roboto"><strong>DTC SOLUTION</strong></h1> -->
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
            <div class="container pb-5">
                <div class="docs-overview pb-5">
                    <div class="row justify-content-center row-eq-height">
                        <div class="col-12 col-lg-4 py-3 d-flex">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <span class="theme-icon-holder card-icon-holder me-2">
                                            <i class="fas fa-user-graduate"></i>
                                        </span><!--//card-icon-holder-->
                                        <span class="card-title-text">Giáo dục</span>
                                    </h5>
                                    <div class="card-text">
                                        GDVN- Uỷ ban Văn hoá, Giáo dục của Quốc hội đã có buổi khảo sát cơ sở vật chất,
                                        lắng nghe ý kiến của giáo viên về việc thực hiện CTGDPT 2018 của ngành GD Hải
                                        Phòng.
                                    </div>
                                    <a class="card-link-mask" href="docs-page.html#section-1"></a>
                                </div><!--//card-body-->
                            </div><!--//card-->
                        </div><!--//col-->
                        <div class="col-12 col-lg-4 py-3 d-flex">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <span class="theme-icon-holder card-icon-holder me-2">
                                            <i class="fas fa-dollar-sign"></i>
                                        </span><!--//card-icon-holder-->
                                        <span class="card-title-text">Tài chính</span>
                                    </h5>
                                    <div class="card-text">
                                        Bộ Tài chính đang lấy ý kiến của các bộ, ngành, địa phương, uỷ ban nhân dân các
                                        tỉnh, thành phố về báo cáo lộ trình rút ngắn quy trình, thời gian quyết toán
                                        ngân sách nhà nước hàng năm, nhằm khắc phục một số tồn tại hiện nay...
                                    </div>
                                    <a class="card-link-mask" href="docs-page.html#section-2"></a>
                                </div><!--//card-body-->
                            </div><!--//card-->
                        </div><!--//col-->
                        <div class="col-12 col-lg-4 py-3 d-flex">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <span class="theme-icon-holder card-icon-holder me-2">
                                            <i class="fas fa-briefcase-medical"></i>
                                        </span><!--//card-icon-holder-->
                                        <span class="card-title-text">Y Tế</span>
                                    </h5>
                                    <div class="card-text">
                                        Phó Thủ tướng Trần Hồng Hà nhấn mạnh điều này tại cuộc làm việc thứ hai với Bộ Y
                                        tế chỉ trong vòng 10 ngày, vào sáng 9/2, để tháo gỡ những vấn đề nóng nhất,
                                        vướng nhất của ngành hiện nay.
                                    </div>
                                    <a class="card-link-mask" href="docs-page.html#section-3"></a>
                                </div><!--//card-body-->
                            </div><!--//card-->
                        </div><!--//col-->
                        <div class="col-12 col-lg-4 py-3 d-flex">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <span class="theme-icon-holder card-icon-holder me-2">
                                            <i class="fas fa-truck-pickup"></i>
                                        </span><!--//card-icon-holder-->
                                        <span class="card-title-text">Xây Dựng</span>
                                    </h5>
                                    <div class="card-text">
                                        Ngày 12/2, tại Quảng Ninh, Hội nghị về phát triển vùng Đồng bằng sông Hồng sẽ
                                        diễn ra dưới sự chủ trì của Thủ tướng Phạm Minh Chính.
                                    </div>
                                    <a class="card-link-mask" href="docs-page.html#section-4"></a>
                                </div><!--//card-body-->
                            </div><!--//card-->
                        </div><!--//col-->
                        <div class="col-12 col-lg-4 py-3 d-flex">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <span class="theme-icon-holder card-icon-holder me-2">
                                            <i class="fas fa-chalkboard"></i>
                                        </span><!--//card-icon-holder-->
                                        <span class="card-title-text">Công nghệ</span>
                                    </h5>
                                    <div class="card-text">
                                        Xu hướng review quần áo, mỹ phẩm tràn lan đã khiến người dùng ngày càng mất niềm
                                        tin vào các TikToker khi họ được trả tiền để tung hô, tâng bốc sản phẩm.
                                    </div>
                                    <a class="card-link-mask" href="docs-page.html#section-5"></a>
                                </div><!--//card-body-->
                            </div><!--//card-->
                        </div><!--//col-->
                        <div class="col-12 col-lg-4 py-3 d-flex">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <span class="theme-icon-holder card-icon-holder me-2">
                                            <i class="fas fa-taxi"></i>
                                        </span><!--//card-icon-holder-->
                                        <span class="card-title-text">Giao thông</span>
                                    </h5>
                                    <div class="card-text">
                                        Theo Bộ trưởng Giao thông Vận tải Nguyễn Văn Thắng, tiêu cực trong đăng kiểm ôtô
                                        vừa qua là do đẩy mạnh phân cấp cho địa phương nhưng thiếu kiểm tra, giám sát.
                                    </div>
                                    <a class="card-link-mask" href="docs-page.html#section-6"></a>
                                </div><!--//card-body-->
                            </div><!--//card-->
                        </div><!--//col-->
                    </div><!--//row-->
                </div>

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
                            <h1 class="display-4">ChatGPT đang đe dọa ai</h1>
                        </div>
                        <p>ChatGPT chỉ mới là khởi đầu vì AI sẽ còn phát triển và ảnh hưởng hơn nữa. Nó sẽ thay đổi cách
                            chúng ta làm việc, học tập và cách mọi người định nghĩa về sáng tạo, nghệ thuật.</p>
                        <p>Khi được hỏi về vai trò của chính mình trong cuộc cách mạng khoa học công nghệ, ChatGPT,
                            chatbot được phát triển bởi công ty OpenAI, đưa ra câu trả lời: "ChatGPT đang được ứng dụng
                            và dự kiến có tác động đáng kể đến nhiều lĩnh vực. Tiềm năng là rất lớn, nhưng cũng làm dấy
                            lên những lo ngại về đạo đức".</p>
                        <p>Đó cũng là nhận định chung của hầu hết chuyên gia công nghệ, theo EL PAÍS.</p>
                        <p>Mary Shelley đã viết về quái vật Frankenstein hơn 200 năm trước và trong nhiều thập kỷ qua,
                            nhân loại nỗ lực phát triển AI ngoài đời thực.</p>
                        <p>Sự xuất hiện của ChatGPT vào tháng 11/2022 được cho đánh dấu cột mốc mới, nơi hệ thống trí
                            tuệ nhân tạo gây ấn tượng nhờ khả năng hiểu và phản hồi các thắc mắc của người dùng bằng
                            ngôn ngữ tự nhiên, mạch lạc.</p>
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