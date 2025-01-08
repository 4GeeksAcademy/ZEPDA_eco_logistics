import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";  // Asegúrate de que Home está dentro de la carpeta pages
import { Servicios } from "./pages/servicios";  // Importar el componente Servicios
import { Empresas } from "./pages/empresas";  // Importar el componente Empresas
import { QuienesSomos } from "./pages/quienes_somos";  // Importar el componente Quiénes Somos
import { Contacto } from "./pages/contacto";  // Importar el componente Contacto
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

// Componente Layout
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Servicios />} path="/servicios" />
                        <Route element={<Empresas />} path="/empresas" />
                        <Route element={<QuienesSomos />} path="/quienes_somos" />
                        <Route element={<Contacto />} path="/contacto" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
