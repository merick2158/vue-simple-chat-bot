<template>
  <div class="user-input">
    <q-linear-progress
        class="user-input__progress"
        size="20px"
        :value="progress1">
      <div class="absolute-full flex flex-center">
        <q-badge
            class="user-input__progress-badge"
            color="white"
            :label="progressLabel1" />
      </div>
    </q-linear-progress>
    <q-input
        outlined
        v-model.number="userOffer"
        type="number"
        label="Input your offer"
        stack-label
        color="grey-6"
        maxlength="12">
      <template v-slot:append>
        €
      </template>
      <template v-slot:after>
        <q-btn
            round
            dense
            flat
            icon="send"
            @click="sendOffer()"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import {ChatApp} from "@/helpers";
import { mapActions, mapState } from 'vuex';

export default {
  name: "UserInput",
  data() {
    return {
      userOffer: null,
      // timer: 15,
      timeLeft: null,
      offerSent: false
    }
  },
  async mounted() {
    await this.$nextTick()
    this.timeLeft = this.timer
    const $this = this
    const timer = setInterval(function () {
      if ($this.timeLeft) $this.timeLeft -= 1
      if (!$this.timeLeft || $this.timeLeft === 0) {
        clearInterval(timer)
        if (!$this.offerSent) $this.sendOffer()
      }
    }, 1000)
  },
  computed: {
    ...mapState(['wsUrl', 'timer']),
    progress1 () {
      return this.timeLeft/this.timer
    },
    progressLabel1 () {
      return this.timeLeft + ' seconds'
    }
  },
  methods: {
    ...mapActions(['setOffer', 'setTimer']),
    sendOffer () {
      const app = new ChatApp(this.wsUrl);
      if (this.userOffer) app.sendMessage({name: 'User', message: this.userOffer + ' €'});
      this.setOffer(this.userOffer);
      this.offerSent = true
      this.setTimer(null)
      this.timeLeft = null
    }
  }
}
</script>

<style lang="scss" scoped>
.user-input {
  position: absolute;
  top: auto;
  right: 8px;
  bottom: 8px;
  left: 8px;
  background-color: #f6efe5;
  padding: 8px;
  &__progress {
    margin-bottom: 8px;
  }
  &__progress,
  &__progress-badge {
    color: #2f7eb6;
  }
}
</style>