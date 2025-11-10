const calcFuel = (km, litersPer100km) => (km * litersPer100km) / 100;
let distance = 0;
if (confirm("Приступаем?")) {
    document.getElementById('message').textContent = "Жизнь продолжается, и мы должны двигаться дальше";
    while (true) {
        let input = prompt("Введите длину пути в километрах:");
        if (input === null) {
            document.getElementById('message').textContent = "Вы отменили ввод пути";
            break;
        }
        distance = Number(input);
        if (distance > 0) break;
        alert("Введите число больше нуля!");
    }
} else {
    document.getElementById('message').textContent = "Камень остается на месте";
}
document.getElementById('fuelSlider').oninput = function() {
    document.getElementById('fuelValue').textContent = this.value;
};
document.getElementById('motorcycle').onclick = function() {
    checkFuel(5);
};
document.getElementById('car').onclick = function() {
    checkFuel(10);
};
function checkFuel(consumption) {
    if (distance <= 0) {
        alert("Сначала введите длину пути!");
        return;
    }
    let fuel = Number(document.getElementById('fuelSlider').value);
    let needed = calcFuel(distance, consumption);
    if (fuel >= needed) {
        document.getElementById('result').innerHTML = '<img src="sm_1.png" alt="Хватит">';
    } else {
        document.getElementById('result').innerHTML = '<img src="sm_2.png" alt="Не хватит">';
    }
}