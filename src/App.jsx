import { useState, useEffect } from 'react';
import SongCard from './components/SongCard';
import './App.css';
import defaultCover from './assets/default-cover.png';

function App() {
  const [songs, setSongs] = useState(() => {
    const storedSongs = localStorage.getItem('musicList');
    return storedSongs ? JSON.parse(storedSongs) : [];
  });
  
  const [newSong, setNewSong] = useState({ 
    title: '', 
    artist: '', 
    link: '', 
    cover: '' 
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem('musicList', JSON.stringify(songs));
  }, [songs]);

  const handleAddSong = (e) => {
    e.preventDefault();
    if (newSong.title.trim() && newSong.artist.trim()) {
      const songToAdd = {
        id: Date.now(),
        title: newSong.title,
        artist: newSong.artist,
        link: newSong.link,
        cover: newSong.cover,
        isFavorite: false
      };
      const updatedSongs = [...songs, songToAdd];
      setSongs(updatedSongs);
      setNewSong({ title: '', artist: '', link: '', cover: '' });
    } else {
      alert('Пожалуйста, заполните название и исполнителя!');
    }
  };

  const handleDeleteSong = (id) => {
    const isConfirmed = confirm('Вы уверены, что хотите удалить эту песню?');
    if (isConfirmed) {
      const updatedSongs = songs.filter(song => song.id !== id);
      setSongs(updatedSongs);
    }
  };

  const handleToggleFavorite = (id) => {
    const updatedSongs = songs.map(song =>
      song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
    );
    setSongs(updatedSongs);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong(prev => ({ ...prev, [name]: value }));
  };

  const songsToDisplay = showFavoritesOnly
    ? songs.filter(song => song.isFavorite)
    : songs;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Мой плейлист</h1>
        <p>Твоя коллекция любимой музыки</p>
      </header>

      <main className="main-content">
        <section className="add-song-form">
          <h2>Добавить новую песню</h2>
          <form onSubmit={handleAddSong}>
            <input
              type="text"
              name="title"
              placeholder="Название песни *"
              value={newSong.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="artist"
              placeholder="Исполнитель *"
              value={newSong.artist}
              onChange={handleInputChange}
              required
            />
            <input
              type="url"
              name="link"
              placeholder="Ссылка на трек"
              value={newSong.link}
              onChange={handleInputChange}
            />
            <input
              type="url"
              name="cover"
              placeholder="Ссылка на обложку"
              value={newSong.cover}
              onChange={handleInputChange}
            />
            
            {newSong.cover && (
              <div className="cover-preview">
                <p>Предпросмотр обложки:</p>
                <img 
                  src={newSong.cover} 
                  alt="Предпросмотр обложки" 
                  className="preview-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <button type="submit">Добавить песню</button>
          </form>
        </section>

        <section className="controls">
          <label className="favorites-filter">
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
            />
            Показать только избранные
          </label>
          <div className="song-count">
            Всего песен: {songs.length} | Показано: {songsToDisplay.length}
          </div>
        </section>

        <section className="songs-list">
          <h2>Мои песни {showFavoritesOnly && '(Избранные)'}</h2>
          {songsToDisplay.length === 0 ? (
            <p className="no-songs">
              {showFavoritesOnly
                ? 'У вас пока нет избранных песен.'
                : 'Ваш плейлист пуст. Добавьте первую песню!'}
            </p>
          ) : (
            <div className="songs-grid">
              {songsToDisplay.map(song => (
                <SongCard
                  key={song.id}
                  song={song}
                  defaultCover={defaultCover}
                  onDelete={handleDeleteSong}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;