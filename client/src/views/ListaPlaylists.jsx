import {Link} from 'react-router-dom'
import styles from '../../css/ListaPlaylists.module.css'

const ListaPlaylists = ({listaPlaylists}) => {
  return (

    <div className={styles.container}>
      <h1>Tus Playlists</h1>
      { listaPlaylists.length > 0 ? (
        <ol className={styles.list}>
          {listaPlaylists.map((playlist, index) => (
            <ol  className={styles.item} key={index}>
              < Link to={`/playlists/${playlist._id}`} className={styles.link}>{playlist.name}</Link>
              <hr/>

              </ol>
          ))}
      </ol>):(<p>No hay Playlists Creadas</p>)}
    </div>

  );
};

export default ListaPlaylists;
