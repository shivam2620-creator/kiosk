// FlashTatooDesignSelect.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setFlashTattooOption,
  setFlashTattooImg,
  setFlashTattooIsActive,
} from "../../Redux/FlashTattoDetailSlice";
import { useContinue } from "../../Provider/ContinueContext";
import { resetCoverupTattooValue } from "../../Redux/CoverUpTattooDetailSlice";
import { resetCustomTattooValue } from "../../Redux/CustomTattooDetailSlice";
import { resetPiercingValue } from "../../Redux/PiercingSlice";
import Transition from "../../Transition";

import "./style.css";

/* ---------- FIREBASE (minimal for fetching cached batches + orders) ---------- */
/* Make sure firebase is installed: npm i firebase */
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhQHFhwbQh_aNONVyMm6hoSw10PK0cuUk",
  authDomain: "tattoo-shop-printing.firebaseapp.com",
  projectId: "tattoo-shop-printing",
  storageBucket: "tattoo-shop-printing.firebasestorage.app",
  messagingSenderId: "457938097491",
  appId: "1:457938097491:web:767eebdbf477f30c0afda6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
/* --------------------------------------------------------------------------- */

const FlashTattooDesignSelect = () => {
  const [designs, setDesigns] = useState([]); // all loaded designs so far (appended per batch)
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // batching state:
  const [batchCount, setBatchCount] = useState(1); // next batch to fetch
  const [hasMore, setHasMore] = useState(true); // whether more batches exist on server
  const [orderCounts, setOrderCounts] = useState({}); // cached order counts

  const wrapperRef = useRef(null); // for scroll listening (infinite scroll)

  const { setOnContinue } = useContinue();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextStep = () => navigate("/service/flash-tattoo/size");

  // dispatch selection whenever selectedIndex or designs change
  useEffect(() => {
    if (!designs || designs.length === 0) return;
    const safeIdx = Math.min(selectedIndex, designs.length - 1);
    const sel = designs[safeIdx];
    if (!sel) return;

    // dispatch same fields as before
    dispatch(setFlashTattooOption(sel.tattooName || sel.image_description || sel.keywords || sel.id));
    dispatch(setFlashTattooImg(sel.image_link || ""));
    dispatch(setFlashTattooIsActive(true));
    setOnContinue(() => nextStep);

    dispatch(resetCoverupTattooValue());
    dispatch(resetCustomTattooValue());
    dispatch(resetPiercingValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, designs]);

  // fetch order counts once
  const getOrderCounts = useCallback(async () => {
    const counts = {};
    try {
      const snap = await getDocs(collection(db, "orders"));
      snap.forEach((d) => {
        const data = d.data();
        const id = data?.design_code;
        if (id) counts[id] = (counts[id] || 0) + 1;
      });
    } catch (err) {
      console.error("getOrderCounts error:", err);
    }
    return counts;
  }, []);

  // fetch single batch (designs-batch-<n>) — returns array or null if not exists
  const fetchBatch = useCallback(async (n) => {
    try {
      const docRef = doc(db, `cache/public/designs/designs-batch-${n}`);
      const snap = await getDoc(docRef);
      if (!snap.exists()) return null;
      const data = snap.data();
      return Array.isArray(data?.designs) ? data.designs : [];
    } catch (err) {
      console.error("fetchBatch error:", err);
      throw err;
    }
  }, []);

  // helper to normalize + sort using orderCounts
  const normalizeAndSort = useCallback((arr, orderCountsMap) => {
    const normalized = (arr || []).map((d) => ({
      ...d,
      _orderCount: orderCountsMap[d.id] || 0,
      tattooName: d.tattooName || d.image_description || d.keywords || d.id,
    }));
    normalized.sort((a, b) => (b._orderCount || 0) - (a._orderCount || 0));
    return normalized;
  }, []);

  // initial load: get order counts and first batch
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const counts = await getOrderCounts();
        if (!mounted) return;
        setOrderCounts(counts);

        const firstBatch = await fetchBatch(1);
        if (!mounted) return;

        if (!firstBatch || firstBatch.length === 0) {
          // no first batch — nothing to show
          setHasMore(false);
          setDesigns([]);
        } else {
          const normalized = normalizeAndSort(firstBatch, counts);
          setDesigns(normalized);
          setHasMore(true); // we don't know yet if more exist; assume yes until a missing batch is found
          setBatchCount(2); // next batch to fetch will be 2
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error("initial load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [fetchBatch, getOrderCounts, normalizeAndSort]);

  // load more batch (appends)
  const loadMore = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const n = batchCount;
      const nextBatch = await fetchBatch(n);
      if (!nextBatch || nextBatch.length === 0) {
        setHasMore(false);
        return;
      }
      // normalize new items and append — maintain global sort by _orderCount
      const normalizedNew = normalizeAndSort(nextBatch, orderCounts);
      setDesigns((prev) => {
        const merged = [...prev, ...normalizedNew];
        // sort again by _orderCount so popular designs float up globally
        merged.sort((a, b) => (b._orderCount || 0) - (a._orderCount || 0));
        return merged;
      });
      setBatchCount((c) => c + 1);
    } catch (err) {
      console.error("loadMore error:", err);
    } finally {
      setLoading(false);
    }
  };

  // optional: infinite-scroll handler — when near bottom of wrapper, trigger loadMore
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let ticking = false;

    const onScroll = () => {
      if (!wrapper || !hasMore || loading) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const threshold = 200; // px from bottom to trigger
        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        if (scrollHeight - (scrollTop + clientHeight) < threshold) {
          loadMore();
        }
        ticking = false;
      });
    };

    wrapper.addEventListener("scroll", onScroll);
    return () => wrapper.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef, hasMore, loading, batchCount, orderCounts]);

  return (
    <div className="flash-tattoo-service">
      <AppointmentTopBar title={"Flash Tattoos"} />

      <div className="flash-tattoo-search">
        <input type="text" placeholder="Search" />
      </div>

      <div className="flash-tattoo-grid-wrapper" ref={wrapperRef}>
        <div className="flash-tattoo-grid">
          {loading && designs.length === 0 && (
            <div style={{ padding: 20 }}>
              <h2>Loading Designs...</h2>
            </div>
          )}

          {!loading && designs.length === 0 && (
            <div style={{ padding: 20 }}>
              <h2>No designs found.</h2>
            </div>
          )}

          {designs.map((item, indx) => (
            <div
              key={item.id || indx}
              onClick={() => setSelectedIndex(indx)}
              className={`flash-card ${selectedIndex === indx ? "selected" : ""}`}
            >
              <div className="flash-card-square">
                {item.image_link ? (
                  // native lazy loading
                  <img
                    src={item.image_link}
                    alt={item.image_description || item.tattooName || ""}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h2>No Image</h2>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More button — shown only if there's more to fetch
        <div style={{ textAlign: "center", margin: 16 }}>
          {hasMore ? (
            <button
              id="loadMoreBtn"
              onClick={loadMore}
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                backgroundColor: "#333",
                color: "#fff",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          ) : (
            <div style={{ color: "#666", fontSize: 13 }}>No more designs</div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Transition(FlashTattooDesignSelect);
