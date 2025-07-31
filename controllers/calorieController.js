const axios = require('axios');

const getCalories = async (req, res) => {
    const { dish_name, servings } = req.body;

    if (!dish_name || servings <= 0)
        return res.status(400).json({ error: 'Invalid servings' });

    try {
        const response = await axios.get(
            `https://api.nal.usda.gov/fdc/v1/foods/search`,
            {
                params: {
                    query: dish_name,
                    api_key: process.env.USDA_API_KEY,
                    pageSize: 1,
                },
            }
        );

        const food = response.data.foods[0];
        if (!food) return res.status(404).json({ error: 'Dish not found' });

        const nutrients = food.foodNutrients;

        const getValue = (name) => {
            const match = nutrients.find(n => 
                n.nutrientName.toLowerCase().includes(name)
            );
            return match?.value || 0;
        };

        const calories = getValue('energy');
        const protein = getValue('protein');
        const fat = getValue('fat');
        const carbs = getValue('carbohydrate');

        res.json({
            dish_name,
            servings,
            calories_per_serving: calories,
            total_calories: calories * servings,
            protein_per_serving: protein,
            fat_per_serving: fat,
            carbs_per_serving: carbs,
            source: 'USDA FoodData Central',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching data from USDA API' });
    }
};


module.exports = {
    getCalories,
};

// const axios = require('axios');

// const knownCalories = {
//   'chicken biryani': 280,
//   'paneer butter masala': 300,
//   'macaroni and cheese': 320
// };

// const getCalories = async (req, res) => {
//   const { dish_name, servings } = req.body;
//   if (!dish_name || servings <= 0)
//     return res.status(400).json({ error: 'Invalid input' });

//   const lowerDish = dish_name.toLowerCase();

//   // Fallback for known dishes
//   if (knownCalories[lowerDish]) {
//     const cal = knownCalories[lowerDish];
//     return res.json({
//       dish_name,
//       servings,
//       calories_per_serving: cal,
//       total_calories: cal * servings,
//       protein: null,
//       fat: null,
//       carbs: null,
//       source: 'Local Database',
//     });
//   }

//   try {
//     const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
//       params: {
//         query: dish_name,
//         api_key: process.env.USDA_API_KEY,
//         pageSize: 5
//       }
//     });

//     const foods = response.data.foods;
//     if (!foods || foods.length === 0)
//       return res.status(404).json({ error: 'Dish not found' });

//     // Find best match based on most complete nutrient info
//     let bestMatch = null;

//     for (const food of foods) {
//       const nutrients = food.foodNutrients || [];
//       const hasEnergy = nutrients.find(n => n.nutrientName === 'Energy');
//       const hasProtein = nutrients.find(n => n.nutrientName.toLowerCase().includes('protein'));
//       const hasFat = nutrients.find(n => n.nutrientName.toLowerCase().includes('fat'));
//       const hasCarbs = nutrients.find(n => n.nutrientName.toLowerCase().includes('carbohydrate'));

//       if (hasEnergy && hasProtein && hasFat && hasCarbs) {
//         bestMatch = {
//           name: food.description,
//           energy: hasEnergy.value,
//           protein: hasProtein.value,
//           fat: hasFat.value,
//           carbs: hasCarbs.value
//         };
//         break; // Prefer the most complete result
//       }
//     }

//     if (!bestMatch)
//       return res.status(404).json({ error: 'No complete nutrient data found' });

//     const { energy, protein, fat, carbs } = bestMatch;

//     res.json({
//       dish_name,
//       servings,
//       calories_per_serving: energy,
//       total_calories: energy * servings,
//       protein,
//       fat,
//       carbs,
//       source: 'USDA FoodData Central'
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error fetching data from USDA API' });
//   }
// };

// module.exports = { getCalories };
