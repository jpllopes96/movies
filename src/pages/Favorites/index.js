import './styles.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

function Favorites(){
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myMovies = localStorage.getItem("@primeflix");
        setMovies(JSON.parse(myMovies) || []) 
    }, [])

    function deleteMovie(id){
        let filterMovies = movies.filter((item)=> {
            return (item.id !== id)
        } )

        setMovies(filterMovies)
        localStorage.setItem("@primeflix", JSON.stringify(filterMovies))
        toast.error("Movie removed")
    }

    return(
        <div className='myMovies'>
            <h1>My Movies</h1>
            {movies.length === 0 && <span>You don't have any movie saved!</span>}
            <ul>
                {movies.map ((movie) => {
                    return(
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div>
                                <Link target="blank" to={`/movie/${movie.id}`}>See Details</Link>
                                <button onClick={ () => deleteMovie(movie.id)}>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


export default Favorites