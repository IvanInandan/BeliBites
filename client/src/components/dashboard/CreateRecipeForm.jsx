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

const CreateRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [serving, setServing] = useState(0);
  const [difficulty, setDifficulty] = useState("Easy");
  const [tags, setTags] = useState([]);
  const [visibility, setVisibility] = useState("");

  // For adding materials
  // For adding ingredients
  const [newMaterial, setNewMaterial] = useState("");
  const [newMaterialVisible, setNewMaterialVisible] = useState(false);
  const newMaterialRef = useRef(null);
  const [materials, setMaterials] = useState([]);

  // For adding ingredients
  const [newIngredient, setNewIngredient] = useState("");
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

  const addRecipe = () => {
    console.log("Title: ", title);
    console.log("Description: ", description);
    console.log("Servings: ", serving);
    console.log("Prep Time: ", prepTime);
    console.log("Cook Time: ", cookTime);
    console.log("Difficulty: ", difficulty);
    console.log("Materials: ", materials);
    console.log("Ingredients: ", ingredients);
    console.log("Steps: ", steps);
    console.log("Tags: ", tags);
    console.log("Visibility: ", visibility);
  };

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
          label="Serving"
          placeholder="People"
          suffix=" people"
          value={serving}
          onChange={setServing}
          stepHoldDelay={500}
          stepHoldInterval={100}
          allowNegative={false}
          className="w-[10rem]"
          required
        />

        <div id="times" className="flex gap-10">
          <NumberInput
            label="Prep Time"
            placeholder="Minutes"
            suffix=" minutes"
            value={prepTime}
            onChange={setPrepTime}
            stepHoldDelay={500}
            stepHoldInterval={100}
            allowNegative={false}
            className=""
            required
          />

          <NumberInput
            label="Cook Time"
            placeholder="Minutes"
            suffix=" minutes"
            value={cookTime}
            onChange={setCookTime}
            stepHoldDelay={500}
            stepHoldInterval={100}
            allowNegative={false}
            className=""
            required
          />
        </div>

        <div id="difficulty">
          <label
            htmlFor="difficulty"
            className="block font-semibold text-sm pb-1"
          >
            Difficulty
          </label>
          <Control
            id="difficulty"
            value={difficulty}
            onChange={setDifficulty}
          />
        </div>

        <div id="materials" className="flex flex-col space-y-0">
          <label
            htmlFor="newMaterials"
            className="block font-semibold text-sm pb-1"
          >
            Materials
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

        <div id="ingredients" className="flex flex-col space-y-0">
          <label
            htmlFor="newIngredient"
            className="block font-semibold text-sm pb-1"
          >
            Ingredients
          </label>
          <ul className="list-disc pl-5">
            {ingredients.map((ingredient) => {
              return (
                <div className="flex gap-1 group" key={ingredient}>
                  <li>{ingredient}</li>
                  <IconCircleMinus
                    onClick={() => {
                      setIngredients((prev) =>
                        prev.filter((item) => item != ingredient)
                      );
                    }}
                    className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transition-translate duration-300 hover:cursor-pointer"
                  />
                </div>
              );
            })}
          </ul>

          {newIngredientVisible && (
            <TextInput
              ref={newIngredientRef}
              placeholder="Penne Gorgonzola with Sea King Meat"
              value={newIngredient}
              onChange={(event) => {
                setNewIngredient(event.target.value);
              }}
              onBlur={() => {
                setNewIngredient("");
                setNewIngredientVisible(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && newIngredient.trim() !== "") {
                  if (!ingredients.includes(newIngredient)) {
                    setIngredients((prev) => [...prev, newIngredient]);
                    setNewIngredient("");
                  } else toast.error("Ingredient already exists");
                }
                if (event.key === "Escape") {
                  setNewIngredient("");
                  setNewIngredientVisible(false);
                }
              }}
              className=""
              required
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

        <div id="steps" className="flex flex-col space-y-0 mb-10">
          <label htmlFor="newStep" className="block font-semibold text-sm pb-1">
            Steps
          </label>
          <DragList data={steps} updateData={setSteps} />
          {newStepVisible && (
            <TextInput
              ref={newStepRef}
              placeholder="Penne Gorgonzola with Sea King Meat"
              value={newStep}
              onChange={(event) => {
                setNewStep(event.target.value);
              }}
              onBlur={() => {
                setNewStep("");
                setNewStepVisible(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && newStep.trim() !== "") {
                  if (!steps.some((step) => step.description === newStep)) {
                    setSteps((prev) => [
                      ...prev,
                      { step: prev.length + 1, description: newStep },
                    ]);
                    setNewStep("");
                  } else toast.error("Step already exists");
                }

                if (event.key === "Escape") {
                  setNewStep("");
                  setNewStepVisible(false);
                }
              }}
              className=""
              required
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
          <Button className="!w-[10rem]" onClick={addRecipe} mt="xl">
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
