import "./App.css";
import { Footer } from "./pages/footer";
import { Header } from "./pages/header";
import { Home } from "./pages/home";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
