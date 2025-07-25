document.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.github.com/users/WahyuSatrio505")
    .then(res => res.json())
    .then(data => {
      document.getElementById("avatar").src = data.avatar_url;
      document.getElementById("name").textContent = data.name || data.login;
      document.getElementById("bio").textContent = data.bio || "Tidak ada bio 😅";
      document.getElementById("repos").textContent = data.public_repos;
      document.getElementById("followers").textContent = data.followers;
      document.getElementById("following").textContent = data.following;
      document.getElementById("profileLink").href = data.html_url;

      gsap.from(".github-card", {opacity: 0, y: 50, duration: 1.5, ease: "power2.out"});
    })
    .catch(error => console.error("Gagal mengambil data GitHub:", error));
});
