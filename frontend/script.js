function showTab(tabId) {
    document
      .querySelectorAll(".tab-button")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((tab) => tab.classList.remove("active"));
  
    document.querySelector(`[onclick*="${tabId}"]`).classList.add("active");
    document.getElementById(tabId).classList.add("active");
  }
  
  function calculateTrees() {
    const carbon = parseFloat(document.getElementById("carbonInput").value);
    const treesNeeded = (carbon / 22).toFixed(1);
    document.getElementById(
      "treeResult"
    ).innerHTML = `🌳 You need about <strong>${treesNeeded}</strong> trees to offset your yearly emissions.`;
  }
  async function submitFeedback() {
    const userName = prompt("Enter your name:");
    const userFeedback = prompt("Enter your feedback:");
    const response = await fetch('http://localhost:3000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, userFeedback })
    });
  
    const result = await response.json();
    if (result.message) {
      alert(result.message);
    } else {
      alert(result.error || 'Failed to submit feedback.');
    }
  }