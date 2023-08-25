<template>
  <div class="modal fade bg-black bg-opacity-25" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-0 bg-black border-3 border-danger pt-3 ps-4 pe-4 pb-4">
        <div class="modal-header border-0">
          <button type="button" class="btn-close btn-close-white"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mb-5">
          <p class="text-white fs-5">刪除後無法恢復，請問確定刪除嗎?</p>
        </div>
        <div class="modal-footer border-0 d-flex justify-content-end p-2">
          <button type="button" class="btn btn-danger rounded-5 me-3 mb-0 px-5 py-3"
          @click.prevent="$emit('del-item')">非常確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    item: {},
  },

  data() {
    return {
      modal: '',
    };
  },

  mixins: [modalMixin],
};
</script>
