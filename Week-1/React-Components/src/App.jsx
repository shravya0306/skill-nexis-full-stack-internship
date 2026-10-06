import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import Formm from "../components/formm";
import "./App.css";

function App() {
  const handleClick = () => {
    alert("Button was clicked!");
  };

  return (
    <div>
      <Header title="My React App" />

      <Card
        title="React"
        description="A JavaScript library for building user interfaces."
      />

      <Card
        title="JavaScript"
        description="A programming language used to build interactive websites."
      />

      <Button text="Click Me" onClick={handleClick} />

      <Formm />

      <Footer year="2026" />
    </div>
  );
}

export default App;