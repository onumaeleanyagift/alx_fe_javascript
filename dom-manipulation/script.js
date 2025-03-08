const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation"},
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
    { text: "Believe you can and you're halfway there.", category: "Confidence" },
    { text: "Act as if what you do makes a difference. It does.", category: "Inspiration" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p><strong>${randomQuote.category}:</strong> "${randomQuote.text}"</p>`;
}

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


newQuoteButton.addEventListener("click", showRandomQuote);
window.onload = function () {
    showRandomQuote();
    createAddQuoteForm();
};