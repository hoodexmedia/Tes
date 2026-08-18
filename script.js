// ===============================
// WALLANCE HOTEL JAVASCRIPT
// ===============================

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Sticky Navbar Shadow
window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 20){
        navbar.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
    }else{
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
    }

});


// ===============================
// BOOKING FORM
// ===============================

const bookingForm = document.querySelector(".booking-box");

if (bookingForm) {

    const checkIn = document.querySelector("#checkin");
    const checkOut = document.querySelector("#checkout");

    const today = new Date().toISOString().split("T")[0];

    // Prevent past check-in dates
    checkIn.min = today;

    // Prevent past check-out dates
    checkOut.min = today;

    checkIn.addEventListener("change", function () {

        if (checkIn.value) {
            checkOut.min = checkIn.value;
        }

    });

    bookingForm.addEventListener("submit", function (e) {

        if (!checkIn.value) {
            e.preventDefault();
            alert("Please select a check-in date.");
            return;
        }

        if (!checkOut.value) {
            e.preventDefault();
            alert("Please select a check-out date.");
            return;
        }

        if (checkOut.value <= checkIn.value) {
            e.preventDefault();
            alert("Check-out date must be after check-in date.");
            return;
        }

    });

}


// ===============================
// SCROLL ANIMATION
// ===============================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.2
});


document.querySelectorAll(".card, .amenity, .about, .contact-grid").forEach(el=>{

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = ".6s";

    observer.observe(el);

});


// ===============================
// BACK TO TOP BUTTON
// ===============================

const topBtn = document.createElement("button");

topBtn.innerHTML = "⬆";

topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.width = "45px";
topBtn.style.height = "45px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#0f4c75";
topBtn.style.color = "#fff";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.fontSize = "18px";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});


// ===============================
// ROOM SEARCH BUTTON
// ===============================

const searchBtn = document.querySelector(".btn-primary");

if(searchBtn){

    searchBtn.addEventListener("mouseover",()=>{

        searchBtn.style.transform = "scale(1.05)";

    });

    searchBtn.addEventListener("mouseout",()=>{

        searchBtn.style.transform = "scale(1)";

    });

}
// ========================================
// WALLANCE HOTEL ROOM AVAILABILITY
// ========================================

const checkIn = document.getElementById("checkin");
const checkOut = document.getElementById("checkout");
const roomSelect = document.getElementById("room");

if (checkIn && checkOut && roomSelect) {

    // Prevent selecting dates in the past
    const today = new Date().toISOString().split("T")[0];

    checkIn.min = today;
    checkOut.min = today;

    function loadAvailableRooms() {

        const checkInDate = checkIn.value;
        const checkOutDate = checkOut.value;

        /* No dates selected */
        if (!checkInDate || !checkOutDate) {

            roomSelect.innerHTML =
                '<option value="">Select your dates first</option>';

            return;
        }

        /* Check-out must be after check-in */
        if (checkOutDate <= checkInDate) {

            roomSelect.innerHTML =
                '<option value="">Check-out must be after check-in</option>';

            return;
        }

        /* Show loading message */
        roomSelect.innerHTML =
            '<option value="">Checking available rooms...</option>';

        const url =
            "available_rooms.php" +
            "?check_in=" + encodeURIComponent(checkInDate) +
            "&check_out=" + encodeURIComponent(checkOutDate);

        fetch(url)

            .then(async response => {

                const data = await response.text();

                console.log("available_rooms.php response:", data);

                if (!response.ok) {
                    throw new Error(
                        "Server returned " +
                        response.status +
                        ": " +
                        data
                    );
                }

                return data;
            })

            .then(data => {

                roomSelect.innerHTML = data;

            })

            .catch(error => {

                console.error(
                    "ROOM LOADING ERROR:",
                    error
                );

                roomSelect.innerHTML =
                    '<option value="">Unable to load rooms</option>';
            });
    }

    checkIn.addEventListener(
        "change",
        loadAvailableRooms
    );

    checkOut.addEventListener(
        "change",
        loadAvailableRooms
    );
}