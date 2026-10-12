let words = document.querySelectorAll(".word");

const menuButton = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

menuButton.addEventListener("click", () => {
    const isOpen = navlist.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.innerHTML = `<i class='bx ${isOpen ? "bx-x" : "bx-menu"}'></i>`;
});

navlist.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navlist.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.innerHTML = "<i class='bx bx-menu'></i>";
    });
});

words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.appendChild(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

words[currentWordIndex].style.opacity = "1";
Array.from(words[currentWordIndex].children).forEach((letter) => {
    letter.classList.add("in");
});

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.classList.remove("in");
            letter.classList.add("out");
        }, i * 80);
    });

    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.classList.remove("in", "out");
        letter.classList.add("behind");
        setTimeout(() => {
            letter.classList.remove("behind");
            letter.classList.add("in");
        }, 340 + i * 80);
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

setInterval(changeText, 3000);
// circle skill ///////////////////////////////////

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked/100);
    var points = "";
    var rotate = 360 / dots;



    for(let i = 0; i < dots ; i++){
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`; 
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for(let i = 0; i<percent ; i++){
        pointsMarked[i].classList.add('marked')
    }
})


// mix it up portfolio section
var mixer = mixitup('.portfolio-gallery');


// active menu///////////////////////////////////
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);


// sticky navbar///////////////////////////////////
const header = document.querySelector("header");
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 50);
})

// toggle icon navbar///////////////////////////////////
let menuIcon = document.querySelector("#menu-icon");
menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
};

window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
};

// parallax////////////////////////////////////////////

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }else{
            entry.target.classList.remove("show-items");
        }
    });
});

const srollScale = document.querySelectorAll(".scroll-scale");
srollScale.forEach((el)=>observer.observe(el));

const srollBottom = document.querySelectorAll(".scroll-bottom");
srollBottom.forEach((el)=>observer.observe(el));

const srollTop = document.querySelectorAll(".scroll-top");
srollTop.forEach((el)=>observer.observe(el));


// Contact Form & Send Options (WhatsApp & Gmail) /////////////////////////////
const contactForm = document.getElementById("contact-form");
const contactModal = document.getElementById("contact-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalOverlay = document.getElementById("modal-overlay");
const sendOptionsContainer = document.getElementById("send-options-container");

function getContactFormData() {
    const name = document.getElementById("contact-name")?.value.trim() || "";
    const email = document.getElementById("contact-email")?.value.trim() || "";
    const address = document.getElementById("contact-address")?.value.trim() || "";
    const phone = document.getElementById("contact-phone")?.value.trim() || "";
    const message = document.getElementById("contact-message")?.value.trim() || "";
    return { name, email, address, phone, message };
}

function openContactOptions() {
    if (contactModal) {
        contactModal.classList.add("active");
        contactModal.setAttribute("aria-hidden", "false");
    }
    if (sendOptionsContainer) {
        sendOptionsContainer.style.display = "block";
    }
}

function closeContactOptions() {
    if (contactModal) {
        contactModal.classList.remove("active");
        contactModal.setAttribute("aria-hidden", "true");
    }
}

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const data = getContactFormData();
        if (!data.name || !data.message) {
            alert("Please provide both your name and message.");
            return;
        }

        openContactOptions();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeContactOptions);
}
if (modalOverlay) {
    modalOverlay.addEventListener("click", closeContactOptions);
}
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && contactModal && contactModal.classList.contains("active")) {
        closeContactOptions();
    }
});

function sendViaWhatsApp() {
    const data = getContactFormData();
    if (!data.name || !data.message) {
        alert("Please fill in your name and message before sending.");
        return;
    }

    let waText = `Hello Emmanuel! I reached out to you through your portfolio website:\n\n` +
        `*Name:* ${data.name}\n` +
        `*Email:* ${data.email}\n`;
    if (data.phone) waText += `*Phone:* ${data.phone}\n`;
    if (data.address) waText += `*Address:* ${data.address}\n`;
    waText += `\n*Message:*\n${data.message}`;

    const waUrl = `https://wa.me/2349012259258?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank");
    closeContactOptions();
}

function sendViaGmail() {
    const data = getContactFormData();
    if (!data.name || !data.message) {
        alert("Please fill in your name and message before sending.");
        return;
    }

    const subject = `Portfolio Message from ${data.name}`;
    let bodyText = `Hello Emmanuel,\n\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n`;
    if (data.phone) bodyText += `Phone: ${data.phone}\n`;
    if (data.address) bodyText += `Address: ${data.address}\n`;
    bodyText += `\nMessage:\n${data.message}\n`;

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=chideraudoh58@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    
    // Open Gmail compose directly in new tab
    const newWin = window.open(gmailComposeUrl, "_blank");
    if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
        // Fallback to mailto if browser blocks popup
        window.location.href = `mailto:chideraudoh58@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    }
    closeContactOptions();
}

const modalWaBtn = document.getElementById("modal-whatsapp-btn");
const modalGmailBtn = document.getElementById("modal-gmail-btn");
const formWaBtn = document.getElementById("form-whatsapp-btn");
const formGmailBtn = document.getElementById("form-gmail-btn");

if (modalWaBtn) modalWaBtn.addEventListener("click", sendViaWhatsApp);
if (modalGmailBtn) modalGmailBtn.addEventListener("click", sendViaGmail);
if (formWaBtn) formWaBtn.addEventListener("click", sendViaWhatsApp);
if (formGmailBtn) formGmailBtn.addEventListener("click", sendViaGmail);
