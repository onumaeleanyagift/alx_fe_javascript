const quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only way to do great work is to love what you do.",
    category: "Motivation",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Perseverance",
  },
  { text: "Believe you can and you're halfway there.", category: "Confidence" },
  {
    text: "Act as if what you do makes a difference. It does.",
    category: "Inspiration",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

// Function to display random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p><strong>${randomQuote.category}:</strong> "${randomQuote.text}"</p>`;
}

// Function to populate category in dropdown
function populateCategories() {
  const categories = [...new setInterval(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>' +
  categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');

  // Restore last selected category
  const lastSelectedCategory = localStorage.getItem("selectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

// Function to filter quote based on selected category
function filterQuotes() {
  localStorage.setItem("selectedCategory", categoryFilter.value);
  showRandomQuote();
}

// Function to create and display a form for adding new quotes
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "quoteForm";

  /*    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.placeholder = "Enter a new quote";
    inputText.id = "newQuoteText";

    const inputCategory = document.createElement("input");
    inputCategory.type = "text";
    inputCategory.placeholder = "Enter quotes category";
    inputCategory.id = "newQuoteCategory";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Add Quote";
    submitButton.addEventListener("click", addNewQuote); */

  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(submitButton);
  document.body.appendChild(formContainer);
}

// Functions to add a new quote to the array
function addNewQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    alert("Quote added successfully!");
    showRandomQuote();
  } else {
    alert("Please enter both a quote and a category");
  }
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load last quote from session storage if available
window.onload = function () {
  const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
  if (lastQuote) {
    quoteDisplay.innerHTML = `<p><strong>${lastQuote.category}:</strong> "${lastQuote.text}"</p>`;
  } else {
    showRandomQuote();
  }
  createAddQuoteForm();

  // Add import/export buttons
  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Quotes";
  document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);
  document.body.appendChild(exportButton);

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.id = "importFile";
  importInput.accept = ".json";
  document.getElementById("importFile").addEventListener("change", importFromJsonFile);
  document.body.appendChild(importInput);
};


newQuoteButton.addEventListener("click", showRandomQuote);
