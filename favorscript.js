document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoritesContainer");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function renderFavorites() {
    container.innerHTML = "";

    if (favorites.length === 0) {
      container.innerHTML = "<p class='text-center text-light fs-4'>No favorites yet 💔</p>";
      return;
    }

    favorites.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "favorite-card text-center";
      card.style.transition = "opacity 0.4s ease";

      card.innerHTML = `
        <div class="card bg-dark border-secondary" style="width: 200px; height: 340px; border-radius: 10px; overflow: hidden;">
          <div style="width: 100%; height: 250px; overflow: hidden;">
            <img src="${item.image}" alt="${item.title}" 
                 class="card-img-top" 
                 style="width: 100%; height: 100%; object-fit: cover; border-bottom: 1px solid #444;">
          </div>
          <div class="card-body d-flex flex-column justify-content-between p-2" style="height: 90px;">
            <h6 class="card-title mb-2" style="font-size: 14px;">${item.title}</h6>
            <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">
              <i class="fas fa-trash-alt me-1"></i> Remove
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const i = e.target.closest("button").dataset.index;
        const card = e.target.closest(".favorite-card");
        card.style.opacity = 0;
        setTimeout(() => {
          favorites.splice(i, 1);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          renderFavorites();
          showNotification("❌ Removed from Favorites!");
        }, 400);
      });
    });
  }

  function showNotification(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast-message";
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      background: "#222",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "10px",
      zIndex: 10000,
      opacity: 1,
      transition: "opacity 0.5s ease",
    });
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = 0;
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  }

  renderFavorites();
});
