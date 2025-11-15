import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/Home.module.css'
const Home = () => {
    return (
        <div className={styles.home}>
            <h2>  ¡Bienvenido a este nuevo Proyecto!: Al ritmo de MERN</h2>
            <p>
                Gestiona y organiza tu colección de canciones y playlists de manera eficiente.
            </p>


            <div className={styles.container}>
                <div className={styles.card}>
                    <h3>Listado de Canciones</h3>
                    <p>Explora y administra todas las canciones disponibles en la base de datos.</p>
                    <Link to="/songs" className={styles.button}>
                        Ver Canciones
                    </Link>
                </div>

                <div className={styles.card}>
                    <h3>Tus Playlists</h3>
                    <p>Crea, edita y revisa tus colecciones de canciones personalizadas.</p>
                    <Link to="/playlists" className={styles.button}>
                        Ir a Playlists
                    </Link>
                </div>
            </div>

            <p>
                Utiliza la barra de navegación superior para acceder rápidamente a las funcionalidades.
            </p>
        </div>
    );
};


export default Home;