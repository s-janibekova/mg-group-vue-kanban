<template>
 
 <transition appear @before-enter="beforeEnter" @enter="enter" :css="false">
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag
      class="card"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
      @click="goToTask(task)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.lastName }}  {{ task.helpType}}
      </span>

      <p

        v-if="task.description"
        class="w-full flex-no-shrink mt-1 text-sm"
      >
        {{ task.description }}
      </p>
      <router-link class="button" :to="{ name: 'customer-show', params: { id: task.id } }" :task="task">Подробнее</router-link>
    </AppDrag>
  </AppDrop>
 </transition>

</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import gsap from 'gsap'

export default {
  components: { AppDrag, AppDrop },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    beforeEnter (el) {
      el.style.opacity = 0
      el.style.transform = 'scale(0,0)'
    },
    enter (el, done) {
      gsap.to(el, {
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: 'bounce.out',
        onComplete: done
      })
    }

  }
}
</script>

<style lang="css">
 .card {
  display: block;
  margin: 0 auto 1em auto;
  height: 5em;
  width: 20em;
  border-radius: 1%;
  background-color: #ffffff;
  box-shadow: 0.08em 0.03em 0.4em #ababab;
}

.button {
  background-color: rgb(199, 33, 124); /* Green */
  border: none;
  color: rgb(255, 255, 255);
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin-left: 250px;
}
</style>
