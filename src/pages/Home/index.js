import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from "react-router-dom";
import './home.css'


function Home(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadMovie(){
            const response = await api.get("/movie/now_playing",{
                params:{
                    api_key: "a194d8f9871628d33cadf34aaf7711cd",
                    language: "en-US",
                    page:1
                }
            })

            setMovies(response.data.results.slice(0,10))
        }

        loadMovie();
        setLoading(false)

    },[])

    if(loading){
        return(
            <div className="loading">
                <h2>Loading movies...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="moviesList">
                {movies.map((movie) =>(
                    <article key={movie.id}>
                        <strong>{movie.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                        <Link to={`/movie/${movie.id}`}>Details</Link>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Home;