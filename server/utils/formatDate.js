module.exports = function formatDate(dateStr) {
    const date = new Date(dateStr);

    // Format: Month Day, Year
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate
}