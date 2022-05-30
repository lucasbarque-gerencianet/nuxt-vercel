<template>
  <div>
    <pre>
    {{ gerencianet }}
  </pre
    >
    <h1>I am rendered on the {{ renderedOn }} side</h1>
  </div>
</template>

<script>
export default {
  asyncData() {
    return { renderedOn: process.client ? 'client' : 'server' };
  },
  data() {
    return {
      gerencianet: {},
    };
  },
  async fetch() {
    console.log('fetch');
    this.gerencianet = await fetch(
      'https://gerencianet.com.br/wp-json/wp/v2/users/45'
    ).then((res) => res.json());
  },

  activated() {
    console.log('activated');
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      console.log('30 segundos');
      this.$fetch();
    }
  },
};
</script>
