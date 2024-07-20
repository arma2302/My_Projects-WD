import React, { useEffect, useState } from "react";

export default function MainComp() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("");
  const [filter, setFilter] = useState("");
  let [Data, setData] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [toggel, setToggel] = useState(false);
  // useEffect
  useEffect(() => {
    let alldata = JSON.parse(localStorage.getItem("Task")) || [];
    setData(alldata);
  }, []);
  Data = Data.filter((user) => user.priority.includes(filter) || user.status.includes(filter));

  const addTask = (e) => {
    e.preventDefault();
    let TaskData = {
      title,
      desc,
      status,
      priority,
    };
    setData([...Data, TaskData]);
    localStorage.setItem("Task", JSON.stringify([...Data, TaskData]));

    setTitle("");
    setDesc("");
    setPriority("");
  };

  const handleCheckbox = (index) => {
    setToggel(true);
    console.log(index, "index");
    let updatedCheckedTasks = [...checkedTasks];
    console.log("UPDATETASK", updatedCheckedTasks);
    if (checkedTasks.includes(index)) {
      console.log(checkedTasks.includes(index), "includes");
      return;
    } else {
      updatedCheckedTasks.push(index);
      console.log(updatedCheckedTasks, "updated Task array index ");
    }
    setCheckedTasks(updatedCheckedTasks);
  };

  // Handle task status change to "completed"
  const handleTaskStatus = () => {
    let updatedData = [...Data];
    checkedTasks.forEach((index) => {
      updatedData[index].status = "completed";
    });
    setData(updatedData);
    localStorage.setItem("Task", JSON.stringify(updatedData));
    setCheckedTasks([]);
    setToggel(false);
  };

  const handleMoveToPending = () => {
    let updatedData = [...Data];
    checkedTasks.forEach((index) => {
      updatedData[index].status = "pending";
    });
    setData(updatedData);
    localStorage.setItem("Task", JSON.stringify(updatedData));
    setCheckedTasks([]);
    setToggel(false);
  };
  return (
    <div className="container">
      <h1>Task Managment</h1>
      <div className="main">
        <form onSubmit={(e) => addTask(e)}>
          <p>Enter task Details here</p>
          <div>
            <label>Task Title:</label>
            <input type="text" placeholder="enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Task Description:</label>
            <input type="text" placeholder="enter Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div>
            <label>Task Priority:</label>

            <select onChange={(e) => setPriority(e.target.value)}>
              <option selected>Set Pririty</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="penLable">Task Status:</label> <input type="radio" id="pending" value="pending" checked disabled />
            <label htmlFor="pending" className="penLable">
              Pending
            </label>
          </div>

          <button type="submit">Add Task</button>
        </form>

        {Data ? (
          <div className="content-wrap">
            <div>
              <select onChange={(e) => setFilter(e.target.value)} className="filter">
                <option selected>Filter Task</option>
                <option value="High">High Priority</option>
                <option value="Low">Low Priority</option>
                <option value="pending">Pending </option>
                <option value="completed">Completed</option>
              </select>

              {toggel && checkedTasks.length > 0 && (
                <>
                  <button onClick={handleTaskStatus} className="taskstatus">
                    Mark Completed
                  </button>
                  <button onClick={handleMoveToPending} className="taskstatus">
                    Move to Pending
                  </button>
                </>
              )}
            </div>
            <div className="Cards-wrap">
              {Data.map((item, index) => {
                return (
                  <div class="card">
                    <div class="text">
                      <span>Title : {item.title}</span>
                      <p class="subtitle">Description: {item.desc}</p>
                      <p class="subtitle">Priority: {item.priority}</p>
                      <p class="subtitle">Status: {item.status}</p>
                    </div>
                    <div class="icons">
                      <a class="btn" href="#">
                        <input type="checkbox" id="check" checked={checkedTasks.includes(index)} onChange={() => handleCheckbox(index)} />
                      </a>
                      <a class="btn" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="svg-icon">
                          {" "}
                          <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
                        </svg>
                      </a>
                      <a class="btn" href="#">
                        <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" class="svg-icon">
                          <path
                            stroke-width="8"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            fill="none"
                            d="M21.9,50h0M50,50h0m28.1,0h0M25.9,50a4,4,0,1,1-4-4A4,4,0,0,1,25.9,50ZM54,50a4,4,0,1,1-4-4A4,4,0,0,1,54,50Zm28.1,0a4,4,0,1,1-4-4A4,4,0,0,1,82.1,50Z"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // <table border={1}>
          //   <tr>
          //     <th></th>
          //     <th>Title</th>
          //     <th>Description</th>
          //     <th>Status</th>
          //     <th>Priority</th>
          //     <th>Action</th>
          //   </tr>

          //   {Data.map((item, index) => {
          //     return (
          //       <tr key={index}>
          //         <td>
          //           <input type="checkbox" checked={checkedTasks.includes(index)} onChange={() => handleCheckbox(index)} />
          //         </td>
          //         <td>{item.title}</td>
          //         <td>{item.desc}</td>
          //         <td>{item.status}</td>
          //         <td>{item.priority}</td>
          //         <td>
          //           <button>Delete</button>
          //         </td>
          //       </tr>
          //     );
          //   })}
          // </table>
          <h1>No Task Added</h1>
        )}
      </div>
    </div>
  );
}
