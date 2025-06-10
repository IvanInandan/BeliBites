import { NumberInput, Select } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import CreatableInput from "./CreatableInput";
import { unitOptions, ingredientOptions } from "../../helpers/inputValues";
import SelectCreatable from "./SelectCreatable";
import { Button } from "@mantine/core";
import { forwardRef } from "react";

const IngredientInput = forwardRef(
  ({ ingredient, setIngredient, handleFocus, onAdd, onCancel }, ref) => {
    const quantityRef = useRef(null);
    const unitRef = useRef(null);

    console.log(ingredient);

    return (
      <div className="flex items-center gap-2">
        <NumberInput
          ref={ref}
          onFocus={handleFocus(quantityRef)}
          label="Quantity"
          placeholder="1"
          value={ingredient.quantity}
          onChange={(value) =>
            setIngredient((prev) => ({
              ...prev,
              quantity: value,
            }))
          }
          stepHoldDelay={500}
          stepHoldInterval={100}
          allowNegative={false}
          min={1}
          className="w-[5rem]"
          onClick={() => console.log(ingredient)}
          required
        />

        <SelectCreatable
          label="Unit"
          placeholder="cups"
          listOptions={unitOptions}
          value={ingredient.unit}
          onChange={(value) =>
            setIngredient((prev) => ({
              ...prev,
              unit: value,
            }))
          }
        />

        <SelectCreatable
          label="Ingredient"
          placeholder="milk"
          listOptions={ingredientOptions}
          value={ingredient.name}
          onChange={(value) =>
            setIngredient((prev) => ({
              ...prev,
              name: value,
            }))
          }
        />

        <div className="mt-5.5 ml-5 flex gap-2">
          <Button onClick={onAdd}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
);

export default IngredientInput;
