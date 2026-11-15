/**
 * KIET HOSTEL PORTAL - MINIMAL CLEAN JAVASCRIPT (~80 Lines)
 * Author: B.Tech 1st Year Lab Project
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Fee Matrix (Annual Fees: Rent + ₹60,000 Mess + ₹5,000 Caution Deposit)
  const fees = {
    "1": { ac: { rent: 145000, total: 210000 }, nonAc: { rent: 110000, total: 175000 }, name: "1-Seater" },
    "2": { ac: { rent: 122000, total: 187000 }, nonAc: { rent: 90000, total: 155000 }, name: "2-Seater" },
    "3": { ac: { rent: 105000, total: 170000 }, nonAc: { rent: 75000, total: 140000 }, name: "3-Seater" }
  };

  const roomSel = document.getElementById("roomType");
  const coolSel = document.getElementById("cooling");
  const rentDisp = document.getElementById("feeRent");
  const totalDisp = document.getElementById("feeTotal");

  // Dynamic Fee Calculator Function
  function calcFee() {
    const seater = roomSel.value;
    const isAC = coolSel.value === "ac";
    const data = isAC ? fees[seater].ac : fees[seater].nonAc;
    rentDisp.textContent = "₹" + data.rent.toLocaleString("en-IN");
    totalDisp.textContent = "₹" + data.total.toLocaleString("en-IN");
    return { name: fees[seater].name, type: isAC ? "AC" : "Non-AC", total: data.total };
  }

  roomSel.addEventListener("change", calcFee);
  coolSel.addEventListener("change", calcFee);

  // 2. Form Validation & Submission
  const form = document.getElementById("hostelForm");
  const modal = document.getElementById("modal");
  const slipData = document.getElementById("slipData");

  function validate(input, condition) {
    const parent = input.closest(".field") || input.closest(".field-check");
    if (!condition) {
      parent.classList.add("has-err");
      return false;
    }
    parent.classList.remove("has-err");
    return true;
  }

  // Clear error as user types
  ["name", "roll", "email", "phone"].forEach((id) => {
    document.getElementById(id).addEventListener("input", (e) => {
      e.target.closest(".field").classList.remove("has-err");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const roll = document.getElementById("roll");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const branch = document.getElementById("branch");
    const agree = document.getElementById("agree");

    const v1 = validate(name, name.value.trim().length >= 3);
    const v2 = validate(roll, roll.value.trim().length >= 4);
    const v3 = validate(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    const v4 = validate(phone, /^[6-9]\d{9}$/.test(phone.value.trim()));
    const v5 = validate(branch, branch.value !== "");
    const v6 = validate(agree, agree.checked);

    if (v1 && v2 && v3 && v4 && v5 && v6) {
      const current = calcFee();
      const ref = "KIET-" + Math.floor(10000 + Math.random() * 90000);
      const gender = document.getElementById("gender").value;
      const bhawan = gender === "male" ? "Chandragupta Bhawan" : "Gargi Bhawan";

      slipData.innerHTML = `
        <div><span>Application ID:</span><strong>${ref}</strong></div>
        <div><span>Student Name:</span><strong>${name.value.trim()}</strong></div>
        <div><span>Roll No:</span><strong>${roll.value.trim().toUpperCase()}</strong></div>
        <div><span>Branch:</span><strong>${branch.value}</strong></div>
        <div><span>Allocated Bhawan:</span><strong>${bhawan}</strong></div>
        <div><span>Room Preference:</span><strong>${current.name} (${current.type})</strong></div>
        <div><span>Total Annual Fee (Inc. Mess):</span><strong style="color:#e65100;">₹${current.total.toLocaleString("en-IN")}</strong></div>
      `;
      modal.classList.add("active");
    }
  });

  // Modal Close Handlers
  document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("active"); });

  // 3. Interactive FAQ Accordion
  document.querySelectorAll(".faq-q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.parentElement;
      const wasActive = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("active"));
      if (!wasActive) item.classList.add("active");
    });
  });

  // 4. Mobile Menu Toggle
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => navLinks.classList.toggle("active"));
    document.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("active")));
  }
});
