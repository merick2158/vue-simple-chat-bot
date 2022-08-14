<template>
  <div class="chat-box">
    <div class="chat-box__header">
      <span>My Supply</span>
    </div>
    <div
        id="messages"
        class="chat-box__messages"
    >
      <q-chat-message
          v-for="(user, index) in chatObj"
          :key="index"
          :name="user.name"
          :avatar="avatar[user.name]"
          :text="[user.message]"
          :sent="user.name === 'User'"
          :stamp="timestamp(user.time)"
      />
    </div>
    <div class="chat-box__control">
      <UserInput v-if="timer"/>
    </div>
  </div>
</template>

<script>
import { Server } from 'mock-socket';
import { ChatApp, timestamp } from '@/helpers';
import { mapState } from 'vuex'
import UserInput from '@/components/UserInput'
export default {
  name: "ChatBox",
  components: { UserInput },
  data() {
    return {
      chatObj: [],
      avatar: {
        'Bot': require('@/assets/bot-avatar.jpg'),
        'User': require('@/assets/user-avatar.jpg')
      }
    }
  },
  created () {
    const mockServer = new Server(this.wsUrl);
    mockServer.on('connection', socket => {
      socket.on('message', data => {
        this.chatObj.push(data)
        setTimeout(function (){
          const objDiv = document.getElementById('messages');
          objDiv.scrollTo({ top: objDiv.scrollHeight, behavior: 'smooth' })
        }, 100)
      });
    });
    const app = new ChatApp(this.wsUrl);
    app.sendMessage({ name: 'Bot', message: 'Hello!'});
    app.sendMessage({ name: 'Bot', message: 'What is your offer?'});
    // app.sendMessage({ name: 'User', message: 'fine'});
    // app.sendMessage({ name: 'Bot', message: 'hey, how are you?'});
    // app.sendMessage({ name: 'User', message: 'fine'});
    // app.sendMessage({ name: 'Bot', message: 'hey, how are you?'});
    // app.sendMessage({ name: 'User', message: 'fine'});
    // setTimeout(function (){
    //   app.sendMessage({ name: 'Bot', message: 'Why?'});
    // }, 1000)
    // setTimeout(function (){
    //   app.sendMessage({ name: 'User', message: 'Are you bot?'});
    // }, 3000)
  },
  computed: {
    ...mapState(['wsUrl', 'timer'])
    // messageTime (time) {
    //   return this.timestamp(time)
    // }
  },
  methods: {
    timestamp
  }
}
</script>

<style lang="scss" scoped>
.chat-box {
  position: relative;
  background-color: #fff;
  width: 300px;
  height: 500px;
  box-shadow: 0px 0px 20px 0 rgba(0,0,0,.01);
  border-radius: 4px;
  padding-top: 29px;
  &__messages {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 116px;
    &::-webkit-scrollbar {
      //width: 0;
      display: none;
    }
  }
  &__header {
    background-color: #2f7eb6;
    color: #fff;
    text-align: left;
    padding: 4px 8px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    width: 100%;
    height: 29px;
    z-index: 1;
  }
}
</style>