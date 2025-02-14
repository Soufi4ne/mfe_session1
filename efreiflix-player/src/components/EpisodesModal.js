import React from 'react';
import PropTypes from 'prop-types';
import '../styles/EpisodesModal.css';

const EpisodesModal = ({
  showModal,
  episodes,
  selectedSeason,
  seasons,
  onSeasonChange,
  onEpisodeClick,
  onClose
}) => {
  // Filter episodes by selected season
  const filteredEpisodes = episodes.filter(episode => episode.season === selectedSeason);

  return showModal ? (
    <div className="episodes-modal">
      <div className="episodes-modal-content">
        <div className="episodes-header">
          <div className="episodes-header-content">
            <h2>Episodes</h2>
            <div className="season-filter">
              {seasons.map(season => (
                <button
                  key={season}
                  className={`season-button ${selectedSeason === season ? 'active' : ''}`}
                  onClick={() => onSeasonChange(season)}
                  type="button"
                >
                  Season {season}
                </button>
              ))}
            </div>
          </div>
          <button
            className="close-modal"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="episodes-list">
          {filteredEpisodes.map((episode) => (
            <button
              key={episode.id}
              className="episode-item"
              onClick={() => onEpisodeClick(episode)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  onEpisodeClick(episode);
                }
              }}
              type="button"
            >
              <div className="episode-thumbnail-container">
                <img
                  src={episode.thumbnail}
                  alt={episode.title}
                  className="episode-thumbnail"
                />
                <div className="thumbnail-overlay">
                  <h3>{episode.title}</h3>
                  <span className="episode-subtitle">{episode.subTitle}</span>
                </div>
              </div>
              <div className="episode-info">
                <h3>{episode.title}</h3>
                <span className="episode-subtitle">{episode.subTitle}</span>
                <p className="episode-description">{episode.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

EpisodesModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    season: PropTypes.number.isRequired,
    subTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  })).isRequired,
  selectedSeason: PropTypes.number.isRequired,
  seasons: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSeasonChange: PropTypes.func.isRequired,
  onEpisodeClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EpisodesModal; 