import "./App.css";
import { useState, useRef } from "react";
import Modal from "./Modal";

function App() {
  const [list, updateList] = useState([]);
  const newItem = useRef("");
  const deleteItem = useRef("");
  const [toDeletewithoutasking, updateToDeletewithoutasking] = useState(false);
  const [isErrorPresent, updateIsErrorPresent] = useState(false);
  const [toDeleteItem, updateToDeleteItem] = useState(false);
  const [errorMessage, updateErrorMessage] = useState("");

  // deleteing item from the list
  function handleDeleteItem(item) {
    updateList((prev) => {
      let newList = [];
      prev.forEach((previtem) => {
        if (previtem !== item) {
          newList.push(previtem);
        }
      });
      return newList;
    });
    if (toDeleteItem === true) {
      updateToDeleteItem(false);
    }
  }

  // showing modal for asking delete event
  function handleDeleteEvent(item) {
    console.log(toDeletewithoutasking);
    if (toDeletewithoutasking === true) {
      handleDeleteItem(item);
    } else {
      updateToDeleteItem(true);
      deleteItem.value = item;
    }
  }

  // validating the input and updating the list
  function handleUpdateList() {
    if (newItem.current.value === "") {
      showError("Input is Empty");
    } else {
      let x = 0;
      for (let i = 0; i < list.length; i++) {
        if (list[i].toUpperCase() === newItem.current.value.toUpperCase()) {
          showError("Input is already present in the list");
          x++;
          break;
        }
      }
      console.log(x);
      let str = newItem.current.value;
      if (x === 0) {
        updateList((prev) => {
          newItem.current.value = "";
          console.log(str);
          return [...prev, str];
        });
      }
    }
  }

  //showing error in modal
  function showError(error) {
    updateErrorMessage(error);
    updateIsErrorPresent(true);
  }

  return (
    <div className="flex h-[100vh]">
      <div className="w-1/2 bg-blue-500 p-4 max-h-screen overflow-y-auto text-white">
        {list.length === 0 && <p>List is Empty</p>}
        <ul>
          {list.map((item) => {
            return (
              <li key={item}>
                <button
                  className="hover:bg-blue-300"
                  onClick={() => handleDeleteEvent(item, false)}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-1/2 bg-green-500 p-4 justify-center items-center text-center text-green-500">
        <input
          type="text"
          placeholder="input items"
          ref={newItem}
          className="m-8 text-black"
        />
        <br />
        <button onClick={handleUpdateList} className="bg-white p-3 rounded">
          update list
        </button>
      </div>

      {/* error modal */}
      <Modal isOpen={isErrorPresent}>
        {errorMessage}
        <br />
        <button
          onClick={() => updateIsErrorPresent(false)}
          className="mt-2 p-1 bg-red-300 hover:bg-red-600 text-white"
        >
          Close
        </button>
      </Modal>

      {/* Delete modal */}
      <Modal isOpen={toDeleteItem}>
        do you really want to delete "{deleteItem.value}" from the list?
        <br />
        <input
          type="checkbox"
          checked={toDeletewithoutasking}
          onChange={() =>
            updateToDeletewithoutasking((prev) => {
              return !prev;
            })
          }
          className="mx-3"
        />
        don't ask again
        <br />
        <button
          onClick={() => handleDeleteItem(deleteItem.value)}
          className="mt-4 mx-5 p-2 bg-red-300 hover:bg-red-600 text-white"
        >
          Delete
        </button>
        <button
          onClick={() => updateToDeleteItem(false)}
          className="mt-2 p-2 bg-green-300 hover:bg-green-600 text-white"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default App;
