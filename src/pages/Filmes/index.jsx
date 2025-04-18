import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { api } from "../../services/api";

import "./styles.css";

export function Filmes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params:  {
          api_key: "8a6eccb7051609ceda3fa0c87ea6df1e",
          language: "pt-BR",
        }
      })
      .then((response) => {
        setFilme(response.data);
      })
      .catch(() => {
        navigate("/", { replace: true });
      }); 
    }

    loadFilme();
    setLoading(false);
  }, [id, navigate]);
  

  function salvarFilme() {
    const minhaLista = localStorage.getItem('@primeflix');

    let filmesSalvos = JSON.parse(minhaLista) || [];
  
    const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id );

    if(hasFilme) {
      alert('Filme já está na lista');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
    alert('Filme salvo com sucesso');
  }

    if(loading || !filme){
      return(
          <div>
              <h1>Carregando...</h1>
          </div>
      )
    }

  return (
    <div className="filme-container" key={filme.id}>
      <div className="filme-background">
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
          alt="Background"
          className="background-image"
        />
      </div>

      <div className="filme-info">
        <div className="filme-poster">
          <img
            src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
            alt="Poster do filme"
          />
        </div>

        <div className="filme-detalhes">
          <h1>{filme.title}</h1>

          <div className="filme-metadata">
            <span>{filme.release_date}</span>
            <span>142 min</span>
            <span>Ação, Aventura</span>
          </div>

          <div className="filme-avaliacao">
            <strong>Avaliação:</strong>
            <span className="nota">{filme.vote_average}</span>
          </div>

          <div className="filme-sinopse">
            <h3>Sinopse</h3>
            <p>{filme.overview}</p>
          </div>

          <div className="filme-buttons">
            <Link 
              to={`https://youtube.com/results?search_query=${filme.title} Trailer`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="trailer-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Ver Trailer
            </Link>
            <button 
              className="button-favorite"
              onClick={salvarFilme}
            >
              Adicionar aos Favoritos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}