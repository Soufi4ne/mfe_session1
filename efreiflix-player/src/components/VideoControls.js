import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiFastForward, BiRewind } from "react-icons/bi";
import {
  FaList,
  FaPause,
  FaPlay,
  FaStepForward,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { RiFullscreenExitFill, RiFullscreenFill } from "react-icons/ri";
import "../styles/VideoControls.css";

const VideoControls = ({
  playing,
  showControls,
  title,
  subTitle,
  progress,
  buffered,
  duration,
  volume,
  isMuted,
  playbackSpeed,
  showSpeedMenu,
  isFullscreen,
  previewPosition,
  videoRef,
  progressRef,
  previewRef,
  onPlayPause,
  onSeek,
  onNext,
  onShowEpisodes,
  onVolumeChange,
  onMuteToggle,
  onSpeedChange,
  onToggleSpeedMenu,
  onFullscreen,
  onProgressClick,
  onProgressHover,
  onProgressLeave,
  formatTime,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`controls-overlay ${showControls ? "visible" : ""}`}
      role="toolbar"
      aria-label="Video controls"
    >
      <div className="video-info">
        <h2 className="video-title">{title}</h2>
        <span className="episode-number">{subTitle}</span>
      </div>

      <div
        className="progress-container"
        ref={progressRef}
        onClick={onProgressClick}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            videoRef.current.currentTime += 5;
          } else if (e.key === "ArrowLeft") {
            videoRef.current.currentTime -= 5;
          }
        }}
        onMouseMove={onProgressHover}
        onMouseLeave={onProgressLeave}
        role="slider"
        aria-label="Video progress control"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progress}
        tabIndex="0"
      >
        <div className="progress-bar">
          <div className="progress-buffer" style={{ width: `${buffered}%` }} />
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        <div
          className="preview-container"
          style={{
            left: `${previewPosition.x}px`,
            display: previewPosition.x ? "block" : "none",
          }}
        >
          <canvas
            ref={previewRef}
            width="160"
            height="90"
            className="preview-canvas"
          />
          <div className="preview-time">{formatTime(previewPosition.time)}</div>
        </div>

        <div className="progress-time">
          <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="controls-buttons">
        <div className="controls-left">
          <button
            className="control-button"
            onClick={onPlayPause}
            type="button"
          >
            {playing ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>

          <button
            className="control-button"
            onClick={() => onSeek(-10)}
            type="button"
          >
            <BiRewind size={44} />
            <span className="seek-label">-10s</span>
          </button>

          <button
            className="control-button"
            onClick={() => onSeek(10)}
            type="button"
          >
            <BiFastForward size={44} />
            <span className="seek-label">+10s</span>
          </button>

          <div className="volume-control">
            <button
              className="control-button"
              onClick={onMuteToggle}
              type="button"
            >
              {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={onVolumeChange}
              className="volume-slider"
              aria-label="Volume"
            />
          </div>
        </div>

        <div className="controls-right">
          <button className="control-button" onClick={onNext} type="button">
            <FaStepForward size={24} />
            <span className="seek-label">{t("controls.nextEpisode")}</span>
          </button>

          <button
            className="control-button"
            onClick={onShowEpisodes}
            type="button"
            aria-label="Show episodes list"
          >
            <FaList size={24} />
            <span className="seek-label">Episodes</span>
          </button>

          <div className="speed-control">
            <button
              className="control-button"
              onClick={onToggleSpeedMenu}
              type="button"
            >
              <span className="speed-counter">{playbackSpeed}x</span>
              <span className="seek-label">Speed</span>
            </button>
            {showSpeedMenu && (
              <div className="speed-menu">
                {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    className={`speed-option ${
                      playbackSpeed === speed ? "active" : ""
                    }`}
                    onClick={() => onSpeedChange(speed)}
                    type="button"
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="control-button"
            onClick={onFullscreen}
            type="button"
          >
            {isFullscreen ? (
              <RiFullscreenExitFill size={24} />
            ) : (
              <RiFullscreenFill size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

VideoControls.propTypes = {
  playing: PropTypes.bool.isRequired,
  showControls: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  buffered: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  isMuted: PropTypes.bool.isRequired,
  playbackSpeed: PropTypes.number.isRequired,
  showSpeedMenu: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  previewPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
  videoRef: PropTypes.object.isRequired,
  progressRef: PropTypes.object.isRequired,
  previewRef: PropTypes.object.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onSeek: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onShowEpisodes: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  onMuteToggle: PropTypes.func.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
  onToggleSpeedMenu: PropTypes.func.isRequired,
  onFullscreen: PropTypes.func.isRequired,
  onProgressClick: PropTypes.func.isRequired,
  onProgressHover: PropTypes.func.isRequired,
  onProgressLeave: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
};

export default VideoControls;
