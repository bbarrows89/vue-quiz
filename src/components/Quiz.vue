<template>
  <div class="quiz">
    <div v-if="!playing">
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
        <p>You've chosen to answer {{numQuestions}} {{difficulty}}
      questions from the: <br> {{getCatNameFromId}} category.</p>
        <transition name="bounce"
        enter-active-class="bounce-enter-active"
        leave-active-class="bounce-leave-active">
          <v-btn block large v-if="ready" type="submit">Play now!</v-btn>
        </transition>
      </form>
    </div>
    <ul v-if="errors.length > 0" class="errors">
      <li v-for="error of errors" :key='error.id'>
        {{error.message}}
      </li>
    </ul>
    <div v-if="playing">
      <form v-on:submit.prevent="checkAnswers">
        <li v-for="(questionObj,index) in quizQuestions" v-bind:key="index">
    
          <p class="questions" v-html="questionObj.question.question"> </p>

          <ul id="answers">
            <li class="answers" v-for="(answer,aIndex) in questionObj.allAnswers" v-bind:key="aIndex">
              <input type="radio" v-bind:value="answer" v-model="picked">
              <label for="answer" v-html="answer"></label>
            </li>
          </ul> 
        </li>
        <v-btn block large v-if="answersPicked" type="submit">Check Answers!</v-btn>
      </form>
    </div>
   <!-- <div v-if="></div> will need to display score here once answers checked -->
  </div>
</template>
<script>
import {API} from '@/common/api'
import CubeSpinner from '@/components/CubeSpinner'
import axios from 'axios'
require('vue2-animate/dist/vue2-animate.min.css')
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
      questions: null, // current list of game questions 
      quizQuestions: null,
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
    shuffle: function(arr) {
      var currentIndex = arr.length,
        temporaryValue,
        randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
      }
      return arr;
    },
    getQuestions: function (event) {
      let category = this.currentCategory
      let difficulty = this.difficulty
      let numQuestions = this.numQuestions
  
      axios
        .get(
          `https://opentdb.com/api.php?type=multiple&amount=${numQuestions}&category=${category}&difficulty=${difficulty}`
        )
        .then(response => {
          this.questions = response.data.results;
          // this.startGame();
          console.log("startGame");
          this.quizQuestions = [];
          for (let i = 0; i < this.questions.length; i++) {
            let correctAnswer = this.questions[i].correct_answer;
            let temp = this.questions[i].incorrect_answers;
            temp.push(correctAnswer);
            temp = this.shuffle(temp);
            this.quizQuestions.push({
              correctAnswer: correctAnswer,
              allAnswers: temp,
              question: this.questions[i]
            });
          }
        })
        .catch(error => {
          this.errors.push(error);
      });
    },
    checkAnswers: function(event) {
      for (let i = 0; i < numQuestions; i++) {
        if (this.picked === quizQuestions.correctAnswer) {
          score =+ 1;
        }
      }

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
    },
    playing: function () {
      if (this.questions != null && this.questions.length > 0) {
        return true;
      }
    },
  },
}
</script>

<style scoped>
.questions {
  font-weight: 700;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(3);
  }
  100% {
    transform: scale(2.5);
  }
}
</style>