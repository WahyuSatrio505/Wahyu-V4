document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatBox = document.getElementById("chatbot-box");
  const closeBtn = document.getElementById("chatbot-close");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");

  toggleBtn.addEventListener("click", () => {
    chatBox.classList.toggle("active");
  });

  closeBtn.addEventListener("click", () => {
    chatBox.classList.remove("active");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    // Tampilkan pesan user
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = question;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;
    input.value = "";

    // Kirim ke API
    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();

      // Tampilkan jawaban bot
      const botMsg = document.createElement("div");
      botMsg.classList.add("message", "bot");
      botMsg.textContent = data.answer;
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
