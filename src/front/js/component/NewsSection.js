import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const NewsSection = () => {
  const { actions, store } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [visibleNews, setVisibleNews] = useState(4);  // Estado para manejar la cantidad de noticias visibles
  const newsPerPage = 4; // Número de noticias por bloque

  useEffect(() => {
    actions.fetchNews(setLoading); // Cargar las noticias al montar el componente
  }, []);

  // Función para manejar la navegación del carousel
  const handleNext = () => {
    if (visibleNews + newsPerPage <= store.news.length) {
      setVisibleNews(visibleNews + newsPerPage); // Aumentar el número de noticias visibles
    }
  };

  const handlePrev = () => {
    if (visibleNews - newsPerPage >= 4) {
      setVisibleNews(visibleNews - newsPerPage); // Disminuir el número de noticias visibles
    }
  };

  return (
    <div className="container mt-5 news-section">
      <h1>Últimas noticias sobre sostenibilidad</h1>
      <div className="carousel-container-nws">
        {loading ? (
          <p>Cargando noticias...</p>  // Mensaje mientras se cargan las noticias
        ) : store.news.length > 0 ? (
          <div id="newsCarousel" className="carousel slide" data-bs-ride="carousel">
            {/* Carousel inner */}
            <div className="carousel-inner">
              {store.news.slice(0, visibleNews).map((article, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <div className="news-item">
                    <Link to={`/news/${index}`}>
                      <img
                        src={article.urlToImage}
                        className="d-block w-100"
                        alt={`news-${index}`}
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>{article.title}</h5>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles del carousel */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#newsCarousel"
              data-bs-slide="prev"
              onClick={handlePrev}  // Acción para ir a la página anterior
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#newsCarousel"
              data-bs-slide="next"
              onClick={handleNext}  // Acción para ir a la siguiente página
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          <p>No se encontraron noticias.</p>  // Mensaje si no hay noticias
        )}
      </div>
    </div>
  );
};
