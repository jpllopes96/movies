import axios from "axios";

//Base UR: https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/now_playing?api_key=a194d8f9871628d33cadf34aaf7711cd

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;