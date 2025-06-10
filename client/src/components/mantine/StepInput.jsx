import { Textarea, Button } from "@mantine/core";
import { forwardRef } from "react";

const StepInput = forwardRef(
  ({ newStep, setNewStep, onAdd, onCancel, onBlur }, ref) => {
    return (
      <div>
        <Textarea
          placeholder="Penne Gorgonzola with Sea King Meat"
          value={newStep}
          onChange={(event) => {
            setNewStep(event.target.value);
          }}
          onBlur={onBlur}
          autosize
          minRows={2}
          maxRows={6}
          required
          ref={ref} // 👈 this connects the ref from parent
        />

        <div className="mt-3 flex gap-2 ">
          <Button onClick={onAdd}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
);

export default StepInput;
