function updatePriceValue(value) {
    document.getElementById('priceValue').textContent = '$' + value;
}

function applyFilters() {
    const searchInput = document.getElementById('searchBar').value;
    const minRating = document.getElementById('minRating').value;
    const priceRange = document.getElementById('priceRange').value;
    const minReviews = document.getElementById('minReviews').value;

    // Display the filters applied in the console for debugging
    console.log(`Search: ${searchInput}, Rating: ${minRating}, Price: ${priceRange}, Reviews: ${minReviews}`);

    // Here, integrate with backend or display results manually for demonstration
    const resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = `<p>Showing results for "${searchInput}" with Rating >= ${minRating} stars, Price <= $${priceRange}, and minimum ${minReviews} reviews.</p>`;
}

// Additional JavaScript can be added to fetch and display data from the backend.
