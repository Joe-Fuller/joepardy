const getQuestions = async () => {
  const jeopardyDataFile = "/data/jeopardy_data.json";

  const response = await fetch(jeopardyDataFile);
  const jsonData = await response.json();
  const categories = Object.keys(jsonData);

  const selectedCategories = [];
  const selectedQuestions = [];
  while (selectedQuestions.length < 5) {
    const category = selectRandom(categories);

    if (!selectedCategories.includes(category)) {
      selectedCategories.push(category);
      const sets = jsonData[category];

      const selectedSet = selectRandom(sets);
      selectedQuestions.push(selectedSet);
    }
  }

  console.log(selectedQuestions);
  return selectedQuestions;
};

const selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export default getQuestions;
