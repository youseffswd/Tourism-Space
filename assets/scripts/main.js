const loaderDivs = document.querySelectorAll(".loader div");

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
window.onload = () => {
    gsap.to(loaderDivs, { x: "0%", duration: 0.3, stagger: 0.05 });
};

const swapActiveClasses = (lastActive, newValue) => {
    lastActive.classList.remove("active");
    lastActive = newValue;
    lastActive.classList.add("active");
    return lastActive;
};

// Header
const burgerMenu = document.querySelector(".burger-menu");
const nav = document.querySelector("header nav");
const burgerMenuHandler = _ => {
    burgerMenu.classList.toggle("active");
    nav.classList.toggle("active");
};

burgerMenu.addEventListener("click", burgerMenuHandler);

const navLinksContainer = document.querySelector("nav ul");
const navLinks = navLinksContainer.querySelectorAll("li");
let lastActiveNavLink = navLinks[0];

const navLinksHandler = e => {
    if (e.target.tagName !== "LI" || lastActiveNavLink === e.target) return;
    lastActiveNavLink = swapActiveClasses(lastActiveNavLink, e.target);
    const howTime = parseInt(lastActiveNavLink.firstElementChild.textContent);
    gsap.to(loaderDivs, {
        x: "-100%",
        duration: 0.3,
        stagger: 0.025,
        ease: "power1.in",
        onComplete: () => {
            console.log(innerHeight,howTime)
            window.scrollTo(0, howTime * innerHeight);
            burgerMenu.classList.toggle("active");
            nav.classList.toggle("active");
            gsap.to(loaderDivs, {
                x: "0%",
                duration: 0.3,
                stagger: 0.025,
                ease: "power1.in",
            });
        },
    });
};
console.log(window.innerHeight)
navLinksContainer.addEventListener("click", navLinksHandler);

// Explore
const exploreBtn = document.querySelector(".explore button");
exploreBtn.addEventListener("click", () => {
    navLinks[1].click();
    setTimeout(() => {
        burgerMenu.classList.toggle("active");
        nav.classList.toggle("active");
    }, 500);
});

// Slider
const sliderContainers = document.querySelectorAll(".slider .slider-container");
const data = {
    destination: [
        {
            title: "Moon",
            description:
                "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
            distance: "384,400 KM",
            time: "3 DAYS",
        },
        {
            title: "Mars",
            description:
                "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
            distance: "225 MIL. KM",
            time: "225 MIL. KM",
        },
        {
            title: "Europa",
            description:
                "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
            distance: "628 MIL. KM",
            time: "3 YEARS",
        },
        {
            title: "TITAN",
            description:
                "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
            distance: "1.6 BIL. KM",
            time: "7 YEARS",
        },
    ],
    crew: [
        {
            title: "Commander",
            name: "DOUGLAS HURLEY",
            description:
                "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
        },
        {
            title: "MISSION SPECIALIST",
            name: "MARK SHUTTLEWORTH",
            description:
                "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
        },
        {
            title: "PILOT",
            name: "VICTOR GLOVER",
            description:
                "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.",
        },
        {
            title: "FLIGHT ENGINEER",
            name: "ANOUSHEH ANSARI",
            description:
                "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
        },
    ],
    technology: [
        {
            title: "LAUNCH VEHICLE",
            description:
                "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
        },
        {
            title: "SPACEPORT",
            description:
                "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
        },
        {
            title: "SPACE CAPSULE",
            description:
                "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
        },
    ],
};



const setWidthForItems = (width,slides) => {

}

const changeContent = (sliderContainer, ind) => {
    const section = sliderContainer.closest("section");
    const { className } = section;
    const information = section.querySelector(".information");
    const { title, description, distance, time, name } = data[className][ind];
    const titleEl = information.querySelector(".title");
    const descEl = information.querySelector(".description");

    titleEl.textContent = title;
    descEl.textContent = description;
    if (className === "destination") {
        const distEl = information.querySelector(".distance h3");
        const timeEl = information.querySelector(".time h3");
        distEl.textContent = distance;
        timeEl.textContent = time;
    } else if (className === "crew") {
        const nameEl = information.querySelector(".name");
        nameEl.textContent = name;
    }
};


const initilizeSlider = sliderContainer => {
    const sliderControlsContainer = sliderContainer
        .closest(".container")
        .querySelector(".slider-controls");
    
    const {childElementCount} = sliderContainer 
    sliderContainer.style.width = `${childElementCount * 100}%`
    
    const slides = sliderContainer.querySelectorAll(".img");
    let lastActiveSlide = slides[0];
    let lastActiveLink = sliderControlsContainer.firstElementChild;
    const sliderHandler = event => {
        if (event.target.tagName !== "LI" || event.target === lastActiveLink)
            return;
        lastActiveLink = swapActiveClasses(lastActiveLink, event.target);
        const targetSlideInd = lastActiveLink.dataset.ind;
        lastActiveSlide = swapActiveClasses(
            lastActiveSlide,
            slides[lastActiveLink.dataset.ind]
        );
        gsap.to(".change-content-loader", {
            height: "100%",
            duration: 0.25,
            ease: "power1.in",
            onComplete: () => {
                changeContent(sliderContainer, targetSlideInd);
                gsap.to(".change-content-loader", {
                    height: "0%",
                    duration: 0.25,
                    delay: 0.15,
                    ease: "power1.in",
                });
            },
        });
        sliderContainer.style.transform = `translate(-${targetSlideInd * (100 / childElementCount)}%)`;
    };

    sliderControlsContainer.addEventListener("click", sliderHandler);
};



sliderContainers.forEach(sliderContainer => {
    initilizeSlider(sliderContainer);
});
