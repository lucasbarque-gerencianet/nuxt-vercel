<template>
  <div class="container py-4">
    <div>
      <h1 class="text-center">Headless Wordpress Nuxt</h1>

      <div class="container py-4">
        <div class="row">
          <PageSectionBlogPostCard v-for="post in posts" :key="post.slug" :post="post" />
        </div>
      </div>
    </div>
    <!-- <Tutorial /> -->
  </div>
</template>

<script>
  export default {
    // Será executado no SSR em todo refresh da página, porém se, mesmo trocando de rota, não houver refresh, essa função será chamada no lado do ClientSide
    async asyncData({ store }) {
      await store.dispatch('posts/getPosts');
    },
    computed: {
      posts() {
        return this.$store.state.posts.posts;
      },
    },
  };
</script>
