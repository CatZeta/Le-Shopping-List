<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="sl" class="shoppingList-details">
        <div class="shoppingList-info">
            <div class="cover">
                <img :src="sl.imageURL">
            </div>
            <h2>{{ sl.title }}</h2>
            <p class="username">Created by {{ sl.userName }}</p>
        </div>
        <!--Items list-->
        <div class="item-list">
           <p class="list" v-for="item in sl.items">{{item}}</p> 
        </div>
    </div>
</template>

<script>
import getDocument from '@/composables/getDocument';

export default {
    props: ['id'],
    setup (props) {
        //sl for shopping list
        const { document: sl, error } = getDocument('shoppingLists', props.id)

        return {error, sl}
    }
}
</script>

<style scoped>
  .shoppingList-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .shoppingList-info {
    text-align: center;
  }
  .shoppingList-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .shoppingList-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .item-list {
    overflow-y: scroll;
    text-align: left;
    max-height: 400px;
 
  }
</style>