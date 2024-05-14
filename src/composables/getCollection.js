//This logic will be used to set up a listener to get the documents from the collection in real time
import {ref, watchEffect} from 'vue'
import { projectFirestore } from '@/firebase/config'

const getCollection = (collection, query) => {
    const documents = ref(null)
    const error = ref(null)

    // register the firestore collection reference
    let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

    //In case of query (optional argument)
    if(query) {
        collectionRef = collectionRef.where(...query)
    }

    const unsub = collectionRef.onSnapshot(snap => {
        let results = []

        snap.docs.forEach(doc => {
        // must wait for the server to create the timestamp & send it back
        // we don't want to edit data until it has done this
        doc.data().createdAt && results.push({...doc.data(), id: doc.id})
  });

        //Updating values
        documents.value = results
        error.value = null
        
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'Could not fetch data'
    })


    watchEffect((onInvalidate) => {
        //Unsub from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsub())
    })

    return {documents, error}
}

export default getCollection