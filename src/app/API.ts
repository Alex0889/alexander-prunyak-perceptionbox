import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const axiosGet = async <T>(url: string) => {
  return await axiosInstance.get<T>(url).then((response) => {
    return response.data;
  });
};
