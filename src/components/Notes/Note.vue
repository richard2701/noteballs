<template>
  <div class="card mb-4">
    <header class="card-header">
      <p class="card-header-title">
        Component
      </p>
      <button
        class="card-header-icon"
        aria-label="more options"
      >
        <span class="icon">
          <i
            class="fas fa-angle-down"
            aria-hidden="true"
          ></i>
        </span>
      </button>
    </header>
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        :to="`/editNote/${note.id}`"
        class="card-footer-item"
      >
        Edit
      </RouterLink>
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
      >
        Delete
      </a>
    </footer>
    <ModalDeleteNote
      v-model="modals.deleteNote"
      v-if="modals.deleteNote"
      :note-id="note.id"
    />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useDateFormat } from '@vueuse/core'
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date))
  return useDateFormat(date, 'MM-DD-YYY @ HH:mm').value
})


const modals = reactive({
  deleteNote: false,
  editNote: false
})

const characterLength = computed(() => {
  let length = props.note.content.length
  let description = length > 1 ? 'characters' : 'character'
  return `${length} ${description}`
})


</script>