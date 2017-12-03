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
        <span class="md-title">Trombinoscope</span>
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
            <md-icon @click="goMater">school</md-icon>
            <span class="md-list-item-text" @click="goGrade" style="cursor: pointer">Grade</span>
          </md-list-item>


        </md-list>

      </md-app-drawer>

      <md-app-content>
        <!-- {{users[0]}} -->
        <ul v-for="user in users[0]">

          <md-card md-with-hover>
            <md-ripple>
              <md-card-header>
                <div class="md-title"> name : {{ user.name }}</div>
                <div class="md-subhead">statut : {{ user.role }}</div>
              </md-card-header>

              <md-card-content>
                email : {{ user.email }}

                <br>
                <br>
                <div class="md-subhead">List of maters</div>
                <!--
                <ul>
                  <li v-for="mater in user.maters">
                    {{mater.name}}
                  </li>
                </ul>
                -->

                <ul v-for="mater in user.maters">
                  {{mater.name}}
                  <li v-for="grade in user.grades">
                    <div v-if="mater._id === grade.mater">
                      {{grade.value}} / {{grade.total}}
                    </div>
                  </li>
                  <br>
                </ul>

              </md-card-content>

              <md-card-actions>
                <button v-if="user.role ==='ROLE_ETUDIANT'"  @click="promoteUser(user.role, user._id)">Promote to professeur</button>
                <button v-if="user.role ==='ROLE_PROFESSEUR'"  @click="promoteUser(user.role, user._id)">Demote to edutiant</button>
                <button @click="deleteUser(user._id, user.name)">Supprimer</button>
              </md-card-actions>
            </md-ripple>
          </md-card>
        </ul>
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
    name: 'Trombinoscope',
    data: function () {
      return {
        menuVisible: false,
        messageHome: "Trombinoscope",
        current_user_token : cookie.get('token'),
        users: this.getUsers(),
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

      deleteUser(user_id, user_name) {
        axios.post(`http://localhost:1337/user/delete`, {
          body: user_id
        })
          .then(function(response){
            console.log(response.data.message);
          })
          .catch(e => {
            console.log(e);
          });
        //get token decoded user
        //if reponse api return user name

        let token_current = cookie.get('token')


        axios.post(`http://localhost:1337/token/decoded`, {
          body: token_current
        })
          .then(function(response){
            console.log(response.data.message);
            console.log("response", response.data.message);
            console.log(response, user_name) //bug name_current_user undefined
            if(response.data.message === user_name){
              console.log("remove token car même user");
              cookie.remove('token');
              location.reload();
            }
          })
          .catch(e => {
            console.log(e);
          });

        location.reload();


      },
      promoteUser(user_role, user_id){
        console.log(user_role, user_id);
        axios.post(`http://localhost:1337/user/promote`, {
          body: {user_role, user_id}
        })
          .then(function(response){
            console.log(response.data.message);
          })
          .catch(e => {
            console.log(e);
          });
        location.reload()
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
