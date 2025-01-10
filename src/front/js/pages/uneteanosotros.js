import React from "react";

export const Uneteanosotros = () => {
  const validateNiff = (e) => {
    const niff = e.target.value;
    const niffPattern = /^[A-Za-z0-9]{8}$/; // Ejemplo de patrón: 8 caracteres alfanuméricos
    if (!niffPattern.test(niff)) {
      alert("Niff inválido. Debe tener 8 caracteres alfanuméricos.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
      >
        <h1 className="text-center mb-2 text-success">Colabora</h1>
        <h2 className="text-center mb-4 text-muted">Con nosotros</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="niff" className="form-label">
              Niff
            </label>
            <input
              type="text"
              id="niff"
              className="form-control"
              placeholder="Escribe tu Niff"
              required
              onBlur={validateNiff} // Verifica el Niff cuando el campo pierda foco
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Escribe tu nombre"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="form-control"
              placeholder="Escribe tu dirección"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Escribe tu correo"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              id="description"
              className="form-control"
              placeholder="Escribe una descripción"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="website" className="form-label">
              Web
            </label>
            <input
              type="url"
              id="website"
              className="form-control"
              placeholder="Escribe la URL de tu página web"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="certificate" className="form-label">
              Certificado (opcional)
            </label>
            <input
              type="file"
              id="certificate"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
