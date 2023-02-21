export default function SingleDrink({
    id,
    name,
    picture,
    likes,
    dislikes,
    drinkUpdatingFunction,
}) {
    const modify = (obj) => {
        fetch(`http://localhost:9000/api/drinks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify(obj),
        })
            .then((response) => response.json())
            .then((serverResponse) => drinkUpdatingFunction(serverResponse))
            .catch((error) => console.error(error));
    };

    const likeDrink = (e) =>
        modify({
            id,
            name,
            picture,
            likes: likes + 1,
            // dislikes: Math.max(0, dislikes - 1),
            dislikes,
        });

    const dislikeDrink = (e) =>
        modify({
            id,
            name,
            picture,
            // likes: Math.max(0, likes - 1),
            likes,
            dislikes: dislikes + 1,
        });

    return (
        <div className="drink">
            <img src={picture} alt={name} />
            <button onClick={likeDrink}>{likes} likes</button>
            <span>{name}</span>
            <button onClick={dislikeDrink}>{dislikes} dislikes</button>
        </div>
    );
}
