// stores/counter.js
import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query
} from 'firebase/firestore';
import { useStoreAuth } from '@/stores/storeAuth';

let notesCollectionRef
let notesCollectionQuery

let getNotesSnapshot = null
export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    init() {
      const useStores = useStoreAuth()
      notesCollectionRef = collection(db, 'users', useStores.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
      this.getNotes()
    },
    async getNotes() {
      const useStores = useStoreAuth()
      this.notesLoaded = false
      if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from previous snapshot

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = true
      }, (error) => {
        if (error.message === 'Missing or insufficient permissions.') {
          useStores.logoutUser()
        }
      })
    },
    clearNotes() {
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from previous snapshot
    },
    async addNote(payload) {
      /* this.notes.unshift(note) */
      /* await setDoc(doc(notesCollectionRef, id), {
          content: payload,
          id
        })  
      */
      let currentDate = new Date().getTime(),
        date = currentDate.toString()
      await addDoc(notesCollectionRef, {
        content: payload,
        date
      })

    },
    async deleteNote(idToDelete) {
      /*  this.notes = this.notes.filter(note => note.id !== idToDelete) */
      await deleteDoc(doc(notesCollectionRef, idToDelete));

    },
    async updateNote(id, content) {
      /* let index = this.notes.findIndex(note => note.id === id)
      this.notes[index].content = content */
      await updateDoc(doc(notesCollectionRef, id), {
        content: content
      })

    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.find(note => note.id === id).content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.reduce((acc, note) => {
        count += note.content.length
      }, count)
      return count
    }
  }
})