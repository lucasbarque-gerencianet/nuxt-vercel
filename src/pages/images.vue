<template>
  <div class="container">
    <h1>Listagem de imagens</h1>
    <ul>
      <li>
        <p>Imagem renderizada de de uma pasta local</p>
        <nuxt-img src="/images/pages/cartoes/cartoes.png" />
      </li>
      <li>
        <p>Imagem renderizada de de uma pasta local (width: 250px)</p>
        <nuxt-img width="250" src="/images/pages/cartoes/cartoes.png" />
      </li>
      <li>
        <p>Imagem renderizada de de uma pasta local (width: 250px / height: 320)</p>
        <nuxt-img width="250" height="320" fit="contain" src="/images/pages/cartoes/cartoes.png" />
      </li>
      <li>
        <p>Imagem de um preset (avatar)</p>
        <nuxt-img preset="avatar" src="/images/pages/cartoes/cartoes.png" />
      </li>
      <li>
        <p>Imagem de uma pasta local, com qualidade 10%</p>
        <nuxt-img quality="10" src="/images/pages/cartoes/cartoes.png" />
      </li>
      <li>
        <p>Imagem com responsividade variável</p>
        <nuxt-img sizes="sm:100vw md:50vw lg:700px" src="/images/pages/cartoes/cartoes.png" />
      </li>
    </ul>
  </div>
</template>
<style lang="scss"></style>
