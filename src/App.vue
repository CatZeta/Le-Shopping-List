<template>
  <Navbar />
    <div class="content">
      <router-view/>
    </div>
  <Footer />
</template>

<script setup>
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
</script>

<style>
  .content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
  }
</style>
