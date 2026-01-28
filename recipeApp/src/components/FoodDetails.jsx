import { useEffect, useState } from "react";

export default function FoodDetail({ foodId }) {
	const [food, setFood] = useState("");
	const API_KEY = "f8436aa145fa4315bcfb9dd096ef3f93";
	useEffect(() => {
		async function fetchFood() {
			console.log(foodId);
			const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
			const res = await fetch(`${URL}?apiKey=${API_KEY}`);
			const data = await res.json();
			setFood(data);
		}
		fetchFood();
	}, [foodId]);
	return (
		<div>
			Food Details {foodId}
			{food.title}
			<img src={food.image} alt="" />
		</div>
	);
}
