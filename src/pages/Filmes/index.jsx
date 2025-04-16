import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../../services/api";

import "./styles.css";

export function Filmes() {
  const { id } = useParams();

  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "8a6eccb7051609ceda3fa0c87ea6df1e",
            language: "pt-BR",
          },
        })

        .then((response) => {
          setFilme(response.data);
        })
        .catch(() => {
          console.log("Erro na requisição...");
        });
    }

    loadFilme();

    return () => {
      console.log("COMPONENTE DESMONTADO");
    };
  }, []);

  //   if(loading || !filme){
  //     return(
  //         <div>
  //             <h1>Carregando...</h1>
  //         </div>
  //     )
  //   }

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

          <div className="filme-extra-info">
            <div>
              <strong>Orçamento:</strong>
              <p>$150.000.000</p>
            </div>

            <div>
              <strong>Receita:</strong>
              <p>$500.000.000</p>
            </div>

            <div>
              <strong>Lucro:</strong>
              <p>$350.000.000</p>
            </div>
          </div>

          <div className="filme-buttons">
            <button className="button-trailer">Assistir Trailer</button>
            <button className="button-favorite">Adicionar aos Favoritos</button>
          </div>
        </div>
      </div>
    </div>
  );
}
