<template>
    <div v-for="list in shoppingLists" :key="list.id">
        <RouterLink :to="{ name: 'ListDetails', params: { id: list.id } }">
        <div class="single">
            <div class="thumbnail">
                <img :src="list.imageURL" alt="">
            </div>
            <div class="info">
                <h3>{{ list.title }}</h3>
                <p>Created by {{ list.userName }}</p>
            </div>
            <div class="list-number">
                <p>{{ list.items.length }} Items</p>
            </div>
        </div>
        </RouterLink>
    </div>
</template>

<script>

export default {
    props: ['shoppingLists'],
    setup () {
        

        return {}
    }
}
</script>

<style scoped>
  .single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
    transition: all ease 0.2s;
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    max-width: 150%;
    max-height: 150%;
    display: block;
  }
  .info {
    margin: 0 30px;
  }
  .list-number {
    margin-left: auto;
  }
</style>