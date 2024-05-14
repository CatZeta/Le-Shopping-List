<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="sl" class="shoppingList-details">
        <div class="shoppingList-info">
            <div class="cover">
                <img :src="sl.imageURL">
            </div>
            <h2>{{ sl.title }}</h2>
            <p class="username">Created by {{ sl.userName }}</p>
            <p v-if="sl.sharedUser" class="username">Shared with {{ sl.sharedUser}}</p>
            <button v-if="ownership" @click="handleDeleteList">Delete</button>
        </div>
        

        <!--Items list-->
        <div class="item-list">
        <div v-if="!sl.items.length">No Item's yet in this list</div>
        <div v-for="item in sl.items" :key="item.id" class="single-item">
        <div class="details">
         <p>{{ item.item }}</p>
        </div>
        <button v-if="updateAccess" @click="handleDeleteItem(item.id)">Delete</button>
        </div>          
          <AddItem v-if="updateAccess" :sl="sl" />
        </div>
    </div>
</template>

<script>
import AddItem from '@/components/AddItem.vue'
import { useRouter } from 'vue-router'
import useStorage from '@/composables/useStorage';
import useDocument from '@/composables/useDocument';
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import { computed } from 'vue';


export default {
    props: ['id'],
    components: { AddItem },
    setup (props) {
      const { currentUser } = getUser()
      const router = useRouter()
      const {deleteImage} = useStorage()
      const {deleteDoc, updateDoc} = useDocument('shoppingLists', props.id)
     
      
      //sl for shopping list (alias)
      const { document: sl, error } = getDocument('shoppingLists', props.id)
 
      //Ownership logic, defines who have acess to update docs
      const ownership = computed(() => {
        return (
          (sl.value && currentUser.value && currentUser.value.uid === sl.value.userId)
      );
      })

      const updateAccess = computed(() => {
        return (
          (sl.value && currentUser.value && currentUser.value.uid === sl.value.userId) ||
          (sl.value && sl.value.sharedWithID && sl.value.sharedWithID.length > 0)
      );
      })



      const handleDeleteList = async () => {
        if(ownership){
          await deleteImage(sl.value.filePath) 
          await deleteDoc()
          router.push('/')
        } else {
          error.value ="Only the owner can delete the list"
        }
       
      }

      const handleDeleteItem = async (id) => {
        const items = sl.value.items.filter(item => item.id !== id) 
        await updateDoc({items})
        console.log(id)
      }

      return {error, sl, ownership, handleDeleteList, handleDeleteItem, updateAccess}
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
  .single-item {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
</style>