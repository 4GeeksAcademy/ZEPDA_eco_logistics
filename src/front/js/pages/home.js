import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { JumbotronCarousel } from "../component/jumbocarousel";
import "../../styles/home.css";
import { NewsSection } from "../component/NewsSection";
import { Link } from "react-router-dom";
import { importAllImages } from "../../utils/importAllImages";

const logos = importAllImages(require.context("../../img/logos", false, /\.(png|jpe?g|svg|webp)$/));

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (

		<>
		
		<JumbotronCarousel/>
		<div className="container mt-4">
			<h1> 
				El cambio ya empezó, el momento de sumarse es ahora!
			</h1>
			<p>
			Trabajamos para disminuir el impacto ambiental y generar acciones positivas para el planeta y la sociedad. 
			Te ofrecemos las mejores soluciones eco-friendly para tu empresa. El cambio ya empezó, el momento de sumarse es ahora!
			</p>
			<p>
			Como funciona <strong>Zepda Eco-logistics</strong>?
			</p>
			<p>
			En esta plataforma podrás encontrar soluciones sostenibles para que tu empresa sea más eco-friendly. 
			Podrás encontrar servicios que te ayudarán a disminuir el impacto ambiental de tu empresa. Además, 
			podrás conocer el impacto positivo que generas al adquirir estos productos y servicios.
			Sólo tienes que crear una cuenta en nuestra plataforma y empezar a disfrutar de los beneficios de ser eco-friendly.
			</p>
			<button className="btn">súmate al cambio</button>

			

			<div className="mt-4">

				<h1>Empresas colaboradoras</h1>
			<p>Nuestra plataforma ofrece servicios para empresas que necesitan encontrar soluciones ecológicas y sostenibles 
				para sus diferentes actividades, principalmente en los aspectos logísticos como el packaging de sus productos, 
				transportes, materiales, gestión de residuos y/o digitalización de su negocio, centralizando en un solo sitio web 
				todos los servicios disponibles y haciendo más facil los procesos de búsqueda y contratación. Si quieres formar 
				parte de nuestro equipo <Link className="links" to={"/"}> <strong>únete a nosotros como empresa colaboradora.</strong></Link></p>	

			</div>
			<p>Nuestros colaboradores:</p>
			<div className="logos-container">
				
            {logos.map((logo, index) => (
              <div className="logo-item" key={index}>
                <img src={logo} alt={`logo-${index}`} className="logo-image" />
              </div>
            ))}
          </div>

		  <NewsSection/>


		</div>
		</>
	);
};