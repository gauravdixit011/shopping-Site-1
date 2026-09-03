/* =========================================
   NAVBAR SCROLL
========================================= */

const navbar =
  document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
  document.querySelector(".mobile-menu-btn");

const navLinks =
  document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});


document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("active");

    });

  });


/* =========================================
   SEARCH PANEL
========================================= */

const searchToggle =
  document.querySelector(".search-toggle");

const searchPanel =
  document.querySelector(".search-panel");

const searchClose =
  document.querySelector(".search-close");

const searchInput =
  document.querySelector("#searchInput");


searchToggle.addEventListener("click", () => {

  searchPanel.classList.add("active");

  setTimeout(() => {
    searchInput.focus();
  }, 300);

});


searchClose.addEventListener("click", () => {

  searchPanel.classList.remove("active");

});


document.addEventListener("keydown", e => {

  if (e.key === "Escape") {

    searchPanel.classList.remove("active");

    closeModal();

  }

});


/* =========================================
   PRODUCT FILTER
========================================= */

const filterButtons =
  document.querySelectorAll(".filter-btn");

const products =
  document.querySelectorAll(".product-card");


filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter =
      button.dataset.filter;

    products.forEach(product => {

      const category =
        product.dataset.category;

      if (
        filter === "all" ||
        category.includes(filter)
      ) {

        product.classList.remove("hidden");

      } else {

        product.classList.add("hidden");

      }

    });

  });

});


/* =========================================
   SORT PRODUCTS
========================================= */

const sortProducts =
  document.querySelector("#sortProducts");

const productGrid =
  document.querySelector("#productGrid");


sortProducts.addEventListener("change", () => {

  const productArray =
    [...document.querySelectorAll(".product-card")];

  if (sortProducts.value === "low") {

    productArray.sort((a, b) =>
      Number(a.dataset.price) -
      Number(b.dataset.price)
    );

  }

  if (sortProducts.value === "high") {

    productArray.sort((a, b) =>
      Number(b.dataset.price) -
      Number(a.dataset.price)
    );

  }

  productArray.forEach(product => {

    productGrid.appendChild(product);

  });

});


/* =========================================
   WISHLIST
========================================= */

const wishlistButtons =
  document.querySelectorAll(".wishlist");


wishlistButtons.forEach(button => {

  button.addEventListener("click", e => {

    e.stopPropagation();

    button.classList.toggle("active");

    const icon =
      button.querySelector("i");

    if (
      button.classList.contains("active")
    ) {

      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");

    } else {

      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");

    }

  });

});


/* =========================================
   QUICK VIEW MODAL
========================================= */

const modal =
  document.querySelector("#productModal");

const modalImage =
  document.querySelector("#modalImage");

const modalName =
  document.querySelector("#modalName");

const modalPrice =
  document.querySelector("#modalPrice");

const modalClose =
  document.querySelector(".modal-close");

const modalBackdrop =
  document.querySelector(".modal-backdrop");


document
  .querySelectorAll(".quick-view")
  .forEach(button => {

    button.addEventListener("click", () => {

      modalName.textContent =
        button.dataset.name;

      modalPrice.textContent =
        button.dataset.price;

      modalImage.src =
        button.dataset.image;

      modal.classList.add("active");

      document.body.style.overflow =
        "hidden";

    });

  });


function closeModal() {

  modal.classList.remove("active");

  document.body.style.overflow = "";

}


modalClose.addEventListener(
  "click",
  closeModal
);

modalBackdrop.addEventListener(
  "click",
  closeModal
);


/* =========================================
   PREMIUM PRODUCT IMAGE ZOOM
========================================= */

const zoomContainer =
  document.querySelector("#zoomContainer");


zoomContainer.addEventListener(
  "mouseenter",
  () => {

    zoomContainer.classList.add("zooming");

  }
);


zoomContainer.addEventListener(
  "mouseleave",
  () => {

    zoomContainer.classList.remove("zooming");

    modalImage.style.transformOrigin =
      "center center";

  }
);


zoomContainer.addEventListener(
  "mousemove",
  event => {

    const rect =
      zoomContainer.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const xPercent =
      (x / rect.width) * 100;

    const yPercent =
      (y / rect.height) * 100;

    modalImage.style.transformOrigin =
      `${xPercent}% ${yPercent}%`;

  }
);


/* =========================================
   SIZE SELECTION
========================================= */

document
  .querySelectorAll(".sizes button")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".sizes button")
        .forEach(btn =>
          btn.classList.remove("active")
        );

      button.classList.add("active");

    });

  });


/* =========================================
   SHOPPING CART
========================================= */

let cartCount = 0;

const cartCounter =
  document.querySelector(".cart-count");

const addCart =
  document.querySelector(".add-cart");

const toast =
  document.querySelector("#toast");


addCart.addEventListener("click", () => {

  cartCount++;

  cartCounter.textContent =
    cartCount;

  showToast();

});


function showToast() {

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}


/* =========================================
   MODAL WISHLIST
========================================= */

const modalWishlist =
  document.querySelector(".modal-wishlist");


modalWishlist.addEventListener(
  "click",
  () => {

    const icon =
      modalWishlist.querySelector("i");

    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");

  }
);


/* =========================================
   LIVE PRODUCT SEARCH
========================================= */

searchInput.addEventListener(
  "input",
  event => {

    const text =
      event.target.value.toLowerCase();

    products.forEach(product => {

      const productName =
        product
          .querySelector("h3")
          .textContent
          .toLowerCase();

      if (
        productName.includes(text)
      ) {

        product.classList.remove("hidden");

      } else {

        product.classList.add("hidden");

      }

    });

  }
);


/* =========================================
   NEWSLETTER
========================================= */

const newsletter =
  document.querySelector("#newsletterForm");


newsletter.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    toast
      .querySelector("span")
      .textContent =
      "Welcome to the Luxora Inner Circle";

    toast.classList.add("show");

    newsletter.reset();

    setTimeout(() => {

      toast.classList.remove("show");

      toast
        .querySelector("span")
        .textContent =
        "Added to your bag";

    }, 2700);

  }
);


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const elementsToReveal = [
  ...document.querySelectorAll(
    ".section-heading"
  ),

  ...document.querySelectorAll(
    ".product-card"
  ),

  ...document.querySelectorAll(
    ".benefit-card"
  ),

  document.querySelector(
    ".feature-content"
  ),

  document.querySelector(
    ".newsletter"
  )
];


elementsToReveal.forEach(element => {

  if (element) {
    element.classList.add("reveal");
  }

});


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target
            .classList.add("visible");

          revealObserver
            .unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


elementsToReveal.forEach(element => {

  if (element) {
    revealObserver.observe(element);
  }

});


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor =
  document.querySelector(".cursor");

const cursorFollower =
  document.querySelector(
    ".cursor-follower"
  );


let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;


document.addEventListener(
  "mousemove",
  event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left =
      `${mouseX}px`;

    cursor.style.top =
      `${mouseY}px`;

  }
);


function animateCursor() {

  followerX +=
    (mouseX - followerX) * 0.12;

  followerY +=
    (mouseY - followerY) * 0.12;

  cursorFollower.style.left =
    `${followerX}px`;

  cursorFollower.style.top =
    `${followerY}px`;

  requestAnimationFrame(
    animateCursor
  );

}

animateCursor();


const hoverElements =
  document.querySelectorAll(
    "a, button, .product-card"
  );


hoverElements.forEach(element => {

  element.addEventListener(
    "mouseenter",
    () => {

      cursorFollower.style.width =
        "55px";

      cursorFollower.style.height =
        "55px";

      cursorFollower.style.background =
        "rgba(255,255,255,.15)";

    }
  );


  element.addEventListener(
    "mouseleave",
    () => {

      cursorFollower.style.width =
        "36px";

      cursorFollower.style.height =
        "36px";

      cursorFollower.style.background =
        "transparent";

    }
  );

});


/* =========================================
   HERO PARALLAX
========================================= */

const heroVisual =
  document.querySelector(".hero-visual");


window.addEventListener(
  "mousemove",
  event => {

    if (window.innerWidth < 900) {
      return;
    }

    const x =
      (
        event.clientX /
        window.innerWidth
        - 0.5
      ) * 12;

    const y =
      (
        event.clientY /
        window.innerHeight
        - 0.5
      ) * 12;

    heroVisual.style.transform =
      `
      translate3d(
        ${x}px,
        ${y}px,
        0
      )
      `;

  }
);


/* =========================================
   CARD 3D TILT
========================================= */

document
  .querySelectorAll(".product-card")
  .forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        if (window.innerWidth < 900) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          (
            (y - centerY) /
            centerY
          ) * -2;

        const rotateY =
          (
            (x - centerX) /
            centerX
          ) * 2;

        card.style.transform =
          `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-5px)
          `;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          `
          perspective(1000px)
          rotateX(0deg)
          rotateY(0deg)
          translateY(0)
          `;

      }
    );

  });
