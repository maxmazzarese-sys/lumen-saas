const checkout = document.getElementById("checkout");
const label = document.getElementById("sheet-label");
const starter = document.getElementById("embed-starter");
const pro = document.getElementById("embed-pro");

function setReturnUrls() {
  const url = `${window.location.origin}/success.html`;
  document.querySelectorAll("[data-whop-checkout-return-url]").forEach((el) => {
    el.setAttribute("data-whop-checkout-return-url", url);
  });
}

function openPlan(plan) {
  const isPro = plan === "pro";
  label.textContent = isPro ? "Pro · $49 / month" : "Starter · $19 / month";
  starter.hidden = isPro;
  pro.hidden = !isPro;
  checkout.hidden = false;
  checkout.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  checkout.hidden = true;
  checkout.classList.remove("is-open");
  document.body.style.overflow = "";
}

closeCheckout();
setReturnUrls();

document.querySelectorAll("[data-plan]").forEach((btn) => {
  btn.addEventListener("click", () => openPlan(btn.dataset.plan));
});

document.getElementById("close-checkout").addEventListener("click", closeCheckout);
checkout.addEventListener("click", (e) => {
  if (e.target === checkout) closeCheckout();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !checkout.hidden) closeCheckout();
});
