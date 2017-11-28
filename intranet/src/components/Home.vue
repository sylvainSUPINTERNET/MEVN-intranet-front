<template>
  <div class="page-container">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">

    <div class="home_connected" v-show="current_user_token">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Home</span>
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
        <h2>{{ messageHome }}</h2>
        <br>
        token : {{ current_user_token }}
        <br>

       {{profile[0]}}
      </md-app-content>

    </md-app>
    </div>


    <!-- logout only if user has token -->
    <div class="home_not_connected" v-show="!current_user_token">
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
  import MdAppContent from "../../node_modules/vue-material/src/components/MdApp/MdAppContent";

  export default {
    components: {MdAppContent},
    name: 'Home',
    data: function () {
      return {
        menuVisible: false,
        messageHome: "Profile",
        current_user_token : cookie.get('token'),
        profile : this.getProfile(),
      }
    },
    methods: {
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
      getProfile(){
        let self = this;
        let array = []
        axios.post(`http://localhost:1337/user/profile`, {
          token: cookie.get('token')
        })
          .then(function(response){
            console.log(response.data.user_decoded_from_jwt);
            array.push(response.data.user_decoded_from_jwt)
            console.log(array);
          });
        return array;

      }
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
