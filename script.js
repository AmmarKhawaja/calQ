const API_BASE_URL = "https://ammarkhawaja.pythonanywhere.com";

const sendBtn = document.getElementById("sendBtn");
const loader = document.getElementById("loader");
const foodInput = document.getElementById("foodInput");

const caloriesEl = document.getElementById("calories");
const proteinEl = document.getElementById("protein");
const carbsEl = document.getElementById("carbs");
const fatEl = document.getElementById("fat");

sendBtn.addEventListener("click", async () => {
  const food = foodInput.value.trim();
  if (!food) return;

  loader.classList.remove("hidden");

  try {
    const response = await fetch(`${API_BASE_URL}/calQ/nutrition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ food })
    });

    if (response.status === 429) {
      alert("You've made too many requests. Try again tomorrow.");
      return;
    }

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    caloriesEl.textContent = `${data.calories}cal`;
    proteinEl.textContent = `${data.protein}g`;
    carbsEl.textContent = `${data.carbs}g`;
    fatEl.textContent = `${data.fat}g`;
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again.");
  } finally {
    loader.classList.add("hidden");
  }
});

