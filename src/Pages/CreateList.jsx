import { useState, useEffect } from "react";
import { getLists } from "../../lib/Local";

export default function ManageLists() {
  const [listName, setListName] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [listToDelete, setListToDelete] = useState("");
  const [fetchedLists, setFetchedLists] = useState("");

  useEffect(() => {
    getLists().then((data) => {
      setFetchedLists(data);
    });
  }, []);

  return (
    <div className="page">
      <input value={listName} type="text" />

      <select value={selectedList} name="lists">
        <option value="">None</option>
      </select>
      <button>Submit</button>
    </div>
  );
}
