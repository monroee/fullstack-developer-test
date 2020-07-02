<template>
  <div class="home">
    <div>
      <b-jumbotron
        header="Fullstack Developer Test"
        lead="Fullstack Developer Test"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        
        </p>
        <b-button variant="primary" @click="$router.push({ name: 'Orders' })"
          >Go To Orders</b-button
        >
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
