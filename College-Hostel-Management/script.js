// KIET Hostel - Basic JavaScript
// Simple functions for 1st Year Project

// 1. Function to calculate hostel fee
function calculateFee() {
  // Get room price and mess price
  var roomFee = parseInt(document.getElementById("room").value);
  var messFee = parseInt(document.getElementById("mess").value);

  // Calculate total
  var total = roomFee + messFee;

  // Show total on page
  document.getElementById("totalFee").innerHTML = "Total Fee: ₹" + total;
}

// 2. Function for form submission
function submitForm(event) {
  // Stop page from refreshing
  event.preventDefault();

  // Get student name
  var studentName = document.getElementById("name").value;

  // Show success alert
  alert("Thank you " + studentName + "! Your application has been submitted successfully.");

  // Reset form
  document.getElementById("hostelForm").reset();
}
