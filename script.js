function sendMoney() {
    const senderName = "You"; // Assuming the user's name is "You"
    const receiverName = document.getElementById("enterName").value;
    const amount = parseFloat(document.getElementById("enterAmount").value);
  
    // Find the sender's balance
    const senderBalance = parseFloat(document.getElementById("yourBankBalance").textContent);
  
    // Check if the sender has sufficient balance
    if (senderBalance < amount) {
      alert("Insufficient balance!");
      return;
    }
  
    // Find the receiver's balance
    let receiverBalance;
    for (const row of document.querySelectorAll("tbody tr")) {
      const name = row.querySelector("td:nth-child(2)").textContent;
      if (name === receiverName) {
        receiverBalance = parseFloat(row.querySelector("td:nth-child(5) p").textContent);
        break;
      }
    }
  
    // If the receiver is not found, show an error
    if (!receiverBalance && receiverBalance !== 0) {
      alert("Recipient not found!");
      return;
    }
  
    // Update balances
    const newSenderBalance = senderBalance - amount;
    const newReceiverBalance = receiverBalance + amount;
  
    // Check if the sender has sufficient balance after updating
    if (newSenderBalance < 0) {
      alert("Insufficient balance!");
      return;
    }
  
    // Update the table data
    document.getElementById("yourBankBalance").textContent = newSenderBalance.toFixed(2);
    const receiverRow = Array.from(document.querySelectorAll("tbody tr")).find(
      (row) => row.querySelector("td:nth-child(2)").textContent === receiverName
    );
    receiverRow.querySelector("td:nth-child(5) p").textContent = newReceiverBalance.toFixed(2);
  
    // Add the transaction to the history
    const transaction = `${senderName} sent Rs. ${amount.toFixed(2)} to ${receiverName}`;
    transactionHistory.push(transaction);
    updateTransactionHistory();
  
    // Clear input fields
    document.getElementById("enterName").value = "";
    document.getElementById("enterAmount").value = "";
  }
  