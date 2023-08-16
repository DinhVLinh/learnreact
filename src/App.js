import queryString from "query-string";
import React, { useEffect, useState } from "react";
import {
  NavLink,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Clock from "./features/Clock";

// import "./App.css";
import TodoFeatues from "./features/Todo";
// import ColorBox from "./features/ColorBox";
import productApi from "./api/productsApi";
import NotFound from "./components/NotFound";
import MuFeatures from "./features/Song";
import Counter from "./features/Counter";
import Header from "components/Header";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import ProductsFeature from "features/Product";

function App() {
  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     const ProductList = await productApi.getAll();
  //   };
  //   fetchProductList();
  // }, []);

  // const [todoList, setTodoList] = useState(
  //   [
  //     { id: 1, title: 'Eat' },
  //     { id: 2, title: 'Sleep' },
  //     { id: 3, title: 'Code' },
  //   ]
  // )

  // function handleRemoveTodoClick(todo) {
  //   const index = todoList.findIndex(x => x.id === todo.id)
  //   if (index < 0) return

  //   const newTodoList = [...todoList]
  //   newTodoList.splice(index, 1)

  //   setTodoList(newTodoList)
  // }

  // function handleSubmitForm(formValue){

  //   const newTodo = {
  //     id: Date.now(),
  //     ...formValue
  //   };
  //   const newTodoList = [...todoList]
  //   newTodoList.push(newTodo)
  //   setTodoList(newTodoList)
  // }

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 10,
  });
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 10,
    title_like: "",
  });
  // useEffect(() => {
  //   async function fecthPostList() {
  //     try {
  //       const paramsString = queryString.stringify(filter);
  //       const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
  //       const reponse = await fetch(requestUrl);
  //       const reponseJSON = await reponse.json();

  //       const { data, pagination } = reponseJSON;
  //       setPostList(data);
  //       setPagination(pagination);
  //     } catch (error) {
  //       console.log("something when wrong", error);
  //     }
  //   }
  //   fecthPostList();
  // }, [filter]);

  function handePageChange(newPage) {
    setFilter({
      ...filter,
      _page: newPage,
    });
    console.log("New Page :", newPage);
    console.log(filter, "filter");
  }

  function handleSearchFilter(newFilter) {
    setFilter({
      ...filter,
      _page: 1,
      title_like: newFilter.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={ProductsFeature} exact />
        <Route path="/clock" component={Clock} />
        <Route path="/mu-list" component={MuFeatures} />
        <Route path="/posts" component={TodoFeatues} />
        <Route path="/product" component={ProductsFeature} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
