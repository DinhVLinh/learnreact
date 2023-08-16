import React, { useEffect, useMemo, useState } from "react";
import TodoList from "../../components/TodoList";
import {
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import queryString from "query-string";
import TodoForm from "../../components/TodoForm";
import { Container } from "@mui/material";

ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: "Eat",
      status: "new",
    },
    {
      id: 2,
      title: "Sleep",
      status: "completed",
    },
    {
      id: 3,
      title: "Code",
      status: "new",
    },
  ];
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(initTodoList);
  const [filteredStatus, setfilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);

    return params.status || "all";
  });

  // useEffect(() => {
  //   const params = queryString.parse(location.search);
  //   console.log(params.status, "status");
  //   setfilteredStatus(params.status || "all");
  // }, [location.search]);

  function handleTodoClick(todo, idx) {
    // clone current array the new one
    const newTodoList = [...todoList];

    // toggle state
    const newTodo = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === "new" ? "completed" : "new",
    };

    newTodoList[idx] = newTodo;

    // update todoList
    setTodoList(newTodoList);
  }

  function showAll() {
    // setfilteredStatus("all");

    const queryParams = { status: "all" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });

    setfilteredStatus(queryParams.status);
  }

  function showCompleted() {
    const queryParams = { status: "completed" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
    setfilteredStatus(queryParams.status);
  }
  function showNew() {
    const queryParams = { status: "new" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
    setfilteredStatus(queryParams.status);
  }

  const renderedTodoList = useMemo(() => {
    return todoList.filter(
      (todo) => filteredStatus === "all" || filteredStatus === todo.status
    );
  }, [todoList, filteredStatus]);

  function handleTodoFormSubmit(value) {
    const newTodo = {
      id: Date.now(),
      title: value.title,
      status: "new",
    };

    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  }

  return (
    <div>
      <h3>Todo Form</h3>
      <Container>
        <TodoForm onSubmit={handleTodoFormSubmit} />
      </Container>

      <h3>TODO LIST</h3>
      <TodoList TodoList={renderedTodoList} onTodoClick={handleTodoClick} />

      <div>
        <button onClick={showAll}>Show All</button>
        <button onClick={showCompleted}>Show Completed</button>
        <button onClick={showNew}>Show New</button>
      </div>
    </div>
  );
}

export default ListPage;
