export default {
  server: {
    proxy: {
      '/api': 'http://localhost:4000', // or the port of your server
    },
  },
};
