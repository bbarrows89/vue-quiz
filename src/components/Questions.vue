<template>
  <div>
    <li v-for="question in questions">
      <label>
        <!-- v-bind:value sets "value" to "true" if the response is correct -->
        <!-- v-bind:name sets "name" to question index to group answers by question -->
        <!-- v-model creates binding with userResponses -->
        <input type="radio" 
              v-bind:value="response.correct" 
              v-bind:name="index" 
              v-model="userResponses[index]"> {{response.text}}
      </label>
    </li>
  </div>
</template>

<script>
import {API} from '@/common/api'
import CubeSpinner from '@/components/CubeSpinner'
import axios from 'axios'
require('vue2-animate/dist/vue2-animate.min.css')

export default {
  name: 'Questions',
  components: {
    'load-spinner': CubeSpinner
  },

  methods: {
    startGame: (state, payload) => {
          // Set questions to payload from http request in startGame action
          state.questions = payload;
          // Create list of incorrect choices
          state.questions.forEach(el => {
            el.choices = el.incorrect_answers.reduce((acc, item) => {
              acc.push({
                text: item,
                answer: false,
                classes: {
                  incorrect: false
                }
              });
              return acc;
            }, []);
            // Add correct answer
            el.choices.push({
              text: el.correct_answer,
              answer: true,
              classes: {
                correct: false,
              }
            })
            // Shuffle choices
            let i = el.choices.length, temp, rand;
            while (0 !== i) {
              rand = Math.floor(Math.random() * i);
              i -= 1;
              temp = el.choices[i];
              el.choices[i] = el.choices[rand];
              el.choices[rand] = temp;
            }
          })
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
