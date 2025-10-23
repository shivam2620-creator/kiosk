// src/Components/ArtistSlots/ArtistSlots.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedArtist } from "../../Redux/availabilitySlice";
import { setAppointmentTime } from "../../Redux/AppointmentDetailSlice";
import ArtistDropdown from "../ArtistDropDown/ArtistDropdown";
import formatMinutesToHHMMA from "../../Utils/FormatTime";
import "./style.css";



const ArtistSlots = ({ onSlotSelected,studioId }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.availability?.list ?? []);
  const selectedArtistId = useSelector((state) => state.availability?.selectedArtistId ?? null);

  const [selectedSlotKey, setSelectedSlotKey] = useState(null);

  const selectedArtist =
    Array.isArray(list) && list.length
      ? list.find((a) => a.artistId === selectedArtistId) || list[0]
      : null;

  // auto-select first artist when list arrives
  useEffect(() => {
    if ((!selectedArtistId || selectedArtistId === "") && Array.isArray(list) && list.length > 0) {
      dispatch(setSelectedArtist(list[0].artistId));
    }
  }, [list, selectedArtistId, dispatch]);

  // reset selected slot when artist changes and clear appointment time in store
  useEffect(() => {
    setSelectedSlotKey(null);
    dispatch(setAppointmentTime(null)); // clear previous appointment time when switching artist
  }, [selectedArtistId, dispatch]);

  const handleArtistChange = (artistId) => {
    dispatch(setSelectedArtist(artistId));
  };

  const handleSlotClick = (slot) => {
    const key = `${slot.startMinute}-${slot.endMinute}`;
    setSelectedSlotKey(key);

    const start = formatMinutesToHHMMA(slot.startMinute);
    const end = formatMinutesToHHMMA(slot.endMinute);
    const display = `${start} - ${end}`;

    dispatch(
      setAppointmentTime({
        startMinute: slot.startMinute,
        endMinute: slot.endMinute,
        display,
        artistId: selectedArtist?.artistId ?? null,
        studioId: studioId ?? null,
      })
    );

    if (typeof onSlotSelected === "function") {
      onSlotSelected({ ...slot, artistId: selectedArtist?.artistId });
    }
  };

  return (
    <>
    <h1 style={{marginBottom: "-15px"}}>Select Artist & Time Slot</h1>
    <div className="artist-slots-root">
      
      {/* Left: Artist selection & details */}
      <div className="artist-left-panel">
        

        <ArtistDropdown list={list} value={selectedArtistId ?? (list[0]?.artistId ?? "")} onChange={handleArtistChange} />

        
      </div>

      {/* Right: Slots grid */}
      <div className="artist-right-panel">
        {!selectedArtist ? (
          <div className="no-artist">Select an artist to view slots</div>
        ) : !Array.isArray(selectedArtist.availableSlots) || selectedArtist.availableSlots.length === 0 ? (
          <div className="no-slots">No slots provided for this artist</div>
        ) : (
          <div className="slots-container">
            {selectedArtist.availableSlots
              .filter((s) => !!s.isAvailable)
              .map((slot, idx) => {
                const key = `${slot.startMinute}-${slot.endMinute}`;
                const start = formatMinutesToHHMMA(slot.startMinute);
                const end = formatMinutesToHHMMA(slot.endMinute);
                return (
                  <button
                    key={`${selectedArtist.artistId}-${idx}`}
                    className={`slot-button ${selectedSlotKey === key ? "slot-selected" : ""}`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {start} - {end}
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ArtistSlots;
