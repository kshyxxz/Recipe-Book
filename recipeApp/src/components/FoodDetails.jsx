import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import IngredientList from "./IngredientList";

export default function FoodDetails({ foodId }) {
	const API_KEY = import.meta.env.VITE_API_KEY;
	const [food, setFood] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		async function fetchFood() {
			if (!foodId) return;
			if (!API_KEY) {
				console.warn(
					"VITE_API_KEY is not set. API requests will fail.",
				);
				return;
			}
			const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
			try {
				const res = await fetch(`${URL}?apiKey=${API_KEY}`);
				const data = await res.json();
				setFood(data);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
			}
		}
		fetchFood();
	}, [foodId]);
	if (!food) return <div>Loading recipe {foodId}…</div>;
	return (
		<div>
			<div className={styles.recipeCard}>
				<h1 className={styles.recipeName}>{food.title}</h1>
				<img
					src={food?.image}
					alt={food?.title || ""}
					className={styles.recipeImage}
				/>
				<div className={styles.recipeDetails}>
					<span>
						<strong>⏱️{food.readyInMinutes} Minutes</strong>
					</span>
					<span>
						🧑🏼‍🧑‍🧒<strong> Serves {food.servings}</strong>
					</span>
					<span>
						<strong>
							{food.vegetarian ? "Vegeterian" : "Non-Vegeterian"}
						</strong>
					</span>
					<strong>
						<span>{food.vegan ? "Vegan" : ""}</span>
					</strong>
				</div>
				<div>
					💲<span>{food.pricePerServing / 100} Per serving</span>
				</div>
				<h2>Ingredients</h2>
				{isLoading ? <p>Loading...</p> : <IngredientList food={food} />}
				<h2>Instructions</h2>
				<div className={styles.recipeInstructions}>
					<ol>
						{isLoading ? (
							<p>Loading...</p>
						) : (
							food.analyzedInstructions[0].steps.map((step) => (
								<li key={step.step}>{step.step}</li>
							))
						)}
					</ol>
				</div>
			</div>
		</div>
	);
}
