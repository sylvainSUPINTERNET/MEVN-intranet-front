<template>
  <div class="page-container">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">

    <div class="list_user" v-show="current_user_token">
      <md-app>
        <md-app-toolbar class="md-primary" md-elevation="0">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Grade</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span>Intranet - EUW</span>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-list>
            <md-list-item>
              <md-icon @click="goAccount">account_circle</md-icon>
              <span class="md-list-item-text" @click="goAccount" style="cursor: pointer">Account</span>
            </md-list-item>

            <md-subheader class="md-inset"></md-subheader>

            <md-list-item>
              <md-icon @click="goTrombinoscope">home</md-icon>
              <span class="md-list-item-text" @click="goHome" style="cursor: pointer">Home</span>
            </md-list-item>

            <md-list-item>
              <md-icon @click="goTrombinoscope">perm_identity</md-icon>
              <span class="md-list-item-text" @click="goTrombinoscope" style="cursor: pointer">Trombinoscope</span>
            </md-list-item>

            <md-list-item>
              <md-icon @click="goMater">import_contacts</md-icon>
              <span class="md-list-item-text" @click="goMater" style="cursor: pointer">Mater</span>
            </md-list-item>


            <md-list-item>
              <md-icon @click="goGrade">school</md-icon>
              <span class="md-list-item-text" @click="goGrade" style="cursor: pointer">Grade</span>
            </md-list-item>

          </md-list>

        </md-app-drawer>

        <md-app-content>
          <h4>Liste des notes</h4>

          <ul v-for="grade in grades[0]">
            <li>
              Note : {{ grade.value }} / {{ grade.total }}
              <br>
              mater : {{ grade.mater.name }}
              <br>
              user : {{ grade.user.name }}
              <br>
              <button @click="deleteGrade(grade._id)">Delete</button>
            </li>
          </ul>

        </md-app-content>

        <md-app-content>
          <h4>Ajouter une note à un user (update auto de la matière avec cette note)</h4>
          <form novalidate @submit.prevent="addGrade">
            <md-field>
              <md-select v-model="addGradeData.grade_user" name="user" id="user" placeholder="User">
                <md-option v-for="user in users[0]" v-bind:value="user.name">{{user.name}}</md-option>
              </md-select>
            </md-field>
            <md-field>
              <md-select v-model="addGradeData.grade_mater" name="mater" id="mater" placeholder="Mater">
                <md-option v-for="mater in maters[0]" v-bind:value="mater.name">{{mater.name}}</md-option>
              </md-select>
            </md-field>
            <label for="grade_value">
              Note
            </label>
            <input id="grade_value" type="number" name="grade_value" v-model="addGradeData.grade_value">
            <label for="grade_total">
              Total
            </label>
            <input id="grade_total" type="number" name="grade_total" v-model="addGradeData.grade_total">

            <input href="javascript:void(0)" class="waves-effect waves-light" type="submit" value="add user to mater">
          </form>
        </md-app-content>

      </md-app>

    </div>

    <!-- logout only if user has token -->
    <div class="signUpAndIn" v-show="!current_user_token">
      <md-app>
        <md-app-toolbar class="md-primary" md-elevation="0">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Account</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span>Intranet - EUW</span>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-list>

            <md-list-item>
              <md-icon @click="goAccount">account_circle</md-icon>
              <span class="md-list-item-text" @click="goAccount" style="cursor: pointer">Sign up / Sign In</span>
            </md-list-item>

            <md-subheader class="md-inset"></md-subheader>

            <md-list-item>
              <md-icon @click="goTrombinoscope">home</md-icon>
              <span class="md-list-item-text" @click="goHome" style="cursor: pointer">Home</span>
            </md-list-item>

            <md-list-item>
              <md-icon @click="goTrombinoscope">perm_identity</md-icon>
              <span class="md-list-item-text" @click="goTrombinoscope" style="cursor: pointer">Trombinoscope</span>
            </md-list-item>

            <md-list-item>
              <md-icon @click="goMater">import_contacts</md-icon>
              <span class="md-list-item-text" @click="goMater" style="cursor: pointer">Mater</span>
            </md-list-item>

            <md-list-item>
              <md-icon @click="goGrade">school</md-icon>
              <span class="md-list-item-text" @click="goGrade" style="cursor: pointer">Grade</span>
            </md-list-item>

          </md-list>

        </md-app-drawer>

        <md-app-content>
          <p>Pas connecté !</p>
          <button v-on:click="goAccount">Se connecter !</button>
        </md-app-content>
      </md-app>
    </div>

  </div>


</template>

<script>
  import cookie from 'vue-js-cookie'
  import axios from 'axios'

  export default {
    name: 'Grade',
    data: function () {
      return {
        menuVisible: false,
        messageHome: "Grade",
        current_user_token : cookie.get('token'),
        maters: this.getMaters(),
        users: this.getUsers(),
        grades: this.getGrades(),
        addGradeData: {},
        deleteGradeData: {},

      }
    },
    computed: {

    },
    methods: {

      getUsers() {
        let self = this;
        let array = []
        axios
          .get(`http://localhost:1337/user/list`)
          .then(function(response){
            console.log(response.data.message);
            array.push(response.data.message);
            console.log(array[0][1]);
          });
        return array;

      },
      getMaters(){
        let self = this;
        let array = []
        axios
          .get(`http://localhost:1337/mater/list`)
          .then(function(response){
            console.log(response.data.message);
            array.push(response.data.message);
            console.log(array[0][1]);
          });
        return array;
      },


      addGrade(){
        axios.post(`http://localhost:1337/grade/add`, {
          body: this.addGradeData
        })
          .then(function(response){
            console.log(response.data.message);
          })
          .catch(e => {
            console.log(e);
          });
          console.log("add grade", this.addGradeData);
          location.reload()
      },


      getGrades() {
        let self = this;
        let array = []
        axios
          .get(`http://localhost:1337/grade/list`)
          .then(function(response){
            console.log(response.data.message);
            array.push(response.data.message);
            console.log(array[0][1]);
          });
        return array;

      },

      deleteGrade(grade_id){
        axios.post(`http://localhost:1337/grade/delete`, {
          grade_id: grade_id
        })
          .then(function(response){
            console.log(response.data.message);
          })
          .catch(e => {
            console.log(e);
          });
        console.log("delete", grade_id)
        location.reload();
      },



      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      goAccount(){
        this.$router.push('/account')
      },
      goHome(){
        this.$router.push('/')
      },
      goTrombinoscope(){
        this.$router.push('/trombinoscope')

      },
      goMater(){
        this.$router.push('/mater')

      },
      goGrade(){
        this.$router.push('/grade');
      }
    },

  }
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

  // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
