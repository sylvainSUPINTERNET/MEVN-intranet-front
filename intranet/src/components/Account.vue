  <template>
  <div class="page-container">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">

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


        </md-list>

      </md-app-drawer>

      <md-app-content>
        {{ messageHome }}

        <form novalidate @submit.prevent="registerUser">
          <md-card class="md-flex-50 md-flex-small-100">
            <md-card-header>
              <div class="md-title">Register user</div>
              <br>
              <label for="name">Name</label>
              <input id="name" type="text" name="register_name" v-model="registerData.name">
              <br>
              <label for="email">Email</label>
              <input id="email" type="email" name="register_email" v-model="registerData.email">
              <br>
              <label for="password">Password</label>
              <input id="password" type="password" name="register_password" v-model="registerData.password">
              <br>
              <label for="passwordConfirmed">Password confirmed</label>
              <input id="passwordConfirmed" name="register_passwordConfirmed" type="password" v-model="registerData.passwordConfirmed">
              <br>
              <input href="javascript:void(0)" class="waves-effect waves-light" type="submit" value="register">
            </md-card-header>
          </md-card>
        </form>

        <br>


        <form novalidate @submit.prevent="loginUser">
          <md-card class="md-flex-50 md-flex-small-100">
            <md-card-header>
              <div class="md-title">Login user</div>
              <br>
              <label for="email">Email</label>
              <input id="login_email" type="email" name="login_email" v-model="loginData.email">
              <br>
              <label for="password">Password</label>
              <input id="login_password" type="password" name="login_password" v-model="loginData.password">
              <br>
              <input href="javascript:void(0)" class="waves-effect waves-light" type="submit" value="login">
            </md-card-header>
          </md-card>
        </form>

      </md-app-content>
    </md-app>
  </div>
</template>

<script>

  import axios from 'axios'
  import cookie from 'vue-js-cookie'
  export default {
    name: 'Home',
    data: () => ({
      menuVisible: false,
      messageHome: "Authentification",

      /*register*/
      registerData : {},
      registerError: "",

      /*login*/
      loginData: {},
      loginError: "",

      /* logout */
      //todo : logout + display

    }),
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

      /* register */
      registerUser() {
          let name = this.registerData.name;
          let password = this.registerData.password;
          let passwordConfirmed = this.registerData.passwordConfirmed;
          let email = this.registerData.email;

          if(!email || !name || !password || !passwordConfirmed){
              this.registerError = "Please fill all fields for register !"
            console.log(this.registerError);
          }else{
            //for test : http://jsonplaceholder.typicode.com/posts
            axios.post(`http://localhost:1337/user/add`, {
              body: this.registerData
            })
              .then(function(response){
                console.log(response.data);
                if(response.data.error === false){
                    cookie.set('token', response.data.token, 1);
                }else{
                    this.registerError = response.data.message
                }


              })
              .catch(e => {
                this.registerError = e;
              })
          }

      },

      /* login */
      loginUser() {
        let email = this.loginData.email;
        let password = this.loginData.password;

        if(!email || !password){
          this.loginError = "Please fill all fields for login !"
          console.log(this.loginError);
        }else{
          //for test : http://jsonplaceholder.typicode.com/posts
          axios.post(`http://localhost:1337/user/login`, {
            body: this.loginData
          })
            .then(function(response){
              console.log(response.data);
              if(response.data.error === false){
                cookie.set('token', response.data.token, 1);
              }else{
                this.loginError = response.data.message
              }


            })
            .catch(e => {
              this.loginError = e;
            })
        }

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
