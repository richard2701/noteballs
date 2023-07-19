<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div
      ref="modalCardRef"
      class="modal-card"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          @click="$emit('update:modelValue', false)"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
          @click="$emit('update:modelValue', false)"
          class="button"
        >
          Cancel
        </button>
        <button
          class="button is-danger"
          @click="storeNotes.deleteNote(noteId)"
        >
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreNotes } from '@/stores/storeNotes'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  noteId: {
    type: String,
    required: true
  }
})
const storeNotes = useStoreNotes()
const modalCardRef = ref(null)
const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}

onClickOutside(modalCardRef, closeModal)

const handleKeyboard = e => {
  if (e.key === 'Escape') closeModal()
}
onMounted(() => {
  document.addEventListener('keyup', e => {
    handleKeyboard(e)
  })
})

onUnmounted(() => {
  document.removeEventListener('keyup', e => {
    handleKeyboard(e)
  })
})



</script>