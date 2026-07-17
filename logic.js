// These three lists stay in the same order.
// Index 0 in each list describes the same item.

let practiceNames = [
  "Beethoven Symphony No. 5 - Scherzo",
  "Duport Etude No. 7",
  "Haydn C Major Concerto - First Movement",
  "Bach Cello Suite No. 1 - Prelude",
  "Schubert Piano Trio No. 1 - Opening"
];

let categories = [
  "orchestral",
  "solo",
  "solo",
  "solo",
  "chamber"
];

let labels = [
  "Beethoven movement",
  "Etude",
  "Concerto",
  "Suite",
  "Piano trio"
];


function getCategoryName(category) {
  if (category === "orchestral") {
    return "Orchestral excerpts";
  }

  if (category === "solo") {
    return "Solo work";
  }

  return "Chamber work";
}


function showLibrary() {
  let libraryList = document.getElementById("libraryList");

  libraryList.innerHTML = "";

  for (let index = 0; index < practiceNames.length; index++) {
    let newListItem = document.createElement("li");

    newListItem.textContent =
      practiceNames[index] + " — " +
      getCategoryName(categories[index]) + " — " +
      labels[index];

    libraryList.appendChild(newListItem);
  }
}


function addPracticeItem() {
  let nameInput = document.getElementById("itemName");
  let categoryInput = document.getElementById("itemCategory");
  let labelInput = document.getElementById("itemLabel");

  let name = nameInput.value.trim();
  let category = categoryInput.value;
  let label = labelInput.value.trim();

  if (name === "") {
    alert("Please type a practice item first.");
    return;
  }

  if (label === "") {
    label = "Unsorted";
  }

  practiceNames.push(name);
  categories.push(category);
  labels.push(label);

  nameInput.value = "";
  labelInput.value = "";
  nameInput.focus();

  showLibrary();
}


function getMatchingIndexes() {
  let matchingIndexes = [];

  let selectedCategory =
    document.getElementById("mainFilter").value;

  let typedLabel =
    document.getElementById("labelFilter").value.trim().toLowerCase();

  for (let index = 0; index < practiceNames.length; index++) {
    let correctCategory =
      selectedCategory === "all" ||
      categories[index] === selectedCategory;

    let correctLabel =
      typedLabel === "" ||
      labels[index].toLowerCase() === typedLabel;

    if (correctCategory && correctLabel) {
      matchingIndexes.push(index);
    }
  }

  return matchingIndexes;
}


function getNumberOfRows() {
  let rows =
    Number(document.getElementById("numberOfRows").value);

  if (isNaN(rows) || rows < 1 || rows > 20) {
    return 5;
  }

  return rows;
}


function addTableCell(row, text) {
  let cell = row.insertCell();
  cell.textContent = text;
}


function generatePracticeChart() {
  let table = document.getElementById("practiceTable");
  let matchingIndexes = getMatchingIndexes();
  let rows = getNumberOfRows();

  table.innerHTML = "";

  if (matchingIndexes.length === 0) {
    let messageRow = table.insertRow();
    let messageCell = messageRow.insertCell();

    messageCell.colSpan = 4;
    messageCell.textContent = "No items match those filters.";

    return;
  }

  // This list prevents repeats until every matching item was used.
  let availableIndexes = matchingIndexes.slice();

  for (let round = 1; round <= rows; round++) {
    if (availableIndexes.length === 0) {
      availableIndexes = matchingIndexes.slice();
    }

    let randomPosition =
      Math.floor(Math.random() * availableIndexes.length);

    let selectedIndex = availableIndexes[randomPosition];

    availableIndexes.splice(randomPosition, 1);

    let newRow = table.insertRow();

    addTableCell(newRow, round);

    addTableCell(
      newRow,
      getCategoryName(categories[selectedIndex]) +
        " — " +
        labels[selectedIndex]
    );

    addTableCell(newRow, practiceNames[selectedIndex]);
    addTableCell(newRow, "");
  }
}


document.getElementById("addButton")
  .addEventListener("click", addPracticeItem);

document.getElementById("generateButton")
  .addEventListener("click", generatePracticeChart);

showLibrary();
