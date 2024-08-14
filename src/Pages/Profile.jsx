import MovieWrap from "./MovieWrapper";
import Card from "../Components/Card";
import {
  getFavorites,
  getList,
  getLists,
  getWatched,
  getWatchLater,
} from "../../lib/Local";
import { getMovieDetails } from "../../lib/TMDb";
import { useState, useEffect } from "react";

export default function Profile() {
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [selectedListName, setSelectedListName] = useState("");
  const [selectedListItems, setSelectedListItems] = useState([]);
  const [lists, setLists] = useState([]);

  const fetchData = async () => {
    getFavorites().then((data) => {
      data.forEach((obj) => {
        getMovieDetails(obj.movieId, "en-US").then((dat) => {
          const exists = favorites.some((x) => x.id === dat.id);
          if (exists) return;
          setFavorites([...favorites, dat]);
          return;
        });
        console.log(favorites);
      });
    });
    getWatched().then((data) => {
      data.forEach((obj) => {
        getMovieDetails(obj.movieId, "en-US").then((dat) => {
          const exists = watched.some((x) => x.id === dat.id);
          if (exists) return;
          setWatched([...watched, dat]);
          return;
        });
      });
    });
    getWatchLater().then((data) => {
      data.forEach((obj) => {
        getMovieDetails(obj.movieId, "en-US").then((dat) => {
          const exists = watchLater.some((x) => x.id === dat.id);
          if (exists) return;
          setWatchLater([...watchLater, dat]);
          return;
        });
      });
    });
  };

  const fetchListItems = async () => {
    setSelectedListItems([]);
    selectedList &&
      getList(selectedList).then((data) => {
        data.data.forEach((dat) => {
          getMovieDetails(dat, "en-US").then((dt) => {
            const exists =
              selectedListItems && selectedListItems.some((x) => x.id === dat);
            if (exists) return;
            setSelectedListItems(
              [...selectedList, dt].filter((x) => typeof x === "object")
            );
            return;
          });
        });
      });
  };

  useEffect(() => {
    fetchData();
    getLists().then((data) => {
      setLists(data);
    });
  }, []);

  useEffect(() => {
    fetchListItems();
    const name = lists.find((x) => x.id === selectedList);
    setSelectedListName(name && name.name);
  }, [selectedList]);

  const handleSelect = (e) => {
    setSelectedList(e.target.value);
  };

  useEffect(() => {
    console.log(selectedListItems);
  }, [selectedListItems]);

  return (
    <div style={{ paddingBottom: 50, paddingTop: 50 }}>
      <MovieWrap h4={"Favorites"} data={favorites} moreData={false} />
      {watched.length ? (
        <MovieWrap h4={"Watched"} data={watched} moreData={false} />
      ) : (
        <h4>Watched list is empty</h4>
      )}
      {watchLater.length ? (
        <MovieWrap h4={"Watch Later"} data={watchLater} moreData={false} />
      ) : (
        <h4>No movies to watch later</h4>
      )}
      <select name="lists" value={selectedList} onChange={handleSelect}>
        <option value="" disabled hidden>
          ...
        </option>
        {lists.map((x, index) => (
          <option key={index} value={x.id}>
            {x.name}
          </option>
        ))}
      </select>

      {selectedList && selectedListItems.length > 0 && (
        <MovieWrap
          h4={selectedListName}
          data={selectedListItems}
          moreData={false}
        />
      )}
    </div>
  );
}
