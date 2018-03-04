<template>
  <div class="hello">
    <h2>Test your trivia knowledge with 10 questions from a chosen category.</h2>
    
  </div>
</template>

<script>
import {API} from '@/common/api';
import CubeSpinner from '@/components/CubeSpinner';


export default {
  name: 'Quiz',
  components: {
    'load-spinner': CubeSpinner
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
