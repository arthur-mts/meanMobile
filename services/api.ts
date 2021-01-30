import axios from 'axios';

// import {API_URL} from '@env';

const API_URL = 'https://golaroo.com/api/accounts';

export async function postNotification(userName: string) {
  console.log(`${API_URL}/${userName}/notification`);
  const res = await axios.post(`${API_URL}/${userName}/notification`);
  return res;
}
