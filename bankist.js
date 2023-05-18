const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modalContent");
const closeModal = document.querySelectorAll(".closeModalBtn");

const sec1 = document.querySelector("#sec--1");
const navBar = document.querySelector("#mainUl");

/////////////////////MODAL
const closeOverlay = function () {
  modal.classList.add("hidden");
  modalContent.classList.add("hidden");
};

const openOverlay = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  modalContent.classList.remove("hidden");
};

modal.addEventListener("click", closeOverlay);

closeModal.forEach( btn => btn.addEventListener("click", closeOverlay));

document.querySelectorAll(".openAccount").forEach((el) => {
  el.addEventListener("click", openOverlay);
});

//////////SMOOTH SCROLL OF SCROLL TO
document.querySelector(".scrollTo").addEventListener("click", function (event) {
  event.preventDefault();
  sec1.scrollIntoView({ behavior: "smooth" });
});

// one way out
// document.querySelectorAll(".navLinks").forEach(nav => {
//   nav.addEventListener("click", function(e) {
//     e.preventDefault();
//   const id = nav.getAttribute("href");
//   document.querySelector(id).scrollIntoView({behavior: "smooth"});
//   })
// })

navBar.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("navLinks")) {
    const id = e.target.getAttribute("href");
    id && document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////Operation Hander
const operationBtns = document.querySelectorAll(".operation");
const operationHouse = document.querySelector(".commandBtn");
const operationContent = document.querySelectorAll(".instantsUl");

operationHouse.addEventListener("click", function (e) {
  if (e.target.closest(".operation")) {
    let tab = e.target.closest(".operation");

    operationBtns.forEach((btn) => {
      btn.classList.remove("btn--active");
    });
    operationContent.forEach((cont) => {
      cont.classList.remove("instantsUl--active");
    });

    tab.classList.add("btn--active");
    document
      .querySelector(`.content--${tab.dataset.tab}`)
      .classList.add("instantsUl--active");
  }
});

//////////////////////////FADING NAV BAR ON HOVER
const navContainer = document.querySelector("#mainUl");
const navLinks = document.querySelectorAll(".navLinks");

// navContainer.addEventListener("mouseover", function(e) {
//   if(e.target.classList.contains("linkk")) {
//     let activeLink = e.target;

//     navLinks.forEach(link => {
//       link.classList.add("fadding");
//     })
//     activeLink.classList.remove("fadding");
//   }
// });

// navContainer.addEventListener("mouseout", function(e) {
//   navLinks.forEach(link => {
//     link.classList.remove("fadding");
//   })
// })
const handleHover = function (e) {
  if (e.target.classList.contains("linkk")) {
    let link = e.target;
    let linkSiblings = link.closest("#mainUl").querySelectorAll(".linkk");
    const logo = link.closest("#mainUl").querySelector("#iconLi");
    linkSiblings.forEach((lnk) => {
      if (lnk !== link) {
        lnk.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

navContainer.addEventListener("mouseover", handleHover.bind(0.4));
navContainer.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////STICKY NAV BAR
const nav = document.querySelector(".nav");

const navFn = function (enteries, observer) {
  const [entry] = enteries;

  if (entry.isIntersecting === false) {
    nav.classList.add("stiky--nav");
  } else {
    nav.classList.remove("stiky--nav");
  }
};

const navObserver = new IntersectionObserver(navFn, {
  root: null,
  threshold: 0,
  rootMargin: -nav.getBoundingClientRect().height + "px",
});

navObserver.observe(document.querySelector(".header"));

///////////////////////////ANIMATING SECTIONS
const sections = document.querySelectorAll(".sections");

const sectionFn = function (enteries, observer) {
  const [entry] = enteries;

  if (entry.isIntersecting === false) return;
  entry.target.classList.remove("hide--section");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionFn, {
  root: null,
  threshold: 0.1,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("hide--section");
});

////////////////////////BLUR IMAGES
const allBlurImages = document.querySelectorAll(".imgBlur");

const imageFn = function (enteries, observer) {
  const [entry] = enteries;

  if (entry.isIntersecting === false) return;

  const targetElement = entry.target;
  targetElement.src = targetElement.src;

  targetElement.addEventListener("load", function() {
    targetElement.classList.remove("imgBlur");
  });

  observer.unobserve(targetElement);
};

const ImageObserver = new IntersectionObserver(imageFn, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

allBlurImages.forEach(img => ImageObserver.observe(img));


//////////////////////////////////SLIDE
const rightBtn = document.querySelector(".argt");
const leftBtn = document.querySelector(".alft");
let count = 0;
const slides = document.querySelectorAll(".sliders");
const maxSlide = slides.length - 1;
const dotHouse = document.querySelector(".dotHouse");

slides.forEach((slide, idx) => {
    dotHouse.insertAdjacentHTML("beforeend", `<button data-dotNum="${idx}" class="slideDot slideDot--${idx}"></button.`);
  // dotHouse.innerHTML = '<div>ttt</div>';
});

const dots = document.querySelectorAll(".slideDot");

const goToSlide = function(position) {
  slides.forEach((slide, idx) => slide.style.transform = `translateX(${(idx - position) * 100}%) `);
  dots.forEach(slide => slide.classList.remove("activatedDot"));
};

const activeDot = function(position) {
  document.querySelector(`.slideDot--${position}`).classList.add("activatedDot");
};

dots.forEach(dot => dot.addEventListener("click", function(e) {
  const targetedDot = e.target.dataset.dotnum;
  goToSlide(targetedDot);
  activeDot(targetedDot);
  // console.log(targetedDot)
}))

goToSlide(0);
activeDot(0);

rightBtn.addEventListener("click", function() {
  if(count === maxSlide) {
    count = 0;
  } else {
    count++;
  }
  goToSlide(count);
  activeDot(count);
});

leftBtn.addEventListener("click", function() {
  if(count === 0) {
    count = maxSlide;
  } else {
    count--
  }
  goToSlide(count);
  activeDot(count)
});


// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//     <link rel="shortcut icon" type="image/png" href="img/icon.png" />

//     <link
//       href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600&display=swap"
//       rel="stylesheet"
//     />
//     <link rel="stylesheet" href="style.css" />
//     <title>Bankist | When Banking meets Minimalist</title>
//   </head>
//   <body>
//     <header class="header">
//       <nav class="nav">
//         <img
//           src="img/logo.png"
//           alt="Bankist logo"
//           class="nav__logo"
//           id="logo"
//         />
//         <ul class="nav__links">
//           <li class="nav__item">
//             <a class="nav__link" href="#section--1">Features</a>
//           </li>
//           <li class="nav__item">
//             <a class="nav__link" href="#section--2">Operations</a>
//           </li>
//           <li class="nav__item">
//             <a class="nav__link" href="#section--3">Testimonials</a>
//           </li>
//           <li class="nav__item">
//             <a class="nav__link nav__link--btn btn--show-modal" href="#"
//               >Open account</a
//             >
//           </li>
//         </ul>
//       </nav>

//       <div class="header__title">
//         <h1>
//           When
//           <!-- Green highlight effect -->
//           <span class="highlight">banking</span>
//           meets<br />
//           <span class="highlight">minimalist</span>
//         </h1>
//         <h4>A simpler banking experience for a simpler life.</h4>
//         <button class="btn--text btn--scroll-to">Learn more &DownArrow;</button>
//         <img
//           src="img/hero.png"
//           class="header__img"
//           alt="Minimalist bank items"
//         />
//       </div>
//     </header>

//     <section class="section" id="section--1">
//       <div class="section__title">
//         <h2 class="section__description">Features</h2>
//         <h3 class="section__header">
//           Everything you need in a modern bank and more.
//         </h3>
//       </div>

//       <div class="features">
//         <img
//           src="img/digital-lazy.jpg"
//           data-src="img/digital.jpg"
//           alt="Computer"
//           class="features__img lazy-img"
//         />
//         <div class="features__feature">
//           <div class="features__icon">
//             <svg>
//               <use xlink:href="img/icons.svg#icon-monitor"></use>
//             </svg>
//           </div>
//           <h5 class="features__header">100% digital bank</h5>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias
//             sint quos? Accusantium a fugiat porro reiciendis saepe quibusdam
//             debitis ducimus.
//           </p>
//         </div>

//         <div class="features__feature">
//           <div class="features__icon">
//             <svg>
//               <use xlink:href="img/icons.svg#icon-trending-up"></use>
//             </svg>
//           </div>
//           <h5 class="features__header">Watch your money grow</h5>
//           <p>
//             Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
//             inventore ab? Nulla incidunt eius numquam sequi iste pariatur
//             quibusdam!
//           </p>
//         </div>
//         <img
//           src="img/grow-lazy.jpg"
//           data-src="img/grow.jpg"
//           alt="Plant"
//           class="features__img lazy-img"
//         />

//         <img
//           src="img/card-lazy.jpg"
//           data-src="img/card.jpg"
//           alt="Credit card"
//           class="features__img lazy-img"
//         />
//         <div class="features__feature">
//           <div class="features__icon">
//             <svg>
//               <use xlink:href="img/icons.svg#icon-credit-card"></use>
//             </svg>
//           </div>
//           <h5 class="features__header">Free debit card included</h5>
//           <p>
//             Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim
//             eveniet consequatur odit quam quos possimus assumenda dicta fuga
//             inventore ab.
//           </p>
//         </div>
//       </div>
//     </section>

//     <section class="section" id="section--2">
//       <div class="section__title">
//         <h2 class="section__description">Operations</h2>
//         <h3 class="section__header">
//           Everything as simple as possible, but no simpler.
//         </h3>
//       </div>

//       <div class="operations">
//         <div class="operations__tab-container">
//           <button
//             class="btn operations__tab operations__tab--1 operations__tab--active"
//             data-tab="1"
//           >
//             <span>01</span>Instant Transfers
//           </button>
//           <button class="btn operations__tab operations__tab--2" data-tab="2">
//             <span>02</span>Instant Loans
//           </button>
//           <button class="btn operations__tab operations__tab--3" data-tab="3">
//             <span>03</span>Instant Closing
//           </button>
//         </div>
//         <div
//           class="operations__content operations__content--1 operations__content--active"
//         >
//           <div class="operations__icon operations__icon--1">
//             <svg>
//               <use xlink:href="img/icons.svg#icon-upload"></use>
//             </svg>
//           </div>
//           <h5 class="operations__header">
//             Tranfser money to anyone, instantly! No fees, no BS.
//           </h5>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat.
//           </p>
//         </div>

//         <div class="operations__content operations__content--2">
//           <div class="operations__icon operations__icon--2">
//             <svg>
//               <use xlink:href="img/icons.svg#icon-home"></use>
//             </svg>
//           </div>
//           <h5 class="operations__header">
//             Buy a home or make your dreams come true, with instant loans.
//           </h5>
//           <p>
//             Duis aute irure dolor in reprehenderit in voluptate velit esse
//             cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
//             cupidatat non proident, sunt in culpa qui officia deserunt mollit
//             anim id est laborum.
//           </p>
//         </div>
//         <div class="operations__content operations__content--3">
//           <div class="operations__icon operations__icon--3">
//             <svg>
//               <use xlink:href="img/icons.svg#icon-user-x"></use>
//             </svg>
//           </div>
//           <h5 class="operations__header">
//             No longer need your account? No problem! Close it instantly.
//           </h5>
//           <p>
//             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
//             officia deserunt mollit anim id est laborum. Ut enim ad minim
//             veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
//             ea commodo consequat.
//           </p>
//         </div>
//       </div>
//     </section>

//     <section class="section" id="section--3">
//       <div class="section__title section__title--testimonials">
//         <h2 class="section__description">Not sure yet?</h2>
//         <h3 class="section__header">
//           Millions of Bankists are already making their lifes simpler.
//         </h3>
//       </div>

//       <div class="slider">
//         <div class="slide slide--1">
//           <div class="testimonial">
//             <h5 class="testimonial__header">Best financial decision ever!</h5>
//             <blockquote class="testimonial__text">
//               Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//               Accusantium quas quisquam non? Quas voluptate nulla minima
//               deleniti optio ullam nesciunt, numquam corporis et asperiores
//               laboriosam sunt, praesentium suscipit blanditiis. Necessitatibus
//               id alias reiciendis, perferendis facere pariatur dolore veniam
//               autem esse non voluptatem saepe provident nihil molestiae.
//             </blockquote>
//             <address class="testimonial__author">
//               <img src="img/user-1.jpg" alt="" class="testimonial__photo" />
//               <h6 class="testimonial__name">Aarav Lynn</h6>
//               <p class="testimonial__location">San Francisco, USA</p>
//             </address>
//           </div>
//         </div>

//         <div class="slide slide--2">
//           <div class="testimonial">
//             <h5 class="testimonial__header">
//               The last step to becoming a complete minimalist
//             </h5>
//             <blockquote class="testimonial__text">
//               Quisquam itaque deserunt ullam, quia ea repellendus provident,
//               ducimus neque ipsam modi voluptatibus doloremque, corrupti
//               laborum. Incidunt numquam perferendis veritatis neque repellendus.
//               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
//               deserunt exercitationem deleniti.
//             </blockquote>
//             <address class="testimonial__author">
//               <img src="img/user-2.jpg" alt="" class="testimonial__photo" />
//               <h6 class="testimonial__name">Miyah Miles</h6>
//               <p class="testimonial__location">London, UK</p>
//             </address>
//           </div>
//         </div>

//         <div class="slide slide--3">
//           <div class="testimonial">
//             <h5 class="testimonial__header">
//               Finally free from old-school banks
//             </h5>
//             <blockquote class="testimonial__text">
//               Debitis, nihil sit minus suscipit magni aperiam vel tenetur
//               incidunt commodi architecto numquam omnis nulla autem,
//               necessitatibus blanditiis modi similique quidem. Odio aliquam
//               culpa dicta beatae quod maiores ipsa minus consequatur error sunt,
//               deleniti saepe aliquid quos inventore sequi. Necessitatibus id
//               alias reiciendis, perferendis facere.
//             </blockquote>
//             <address class="testimonial__author">
//               <img src="img/user-3.jpg" alt="" class="testimonial__photo" />
//               <h6 class="testimonial__name">Francisco Gomes</h6>
//               <p class="testimonial__location">Lisbon, Portugal</p>
//             </address>
//           </div>
//         </div>

//         <!-- <div class="slide"><img src="img/img-1.jpg" alt="Photo 1" /></div>
//         <div class="slide"><img src="img/img-2.jpg" alt="Photo 2" /></div>
//         <div class="slide"><img src="img/img-3.jpg" alt="Photo 3" /></div>
//         <div class="slide"><img src="img/img-4.jpg" alt="Photo 4" /></div> -->
//         <button class="slider__btn slider__btn--left">&larr;</button>
//         <button class="slider__btn slider__btn--right">&rarr;</button>
//         <div class="dots"></div>
//       </div>
//     </section>

//     <section class="section section--sign-up">
//       <div class="section__title">
//         <h3 class="section__header">
//           The best day to join Bankist was one year ago. The second best is
//           today!
//         </h3>
//       </div>
//       <button class="btn btn--show-modal">Open your free account today!</button>
//     </section>

//     <footer class="footer">
//       <ul class="footer__nav">
//         <li class="footer__item">
//           <a class="footer__link" href="#">About</a>
//         </li>
//         <li class="footer__item">
//           <a class="footer__link" href="#">Pricing</a>
//         </li>
//         <li class="footer__item">
//           <a class="footer__link" href="#">Terms of Use</a>
//         </li>
//         <li class="footer__item">
//           <a class="footer__link" href="#">Privacy Policy</a>
//         </li>
//         <li class="footer__item">
//           <a class="footer__link" href="#">Careers</a>
//         </li>
//         <li class="footer__item">
//           <a class="footer__link" href="#">Blog</a>
//         </li>
//         <li class="footer__item">
//           <a class="footer__link" href="#">Contact Us</a>
//         </li>
//       </ul>
//       <img src="img/icon.png" alt="Logo" class="footer__logo" />
//       <p class="footer__copyright">
//         &copy; Copyright by
//         <a
//           class="footer__link twitter-link"
//           target="_blank"
//           href="https://twitter.com/jonasschmedtman"
//           >Jonas Schmedtmann</a
//         >. Use for learning or your portfolio. Don't use to teach. Don't claim
//         as your own product.
//       </p>
//     </footer>

//     <div class="modal hidden">
//       <button class="btn--close-modal">&times;</button>
//       <h2 class="modal__header">
//         Open your bank account <br />
//         in just <span class="highlight">5 minutes</span>
//       </h2>
//       <form class="modal__form">
//         <label>First Name</label>
//         <input type="text" />
//         <label>Last Name</label>
//         <input type="text" />
//         <label>Email Address</label>
//         <input type="email" />
//         <button class="btn">Next step &rarr;</button>
//       </form>
//     </div>
//     <div class="overlay hidden"></div>

//     <script src="script.js"></script>
//   </body>
// </html>
