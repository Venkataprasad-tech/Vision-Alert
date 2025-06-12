document.addEventListener('DOMContentLoaded', function () {
  // Set Current Date
  const currentDateEl = document.getElementById('current-date');
  if (currentDateEl) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    currentDateEl.textContent = `${day}-${month}-${year}`;
  }

  // URL Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan');
  const amount = urlParams.get('amount');
  const period = urlParams.get('period');

  // Set Plan Display
  if (document.getElementById('payment-amount')) {
    document.getElementById('payment-amount').textContent = `₹${amount}`;
  }
  setPlanDetails(plan, period, amount);

  // Razorpay Payment Trigger
  const proceedBtn = document.getElementById('proceed-btn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', async () => {
      proceedBtn.disabled = true;
      proceedBtn.textContent = "Processing...";

      try {
        const res = await fetch("http://localhost:5000/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseFloat(amount) })
        });

        const data = await res.json();
        const orderId = data.id;

        const options = {
          key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
          amount: data.amount,
          currency: "INR",
          name: "Vision Alert",
          description: "Subscription Plan Payment",
          order_id: orderId,
          handler: function (response) {
            window.location.href = "/payment-success.html";
          },
          prefill: {
            name: "",
            email: "",
            contact: ""
          },
          theme: {
            color: "#3399cc"
          }
        };

        const rzp = new Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
      } finally {
        proceedBtn.disabled = false;
        proceedBtn.textContent = "Pay Now";
      }
    });
  }

  // Set Plan Details Function
  function setPlanDetails(plan, period, amount) {
    const planName = document.getElementById('plan-name');
    const planPrice = document.getElementById('plan-price');
    const planPeriod = document.getElementById('plan-period');
    const planFeatures = document.getElementById('plan-features');

    let displayPeriod = '';
    if (period?.includes('month')) {
      displayPeriod = period.replace('-months', ' Month Plan');
    } else if (period?.includes('year')) {
      displayPeriod = period.replace('-years', ' Year Plan');
    } else if (period === 'lifetime') {
      displayPeriod = 'Lifetime Plan';
    }

    const featuresHTML = `
      <li>All Premium Features</li>
      <li>Unlimited Contacts</li>
      <li>Priority Emergency Response</li>
      <li>Advanced Detection</li>
      <li>Professional Reports</li>
    `;

    const displayNameMap = {
      '1-month': '1 Month Plan',
      '3-months': '3 Months Plan',
      '6-months': '6 Months Plan',
      '1-year': '1 Year Plan',
      '2-years': '2 Years Plan',
      'lifetime': 'Lifetime Plan'
    };

    if (planName) planName.textContent = displayNameMap[plan] || 'Unknown Plan';
    if (planPrice) planPrice.textContent = `₹${amount}`;
    if (planPeriod) planPeriod.textContent = displayPeriod;
    if (planFeatures) planFeatures.innerHTML = displayNameMap[plan] ? featuresHTML : '';
  }
});
