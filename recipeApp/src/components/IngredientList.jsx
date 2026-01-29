import Ingredient from "./Ingredient";

export default function IngredientList({ food }) {
	return (
		<div>
			{food.extendedIngredients.map((ingredient) => (
				<Ingredient ingredient={ingredient} />
			))}
		</div>
	);
}
