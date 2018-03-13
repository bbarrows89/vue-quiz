<template>
  <div class="quiz">
    <span>Test your trivia knowledge with</span>
    <select v-model="numQuestions">
      <option selected disabled value="0">Please select a number</option>
      <option v-for="n in 20" :value="n" :key="n">{{n}}</option>
    </select>
    <select v-model="difficulty">
      <option selected disabled value="">Select a difficulty</option>
      <option>easy</option>
      <option>medium</option>
      <option>hard</option>
    </select>
    <span>questions from the following categories: </span>
    <load-spinner v-if="showLoading"></load-spinner>
    <select v-if="categories" v-model="currentCategory">
      <option v-for="category in categories" :value="category.id"
      :key="category.id">{{category.name}}</option>
    </select>
    <form v-on:submit.prevent="getQuestions">
      <p>You've chosen to answer {{numQuestions}} {{difficulty}} difficulty
    questions from the: <br> {{getCatNameFromId}} category.</p>
      <button v-if="ready" type="submit">Play now!</button>
    </form>
    <ul v-if="errors.length > 0" class="errors">
      <li v-for="error of errors" :key='error.id'>
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import {API} from '@/common/api'
import CubeSpinner from '@/components/CubeSpinner'
import axios from 'axios'

export default {
  name: 'Quiz',
  components: {
    'load-spinner': CubeSpinner
  },
  data () {
    return {
      categories: null,
      currentCategory: 9, // default to random category
      difficulty: '',
      questions: [], // current list of game questions
      numQuestions: 0,
      messages: [],
      showLoading: false, // flag for showing CubeSpinner while loading
      errors: []
    }
  },
  created () {
    // check to see if user has trivia categories cached.
    if (this.$ls.get('categories')) {
      console.log('Cached categories found.')
      this.categories = this.$ls.get('categories')
    } else {
      console.log('No cache available. Making API call')
      this.showLoading = true
      API.get('https://opentdb.com/api_category.php')
        .then(response => {
          this.$ls.set('categories', response.data.trivia_categories)
          console.log('Categories have been retrieved and cached.')
          this.categories = response.data.trivia_categories
          this.showLoading = false
        })
        .catch(error => {
          this.messages.push({
            type: 'error',
            text: error.message
          })
          this.showLoading = false
        })
    }
  },
  methods: {
    getQuestions: function (event) {
      let category = this.currentCategory
      let difficulty = this.difficulty
      let numQuestions = this.numQuestions

      axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}`)
        .then(response => {
          this.questions = response.data
        })
        .catch(error => {
          this.errors.push(error)
        })
    }
  },
  computed: {
    getCatNameFromId: function () {
      console.log('currrent category: ' + this.currentCategory)
      let searchId = this.currentCategory
      let found = this.categories.find(function (element) {
        return element.id === searchId
      })
      return found.name
    },
    ready: function () {
      if (this.difficulty && this.numQuestions && this.currentCategory) {
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
