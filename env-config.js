const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BASE_URL': prod ? 'https://anavas.netlify.com' : 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://anavas.netlify.com',
  'process.env.AUTH0_CLIENT_ID': 'HrgwdJa0UkoNjBVbcu78nfLiWxRMjQkN'
}