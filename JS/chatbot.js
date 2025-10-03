document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatBox = document.getElementById("chatbot-box");
  const closeBtn = document.getElementById("chatbot-close");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");

  let websiteData;

  fetch("https://raw.githubusercontent.com/WahyuSatrio505/Wahyu-V4/main/website_data.json")
    .then((response) => response.json())
    .then((data) => {
      websiteData = data;
      console.log("Data JSON dimuat:", websiteData);
    })
    .catch((error) => console.error("Error memuat data JSON:", error));

  toggleBtn.addEventListener("click", () => {
    if (chatBox.classList.contains("active")) {
      chatBox.classList.remove("active");
    } else {
      setTimeout(() => {
        chatBox.classList.add("active");
        const welcomeMsg = document.createElement("div");
        welcomeMsg.classList.add("message", "bot");
        welcomeMsg.textContent = "Haii Aku Aal, chat-bot buatan Wahyu. Tanya aku apa saja  yang ada di website ini,seperti tentang,project,dan sertifikasi 😎🚀";
        messages.appendChild(welcomeMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 500); // Delay 0.5 detik sebelum muncul
    }
  });

  closeBtn.addEventListener("click", () => {
    chatBox.classList.remove("active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = question;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;
    input.value = "";

    let answer = "Maaf, aku Aal lagi loading data. Coba lagi nanti!";
    if (websiteData) {
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
    }

    setTimeout(() => {
      const botMsg = document.createElement("div");
      botMsg.classList.add("message", "bot");
      botMsg.textContent = answer;
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 2000);
  });
});
