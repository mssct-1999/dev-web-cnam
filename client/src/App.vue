<template>
  <div id="app">
    <nav class="navbar navbar-expand">
      <div id="brand-container">
        <router-link to="/" class="navbar-brand">
          <img alt="Logo Association Sophrofraise" src="./assets/img/logo.png">
          <span id="brand-text">Association Sophrofraise</span>
        </router-link>
      </div>
      <div id="menu-container">
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/presentation" class="nav-link">Présentation</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link"><i class="fas fa-user"></i></router-link>
          </li>
        </div>
      </div>
    </nav>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<!-- CSS appliqué à tous les composants  -->
<style>
  body {
    background-color:#fff0bc !important;
  }
</style>

<!-- CSS uniquement pour le component -->
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Noto+Sans+JP:wght@100&display=swap');
  .navbar.navbar-expand {
    /**box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);**/
    display:flex;
    justify-content:space-between;
  }

  .nav-link {
    /**color:#D3C8B7 !important;**/
    color:black;
    font-size: 17px !important;
    font-family:'Noto Sans JP',sans-serif;
    font-weight:bolder;
  }

  .navbar-brand {
    display:flex;
    flex-direction:column;
    font-family: 'Lobster',cursive;
    font-size:13px;
    justify-content:center;
  }

  .navbar-brand img {
    width:100px;
    margin-left:7px;
  }

  #brand-text {
    position:relative;
    bottom:11px;
    color:black;
    font-weight:bolder;
  }
</style>
