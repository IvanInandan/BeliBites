const Recipes = () => {
  const recipes = [
    {
      name: "Ramen",
      description:
        "This will be the creamiest, best darn ramen you've ever had in your life. Trust me",
      prepTime: 5,
      cookTime: 30,
      ingredients: ["Noodles, Egg, Meat"],
      steps: [
        "First boil water",
        "Then insert noodles into boiling water",
        "Stir well for 10 minutes",
        "Crack egg",
        "Enjoy!",
      ],
    },

    {
      name: "Grilled Cheese Sandwich",
      description: "You like cheese? You'll love this thien.",
      ingredients: ["Sourdough Bread", "Cheese", "Sriracha"],
      steps: [
        "Throw butter on skillet",
        "Wait for butter to brown and place bread slices onto pan",
        "Insert cheese",
        "Melt and enjoy",
      ],
      cookTime: 10,
      prepTime: 20,
    },

    {
      name: "Eggs",
      description: "What else needs to be said, they're eggs",
      ingredients: ["Eggs"],
      steps: ["Throw an egg on the pan you doofus"],
      cookTime: 5,
      prepTime: 0,
    },
  ];

  return (
    <div>
      <p className="text-7xl">Here are your recipes chef!</p>

      {recipes.map((item, index) => {
        return (
          <div
            key={index}
            className="p-4 bg-blue-100 rounded mb-2"
            onClick={() => {
              console.log("Hello");
            }}
          >
            <h1>Name: {item.name}</h1>
            <p>Description: {item.description}</p>
            <p>Prep time: {item.prepTime} minutes</p>
            <p>Cook time: {item.cookTime} minutes</p>
            <p>Ingredients: {item.ingredients}</p>
            <p>Steps: {item.steps}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Recipes;
