import {Link} from 'react-router-dom'
import styles from '../../css/ListaCanciones.module.css'


const ListaCanciones = ({listaSongs}) => {
  return (
    <div className={styles.container}>
          <h1>Listado Canciones</h1>
      <ol className={styles.list} >
        {listaSongs.map((song, index) => (
          <ol key={index} className={styles.item}>
            < Link to={`/songs/${song._id}`} className={styles.link}>{song.title}</Link>
            <hr/>
            </ol>
        ))}
      </ol>
    </div>
  );
};

export default ListaCanciones;
