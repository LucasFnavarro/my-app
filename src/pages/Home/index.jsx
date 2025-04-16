import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { api } from "../../services/api";

import { Header } from "../../components/Header";
import "./styles.css";

export function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "8a6eccb7051609ceda3fa0c87ea6df1e",
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 10));
      console.log(response.data.results.slice(0, 2));
    }

    loadFilmes();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="home-container">
      <main className="main-content">
        <section className="hero-section">
          <h1>Bem-vindo ao MovieFlix</h1>
          <p>Descubra os melhores filmes e séries</p>
        </section>

        <section className="featured-section">
          <h2>Destaques</h2>
          <div className="movies-grid">
            {/* Aqui serão adicionados os cards de filmes posteriormente */}

            {filmes.map((filme) => {
              return (
                <article key={filme.id}>
                  <div className="movie-placeholder">
                    <Link to={`/filme/${filme.id}`}>
                      <div className="movie-poster">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                        />
                      </div>
                    </Link>
                    <h3>{filme.title}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
