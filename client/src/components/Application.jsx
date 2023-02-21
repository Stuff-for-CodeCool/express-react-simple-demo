import { useState, useEffect } from "react";
import SingleDrink from "./SingleDrink";

export default function Application() {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9000/api/drinks")
            .then((response) => response.json())
            .then((data) => setDrinks(data))
            .catch((error) => console.error(error));
    }, []);

    const drinkUpdatingFunction = (serverResponse) => {
        setDrinks(
            drinks.map((drink) =>
                drink.id === serverResponse.id ? serverResponse : drink
            )
        );
    };

    return drinks?.length === 0
        ? "Please wait, loading..."
        : drinks?.map((drink) => (
              <SingleDrink
                  key={drink.id}
                  id={drink.id}
                  name={drink.name}
                  picture={drink.picture}
                  likes={drink.likes}
                  dislikes={drink.dislikes}
                  drinkUpdatingFunction={drinkUpdatingFunction}
              />
          ));
}
