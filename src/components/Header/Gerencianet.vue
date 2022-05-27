<template>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-8">
          <nuxt-link to="/">
            <nuxt-img preset="default" src="images/layouts/default/logo-gerencianet-topo.svg" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  header {
    background-color: rgb(var(--white));
    padding: 2rem 0;
    border-bottom: 1px solid rgba(var(--gray-200));
  }
</style>
