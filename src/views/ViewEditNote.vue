<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      bg-color="link"
      ref="addEditNoteRef"
      label="Edit Note"
      placeholder="Edit note.."
    >
      <template #buttons>
        <RouterLink
          to="/"
          class="button is-link is-light mr-2"
        >
          Cancel
        </RouterLink>
        <button
          @click="handleSaveClicked"
          class="button is-link has-background-link"
          :disabled="!noteContent"
        >
          Save note
        </button>

      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStoreNotes } from '@/stores/storeNotes'
import AddEditNote from '@/components/Notes/AddEditNote.vue';

const storeNotes = useStoreNotes()
const route = useRoute()
const router = useRouter()
const noteContent = ref('')
noteContent.value = storeNotes.getNoteContent(route.params.id)

const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent.value)
  router.push('/')
}
</script>