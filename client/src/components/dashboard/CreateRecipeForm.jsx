import { useState, useEffect, useRef } from "react";
import {
  Paper,
  TextInput,
  Textarea,
  NumberInput,
  TagsInput,
  Button,
} from "@mantine/core";
import { IconCirclePlus, IconCircleMinus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Control from "../mantine/Control";
import DragList from "../mantine/DragList";
import Checkbox from "../mantine/Checkbox";
import Attachment from "../mantine/Attachment";
import IngredientInput from "../mantine/IngredientInput";
import StepInput from "../mantine/StepInput";

import { useRecipes } from "../../hooks/useRecipes";

const CreateRecipeForm = () => {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serving, setServing] = useState("");
  const servingRef = useRef(null);
  const [prepTime, setPrepTime] = useState("");
  const prepTimeRef = useRef(null);
  const [cookTime, setCookTime] = useState("");
  const cookTimeRef = useRef(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [tags, setTags] = useState([]);
  const [visibility, setVisibility] = useState("public");

  // For adding materials
  const [newMaterial, setNewMaterial] = useState("");
  const [newMaterialVisible, setNewMaterialVisible] = useState(false);
  const newMaterialRef = useRef(null);
  const [materials, setMaterials] = useState([]);

  // For adding ingredients
  const [newIngredient, setNewIngredient] = useState({
    quantity: "",
    unit: "",
    name: "",
  });
  const [newIngredientVisible, setNewIngredientVisible] = useState(false);
  const newIngredientRef = useRef(null);
  const [ingredients, setIngredients] = useState([]);

  // For adding step
  const [newStep, setNewStep] = useState("");
  const [newStepVisible, setNewStepVisible] = useState(false);
  const newStepRef = useRef(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (newMaterialVisible && newMaterialRef.current) {
      newMaterialRef.current.focus();
    }

    if (newIngredientVisible && newIngredientRef.current) {
      newIngredientRef.current.focus();
    }

    if (newStepVisible && newStepRef.current) {
      newStepRef.current.focus();
    }
  }, [newMaterialVisible, newIngredientVisible, newStepVisible]);

  const handleFocus = (ref) => (event) => {
    if (ref.current) {
      // Use setTimeout to delay the select call after internal focus logic
      setTimeout(() => {
        ref.current.select();
      }, 0);
    }
  };

  const createRecipe = async () => {
    if (
      !title ||
      !description ||
      !serving ||
      prepTime === null ||
      cookTime === null ||
      !difficulty ||
      materials.length === 0 ||
      ingredients.length === 0 ||
      steps.length === 0 ||
      !visibility
    ) {
      toast.error("Please enter all required fields");
      return;
    }

    const recipe = {
      title,
      description,
      serving,
      prepTime,
      cookTime,
      difficulty,
      materials,
      ingredients,
      steps,
      tags,
      visibility,
    };

    addRecipe.mutate(recipe);
  };

  console.log(newIngredient);

  return (
    <div className="h-auto w-full flex flex-col justify-center items-center">
      <div className="text-6xl font-bold">Okay let him cook</div>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        mb={30}
        radius="lg"
        style={
          {
            // maxHeight: "50vh", // limits modal content height
            // overflowY: "auto", // enables scrolling if it overflows
          }
        }
        className="w-full space-y-6"
      >
        <TextInput
          label="Title"
          placeholder="Penne Gorgonzola with Sea King Meat"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className=""
          required
        />

        <Textarea
          label="Description"
          placeholder="Oh boy I've searched the seven seas and all the planets in the galaxy and I've never encountered a finer plate of spaghetting than this one. The delectable meat balls and elastic noodles sure hit the spot!"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          className=""
          required
        />

        <NumberInput
          ref={servingRef}
          onFocus={handleFocus(servingRef)}
          label="Serving"
          placeholder="People"
          suffix=" people"
          value={serving}
          onChange={setServing}
          stepHoldDelay={500}
          stepHoldInterval={100}
          allowNegative={false}
          min={1}
          className="w-[10rem]"
          required
        />

        <div id="times" className="flex gap-10">
          <NumberInput
            ref={prepTimeRef}
            onFocus={handleFocus(prepTimeRef)}
            label="Prep Time"
            placeholder="Minutes"
            suffix=" minutes"
            value={prepTime}
            onChange={setPrepTime}
            stepHoldDelay={500}
            stepHoldInterval={100}
            allowNegative={false}
            min={0}
            className=""
            required
          />

          <NumberInput
            ref={cookTimeRef}
            onFocus={handleFocus(cookTimeRef)}
            label="Cook Time"
            placeholder="Minutes"
            suffix=" minutes"
            value={cookTime}
            onChange={setCookTime}
            stepHoldDelay={500}
            stepHoldInterval={100}
            allowNegative={false}
            min={0}
            className=""
            required
          />
        </div>

        <div id="difficulty">
          <label
            htmlFor="difficulty"
            className="block font-semibold text-sm pb-1"
          >
            Difficulty <span className="text-red-500">*</span>
          </label>
          <Control
            id="difficulty"
            value={difficulty}
            onChange={setDifficulty}
            required
          />
        </div>

        <div id="materials" className="flex flex-col space-y-2">
          <label
            htmlFor="newMaterials"
            className="block font-semibold text-sm pb-1"
          >
            Materials <span className="text-red-500">*</span>
          </label>
          <ul className="list-disc pl-5">
            {materials.map((material) => {
              return (
                <div className="flex gap-1 group" key={material}>
                  <li>{material}</li>
                  <IconCircleMinus
                    onClick={() => {
                      setMaterials((prev) =>
                        prev.filter((item) => item != material)
                      );
                    }}
                    className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transition-translate duration-300 hover:cursor-pointer"
                  />
                </div>
              );
            })}
          </ul>

          {newMaterialVisible && (
            <TextInput
              ref={newMaterialRef}
              placeholder="Penne Gorgonzola with Sea King Meat"
              value={newMaterial}
              onChange={(event) => {
                setNewMaterial(event.target.value);
              }}
              onBlur={() => {
                setNewMaterial("");
                setNewMaterialVisible(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && newMaterial.trim() !== "") {
                  if (!materials.includes(newMaterial)) {
                    setMaterials((prev) => [...prev, newMaterial]);
                    setNewMaterial("");
                  } else toast.error("Material already exists");
                }
                if (event.key === "Escape") {
                  setNewMaterial("");
                  setNewMaterialVisible(false);
                }
              }}
              className=""
              required
            />
          )}

          {!newMaterialVisible && (
            <Button
              className="self-start !rounded-2xl !pl-2 !pr-3"
              onClick={() => setNewMaterialVisible(true)}
            >
              <div className="flex items-center gap-2">
                <IconCirclePlus />
                <span className="text-sm">Add</span>
              </div>
            </Button>
          )}
        </div>

        <div id="ingredients" className="flex flex-col space-y-2">
          <label
            htmlFor="newIngredient"
            className="block font-semibold text-sm pb-1"
          >
            Ingredients <span className="text-red-500">*</span>
          </label>
          <ul className="list-disc pl-5">
            {ingredients.map((ingredient) => {
              return (
                <div className="flex gap-1 group" key={ingredient.name}>
                  <li>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </li>
                  <IconCircleMinus
                    onClick={() => {
                      setIngredients((prev) =>
                        prev.filter((item) => item.name != ingredient.name)
                      );
                    }}
                    className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transition-translate duration-300 hover:cursor-pointer"
                  />
                </div>
              );
            })}
          </ul>

          {newIngredientVisible && (
            <IngredientInput
              ref={newIngredientRef}
              ingredient={newIngredient}
              setIngredient={setNewIngredient}
              onAdd={() => {
                const { quantity, unit, name } = newIngredient;
                console.log(newIngredient);

                if (!quantity || !unit || !name)
                  return toast.error("Fill in all fields");

                if (
                  ingredients.some(
                    (ingredient) =>
                      ingredient.name.trim().toLowerCase() ===
                      newIngredient.name.trim().toLowerCase()
                  )
                )
                  return toast.error("Ingredient already exists");

                setIngredients((prev) => [...prev, newIngredient]);
                setNewIngredient({ quantity: "", unit: "", name: "" });
              }}
              onCancel={() => {
                setNewIngredientVisible(false);
                setNewIngredient({
                  quantity: "",
                  unit: "",
                  name: "",
                });
              }}
              handleFocus={handleFocus}
            />
          )}

          {!newIngredientVisible && (
            <Button
              className="self-start !rounded-2xl !pl-2 !pr-3"
              onClick={() => setNewIngredientVisible(true)}
            >
              <div className="flex items-center gap-2">
                <IconCirclePlus />
                <span className="text-sm">Add</span>
              </div>
            </Button>
          )}
        </div>

        <div id="steps" className="flex flex-col space-y-2 mb-10">
          <label htmlFor="newStep" className="block font-semibold text-sm pb-1">
            Steps <span className="text-red-500">*</span>
          </label>
          <DragList data={steps} updateData={setSteps} />

          {newStepVisible && (
            <StepInput
              ref={newStepRef}
              newStep={newStep}
              setNewStep={setNewStep}
              onAdd={() => {
                if (newStep.trim() !== "") {
                  if (!steps.some((step) => step.description === newStep)) {
                    setSteps((prev) => [
                      ...prev,
                      { step: prev.length + 1, description: newStep },
                    ]);
                    setNewStep("");
                  } else toast.error("Step already exists");
                }
              }}
              onCancel={() => {
                setNewStep("");
                setNewStepVisible(false);
              }}
              onBlur={() => {
                if (newStep.length === 0) setNewStepVisible(false);
              }}
            />
          )}

          {!newStepVisible && (
            <Button
              className="self-start !rounded-2xl !pl-2 !pr-3"
              onClick={() => setNewStepVisible(true)}
            >
              <div className="flex items-center gap-2">
                <IconCirclePlus />
                <span className="text-sm">Add</span>
              </div>
            </Button>
          )}
        </div>

        <Attachment />
        <TagsInput
          label="Tags"
          placeholder="Enter tag"
          data={[]}
          value={tags}
          onChange={setTags}
        />
        <Checkbox
          text="Share your recipe with the public?"
          value={visibility}
          onChange={setVisibility}
        />

        <div className="flex justify-center gap-10">
          <Button className="!w-[10rem]" onClick={createRecipe} mt="xl">
            Add
          </Button>

          <Button
            className="!w-[10rem]"
            onClick={() => {
              navigate("/recipes");
            }}
            mt="xl"
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default CreateRecipeForm;
