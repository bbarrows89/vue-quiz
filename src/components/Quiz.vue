<template>
  <div class="quiz">
    <span>Test your trivia knowledge with</span>
    <select v-model="numQuestions">
      <option selected disabled value="">Please select a number</option>
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
      <option selected disabled value="">categories.</option>
      <option value="currentCategory">{{currentCategory.name}}</option>
      <option v-for="category in categories" :value="category" :key="category.id">{{currentCategory.name}}</option>
    </select>
    <p>You've chosen to answer {{numQuestions}} {{difficulty}} difficulty questions from the: <br> {{currentCategory.name}} category.</p>
  </div>
</template>

<script>
import {API} from '@/common/api'
import CubeSpinner from '@/components/CubeSpinner'

export default {
  name: 'Quiz',
  components: {
    'load-spinner': CubeSpinner
  },
  data () {
    return {
      categories: null,
      currentCategory: { // chosen category (defaults to Random)
        name: 'Random',
        id: 9
      },
      difficulty: '',
      questions: [], // current list of game questions
      numQuestions: 10,
      messages: [],
      showLoading: false // flag for showing CubeSpinner while loading
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
