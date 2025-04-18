import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";

export function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id);
    })

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
  }

  return (
    <div className="favoritos-container">
      <div className="favoritos-hero">
        <h1>Meus Filmes Favoritos</h1>
      </div>

      <div className="content">
        {filmes.length === 0 ? (
          <div className="sem-favoritos">
            <span>Você não possui nenhum filme salvo 😥</span>
            <Link to="/" className="voltar-btn">
              Descobrir filmes
            </Link>
          </div>
        ) : (
          <ul className="lista-filmes">
            {filmes.map((filme) => (
              <li key={filme.id} className="filme-item">
                <div className="filme-info">
                  <div className="filme-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                      alt={filme.title}
                    />
                  </div>
                  <div className="filme-detalhes">
                    <h2>{filme.title}</h2>
                    <div className="filme-acoes">
                      <Link to={`/filme/${filme.id}`} className="detalhe-btn">
                        Ver detalhes
                      </Link>
                      <button className="excluir-btn" onClick={ () => excluirFilme(filme.id) }>Remover</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
