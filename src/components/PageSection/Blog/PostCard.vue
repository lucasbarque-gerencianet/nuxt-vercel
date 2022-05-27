<template>
  <article class="col-12 py-5">
    <div class="card shadow">
      <div class="card-body">
        <nuxt-link :to="postLink">
          <h5 class="card-title">
            <div>{{ post.title }}</div>
          </h5>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="card-text" v-html="post.excerpt"></div>
        </nuxt-link>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    props: {
      post: {
        type: Object,
        default: () => {
          return {
            title: 'Título do post',
            excerpt: 'Resumo do post',
            slug: 'default-slug',
          };
        },
      },
    },
    computed: {
      postLink() {
        return `blog/${this.post.slug}`;
      },
    },
  };
</script>
