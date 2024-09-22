document.getElementById('convertButton').addEventListener('click', function() {
    const temperature = parseFloat(document.getElementById('temperature').value);
    const unit = document.getElementById('type').value;
    let result;

    if (isNaN(temperature)) {
        document.getElementById('result').innerText = 'Please enter a valid number.';
        return;
    }

    switch (unit) {
        case 'C':
            result = `Fahrenheit: ${(temperature * 9/5) + 32} °F, Kelvin: ${temperature + 273.15} K`;
            break;
        case 'F':
            result = `Celsius: ${(temperature - 32) * 5/9} °C, Kelvin: ${((temperature - 32) * 5/9) + 273.15} K`;
            break;
        case 'K':
            result = `Celsius: ${temperature - 273.15} °C, Fahrenheit: ${(temperature - 273.15) * 9/5 + 32} °F`;
            break;
        default:
            result = 'Invalid unit selected.';
    }

    document.getElementById('result').innerText = result;
});
