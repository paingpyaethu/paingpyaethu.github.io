$(window).on("load", function () {
    /**************** Preloader ******************/
    $(".preloader").fadeOut("slow");
});

/************ Navbar Scroll ************/
$(window).scroll( () => {
    let currentPosition = $(this).scrollTop();
    if (currentPosition > 500){
        $('.menu').addClass('scroll-menu');
    }else {
        $('.menu').removeClass('scroll-menu');
    }
});

/************** Menu Icon **************/

$(".navbar-toggler").on("click", function () {

    if($(".menu-icon").hasClass("fa-bars")){
        $(".menu-icon").removeClass("fa-bars").addClass("fa-times");
    }else{
        $(".menu-icon").removeClass("fa-times").addClass("fa-bars");
    }
});

/************** Navbar Collapse **************/

$(".nav-link").on("click", function () {

    if ($(".menu-icon").hasClass("fa-times")){
        $(".menu-icon").removeClass("fa-times").addClass("fa-bars");
        $(".navbar-collapse").collapse("hide");
    }
});

/************** Navbar Scroll - Set Active **************/
// function setActive(current) {
//
//     $(".nav-link").removeClass("current-section");
//
//     $(`.nav-link[href='#${current}']`).addClass('current-section');
//
// }

// function navScroll() {
//
//     let currentSection = $("section[id]");
//     currentSection.waypoint(function (direction) {
//
//         if(direction === "down"){
//             let currentSectionId = $(this.element).attr('id');
//             console.log(currentSectionId);
//             setActive(currentSectionId);
//         }
//     }, {offset: '150px'});
//
//     currentSection.waypoint(function (direction) {
//
//         if(direction === "up"){
//             let currentSectionId = $(this.element).attr('id');
//             console.log(currentSectionId);
//             setActive(currentSectionId);
//         }
//     }, {
//         offset: function () {
//             return -$(this.element).height() +155;
//         }
//     });
// }
// navScroll();




$('.counter').counterUp({
    delay: 10,
    time: 1000
});

/************* Page Scrolling - ScrollIt ***************/

$.scrollIt({
    topOffset: -20          // offste (in px) for fixed top navigation
});

/************** Wow Js - Scroll Animation **************/
wow = new WOW(
    {
        offset:  100,
    }
)
wow.init();

/*-------------------- Skills Bar --------------------*/
$('.skills').waypoint(function () {
    $('.progress .progress-bar').each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
}, {offset: '80%'});


/*-------------------- Toggle Body Scrolling --------------------*/
function toggleBodyScrolling() {
    document.body.classList.toggle("hide-scrolling");
}

/*-------------------- Filter Portfolio Items --------------------*/
const filterBtnContainer = document.querySelector(".portfolio-filter");
const portfolioFilterActiveBtn = document.querySelector(".portfolio-filter-btn.active")
const portfolioItem = document.querySelectorAll(".portfolio-item");
let portfolioItems;

filterBtnContainer.addEventListener("click", (e) =>{
    if (e.target.classList.contains("portfolio-filter-btn") && !e.target.classList.contains("active")){
        // Remove Active Class From Selected Btn
        filterBtnContainer.querySelector(".active").classList.remove("active");
        // Add Active Class To Selected Btn
        e.target.classList.add("active");
        toggleBodyScrolling();

        document.querySelector(".filter-status").classList.add("active");
        document.querySelector(".filter-status p").innerHTML = ` filtering <span>${e.target.innerHTML}</span> works `;

        setTimeout(() =>{
            filterItems(e.target);
        }, 400);
        setTimeout(() =>{
            toggleBodyScrolling();
            document.querySelector(".filter-status").classList.remove("active");
        }, 400)

    }
})

function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter");
    portfolioItem.forEach((i) =>{
        const category = i.getAttribute("data-category").split(" ");

        if (category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
            i.classList.add("show");
        }else {
            i.classList.remove("show");
        }
    });
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
}
// Get Filter Active Category Portfolio Items
filterItems(portfolioFilterActiveBtn);

/*-------------------- Portfolio Item Details Popup --------------------*/
let portfolioItemIndex;
document.addEventListener("click", (e) =>{
    if (e.target.closest(".portfolio-item")){
        const currentItem = e.target.closest(".portfolio-item");
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
        togglePopup();
        portfolioItemDetails();
        updateNextPrevItem();

    }
});

function togglePopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
    document.querySelector(".pp-thumbnail img").src =
        portfolioItems[portfolioItemIndex].querySelector("img").src;
    document.querySelector(".pp-header h3").innerHTML =
        portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;
    document.querySelector(".pp-body").innerHTML =
        portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;
    document.querySelector(".pp-counter").innerHTML =
    ` ${portfolioItemIndex + 1} of ${portfolioItems.length} ( <span title="category">${document.querySelector(".portfolio-filter-btn.active").innerHTML
    }</span> ) `;

}

function updateNextPrevItem() {
    if (portfolioItemIndex !== 0){
        document.querySelector(".pp-footer-left").classList.remove("hidden");
        document.querySelector(".pp-footer-left h3").innerHTML =
            portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-left img").src =
            portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
    }else {
        document.querySelector(".pp-footer-left").classList.add("hidden");
    }

    if (portfolioItemIndex !== portfolioItems.length - 1){
        document.querySelector(".pp-footer-right").classList.remove("hidden");
        document.querySelector(".pp-footer-right h3").innerHTML =
            portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-right img").src =
            portfolioItems[portfolioItemIndex + 1].querySelector("img").src;
    }else {
        document.querySelector(".pp-footer-right").classList.add("hidden");
    }
}

document.querySelector(".pp-prev-btn").addEventListener("click", () =>{
    changePortfolioItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () =>{
    changePortfolioItem("next");
});

function changePortfolioItem(direction) {
    if (direction === "prev"){
        portfolioItemIndex--;
    }else {
        portfolioItemIndex++;
    }
    document.querySelector(".pp-overlay").classList.add(direction);
    setTimeout(() =>{
        document.querySelector(".pp-inner").scrollTo(0,0);
        portfolioItemDetails();
        updateNextPrevItem();
    }, 400);

    setTimeout(() =>{
        document.querySelector(".pp-overlay").classList.remove(direction);
    }, 1000)
}

