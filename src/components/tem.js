import { useParams } from "react-router-dom";
import { IMG_CDN } from "./Config";
import useRestaurant from "../utils/useRestaurant";
import { Shimmer } from "./Shimmer";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { removeItem } from "../utils/cartSlice";

const RestaurantMenu = () => {
  const { id } = useParams();

  const restaurant = useRestaurant(id);
  const restaurantInfo = restaurant?.cards[0]?.card?.card?.info;
  const restaurantMenuInfo = restaurant?.cards;

  const dispatch = useDispatch();
  const handleAddItem = (itemCards) => {
    dispatch(addItem(itemCards));
  };
  const handleRemoveItem = (itemCards) => {
    dispatch(removeItem(itemCards));
  };

  let result = [],
    uniqueFoodItems = [];

  const customFilter = (object, result) => {
    if (object.hasOwnProperty("itemCards")) result.push(object);

    for (var i = 0; i < Object.keys(object).length; i++) {
      if (typeof object[Object.keys(object)[i]] == "object") {
        customFilter(object[Object.keys(object)[i]], result);
      }
    }
  };

  const resMenu =
    restaurantMenuInfo?.length > 0 && customFilter(restaurantMenuInfo, result);

  if (result.length > 0) {
    const uniqueIds = [];
    let uniqueItems = [
      ...new Set(result.flatMap((f) => f.itemCards).map((p) => p.card.info)),
    ];
    uniqueFoodItems = uniqueItems?.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.id);

      if (!isDuplicate) {
        uniqueIds.push(element.id);

        return true;
      }

      return false;
    });
  }

  return (
    <div>
      {!restaurant ? (
        <Shimmer />
      ) : (
        <div>
          <h1>Menu</h1>
          {uniqueFoodItems.length > 0 ? (
            Object.values(uniqueFoodItems).map((item, index) => {
              if (index < 25) {
                return (
                  <li key={index}>
                    <>
                      <div>
                        <span>{item?.name}</span>
                        <span>
                          ₹ {(item?.price || item?.defaultPrice) / 100}
                        </span>
                      </div>
                      <div>
                        {item?.imageId && (
                          <img src={IMG_CDN_URL + item?.imageId} alt="item" />
                        )}
                        <div>
                          <button
                            onClick={() => {
                              handleRemoveItem();
                            }}
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => {
                              handleAddItem();
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </>
                  </li>
                );
              }
            })
          ) : (
            <span>No restaurant menu items.</span>
          )}
        </div>
      )}
    </div>
  );
};
export default RestaurantMenu;
