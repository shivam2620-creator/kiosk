// FlashTatooDesignSelect.jsx (updated with debounce + server-side search)
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  query,
  where,
  orderBy,
  limit,
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

const DEBOUNCE_MS = 300; // debounce delay for search
const MIN_SERVER_SEARCH_LEN = 3; // min chars to hit server-side search

const FlashTattooDesignSelect = () => {
  const [designs, setDesigns] = useState([]); // all loaded designs so far (appended per batch)
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // batching state:
  const [batchCount, setBatchCount] = useState(1); // next batch to fetch
  const [hasMore, setHasMore] = useState(true); // whether more batches exist on server
  const [orderCounts, setOrderCounts] = useState({}); // cached order counts

  const wrapperRef = useRef(null); // for scroll listening (infinite scroll)
  const searchControllerRef = useRef({ lastQueryId: 0 }); // cancel/ignore stale searches

  const { setOnContinue } = useContinue();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextStep = () => navigate("/service/flash-tattoo/size");

  // search state & UI
  const [searchTerm, setSearchTerm] = useState("");
  const [isServerSearching, setIsServerSearching] = useState(false);
  const [serverSearchFallback, setServerSearchFallback] = useState(false); // true when server returned no hits and we fall back

  // normalize + sort helper (same as before)
  const normalizeAndSort = useCallback((arr, orderCountsMap) => {
    const normalized = (arr || []).map((d) => ({
      ...d,
      _orderCount: orderCountsMap[d.id] || 0,
      tattooName: d.tattooName || d.image_description || d.keywords || d.id,
    }));
    normalized.sort((a, b) => (b._orderCount || 0) - (a._orderCount || 0));
    return normalized;
  }, []);

  // filtered designs derived from `designs` + `searchTerm` OR server results
  // We'll maintain `serverResults` when server-side search is used.
  const [serverResults, setServerResults] = useState(null);

  const filteredDesigns = useMemo(() => {
    // If server results are present (non-null), use them (they are authoritative)
    if (serverResults !== null) {
      return serverResults;
    }

    // otherwise fallback to client-side filtering over `designs`
    if (!searchTerm) return designs;
    const q = searchTerm.trim().toLowerCase();
    if (!q) return designs;
    return designs.filter((d) => {
      const name = (d.tattooName || d.image_description || d.keywords || d.id || "")
        .toString()
        .toLowerCase();
      return name.includes(q);
    });
  }, [designs, searchTerm, serverResults]);

  // dispatch selection whenever selectedIndex or filteredDesigns change
  useEffect(() => {
    if (!filteredDesigns || filteredDesigns.length === 0) {
      // if filtered becomes empty, we still want to clear selection state in redux
      // (optional) we can set isActive false or keep previous — here we clear
      // (but comment out if you prefer keeping previous selection)
      // dispatch(setFlashTattooIsActive(false));
      return;
    }
    const safeIdx = Math.min(selectedIndex, filteredDesigns.length - 1);
    const sel = filteredDesigns[safeIdx];
    if (!sel) return;

    dispatch(setFlashTattooOption(sel.tattooName || sel.image_description || sel.keywords || sel.id));
    dispatch(setFlashTattooImg(sel.image_link || ""));
    dispatch(setFlashTattooIsActive(true));
    setOnContinue(() => nextStep);

    dispatch(resetCoverupTattooValue());
    dispatch(resetCustomTattooValue());
    dispatch(resetPiercingValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, filteredDesigns]);

  // if filteredDesigns shrinks / changes, keep selectedIndex valid
  useEffect(() => {
    if (filteredDesigns.length === 0) {
      setSelectedIndex(0);
      return;
    }
    if (selectedIndex >= filteredDesigns.length) {
      setSelectedIndex(0);
    }
  }, [filteredDesigns, selectedIndex]);

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
          setHasMore(true);
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

  // load more batch (appends) — unchanged
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

  /* -------------------- Debounced search + server-side search -------------------- */
  useEffect(() => {
    const q = searchTerm.trim();
    const currentQueryId = ++searchControllerRef.current.lastQueryId;

    // reset serverResults when search term cleared
    if (!q) {
      setServerResults(null);
      setIsServerSearching(false);
      setServerSearchFallback(false);
      return;
    }

    // debounce
    const t = setTimeout(async () => {
      // If short query, just do client-side filtering
      if (q.length < MIN_SERVER_SEARCH_LEN) {
        setServerResults(null);
        setIsServerSearching(false);
        setServerSearchFallback(false);
        return;
      }

      // Try server-side search (prefix on tattooName)
      setIsServerSearching(true);
      setServerSearchFallback(false);
      try {
        // Example: your real collection name might be "designs" (top-level).
        // If your designs live only in cached batch docs, server-side search will not find them.
        const qStart = q.toLowerCase();
        const qEnd = qStart + "\uf8ff";

        // build query - orderBy may require an index; adjust field names to match your schema
        const designsCol = collection(db, "designs"); // change if your collection differs
        const qRef = query(
          designsCol,
          where("tattooNameLower", ">=", qStart),
          where("tattooNameLower", "<=", qEnd),
          orderBy("tattooNameLower"),
          limit(100)
        );

        const snap = await getDocs(qRef);

        // ignore stale results
        if (currentQueryId !== searchControllerRef.current.lastQueryId) return;

        if (snap.empty) {
          // no server results -> fall back to client-side filtering (over loaded batches)
          setServerResults(null);
          setServerSearchFallback(true);
        } else {
          const results = [];
          snap.forEach((docSnap) => {
            const d = docSnap.data();
            // normalize similarly to local items:
            results.push({
              ...d,
              id: docSnap.id,
              _orderCount: orderCounts[d.id] || 0,
              tattooName: d.tattooName || d.image_description || d.keywords || d.id,
            });
          });
          // sort server results by orderCount optionally
          results.sort((a, b) => (b._orderCount || 0) - (a._orderCount || 0));
          setServerResults(results);
          setServerSearchFallback(false);
        }
      } catch (err) {
        console.error("server search error:", err);
        // on error, fallback to client-side filter
        setServerResults(null);
        setServerSearchFallback(true);
      } finally {
        setIsServerSearching(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [searchTerm, orderCounts]);

  /* ------------------------------------------------------------------------------- */

  return (
    <div className="flash-tattoo-service">
      <AppointmentTopBar title={"Flash Tattoos"} />

      <div className="flash-tattoo-search">
        <input
          type="text"
          placeholder="Search designs (name, keywords...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search designs"
        />
        {/* {isServerSearching && <span style={{ marginLeft: 8 }}>Searching...</span>}
        {!isServerSearching && serverSearchFallback && (
          <span style={{ marginLeft: 8, color: "#666" }}>No server results, showing local matches</span>
        )} */}
      </div>

      <div className="flash-tattoo-grid-wrapper" ref={wrapperRef}>
        <div className="flash-tattoo-grid">
          {loading && designs.length === 0 && (
            <div style={{ padding: 20 }}>
              <h2>Loading Designs...</h2>
            </div>
          )}

          {!loading && filteredDesigns.length === 0 && (
            <div style={{ padding: 20 }}>
              <h2>No designs found.</h2>
            </div>
          )}

          {filteredDesigns.map((item, indx) => (
            <div
              key={item.id || indx}
              onClick={() => setSelectedIndex(indx)}
              className={`flash-card ${selectedIndex === indx ? "selected" : ""}`}
            >
              <div className="flash-card-square">
                {item.image_link ? (
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

        {/* optional Load More UI when there are more batches */}
        {hasMore && !serverResults && ( // loadMore only shown when not using server results
          <div style={{ textAlign: "center", margin: 16 }}>
            <button
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Transition(FlashTattooDesignSelect);
