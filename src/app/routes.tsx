import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Pricing from "./pages/Pricing";
import API from "./pages/API";
import Blog from "./pages/Blog";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-8xl font-extrabold text-primary/20 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>404</p>
      <h2 className="text-2xl font-extrabold mb-2">Page not found</h2>
      <p className="text-muted-foreground text-sm mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
        Go home
      </a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignUp },
      { path: "pricing", Component: Pricing },
      { path: "api", Component: API },
      { path: "blog", Component: Blog },
      { path: "*", Component: NotFound },
    ],
  },
]);
