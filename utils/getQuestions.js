const getQuestions = async () => {
  try {
    const response = await fetch("/data/combined_season1-38.tsv");
    if (!response.ok) {
      throw new Error("Failed to fetch the data");
    }
    const tsvData = await response.text();
    console.log(parseTsvData(tsvData));
    return parseTsvData(tsvData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const parseTsvData = (tsvData) => {
  const rows = tsvData.trim().split("\n");
  const headers = rows.shift().split("\t");

  const questions = rows.map((row) => {
    const values = row.split("\t");
    const questionObject = {};
    headers.forEach((header, index) => {
      questionObject[header] = values[index];
    });
    return questionObject;
  });

  return questions;
};

export default getQuestions;
