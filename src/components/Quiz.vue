<template>
  <div class="hello">
    <h2>Test your trivia knowledge with 10 questions from a chosen category.</h2>
    <load-spinner v-if="showLoading"></load-spinner>
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
        id: 9,
      },
      questions: [], //current list of game questions
      messages: [],
      showLoading: false // flag for showing CubeSpinner while loading
    }
  },
  created () {
    // check to see if user has trivia categories cached.
    let cacheExpiry = 1000 * 60 * 60 * 24 * 365 // cache expires after 1 year
    if (this.$ls.get('categories')){
      this.categories = this.$ls.get('categories');
    } else {
      console.log('No cache available. Making API call');
      API.get('https://opentdb.com/api_category.php')
      .then(response => {
        this.$ls.set(response.data, cacheExpiry);
        console.log('Categories have been retrieved and cached.');
        this.categories = response.data;
        this.showLoading = false;
      })
      .catch(error => {
        this.messages.push({
          type: 'error',
          text: error.message
        });
        this.showLoading = false;
      });
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
