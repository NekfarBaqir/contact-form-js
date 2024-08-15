// My constants
const USER_PUBLIC_KEY = "CHaBQTP6VQc-7yloB";
const SERVICE_ID = "service_q42awk8";
const TEMPLATE_ID_USER = "template_dvvgj0s";

// elements
const form = document.querySelector(".contact-form");
const nameInput = form.querySelector("#name");
const emailInput = form.querySelector("#email");
const messageInput = form.querySelector("#message");
const submitButton = form.querySelector(".btn");
const alertEl = form.querySelector(".alert");

// email related functions
const emailJSSendEmail = async (data, templateId) =>
  emailjs.send(SERVICE_ID, templateId, data);

const sendEmailToUser = async (userName, userEmail) => {
  const templateParams = {
    to_name: userName,
    user_email: userEmail,
    reply_to: "replytobaqir@gmail.com",
  };
  return emailJSSendEmail(templateParams, TEMPLATE_ID_USER);
};

// Event Listeners
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  submitButton.innerHTML = "Sending...";

  const name = nameInput.value;
  const email = emailInput.value;

  try {
    await sendEmailToUser(name, email);
    alertEl.classList.add("alert-success", "show-alert");
    alertEl.innerHTML = "Email sent successfully";
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  } catch (error) {
    alertEl.classList.add("alert-danger", "show-alert");
    alertEl.innerHTML = "Email failed to send!";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = "Send";
  }
});
// Initialize EmailJS
(function () {
  emailjs.init({
    publicKey: USER_PUBLIC_KEY,
  });
})();
