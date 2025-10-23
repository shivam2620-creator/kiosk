// src/Components/ArtistDropdown/ArtistDropdown.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import "./style.css";

/**
 * ArtistDropdown
 * Props:
 * - list: array of artist objects [{ artistId, artistName, artistEmail, ... }]
 * - value: selectedArtistId
 * - onChange: fn(newArtistId)
 *
 * The dropdown displays artist name in the header, when opened shows a list of artists
 * and under each artist shows a small details area (email). Clicking outside closes the dropdown.
 */
const ArtistDropdown = ({ list = [], value = "", onChange = () => {} }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);

  // find current artist object
  const selectedArtist = Array.isArray(list) ? list.find((a) => a.artistId === value) : null;

  // close on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // keyboard: Esc to close, ArrowDown to open and focus first item
  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSelect = useCallback(
    (artistId) => {
      onChange(artistId);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div className="artist-dropdown-root" ref={rootRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="artist-dropdown-toggle"
        onClick={() => setOpen((s) => !s)}
        ref={toggleRef}
      >
        <div className="artist-dropdown-title">
          <span className="artist-dropdown-name">
            {selectedArtist?.artistName ?? (list[0]?.artistName ?? "Select Artist")}
          </span>
          <span className="artist-dropdown-sub">
            {selectedArtist?.artistEmail ?? (list[0]?.artistEmail ?? "")}
          </span>
        </div>
        <span className={`artist-dropdown-caret ${open ? "open" : ""}`} />
      </button>

      {open && (
        <div className="artist-dropdown-list" role="listbox" tabIndex={-1}>
          {list.length === 0 ? (
            <div className="artist-dropdown-item disabled">No artists available</div>
          ) : (
            list.map((artist) => (
              <div
                key={artist.artistId}
                role="option"
                aria-selected={artist.artistId === value}
                className={`artist-dropdown-item ${artist.artistId === value ? "selected" : ""}`}
                onClick={() => handleSelect(artist.artistId)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(artist.artistId);
                  }
                }}
                tabIndex={0}
              >
                <div className="artist-item-main">
                  <div className="artist-item-name">{artist.artistName}</div>
             
                </div>

                <div className="artist-item-details">
                  <div className="artist-item-email">{artist.artistEmail}</div>
                  {/* add any other brief fields here, e.g. experience, rating, etc. */}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ArtistDropdown;
