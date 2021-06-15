module.exports = {
  pathPrefix: "/blog",
  siteMetadata: {
    title: `Personal Blog by Fahmi Achmad F`,
    name: `Fahmi Achmad Fauzi`,
    siteUrl: `https://fahmiafau.github.io`,
    description: `Fahmi Achmad's Blog. The place where i share my thought, TIL, etc.`,
    hero: {
      heading: `Hello and Welcome to Fahmi Achmad's Blog.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/fahmiafau`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/fahmiinaja`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/fahmi-achmad-fauzi-a1b3aa110/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
  ],
};
