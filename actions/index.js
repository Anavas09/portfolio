import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
  cancelToken: source.token
})

export const rejectPromise = (resError) => {
  let error = {};

  if (resError && resError.response && resError.response.data){
    error = resError.response.data;
  }else {
    error = resError;
  }
  return Promise.reject(error)
}

//----------------PORTFOLIO ACTIONS---------

export const getPortfolios = async () => {
  return await axiosInstance.get('/portfolios')
          .then(res => res.data)
          .catch(err => rejectPromise(err));
}

export const addPortfolio = (portfolioData, headers) => {
  return axiosInstance.post('/portfolios', portfolioData, {headers})
          .then(res => res )
          .catch(err => rejectPromise(err) );
};

export const getPortfolioById = (portfolioId, headers) => {
  return axiosInstance.get(`/portfolios/${portfolioId}`, {headers})
          .then(res => res.data)
          .catch(err => rejectPromise(err));
}

export const updatePortfolio = (portfolioId, portfolioData, headers) => {
  return axiosInstance.patch(`/portfolios/${portfolioId}`, portfolioData, {headers})
          .then(res => res)
          .catch(err => rejectPromise(err))
}

export const deletePortfolio = (portfolioId, headers) => {
  return axiosInstance.delete(`/portfolios/${portfolioId}`, {headers})
          .then(res => res)
          .catch(err => rejectPromise(err))
}

// ---------------BLOG ACTIONS--------------

export const getBlogs = async () => {
  return await axiosInstance.get('/blogs')
          .then(res => res.data )
          .catch(err => rejectPromise(err) )
}

export const getBlogBySlug = (slug) => {
  return axiosInstance.get(`/blogs/s/${slug}`)
          .then(res => res.data)
}

export const getUserBlogs = async (headers) => {
  return await axiosInstance.get('/blogs/me', { headers })
          .then(res => res.data )
          .catch(err => rejectPromise(err) )
}

export const createBlog = (blogData, headers, lockId) => {
  return axiosInstance.post(`/blogs?lockId=${lockId}`, blogData, {headers})
          .then(res => res )
          .catch(err => rejectPromise(err) );
};

export const getBlogById = (blogId, headers) => {
  return axiosInstance.get(`/blogs/${blogId}`, {headers})
          .then(res => res.data)
}

export const updateBlog = (blogId, blogData, headers) => {
  return axiosInstance.patch(`/blogs/${blogId}`, blogData, {headers})
          .then(res => res)
          .catch(err => rejectPromise(err))
}

export const deleteBlog = (blogId, headers) => {
  return axiosInstance.delete(`/blogs/${blogId}`, {headers})
          .then(res => res)
          .catch(err => rejectPromise(err))
}

export const getSecretData = async (headers) => {
  return await axios.get('/secretdata', { headers })
          .then(res => {
            res.data;
          })
          .catch(err => {
            console.error(err);
          });
}