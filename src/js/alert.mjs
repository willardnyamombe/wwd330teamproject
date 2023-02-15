class Alert {
  constructor() {
    this.alertList = document.createElement("section");
    this.alertList.classList.add("alert-list");
  }

  async fetchAlerts(alertFile) {
    const response = await fetch(alertFile);
    const json = await response.json();
    return json;
  }

  // constructor and fetchAlerts method
  async create(alertFile) {
    const alerts = await this.fetchAlerts(alertFile);
    alerts.alerts.forEach((alert) => {
      let alertItem = document.createElement("p");
      alertItem.innerHTML = alert.message;
      alertItem.style.backgroundColor = alert.bgColor;
      alertItem.style.color = alert.textColor;
      alertItem.classList.add("alert-item");
      this.alertList.appendChild(alertItem);
    });
    const main = document.querySelector("main");
    if (main) {
      main.prepend(this.alertList);
    }
  }
}

// export default Alert;
const newAlerts = new Alert();
newAlerts.create("/json/alert.json");
