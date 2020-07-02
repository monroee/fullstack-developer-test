<template>
  <div id="app">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view></router-view>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/TheHeader";
import Footer from "@/components/TheFooter";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>
