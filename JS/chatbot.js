document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatBox = document.getElementById("chatbot-box");
  const closeBtn = document.getElementById("chatbot-close");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");

  let websiteData; // Simpan data JSON di sini

  // Load data dari website_data.json saat halaman dimuat
  fetch("https://wahyusatrio505.github.io/Wahyu-V4/website_data.json") // Ganti URL asli setelah deploy
    .then((response) => response.json())
    .then((data) => {
      websiteData = data;
      console.log("Data JSON dimuat:", websiteData); // Cek di console
    })
    .catch((error) => console.error("Error memuat data JSON:", error));

  toggleBtn.addEventListener("click", () => {
    chatBox.classList.toggle("active");
  });

  closeBtn.addEventListener("click", () => {
    chatBox.classList.remove("active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question || !websiteData) return;

    // Tampilkan pesan user
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = question;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;
    input.value = "";

    // Logika jawaban berdasarkan konten JSON
    let answer = "Maaf, aku Aal gak nemu info itu. Coba tanya lagi!";
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("home") || lowerQuestion.includes("siapa wahyu")) {
      answer = websiteData.home.content;
    } else if (lowerQuestion.includes("about") || lowerQuestion.includes("tentang")) {
      answer = websiteData.about.content;
    } else if (lowerQuestion.includes("skill")) {
      answer = websiteData.skills.content;
    } else if (lowerQuestion.includes("project")) {
      answer = websiteData.projects.content;
    } else if (lowerQuestion.includes("certificate")) {
      answer = websiteData.certificates.content;
    } else if (lowerQuestion.includes("blog")) {
      answer = websiteData.blogs.content;
    } else if (lowerQuestion.includes("learning")) {
      answer = websiteData.learning.content;
    } else if (lowerQuestion.includes("contact")) {
      answer = websiteData.contact.content;
    }

    // Tampilkan jawaban bot
    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot");
    botMsg.textContent = answer;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  });
});
