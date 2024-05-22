import "./App.css";
import { Button } from "./components/ui/button";
import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";
// ACTS AS ROOT LAYOUT
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Header />
        <Button onClick={() => console.log("clicked")}>Click me</Button>
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
