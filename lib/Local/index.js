import axios from "axios";

export const postFavorite = async (id) => {
  try {
    const response = await axios.post(
      "https://screenvaultserver.adaptable.app/favorites",
      {
        movieId: id,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postWatchLater = async (id) => {
  try {
    const response = await axios.post(
      "https://screenvaultserver.adaptable.app/watchLater",
      {
        movieId: id,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postWatched = async (id) => {
  try {
    const response = await axios.post(
      "https://screenvaultserver.adaptable.app/watched",
      {
        movieId: id,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavorite = async (id) => {
  try {
    const response = await axios.delete(
      `https://screenvaultserver.adaptable.app/favorites/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWatchLater = async (id) => {
  try {
    const response = await axios.delete(
      `https://screenvaultserver.adaptable.app/watchLater/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWatched = async (id) => {
  try {
    const response = await axios.delete(
      `https://screenvaultserver.adaptable.app/watched/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createList = async (data) => {
  try {
    const response = await axios.post(
      "https://screenvaultserver.adaptable.app/lists",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateList = async (id, data) => {
  try {
    const response = await axios.put(
      `https://screenvaultserver.adaptable.app/lists/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteList = async (id) => {
  try {
    const response = await axios.delete(
      `https://screenvaultserver.adaptable.app/lists/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFavorites = async () => {
  try {
    const response = await axios.get(
      "https://screenvaultserver.adaptable.app/favorites"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getWatched = async () => {
  try {
    const response = await axios.get(
      "https://screenvaultserver.adaptable.app/watched"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getWatchLater = async () => {
  try {
    const response = await axios.get(
      "https://screenvaultserver.adaptable.app/watchLater"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getLists = async () => {
  try {
    const response = await axios.get(
      "https://screenvaultserver.adaptable.app/lists"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getList = async (id) => {
  try {
    const response = await axios.get(
      `https://screenvaultserver.adaptable.app/lists/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const checkIfExists = async (type, name, listId) => {
  listId = "";
  const types = ["watched", "lists", "watchLater", "favorites", "inList"];
  if (!types.includes(type)) return;
  try {
    const bool = axios
      .get(
        type != "inList"
          ? `https://screenvaultserver.adaptable.app/${type}`
          : `https://screenvaultserver.adaptable.app/lists/${listId}`
      )
      .then((data) => {
        let boolean = false;
        data.data.forEach((list) => {
          if (
            (type === "favorites" || "inList" ? list.movieId : list.name) ===
            name
          )
            boolean = true;
        });
        return boolean;
      });
    return (await bool).valueOf(bool);
  } catch (error) {
    console.error(error);
  }
};
