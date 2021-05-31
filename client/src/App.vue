 <template>
  <v-app id="main-app">
    <div v-if="isLoading"> 
      <LoadingComponent v-if="isLoading"></LoadingComponent>
    </div>
    <div v-else>
      <nav id="main-navbar" class="navbar navbar-expand">
        <div id="brand-container">
          <router-link to="/" class="navbar-brand">
            <img alt="Logo Association Sophrofraise" src="./assets/img/logo_white.png">
            <span id="brand-text">Association Sophrofraise'tralala</span>
          </router-link>
        </div>
        <div id="menu-container">
          <div class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link to="/presentation" class="nav-link"><img src="./assets/icons/strawberry.svg" height="20px" width="20px" alt="Icône de fraise">Présentation</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/contact" class="nav-link"><i class="fas fa-address-card"></i>Contact</router-link>
              </li>
              <li class="nav-item" v-if="this.$session.exists()">
                <router-link to="/admin" class="nav-link" @click="logout"><i class="fas fa-crown"></i>Admin</router-link>
              </li>
              <li class="nav-item" v-if="!this.$session.exists()">
                <router-link to="/login" class="nav-link"><i class="fas fa-user"></i>Connexion</router-link>
              </li>
              <li class="nav-item" v-else>
                <a class="nav-link" @click="logout"><i class="fas fa-user"></i>Déconnexion</a>
              </li>
            </div>
            <div v-if="this.$session.exists()" style="display:flex;justify-content:flex-end;">
              <span id="textConnectedAs">Connecté(e) : <span style="font-weight:bolder;">{{ this.$session.get('identite') }}</span></span>
            </div>
        </div>
      </nav>
      <!-- content of the page -->
      <div>
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
import LoadingComponent from './components/LoadingComponent.vue';
import Swal from "sweetalert2"

  var prevScrollPos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollPos >= currentScrollPos) {
      document.getElementById("main-navbar").style.transition = "0.5s";
      document.getElementById("main-navbar").style.top = "0";
    } else {
      document.getElementById("main-navbar").style.transition = "0.5s";
      document.getElementById("main-navbar").style.top = "-150px";
    }
  prevScrollPos = currentScrollPos;
}
export default {
  name: "app",
  components: {
    LoadingComponent
  },
  data: function() {
    return {
      isLoading:true
    }
  },
  methods: {
    logout() {
      this.$session.destroy()
      this.$router.push('/login')
      Swal.fire({
        title:"Déconnexion réussie",
        icon:'success',
        confirmButtonText:'Ok'
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    },10000)
  }
};
</script>

<!-- CSS appliqué à tous les composants  -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Pontano+Sans&family=Lobster&family=Noto+Sans+JP:wght@100&display=swap');
  #main-app {
    background-color:#BAD5CA !important;
  }

  h1 {
    font-size:25px;
    font-family:'Pontano Sans',sans-serif;
    font-weight: bolder;
  }
  .custom-card {
    background-color:white;
    padding:20px;
    border-radius:10px;
    width:25%;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }
  .custom-card-body {
    display:flex;
    flex-direction: column;
  }
</style>

<!-- CSS uniquement pour le component -->
<style scoped>
  .navbar.navbar-expand {
    /**box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);**/
    display:flex;
    justify-content:space-between;
  }
  .nav-link {
    /**color:#D3C8B7 !important;**/
    color:black;
    font-size: 17px !important;
    font-family:'Pontano Sans',sans-serif;
    font-weight:bolder;
  }
  .navbar-brand {
    display:flex;
    flex-direction:column;
    font-family: 'Pontano Sans',sans-serif;
    font-size:10px;
    justify-content:center;
    padding-left: 100px;
  }
  #menu-container {
    padding-right: 100px;
  }
  .navbar-brand img {
    width:100px;
    margin-left: 8px;
  }
  #brand-text {
    position:relative;
    color:black;
    font-weight:bolder;
  }
  .nav-link i {
    margin-right:5px;
  }
  .nav-link img {
    margin-right:5px;
  }

  #textConnectedAs {
    font-size:13px;
  }
</style>