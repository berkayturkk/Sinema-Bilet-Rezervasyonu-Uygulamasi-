// Gerekli elementlerin secilmesi
const container = document.querySelector(".container");
const select = document.querySelector("#movie");
const quantity = document.querySelector("#quantity");
const money = document.querySelector("#money");
const paid = document.querySelector("#paid");
const seats = document.querySelectorAll(".seat:not(.reserved)");


getFromLocalStorage();
calculateTotal();


// container elementine click eventi tanimlanmasi
// koltuklara tiklanma olayinin tanimlanmasi
container.addEventListener("click",function(e){
    // koltuk olan ve dolu olmayan koltuklara tiklanma olayi eklendi
    if(e.target.classList.contains("seat") && !e.target.classList.contains("selected"))
    {   
        // toggle metodu ile o class varsa silecek yoksa ekleyecek
        e.target.classList.toggle("selected"); 

        calculateTotal();
          
    }
});


// Bilet fiyatlarini secimlere gore duzenlenmesi saglandi
select.addEventListener("change",function(e){

    calculateTotal();

});

function calculateTotal() {

    // secili koltuklarin alinmasi
    const selectedSeats = container.querySelectorAll(".seat.selected");

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    }); 

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })



    // secili koltuk sayisinin bulunmasi
    let selectedSeatCount = container.querySelectorAll(".seat.selected").length;

    // secili olan koltuk sayisini sayfa uzerinde gosterilmesi
    quantity.innerHTML = selectedSeatCount;

    // Bilet fiyatinin sayfa uzerinde gosterilmesi
    let price = select.value;
    money.innerHTML = `${price} ₺`;

    // Odenecek tutarin sayfa uzerinde gosterilmesi
    paid.innerHTML = `${selectedSeatCount*price} ₺`;

    saveToLocalStorage(selectedSeatIndexs);
}

// localStorage ile secili koltuk ve film indeksleri kaydedildi
function saveToLocalStorage(indexs) {
    localStorage.setItem("selectedSeats",JSON.stringify(indexs));
    localStorage.setItem("selectedMovieIndex",select.selectedIndex);
};

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats != null && selectedSeats.length>0) {
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("reserved");
            }
        });
    };


    const selectedMovieIndex = JSON.parse(localStorage.getItem("selectedMovieIndex"));

    if(selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
};
