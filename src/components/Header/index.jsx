import { Link } from 'react-router-dom';
import './styles.css';

export function Header() {
    return (
        <header>
            <div className="header-content">
                <Link to="/" className="brand">
                    MovieFlix
                </Link>
                
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/favoritos">Favoritos</Link>
                </nav>

                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Buscar filmes..."
                        className="search-input"
                    />
                    <button className="search-button">
                        Buscar
                    </button>
                </div>
            </div>
        </header>
    );
}
