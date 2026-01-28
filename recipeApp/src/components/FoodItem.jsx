import styles from "./fooditem.module.css";

export default function FoodItem({ food, setFoodId }) {
	return (
		<div className={styles.itemContainer}>
			<img
				src={food.image}
				alt="Food Image"
				className={styles.itemImage}
			/>
			<div className={styles.itemContent}>
				<p className={styles.itemName}>{food.title}</p>
			</div>
			<div className={styles.buttonContainer}>
				<button
					onClick={() => {
						setFoodId(food.id);
					}}
					className={styles.itemButton}
				>
					View Recipe
				</button>
			</div>
		</div>
	);
}
