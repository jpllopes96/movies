import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./styles.css"

function Movie(){
    const {id} = useParams();
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( ()=>{
        async function loadMovie(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "a194d8f9871628d33cadf34aaf7711cd",
                    language: "en-US",
                }
            })
            .then((response)=>{
                setMovie(response.data)
                setLoading(false)
            })
            .catch((error)=>{
                console.log("erro")
            })
        }

        loadMovie();
    
       
    
    },)

    if(loading){
        return(
            <div className="movieInfo">
                <h1>Loading movie details</h1>
            </div>
        )
    }
    return(
        <div className="movieInfo">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
            <h3>Overview</h3>
            <span>{movie.overview}</span>
            <strong>Rating: {movie.vote_average} / 10</strong>
            <div className="areaButtons">
                <button>Save</button>
                <button><a href="#">Trailler</a></button>
            </div>
        </div>
    )
}

export default Movie;