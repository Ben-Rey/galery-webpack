let offlineDiv = document.getElementById("offline");

if (!navigator.onLine) {
    offlineDiv.style.height = '2rem';
    offlineDiv.innerHTML = "You are offline"
  }
  window.addEventListener("online", () => {
    offlineDiv.style.height = '0rem';
    offlineDiv.innerHTML = ""
  });
  window.addEventListener("offline", () => {
    console.log("offline");
    offlineDiv.style.height = '2rem';
    offlineDiv.innerHTML = "You are offline"
  });