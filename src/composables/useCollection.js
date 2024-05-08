import {ref} from 'vue'
import { projectFirestore } from '@/firebase/config'

/**
 * Composable function to handle operations on a Firestore collection.
 *
 * @param {string} collection - Name of the Firestore collection.
 * @return {Object} Returns an object with an error ref and an addDoc function.
 */
const useCollection = (collection) => {
    // Ref to hold any error that occurs during Firestore operations.
    const error = ref(null)
    const isPending = ref(false)

    /**
     * Adds a document to the specified Firestore collection.
     *
     * @param {Object} doc - Document to be added.
     */
    const addDoc = async (doc) => {
        // Reset error before attempting operation.
        error.value = null
        isPending.value = true
        

        try {  
            // Attempt to add the document to the collection.
            const resp = await projectFirestore.collection(collection).add(doc)
            isPending.value = false
            return resp

        } catch (err) {
            // Log the error and set the error ref.
            console.log(err.message)
            error.value = err.message
            isPending.value = false
        }
    }

    // Return the error ref and the addDoc function.
    return {error, addDoc, isPending}
}

export default useCollection