import { useState, useRef, useEffect } from "react";
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import {getRecipeFromCodestral} from "../assets/ai"

export default function Main(){
    const [ingredients, setIngredients] = useState([]);
    // "all the main spices", "pasta", "ground beef", "tomato paste"
    const ingredientsListItems = ingredients.map(el => <li key={el}  >{el}</li> )
    const [recipe, setRecipe] = useState("");
    const recipeSection = useRef(null);

    console.log(recipeSection);
    useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({behavior: "smooth"} );
        }
    } ,[recipe]);

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromCodestral(ingredients);
        setRecipe(recipeMarkdown);
    }

    return (
        <>
            <main>
                <form action={addIngredient}  className="add-ingredient-form">
                    <input type="text" name="ingredient" id="ingredient"
                    aria-label="Add ingrdient" placeholder="e.g. oregano" />
                    <button >Add Ingredients</button>
                </form>
                <blockquote>PS: Add at least 4 ingredients</blockquote>
                { ingredients.length ? <IngredientsList reference={recipeSection} list={ingredientsListItems} search={getRecipe} /> : null}
                { recipe && <ClaudeRecipe recipe={recipe}  />} 
            </main>
        </>
    );
}

// 