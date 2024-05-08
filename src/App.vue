<template>
  <Navbar />
    <div class="content">
      <router-view/>
    </div>
  <Footer />
</template>

<script>
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'


export default {
  components: { Footer, Navbar },
  setup () {
    
  }
}
</script>

<style>
  .content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
  }
</style>
