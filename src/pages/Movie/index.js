import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./styles.css"
import { toast } from 'react-toastify'

function Movie(){
    const navigation = useNavigate();
    const {id} = useParams();
    const [movie, setMovie] = useState([])
    const [movies, setMovies] = useState([]);
    const [btn, setBtn] = useState(false)
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
                navigation("/", { replace: true})
                return;
            })
            
        }

        function checkMovie(){
            
            const myMovies = localStorage.getItem("@primeflix")

            let savedMovies = JSON.parse(myMovies) || [];
            setMovies(savedMovies)
            const hasMovie = savedMovies.some((moviesSaved) =>  {
                 return moviesSaved.id === movie.id 
            })

            if(hasMovie){
                setBtn(true)
                return;
            }
        }

       

        loadMovie();
        checkMovie();
       
    
    }, [id, movie, btn, movies])

    function saveMovie(){
       const myMovies = localStorage.getItem("@primeflix")

       let savedMovies = JSON.parse(myMovies) || [];

       const hasMovie = savedMovies.some((moviesSaved) =>  {
            return moviesSaved.id === movie.id 
       })

       if(hasMovie){
        setBtn(true)
        toast.warn("This movie is already on the list")
        return;
       }

       savedMovies.push(movie)
       localStorage.setItem("@primeflix", JSON.stringify(savedMovies))

       toast.success("Movie added!")

    }

    function removeMovie(id){
        let filterMovies = movies.filter((item)=> {
            return (item.id !== id)
        } )

        toast.error("Movie removed")
        setMovie(filterMovies)
        localStorage.setItem("@primeflix", JSON.stringify(filterMovies))
        setBtn(false)
    }
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
                {btn === false ? (
                    <button onClick={saveMovie}>Save</button>)
                :
                    (<button onClick={() => removeMovie(movie.id)}>Remove</button>)
                }
                
                <button><a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title}`}>Trailler</a></button>
            </div>
        </div>
    )
}

export default Movie;