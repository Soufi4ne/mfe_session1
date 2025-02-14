import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';
import VideoControls from './components/VideoControls';
import EpisodesModal from './components/EpisodesModal';
import DescriptionOverlay from './components/DescriptionOverlay';
import { episodesList } from './constants/episodes';
import './styles/Player.css';

const Player = ({ 
  title, 
  subTitle, 
  description,
  onClose
}) => {
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMouseActive, setIsMouseActive] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, time: 0 });
  const [selectedSeason, setSelectedSeason] = useState(1);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const previewRef = useRef(null);
  const previewVideoRef = useRef(null);
  const seekTimeout = useRef(null);
  const controlsTimeoutRef = useRef(null);
  let inactivityTimeout = null;

  // Get unique seasons from episodes list
  const seasons = [...new Set(episodesList.map(episode => episode.season))];

  const startInactivityTimer = () => {
    clearInactivityTimer();
    inactivityTimeout = setTimeout(() => {
      setShowControls(false);
      setIsMouseActive(false);
      setShowDescription(true);
    }, 3000);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: avoid infinite loop
  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        startInactivityTimer();
        setShowControls(true);
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  }, [playing]);

  const handleSeek = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleBack = () => {
    // Implement navigation back logic
    console.log('Going back');
    onClose();
  };

  const handleNext = () => {
    // Implement next episode logic
    console.log('Next episode');
  };

  const handleMouseMove = () => {
    setShowControls(true);
    setShowDescription(false);
    setIsMouseActive(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    clearInactivityTimer();
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      if (!playing) {
        startInactivityTimer();
      } else {
        setShowControls(false);
        setIsMouseActive(false);
      }
    }, 3000);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
    setIsMouseActive(false);
    if (!playing) {
      startInactivityTimer();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      
      // Update buffered progress
      const video = videoRef.current;
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const bufferedProgress = (bufferedEnd / video.duration) * 100;
        setBuffered(bufferedProgress);
      }
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const bounds = progressBar.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = (x / width) * 100;
    const time = (percentage / 100) * duration;
    
    videoRef.current.currentTime = time;
    setProgress(percentage);
  };

  const handleProgressHover = (e) => {
    const progressBar = progressRef.current;
    const bounds = progressBar.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = (x / width) * 100;
    const time = (percentage / 100) * duration;
    
    setPreviewPosition({ x, time });
    
    // Update video preview frame
    if (previewVideoRef.current && previewRef.current) {
      const video = previewVideoRef.current;
      const canvas = previewRef.current;
      const context = canvas.getContext('2d');
      
      // Clear any pending seek operations
      if (seekTimeout.current) {
        clearTimeout(seekTimeout.current);
      }

      // Debounce the seek operation
      seekTimeout.current = setTimeout(() => {
        video.currentTime = time;
        video.addEventListener('seeked', () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }, { once: true });
      }, 0);
    }
  };

  const handleProgressLeave = () => {
    setPreviewPosition({ x: 0, time: 0 });
  };

  const handleEpisodeClick = (episode) => {
    // Here you would implement the logic to change the current episode
    console.log('Switching to episode:', episode);
    setShowEpisodeModal(false);
  };

  // Initialize preview video when component mounts
  React.useEffect(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.preload = 'auto';
      previewVideoRef.current.muted = true;
      
      // Set playback rate to maximum for faster seeking
      previewVideoRef.current.playbackRate = 16;
      
      // Load the video and keep it ready
      previewVideoRef.current.load();
      previewVideoRef.current.currentTime = 0;
    }
    
    // Cleanup
    return () => {
      if (seekTimeout.current) {
        clearTimeout(seekTimeout.current);
      }
    };
  }, []);

  // Update fullscreen state when exiting with Esc key
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const clearInactivityTimer = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = null;
    }
  };

  // Clean up timers
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    return () => {
      clearInactivityTimer();
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault(); // Prevent default tab behavior
        handlePlayPause();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlayPause]);

  // Add autoplay effect
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.error('Autoplay failed:', error);
        });
    }
  }, []);

  // Add effect to manage scroll behavior
  useEffect(() => {
    // Disable scroll when component mounts
    document.body.classList.add('player-active');

    // Re-enable scroll when component unmounts
    return () => {
      document.body.classList.remove('player-active');
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`video-container ${playing && !isMouseActive ? 'cursor-hidden' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="application"
      aria-label="Video player"
    >
      {/* Hidden video element for preview */}
      <video
        ref={previewVideoRef}
        className="preview-video"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        preload="auto"
        tabIndex="-1"
      >
        <track
          kind="captions"
          src="/captions/en.vtt"
          srcLang="en"
          label="English"
          default
        />
      </video>

      <button 
        className={`back-button ${isMouseActive ? 'visible' : ''}`}
        onClick={handleBack}
        onKeyUp={handleBack}
        type="button"
        aria-label="Go back"
      >
        <FaArrowLeft size={20} />
      </button>

      <video
        ref={videoRef}
        className="video-player"
        onClick={handlePlayPause}
        onKeyUp={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        tabIndex="0"
        aria-label="Video content"
      >
        <source 
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
          type="video/mp4" 
        />
        <track 
          kind="captions"
          src="/captions/en.vtt"
          srcLang="en"
          label="English"
          default
        />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {!showDescription && (
        <VideoControls
          playing={playing}
          showControls={showControls}
          title={title}
          subTitle={subTitle}
          progress={progress}
          buffered={buffered}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          playbackSpeed={playbackSpeed}
          showSpeedMenu={showSpeedMenu}
          isFullscreen={isFullscreen}
          previewPosition={previewPosition}
          videoRef={videoRef}
          progressRef={progressRef}
          previewRef={previewRef}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onNext={handleNext}
          onShowEpisodes={() => setShowEpisodeModal(true)}
          onVolumeChange={handleVolumeChange}
          onMuteToggle={handleMuteToggle}
          onSpeedChange={handleSpeedChange}
          onToggleSpeedMenu={() => setShowSpeedMenu(!showSpeedMenu)}
          onFullscreen={handleFullscreen}
          onProgressClick={handleProgressClick}
          onProgressHover={handleProgressHover}
          onProgressLeave={handleProgressLeave}
          formatTime={formatTime}
        />
      )}

      <EpisodesModal
        showModal={showEpisodeModal}
        episodes={episodesList}
        selectedSeason={selectedSeason}
        seasons={seasons}
        onSeasonChange={setSelectedSeason}
        onEpisodeClick={handleEpisodeClick}
        onClose={() => setShowEpisodeModal(false)}
      />

      <DescriptionOverlay
        show={showDescription && !playing}
        title={title}
        subTitle={subTitle}
        description={description}
      />
    </div>
  );
};

Player.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

Player.defaultProps = {
  title: "Big Buck Bunny",
  subTitle: "S1:E1",
  description: "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
  onClose: () => {},
}; 

export default Player; 