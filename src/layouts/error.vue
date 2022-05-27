<template>
  <div class="container py-4">
    <h1 v-if="error.statusCode === 404">Página não encontrada</h1>
    <h1 v-else>Oops, alguma coisa deu errado!</h1>
    <NuxtLink to="/">Voltar para a home</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: {
      error: { type: Error, default: null },
    },
  };
</script>
