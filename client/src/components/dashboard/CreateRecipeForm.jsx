import { useState, useEffect, useRef } from "react";
import {
  Paper,
  TextInput,
  Textarea,
  NumberInput,
  TagsInput,
  Button,
} from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../../helpers/recipeFuncs";

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

  // For adding ingredients
  const newIngredientRef = useRef(null);
  const [newIngredient, setNewIngredient] = useState("");
  const [newIngredientVisible, setNewIngredientVisible] = useState(false);

  // For adding step
  const newStepRef = useRef(null);
  const [newStep, setNewStep] = useState("");
  const [newStepVisible, setNewStepVisible] = useState(false);

  useEffect(() => {
    if (newIngredientVisible && newIngredientRef.current) {
      newIngredientRef.current.focus();
    }

    if (newStepVisible && newStepRef.current) {
      newStepRef.current.focus();
    }
  }, [newIngredientVisible, newStepVisible]);

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
          <Control id="difficulty" />
        </div>

        <div id="ingredients" className="flex flex-col space-y-3">
          <label
            htmlFor="newIngredient"
            className="block font-semibold text-sm pb-1"
          >
            Ingredients
          </label>
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
                if (event.key === "Enter") {
                  console.log(newStep);
                  setNewIngredient("");
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

        <div id="steps" className="flex flex-col space-y-3 mb-10">
          <label htmlFor="newStep" className="block font-semibold text-sm pb-1">
            Steps
          </label>
          <DragList />
          {newStepVisible && (
            <Textarea
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
                if (event.key === "Enter") {
                  console.log(newStep);
                  setNewStep("");
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
        <TagsInput label="Tags" placeholder="Enter tag" />
        <Checkbox text="Share your recipe with the public?" />

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
