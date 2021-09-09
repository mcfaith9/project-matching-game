<template>
  <footer>
    <p :class="$style['powered-wrapper']">
      Powered by
      <a :class="$style['powered-link']" href="https://v3.vuejs.org/">
        <img
          :class="$style['powered-logo']"
          src="/images/vue-logo.svg"
          alt="Vue.js logo"
        />
        Vue.js 3
      </a> 
    </p>
  </footer>
</template>

<style module>
  p, a {
    color: #000;
    font-weight: bold;
  }
  .description {
    font-family: 'Titillium Web', sans-serif;
  }

  .description p {
    margin: 0;
    font-size: 1rem;
  }

  .description p:last-child {
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 0.9rem;
  }

  .powered-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
  }

  .powered-link {
    padding: 0 5px;
    color: #000;
    font-weight: bold
  }

  .powered-link:first-child,
  .powered-link:last-child {
    padding-right: 0;
  }

  .powered-logo {
    width: 18px;
  }
</style>
