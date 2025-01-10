import React, { useState } from "react";
import zepdaImagotipo from "../../img/zepdaimagotipoz.png";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const toggleForm = () => setIsLogin(!isLogin); // cambia entre login y registro

  return (
    <>
      <footer className="container footer d-flex mt-5">
        <div>
          <img
            className="logofooter"
            src={zepdaImagotipo}
            alt="zepdaimagotipo"
            height={100}
          />
        </div>
        <div>
          <h5>ZEPDA Eco-logistics © 2025 </h5>
        </div>

        <div className="text-end footerlinks mt-3">
		<Link className="links" to="#" onClick={handleShowModal}>
            <p>Área de socios</p>
          </Link>
		  <Link className="links" to="/contacto">
            <p>Contacto</p>
          </Link>
          <Link className="links" to="/quienesSomos">
            <p>Quiénes somos</p>
          </Link>
        </div>
      </footer>

      {/* Modal de Área de Socios */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? "Área de socios - Login" : "Área de socios - Registro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <div>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <Button variant="primary" type="submit">
                  Iniciar sesión
                </Button>
              </form>
            </div>
          ) : (
            <div>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Ingresa tu nombre"
                  />
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirma tu contraseña"
                  />
                </div>
                <Button variant="primary" type="submit">
                  Registrar
                </Button>
              </form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="link" onClick={toggleForm}>
            {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
