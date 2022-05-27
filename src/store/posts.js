const initialState = {
  posts: [],
  post: {},
};

export const state = () => initialState;

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_POST(state, post) {
    state.post = post;
  },
};

export const actions = {
  async getPosts({ commit }) {
    const postsBlog = await this.$axios.$get(`${process.env.endpoints.gerencianet}/wp-json/wp/v2/posts`);

    const posts = postsBlog.map((post) => {
      return {
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        status: post.status,
      };
    });
    commit('SET_POSTS', posts);
  },
  async getPost({ commit }, slug) {
    const postBlog = await this.$axios.$get(`${process.env.endpoints.gerencianet}/wp-json/wp/v2/posts?slug=${slug}`);

    const post = {
      title: postBlog[0].title.rendered,
      content: postBlog[0].content.rendered,
      slug: postBlog[0].slug,
    };
    commit('SET_POST', post);
  },
};
