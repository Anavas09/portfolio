import { useEffect, useState } from 'react';
import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

function Secretx() {

  const [productos, setProductos] = useState([]);
  const [tokenx, setTokenx] = useState();
  
  const { getTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const url = "http://localhost:3000/onlysiteowner";
      const fetchAPI = async () => {
        const token = await getTokenSilently();
        const headers = { 'Authorization': `Bearer ${token}` };
        setTokenx(token);
        await axios.get(url, { headers })
                .then(res => {
                  console.log(res.data);
                  setProductos(res.data);
                })
                .catch(err => {
                  console.error(err);
                });
      };
      fetchAPI();
    }
  }, [getTokenSilently, isAuthenticated]);

  return (
    <BaseLayout>
      <BasePage>
        <h1>I'm the very very Secret Page</h1>
      </BasePage>
    </BaseLayout>
  )
};

export default Secretx;