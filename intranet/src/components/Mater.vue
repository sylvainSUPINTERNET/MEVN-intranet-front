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
          <span class="md-title">Mater</span>
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
         <h4>Liste des matières</h4>

          <ul v-for="mater in maters[0]">
            <li>
              id : {{ mater.name }}
              <br>
              users : {{ mater.users }}
              <br>
              grades : {{ mater.grades }}
              <br>
            </li>
          </ul>

        </md-app-content>

        <md-app-content>
          <h4>Ajouter un étudiant à une matière</h4>
          <form novalidate @submit.prevent="addUserMater">
            <md-field>
              <md-select v-model="addUserMaterData.user_name" name="user" id="user" placeholder="User">
                <md-option v-for="user in users[0]" v-bind:value="user.name">{{user.name}}</md-option>
              </md-select>
            </md-field>
            <md-field>
              <md-select v-model="addUserMaterData.mater_name" name="mater" id="mater" placeholder="Mater">
                <md-option v-for="mater in maters[0]" v-bind:value="mater.name">{{mater.name}}</md-option>
              </md-select>
            </md-field>
                <input href="javascript:void(0)" class="waves-effect waves-light" type="submit" value="add user to mater">
          </form>

        </md-app-content>

        <md-app-content>
          <h4>Delete un étudiant d'une matière</h4>
          <form novalidate @submit.prevent="deleteUserMater">
            <md-field>
              <md-select v-model="deleteUserMaterData.user_name" name="user"  placeholder="User">
                <md-option v-for="user in users[0]" v-bind:value="user.name">{{user.name}}</md-option>
              </md-select>
            </md-field>
            <md-field>
              <md-select v-model="deleteUserMaterData.mater_name" name="mater"  placeholder="Mater">
                <md-option v-for="mater in maters[0]" v-bind:value="mater.name">{{mater.name}}</md-option>
              </md-select>
            </md-field>
            <input href="javascript:void(0)" class="waves-effect waves-light" type="submit" value="delete user from mater">
          </form>

        </md-app-content>


        <md-app-content>
          <h4>Ajouter une matière</h4>
          <form novalidate @submit.prevent="addMater">
            <label for="mater_name">Name</label>
            <input id="mater_name" type="text" name="mater_name" v-model="addMaterData.mater_name">
            <input href="javascript:void(0)" class="waves-effect waves-light" type="submit" value="add user to mater">
          </form>

        </md-app-content>


        <md-app-content>
          <h4>Delete une matière</h4>
          <form novalidate @submit.prevent="deleteMater">
            <md-field>
              <md-select v-model="deleteMaterData.mater_name" name="user" placeholder="Mater to delete">
                <md-option v-for="mater in maters[0]" v-bind:value="mater.name">{{mater.name}}</md-option>
              </md-select>
            </md-field>
            <input href="javascript:void(0)" class="waves-effect waves-light" type="submit" value="Delete mater">
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
              <md-icon @click="goMater">school</md-icon>
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
    name: 'Mater',
    data: function () {
      return {
        menuVisible: false,
        messageHome: "Liste des matières",
        current_user_token : cookie.get('token'),
        maters: this.getMaters(),
        users: this.getUsers(),
        addUserMaterData:{},
        addMaterData:{},
        deleteMaterData:{},
        deleteUserMaterData:{},
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
      addUserMater(){
         console.log(this.addUserMaterData);
        axios.post(`http://localhost:1337/mater/addUser`, {
          body: this.addUserMaterData
        })
          .then(function(response){
              console.log(response.data.message);
          })
          .catch(e => {
            console.log(e);
          });
            console.log("add user to mater ");
            location.reload();
      },
      deleteUserMater(){
        console.log(this.deleteUserMaterData);
        axios.post(`http://localhost:1337/mater/deleteUser`, {
          body: this.deleteUserMaterData
        })
          .then(function(response){
            console.log(response.data.message);
          })
          .catch(e => {
            console.log(e);
          });
        console.log("delete user to mater ");
        location.reload();
      },
      addMater(){
          console.log("add mater", this.addMaterData);
        axios.post(`http://localhost:1337/mater/add`, {
          body: this.addMaterData
        })
          .then(function(response){
            console.log(response.data.message);
          })
          .catch(e => {
            console.log(e);
          });
        location.reload();
      },
      deleteMater(){
        console.log("delete mater", this.deleteMaterData);
        axios.post(`http://localhost:1337/mater/delete`, {
          body: this.deleteMaterData
        })
          .then(function(response){
            console.log(response.data.message);
          })
          .catch(e => {
            console.log(e);
          });

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
      },


    }
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
