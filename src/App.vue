<script setup>
import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import Footer from './components/Footer.vue'
</script>

<template>
  <header>
    <img src="src\assets\logo-transparent-svg.svg" alt="" srcset="" width="150" height="100">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/build">Build</RouterLink>
        <RouterLink to="/aisles">Aisles</RouterLink>
        <RouterLink to="/items">Items</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
  </header>

  <RouterView />

  <Footer></Footer>
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text-secondary);
}

nav a {
  font-size: 12px;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-text);
  color: var(--color-text);
  text-decoration: none;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
