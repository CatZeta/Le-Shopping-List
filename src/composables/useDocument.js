import { ref} from 'vue'
import { projectFirestore } from '@/firebase/config'

const useDocument = (collection, id) => {

    const error = ref(null)
    const isPending = ref(false)

    const deleteDoc = async () => {
        isPending.value = true
        error.value = null

        let docRef = projectFirestore.collection(collection).doc(id)

        try {

            const resp = await docRef.delete()
           
            isPending.value = false
            error.value = null
            console.log('Doc Deleted')

            return resp

        } catch (err) {
            console.log(err.message)
            error.value = 'Could not delete document'
            isPending.value = false   
        }
    }

    const updateDoc = async (updates) => {
        isPending.value = true
        error.value = null

        let docRef = projectFirestore.collection(collection).doc(id)

        try {

            const resp = await docRef.update(updates)
           
            isPending.value = false
            error.value = null
            console.log('Doc Updated')

            return resp

        } catch (err) {
            console.log(err.message)
            error.value = 'Could not update document'
            isPending.value = false   
        }
    }

return {
    isPending,
    error,
    deleteDoc, 
    updateDoc
}
}

export default useDocument