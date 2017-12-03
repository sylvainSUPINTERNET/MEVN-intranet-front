  <template>
  <div class="page-container">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">

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
            <md-icon @click="goGrade">school</md-icon>
            <span class="md-list-item-text" @click="goGrade" style="cursor: pointer">Grade</span>
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
        <div v-if="registerError !== null" style="color:red">
          {{registerError.email}}
          <br>
          {{registerError.password}}
          <br>
          {{registerError.passwordConfirmed}}
          <br>
          {{registerError.name}}
          <br>
        </div>

        <div v-if="registerErrorForm !== null" style="color:red">
          {{registerErrorForm}}
          <br>
        </div>



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


        <div v-if="loginError !== null" style="color:red">
          {{loginError}}
        </div>


        <div v-if="loginErrorForm !== null" style="color:red">
          <br>
          {{loginErrorForm}}
          <br>
        </div>

      </md-app-content>
    </md-app>
  </div>

    <!-- logout only if user has token -->
    <div class="signUpAndIn" v-show="current_user_token">
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
          <p>Logout</p>
          <button v-on:click="logoutUser">Se déconnecter</button>
        </md-app-content>
      </md-app>
    </div>
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

      /* modal */
      alertError: false,

      /*register*/
      registerData : {},
      registerError: null,
      registerErrorForm : null,


      /*login*/
      loginData: {},
      loginError: null,
      loginErrorForm : null,


      /* logout */


      /* token */
      current_user_token: cookie.get('token'),



    }),
    computed: {

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

      /* register */
      registerUser() {
        var self = this;

          let name = this.registerData.name;
          let password = this.registerData.password;
          let passwordConfirmed = this.registerData.passwordConfirmed;
          let email = this.registerData.email;

          if(!email || !name || !password || !passwordConfirmed){
              this.registerErrorForm = "Please fill all fields for register !"
            //error works
          }else{
              self.registerErrorForm = null;
            axios.post(`http://localhost:1337/user/add`, {
              body: this.registerData
            })
              .then(function(response){

                  if(response.data.error === true){
                    console.log(response.data);
                    self.registerError = response.data;
                    console.log(self.registerError);
                  }

                if(response.data.error === false){
                  cookie.set('token', response.data.token, 1);
                  self.current_user_token = cookie.get('token')
                  console.log(self.current_user_token);
                  //location.reload();
                }


              })
              .catch(e => {
                this.registerError = e;
              });


          }

          //location.reload();

      },

      /* login */
      loginUser() {
        let email = this.loginData.email;
        let password = this.loginData.password;
        var self = this;

        if(!email || !password){
          this.loginErrorForm = "Please fill all fields for login !"
          console.log(this.loginError);
        }else{
            console.log("CURRENT_USER_TOKEN ====> " + self.current_user_token );

          //for test : http://jsonplaceholder.typicode.com/posts
          axios.post(`http://localhost:1337/user/login`, {
            body: this.loginData
          })
            .then(function(response){
              console.log(response.data);
              if(response.data.error === false){
                cookie.set('token', response.data.token, 1);
                self.current_user_token = cookie.get('token')

              }else{
                self.loginErrorForm = null;
                  self.loginError = response.data.message
              }


            })
            .catch(e => {
              this.loginError = e;
            })
        }
     // location.reload();
      },

      logoutUser() {
          console.log("logout");
          cookie.remove('token');
          location.reload();
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
