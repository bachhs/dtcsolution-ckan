<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useDataCategoryStore } from '@/stores/dataCategory';
const dataCategoryStore = useDataCategoryStore();
dataCategoryStore.getOrganization();
dataCategoryStore.getAppParams();
</script>

<template>
    <div>
        <!-- Topbar Start -->
        <div class="container-fluid bg-dark d-none d-md-block">
            <div class="row py-2 px-lg-5">
                <div class="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
                    <div class="d-inline-flex align-items-center text-white">
                        <small><i class="fa fa-phone-alt mr-2"></i>+84 345 6789</small>
                        <small class="px-3">|</small>
                        <small><i class="fa fa-envelope mr-2"></i>info@dtcsolution.vn</small>
                    </div>
                </div>
                <div class="col-lg-6 text-center text-lg-right">
                    <div class="d-inline-flex align-items-center">
                        <a class="text-white px-2" href="">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a class="text-white px-2" href="">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a class="text-white px-2" href="">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a class="text-white px-2" href="">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a class="text-white pl-2" href="">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Topbar End -->
        <!-- Navbar Start -->
        <div class="container-fluid p-0">
            <nav class="navbar navbar-expand-lg bg-white navbar-light py-0 py-md-3 py-lg-0 px-lg-5">
                <a href="/" class="navbar-brand ml-lg-3">
                    <div class="mb-2">
                        <h1 class="m-0 mt-2 mb-0 text-uppercase text-primary" style="line-height: 2.2rem;"><strong>CKAN.DATA</strong></h1>
                        <div style="font-size: 80%;"><i>Cổng dữ liệu mở Tuyên Quang</i></div>
                    </div>
                </a>
                <!-- <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button> -->
                <div class="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                    <div class="navbar-nav mx-auto py-0">
                        <router-link to="/home" class="nav-item nav-link active">Trang chủ</router-link>
                        <router-link to="about.html" class="nav-item nav-link">Chủ đề</router-link>
                        <router-link to="course.html" class="nav-item nav-link">Tài nguyên</router-link> 
                        <router-link to="contact.html" class="nav-item nav-link">Chiến lược</router-link>
                        <router-link to="contact.html" class="nav-item nav-link">Nhà phát triển</router-link>
                        <router-link to="contact.html" class="nav-item nav-link">Liên hệ</router-link>
                    </div>
                    <router-link to="/about-us" class="btn btn-primary py-2 px-4 d-none d-lg-block float-right">Về chúng tôi</router-link>
                </div>
            </nav>
        </div>
        <!-- Navbar End -->

        <RouterView :key="$route.fullPath" />

        <!-- Footer Start -->
        <div class="container-fluid position-relative overlay-top bg-dark text-white-50 py-5" style="margin-top: 90px;">
            <div class="container mt-2 pt-5">
                <div class="row">
                    <div class="col-md-12 mb-1">
                        <a href="/" class="navbar-brand">
                            <h1 class="mt-n2 text-uppercase text-white">CKAN.DATA</h1>
                        </a>
                        <!-- <p class="m-0 text-justify"><strong>DTC SOLUTION</strong> là công ty cung cấp dịch vụ tư vấn lộ trình chuyển đổi số giúp doanh nghiệp từng bước xây dựng nguồn lực & ứng dụng công nghệ để giải quyết các bài toán doanh nghiệp cụ thể, gắn liền với định hướng phát triển doanh nghiệp, hướng tới sự tối ưu và cải tiến, tạo ra những giá trị mới.</p> -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 mb-2">
                        <h3 class="text-white text-nowrap mb-4">Thông tin</h3>
                        <p><i class="fa fa-clock mr-2"></i>Cập nhật 5/12/2022</p>
                        <p><i class="fa fa-phone-alt mr-2"></i>+84 345 67890</p>
                        <p><i class="fa fa-envelope mr-2"></i>info@dtcsolution.vn</p>
                        <div class="d-flex justify-content-start mt-4">
                            <a class="text-white mr-4" href="#"><i class="fab fa-2x fa-twitter"></i></a>
                            <a class="text-white mr-4" href="#"><i class="fab fa-2x fa-facebook-f"></i></a>
                            <a class="text-white mr-4" href="#"><i class="fab fa-2x fa-linkedin-in"></i></a>
                            <a class="text-white" href="#"><i class="fab fa-2x fa-instagram"></i></a>
                        </div>
                    </div> 
                    <div class="col-md-4 mb-2">
                        <h3 class="text-white mb-4">Điều khoản</h3>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-white-50 mb-2" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Chính sách bảo mật
                            </a>
                            <a class="text-white-50 mb-2" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Hướng dẫn sử dụng
                            </a>
                            <a class="text-white-50 mb-2" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Điều khoản sửa dụng
                            </a>
                            <a class="text-white-50 mb-2" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Liên hệ
                            </a>
                            <a class="text-white-50" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Giấy phép
                            </a>
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <h3 class="text-white mb-4">Liên kết nhanh</h3>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-white-50 mb-2" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Sở thông tin & Truyền thông
                            </a>
                            <a class="text-white-50 mb-2" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Sở Lao động, Thương binh & Xã hội
                            </a>
                            <a class="text-white-50 mb-2" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Sở tài nguyên và môi trường 
                            </a>
                            <a class="text-white-50 mb-2" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Sở Kế Koạch và Đầu Tư
                            </a>
                            <a class="text-white-50" href="#">
                                <i class="fa fa-angle-right mr-2"></i> Sở Giáo Dục và Đào Tạo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid bg-dark text-white-50 border-top py-4"
            style="border-color: rgba(256, 256, 256, .1) !important;">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                        <p class="m-0">Copyright &copy; <a class="text-white" href="#">CKAN.DATA</a>. All Rights
                            Reserved.
                        </p>
                    </div>
                    <div class="col-md-6 text-center text-md-right">
                        <!-- <p class="m-0">Designed by HTML Codex</p> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer End -->


        <!-- Back to Top -->
        <a href="#" class="btn btn-lg btn-primary rounded-0 btn-lg-square back-to-top"><i
                class="fa fa-angle-double-up"></i></a>


    </div>
</template>
