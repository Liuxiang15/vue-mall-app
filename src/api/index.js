import Axios from 'axios';
import baseURL, { URLS } from './urls';

const appkey = 'lxhappy001_1644748836951';
const request = Axios.create({
  baseURL,
  params: {
    appkey,
  },
});
request.interceptors.response.use((value) => value.data);

const getSideList = (type) => request.get(URLS.getSide, {
  params: { type },
});
export default {
  getSideList,
};
