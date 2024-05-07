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

    /**
     * Adds a document to the specified Firestore collection.
     *
     * @param {Object} doc - Document to be added.
     */
    const addDoc = async (doc) => {
        // Reset error before attempting operation.
        error.value = null

        try {  
            // Attempt to add the document to the collection.
            await projectFirestore.collection(collection).add(doc)
        } catch (err) {
            // Log the error and set the error ref.
            console.log(err.message)
            error.value = err.message
        }
    }

    // Return the error ref and the addDoc function.
    return {error, addDoc}
}

export default useCollection