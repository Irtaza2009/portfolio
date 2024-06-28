window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);
window.onmouseup = (e) => handleOnUp(e);
window.ontouchend = (e) => handleOnUp(e.touches[0]);
window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);

const track = document.getElementById("image-track");
const articleTrack = document.getElementById("article-track");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

const handleArticleOnDown = (e) =>
  (articleTrack.dataset.mouseDownAt = e.clientX);

const handleArticleOnUp = () => {
  articleTrack.dataset.mouseDownAt = "0";
  articleTrack.dataset.prevPercentage = articleTrack.dataset.percentage;
};

const handleArticleOnMove = (e) => {
  if (articleTrack.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(articleTrack.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(articleTrack.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  articleTrack.dataset.percentage = nextPercentage;

  articleTrack.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const article of articleTrack.getElementsByClassName("article-image")) {
    article.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.addEventListener("scroll", () => {
  const aboutMeSection = document.getElementById("about-me");
  const aboutMePosition = aboutMeSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (aboutMePosition < screenPosition) {
    aboutMeSection.classList.add("visible");
  }

  const portfolioSection = document.getElementById("portfolio");
  const portfolioPosition = portfolioSection.getBoundingClientRect().top;

  if (portfolioPosition < screenPosition) {
    portfolioSection.classList.add("visible");
  }

  const articlesSection = document.getElementById("articles");
  const articlesPosition = articlesSection.getBoundingClientRect().top;

  if (articlesPosition < screenPosition) {
    articlesSection.classList.add("visible");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".scroll-indicator a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
});
