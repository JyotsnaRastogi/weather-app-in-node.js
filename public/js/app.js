const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = input.value;
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
                msg2.textContent = '';
                console.log(data.error);
                return;
            }
            msg2.textContent = data.forecast;
            msg1.textContent = data.location;
            console.log(data.forecast);
        })
    })
    console.log(location)
})
