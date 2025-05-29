import React from "react";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";

export default function Animals({ animals, title, onDelete, onAdoptToggle }) {
  if (animals.length === 0) return <h2>All Pets have found a home!</h2>;
  // TODO Add button to edit image

  return (
    <div>
      <h2>{title}</h2>
      <ListGroup>
        {animals.map((animal) => (
          <ListGroup.Item key={animal.id}>
            <Image
              src={animal.imageUrl}
              alt={animal.name}
              rounded
              fluid
              width={100}
            />
            <div>
              <strong>{animal.name}</strong> - {animal.species}, age{" "}
              {animal.age}
            </div>
            <div>
              {animal.kidFriendly && "Kid Friendly"}
              {!animal.kidFriendly && "Not Kid Friendly"}
            </div>
            <div>
              {animal.vaccinated && "Vaccinated"}
              {!animal.vaccinated && "Not Vaccinated"}
            </div>
            <Button
              size="sm"
              onClick={() => onAdoptToggle(animal)}
            >
              {animal.adopted && "Make Available"}
              {!animal.adopted && "Adopt"}
            </Button>
            <Button
              onClick={() => onDelete(animal.id)}
              variant="danger"
              size="sm"
            >
              🗑️
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
