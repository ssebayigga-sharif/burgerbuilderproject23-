import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients || {})
    .map((ingredientkey) => {
      return [...Array(props.ingredients[ingredientkey])].map((_, i) => {
        return (
          <BurgerIngredient key={ingredientkey + i} type={ingredientkey} />
        );
      });
    })
    .reduce((arr, newarr) => {
      return arr.concat(newarr);
    }, []);
  console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>please start adding ingredients!!!</p>; //shows the user to add ingredients
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default Burger;
