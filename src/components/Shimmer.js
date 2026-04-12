import React from "react";

// Shared shimmer sweep — inline style so Tailwind's JIT can't strip the keyframes.
// No borderRadius here; let each skeleton element set its own via Tailwind classes.
const shimmerStyle = {
  background:
    "linear-gradient(90deg, #17171c 25%, #24242e 50%, #17171c 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmerSweep 1.6s infinite",
};

const KEYFRAMES = `
@keyframes shimmerSweep {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`;

if (typeof document !== "undefined" && !document.getElementById("shimmer-kf")) {
  const style = document.createElement("style");
  style.id = "shimmer-kf";
  style.textContent = KEYFRAMES;
  document.head.appendChild(style);
}

const Bone = ({ className }) => (
  <div className={`rounded-md ${className}`} style={shimmerStyle} />
);

/* ── Grid card (home / category pages) ───────────────────────────── */
const SkeletonCard = () => (
  <div className="flex flex-col">
    <div className="w-full aspect-video rounded-2xl overflow-hidden">
      <div className="w-full h-full" style={shimmerStyle} />
    </div>

    <div className="flex gap-3 mt-3">
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full"
        style={shimmerStyle}
      />

      <div className="flex flex-col gap-2 flex-1 pt-0.5">
        <Bone className="h-[13px] w-full" />
        <Bone className="h-[13px] w-4/5" />
        <Bone className="h-[11px] w-2/5 mt-1" />
        <Bone className="h-[11px] w-1/3" />
      </div>
    </div>
  </div>
);

const Shimmer = ({ count = 20 }) => (
  <div className="px-5 py-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <SkeletonCard key={i} />
        ))}
    </div>
  </div>
);

export default Shimmer;

/* ── Horizontal card (search results) ────────────────────────────── */
/* Layout matches SearchResults: pt-8 pb-10, max-w-3xl inner container.      */
export const CardShimmer = ({ count = 8 }) => (
  <div className="min-h-screen px-4 sm:px-6 pt-8 pb-10">
    <div className="max-w-3xl mx-auto">
      {/* Match the "Results for …" heading height */}
      <Bone className="h-5 w-48 mb-5" />
      <div className="flex flex-col gap-3">
        {Array(count)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex gap-4 p-3">
              {/* Desktop thumbnail */}
              <div className="flex-shrink-0 w-[360px] h-[202px] rounded-xl overflow-hidden hidden sm:block">
                <div className="w-full h-full" style={shimmerStyle} />
              </div>
              {/* Mobile thumbnail */}
              <div className="flex-shrink-0 w-full sm:hidden aspect-video rounded-xl overflow-hidden">
                <div className="w-full h-full" style={shimmerStyle} />
              </div>

              {/* Text column */}
              <div className="flex-col gap-3 flex-1 py-1 hidden sm:flex">
                <Bone className="h-5 w-3/4" />
                <Bone className="h-5 w-1/2" />
                <Bone className="h-3 w-1/4 mt-1" />
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0"
                    style={shimmerStyle}
                  />
                  <Bone className="h-3 w-32" />
                </div>
                <Bone className="h-3 w-full mt-1" />
                <Bone className="h-3 w-4/5" />
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

/* ── Watch page sidebar skeleton ──────────────────────────────────── */
export const SidebarShimmer = ({ count = 10 }) => (
  <div className="space-y-3 px-2">
    {Array(count)
      .fill(null)
      .map((_, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex-shrink-0 w-[168px] h-[94px] rounded-xl overflow-hidden">
            <div className="w-full h-full" style={shimmerStyle} />
          </div>
          <div className="flex flex-col gap-2 flex-1 pt-1">
            <Bone className="h-3.5 w-full" />
            <Bone className="h-3.5 w-4/5" />
            <Bone className="h-3 w-2/3 mt-1" />
            <Bone className="h-3 w-1/2" />
          </div>
        </div>
      ))}
  </div>
);
