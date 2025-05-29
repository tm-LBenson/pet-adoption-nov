import { useEffect, useState } from "react";
import "./App.css";
import AnimalModal from "./components/AnimalModal";
import Button from "react-bootstrap/Button";
import {
  createAnimal,
  deleteAnimal,
  scanAnimals,
  toggleAdopted,
} from "./dynamo";
import Animals from "./components/Animals";

function App() {
  const [form, setForm] = useState({
    name: "",
    species: "",
    age: "",
    kidFriendly: false,
    vaccinated: false,
    imageUrl: "",
  });
  const [animals, setAnimals] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    scanAnimals().then(setAnimals);
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }


  async function handleToggle(animal) {
    await toggleAdopted(animal.id, !animal.adopted);
    setAnimals((prev) =>
      prev.map((a) => (a.id === animal.id ? { ...a, adopted: !a.adopted } : a)),
    );
  }

  async function handleDelete(id) {
    await deleteAnimal(id);
    setAnimals((prev) => prev.filter((animal) => animal.id !== id));
  }

  async function handleAdd() {
    if (!form.name || !form.species || !form.age) return;
    const item = {
      id: crypto.randomUUID(),
      name: form.name,
      species: form.species,
      kidFriendly: form.kidFriendly,
      vaccinated: form.vaccinated,
      age: form.age,
      adopted: false,
      imageUrl: form.imageUrl || "https://placebear.com/300/400",
    };

    await createAnimal(item);
    setAnimals((prev) => [...prev, item]);
    setShow(false);
  }

  // TODO add filter for if available

  return (
    <>
      <h1>Fur-Ever Friends Rescue</h1>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
      >
        Add Animal
      </Button>

      <AnimalModal
        show={show}
        onHide={() => setShow(false)}
        form={form}
        onChange={handleChange}
        onSave={handleAdd}
      />

      <Animals
        onAdoptToggle={handleToggle}
        animals={animals}
        title="Ready For Adoption!"
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
