import Vue from 'vue'
import Router from 'vue-router'
import Quiz from '@/components/Quiz'
import Questions from '@/components/Questions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/play',
      name: 'Questions',
      component: Questions
    }
  ]
})
