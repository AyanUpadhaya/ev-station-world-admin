import { RouterProvider } from "react-router-dom";
import { routes } from "./routers/Router";
import useAuthCheck from "./hooks/useAuthCheck";
import './App.css'
export default function App() {
  const Router = routes;
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>loading....</div>
  ) : (
    <div>
      <RouterProvider router={Router}></RouterProvider>
    </div>
  );
}