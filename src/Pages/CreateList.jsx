import { useState, useEffect } from "react";
import {
  getLists,
  getList,
  updateList,
  createList,
  deleteList,
} from "../../lib/Local";
import "./CreateList.css";
import { Link } from "react-router-dom";

export default function ManageLists() {
  const [listName, setListName] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [selectedListItems, setSelectedListItems] = useState([]);
  const [fetchedLists, setFetchedLists] = useState("");

  const fetchData = async () => {
    getLists().then((data) => {
      setFetchedLists(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    selectedList && setSelectedListItems([]);
    getList(selectedList).then((data) => {
      data.data.forEach((dat) => {
        setSelectedListItems([...selectedListItems, dat]);
        return;
      });
    });
  }, [selectedList]);

  const handleSelect = (e) => setSelectedList(e.target.value);
  const handleText = (e) => setListName(e.target.value);

  const update = () => {
    if (!listName && !selectedList) {
      alert("Please input the name and select a list to update");
      return;
    }
    const data = {
      name: listName,
      data: selectedListItems,
    };
    updateList(selectedList, data).then(() => fetchData());
  };

  const create = () => {
    if (!listName) {
      alert("Please input the name to create");
      return;
    }
    const data = {
      name: listName,
      data: [],
    };
    createList(data).then(() => fetchData());
  };

  const del = () => {
    if (!selectedList) {
      alert("Select a list to delete");
      return;
    }
    deleteList(selectedList).then(() => fetchData());
  };

  return (
    <>
      <Link to="/profile" style={{ color: "whitesmoke" }}>
        Back
      </Link>
      <h1>List Manager</h1>
      <div className="page">
        <div className="create">
          <input
            value={listName}
            type="text"
            onChange={handleText}
            placeholder="Type name"
          />
          <button onClick={create}>Create</button>
        </div>

        <div className="update">
          <select value={selectedList} name="lists" onChange={handleSelect}>
            <option value="">None</option>
            {fetchedLists &&
              fetchedLists.map((x, index) => (
                <option value={x.id} key={index}>
                  {x.name}
                </option>
              ))}
          </select>
          <button onClick={update}>Update</button>
          <button onClick={del}>Delete</button>
        </div>
      </div>
    </>
  );
}
