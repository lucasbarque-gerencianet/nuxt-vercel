<template>
  <div class="container py-4">
    <h1>{{ post.title }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="py-4" v-html="post.content" />
  </div>
</template>

<script>
  export default {
    async asyncData({ route, store }) {
      await store.dispatch('posts/getPost', route.params.slug);
    },
    computed: {
      post() {
        return this.$store.state.posts.post;
      },
    },
  };
</script>
