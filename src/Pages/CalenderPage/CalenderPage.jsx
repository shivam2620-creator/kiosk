import React, { useEffect, useState } from 'react'
import { getCalenderApi } from '../../Apis/SlotsApi'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

const studioId = "YlPB9PmfgwOA4DaU7VjB"

const CalenderPage = () => {
    const customTattooDetail = useSelector((s) => s.customTattoo);
  const flashTattoDetails = useSelector((s) => s.flashTattoo);
  const coverupTattooDetails = useSelector((s) => s.coverupTattoo);
  const piercingDetail = useSelector((s) => s.piercing);

    const currentService = useMemo(() => {
      if (customTattooDetail?.isActive) return customTattooDetail;
      if (flashTattoDetails?.isActive) return flashTattoDetails;
      if (coverupTattooDetails?.isActive) return coverupTattooDetails;
      if (piercingDetail?.isActive) return piercingDetail;
      return null;
    }, [customTattooDetail, flashTattoDetails, coverupTattooDetails, piercingDetail]);

  const [calendarId, setCalenderId] = useState();

  const fetchCalender = async () => {
    try {
      const res = await getCalenderApi(studioId,currentService)
      setCalenderId(res.data.calendarId)
      console.log(res);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCalender();
  }, [])

  // append script when calendarId is available
  useEffect(() => {
    if (!calendarId) return;

    const SCRIPT_ID = "tattooagency-form-embed-script";
    // remove existing if present
    const prev = document.getElementById(SCRIPT_ID);
    if (prev) prev.remove();

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://links.tattooagency.com/js/form_embed.js"; // from API response
    s.type = "text/javascript";
    s.async = true;
    document.body.appendChild(s);

    return () => {
      const el = document.getElementById(SCRIPT_ID);
      if (el) el.remove();
    }
  }, [calendarId]);

  return (
    <div style={{ width: '100%' }}>
      {calendarId ? (
        <iframe
          src={`https://links.tattooagency.com/widget/booking/${calendarId}`}
          id={`${calendarId}_iframe`}
          title="Booking Calendar"
          scrolling="no"
          style={{
            width: '100%',
            height: '100vh',     // full viewport height
            minHeight: '700px',  // optional fallback
            border: 'none',
            overflow: 'hidden',
            display: 'block'
          }}
        />
      ) : (
        <p>Loading calendar...</p>
      )}
    </div>
  )
}

export default CalenderPage
