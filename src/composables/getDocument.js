//This logic will be used to set up a listener to get the documents from the collection in real time
import {ref, watchEffect} from 'vue'
import { projectFirestore } from '@/firebase/config'

const getDocument = (collection, id) => {
    const document = ref(null)
    const error = ref(null)

    // register the firestore document reference
    let documentRef = projectFirestore.collection(collection).doc(id)

    const unsub = documentRef.onSnapshot(doc => {
        if(doc.exists) {
            document.value = {...doc.data(), id: doc.id}
            error.value = null
        } else {
            error.value = 'Document does not exist'
        }

        error.value = null
        
    }, (err) => {
        console.log(err.message)
        error.value = 'Could not fetch document'
    })

    watchEffect((onInvalidate) => {
        //Unsub from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsub())
    })

    return {document, error}
}

export default getDocument