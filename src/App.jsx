import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Movies from "./Components/Movies/Movies";
import TvSeries from "./Components/Tv-series/Tv-Series";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Signup from "./Components/SignUp/Signup";
import Logout from "./Components/Logout/Logout";
import WishList from "./Components/WishList/WishList";
import ProtuctedRoutes from "./Components/ProtectedRoutes/ProtuctedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./Components/Details/Details";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DetailsSeries from "./Components/Details/DetailsSeries";
import Search from "./Components/Search/Search";
function App() {
  const queryClient = new QueryClient();
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "Movies", element: <Movies /> },
        { path: "Tv-Series", element: <TvSeries /> },
        {
          path: "Login",
          element: <Login />,
        },
        {
          path: "Signup",
          element: <Signup />,
        },
        {
          path: "Movies/Details/:id", // Update here
          element: <Details />,
        },
        {
          path: "Tv-Series/Details/:id", // Update here
          element: <DetailsSeries />,
        },
        {
          path: "wishlist/Details/:id", // Update here
          element: <Details />,
        },
        {
          path: "search/:inputValue/Details/:id", // Update here
          element: <Details />,
        },
        {
          path: "search/:inputValue",
          element: <Search />,
        },
        { path: "logout", element: <Logout /> },
        {
          path: "Details/:id",
          element: <Details />,
        },

        {
          path: "wishlist",
          element: (
            <ProtuctedRoutes>
              <WishList />
            </ProtuctedRoutes>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />{" "}
      </QueryClientProvider>
    </>
  );
}

export default App;
