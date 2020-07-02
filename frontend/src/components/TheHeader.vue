<template>
  <section id="header">
    <b-navbar toggleable="sm">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>Fullstack Developer Test</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'Home' }"
              >Home</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'Orders' }"
              >Orders</router-link
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </section>
</template>

<script>
export default {
  name: "Header",
};
</script>
