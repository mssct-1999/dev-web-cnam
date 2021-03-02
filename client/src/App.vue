<template>
  <div id="app">
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
            <li class="nav-item">
              <router-link to="/login" class="nav-link"><i class="fas fa-user"></i>Connexion</router-link>
            </li>
          </div>
        </div>
      </nav>
      <!-- content of the page -->
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingComponent from './components/LoadingComponent.vue';

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
  body {
    background-color:#BAD5CA !important;
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
</style>
