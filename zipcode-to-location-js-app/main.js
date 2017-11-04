// Listen for submit event
document.querySelector('#zipform').addEventListener('submit', getLocationInfo);

// Listen for delete
document.querySelector('body').addEventListener("click", deleteLocation);

function getLocationInfo(e) {
    // get zip value from input
    const zip = document.querySelector('.zip').value;
    console.log(zip);
    
    // make API request
   fetch(`http://api.zippopotam.us/us/${zip}`)
    .then(response => {
        if (response.status != 200) {  // if status is not 200
            showIcon('remove');  // show the remove icon
            document.querySelector('#output').innerHTML = `<article class="message is-danger">
                <div class="message-body">Invalid Zipcode, please try again</div>
            </article>`;         // show an alert about invalid zipcode   
            throw Error(response.statusText);   //throw error
        }
        else {   // if status is 200
            showIcon('check');    // show the checked icon
            return response.json();  //return response from API
        }
    })
    .then(data => {
        // Show location info
        let output = '';
        // add html content for each place
        data.places.forEach(place => {
            output += `
                  <article class="message is-primary">
                    <div class="message-header">
                      <p>Location Info</p>
                      <button class="delete"></button>
                    </div>
                    <div class="message-body">
                      <ul>
                        <li><strong>City: </strong>${place['place name']}</li>
                        <li><strong>State: </strong>${place['state']}</li>
                        <li><strong>Longitude: </strong>${place['longitude']}</li>
                        <li><strong>Latitude: </strong>${place['latitude']}</li>
                      </ul>
                    </div>
                  </article>
                `;
        });
        // Insert into output div
        document.querySelector('#output').innerHTML = output;
    })
    .catch(err => console.log(err));

    e.preventDefault();
}

// Show check or remove icon
function showIcon(icon) {
    // Clear icons
    document.querySelector(".icon-remove").style.display = "none";
    document.querySelector(".icon-check").style.display = "none";

    // Show only the correct icon
    document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

// Delete location box
function deleteLocation(e) {
    // if delete button is clicked, delete location box and clear input and icon
    if (e.target.className == 'delete') {
        document.querySelector('.message').style.display = 'none';
        document.querySelector('.zip').value = '';
        document.querySelector('.icon-check').style.display = 'none';
    }
  }
