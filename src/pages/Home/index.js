import { useEffect, useState } from "react";
import api from '../../services/api'


function Home(){
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        async function loadMovie(){
            const response = await api.get("/movie/now_playing",{
                params:{
                    api_key: "a194d8f9871628d33cadf34aaf7711cd",
                    language: "pt-BR",
                    page:1
                }
            })

            console.log(response)
        }

        loadMovie();

    },[])

    return(
        <div>
            <h1>bem vindo a home</h1>
        </div>
    )
}

export default Home;