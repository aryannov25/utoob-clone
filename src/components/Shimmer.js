const Shimmer = () => {
  return (
    <>
      <div className="animate-pulse p-2 m-2 flex flex-wrap justify-center">
        {Array(40)
          .fill("")
          .map((e, index) => {
            return (
              <div
                className="w-56 h-64 p-2 m-2 bg-stone-100 rounded flex"
                key={index}
              >
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-24 bg-slate-200 rounded"></div>
                  <div className="h-8 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Shimmer;

export const CardShimmer = () => {
  const shimmer_card_unit = 15;
  return (
    <div className="restaurant-menu">
      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-items-list">
            {Array(shimmer_card_unit)
              .fill("")
              .map((element, index) => (
                <div className="shimmer-menu-card" key={index}>
                  <div className="shimmer-img-wrapper">
                    <p className="shimmer-img stroke animate" />
                    <div className="shimmer-btn stroke animate"> </div>
                  </div>
                  <div className="shimmer-item-details">
                    <p className="shimmer-w40  stroke animate"></p>
                    <p className="shimmer-w20  stroke animate"> </p>
                    <p className="shimmer-w60  stroke animate"></p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
