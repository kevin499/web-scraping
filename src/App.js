import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">

      {/* Main */}

      <section className="section-search">
        <div className="main-title">
          <h1>Encontrá el mejor trabajo para ti</h1>
          <p>Mejores trabajos</p>
        </div>
        <form action="">
          <div className="search search-word">
            <input type="text" placeholder="Empresa / e / e" />
          </div>
          <div className="search search-location">
            <input type="text" placeholder="Ubicacion" />
          </div>
          <button className="search-button">Buscar</button>
        </form>

      </section>

      {/* Search box */}

    </div>
  );
}

export default App;
