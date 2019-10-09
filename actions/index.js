import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';

const { getTokenSilently, isAuthenticated } = useAuth0();

export const getSecretData = async () => {
  if (isAuthenticated) {
    const url = "http://localhost:3000/secretdata";
    const token = await getTokenSilently();
    const headers = { 'Authorization': `Bearer ${token}` };
    return await axios.get(url, { headers })
            .then(res => {
              console.log(res.data);
              res.data;
            })
            .catch(err => {
              console.error(err);
            });
  }
}