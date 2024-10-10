// Fetch the mock data from the JSON file
fetch('manhwas.json')
    .then(response => response.json())
    .then(data => {
        const manhwaList = document.getElementById('manhwa-list');

        // Loop through each manhwa and create an HTML structure for it
        data.forEach(manhwa => {
            const manhwaItem = document.createElement('div');
            manhwaItem.classList.add('manhwa-item');
            manhwaItem.innerHTML = `
                <img src="${manhwa.image_url}" alt="${manhwa.title}" />
                <h2>${manhwa.title}</h2>
                <p><strong>Genre:</strong> ${manhwa.genre}</p>
                <p>${manhwa.description}</p>
            `;
            manhwaList.appendChild(manhwaItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
