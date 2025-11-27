import './SongCard.css';

function SongCard({ song, defaultCover, onDelete, onToggleFavorite }) {
  const handleImageError = (e) => {
    e.target.src = defaultCover;
  };

  return (
    <div className={`song-card ${song.isFavorite ? 'favorite' : ''}`}>
      <div className="song-cover">
        <img 
          src={song.cover || defaultCover} 
          alt={`Обложка ${song.title}`}
          onError={handleImageError}
        />
        <button
          className={`favorite-btn ${song.isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(song.id)}
          aria-label={song.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          {song.isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="song-info">
        <h3>{song.title}</h3>
        <p className="artist">{song.artist}</p>
        {song.link && (
          <a href={song.link} target="_blank" rel="noopener noreferrer" className="song-link">
            Слушать →
          </a>
        )}
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(song.id)}
        aria-label="Удалить песню"
      >
        🗑️
      </button>
    </div>
  );
}

export default SongCard;