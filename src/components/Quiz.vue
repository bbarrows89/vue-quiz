<template>
  <div class="quiz">
    <span>Test your trivia knowledge with</span>
    <select v-model="numQuestions">
      <option disabled value="">Please select a number</option>
      <option v-for="n in 20" :value="n" :key="n">{{n}}</option>
      </select>
    <span>questions from a chosen category.</span>
    <load-spinner v-if="showLoading"></load-spinner>
    <select v-if="categories" v-model="currentCategory">
      <option selected value="currentCategory">{{currentCategory.name}}</option>
      <option v-for="category in categories" :value="category" :key="category.id">{{category.name}}</option>
    </select>
    <p>Selected category: </p>
    <p>{{ currentCategory.name }}</p>
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
      categories: [],
      currentCategory: { // chosen category (defaults to Random)
        name: 'Random',
        id: 9
      },
      questions: [], // current list of game questions
      numQuestions: 10,
      messages: [],
      showLoading: false // flag for showing CubeSpinner while loading
    }
  },
  created () {
    // check to see if user has trivia categories cached.
    if (this.$ls.get('categories')) {
      this.categories = this.$ls.get('categories')
    } else {
      console.log('No cache available. Making API call')
      API.get('https://opentdb.com/api_category.php')
        .then(response => {
          this.$ls.set(response.data.trivia_categories)
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
