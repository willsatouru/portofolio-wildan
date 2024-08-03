document.getElementById('topupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value.trim();
    const amount = document.getElementById('amount').value;
    const responseMessage = document.getElementById('responseMessage');
    const progressWrapper = document.getElementById('progressWrapper');
    const progressBar = document.getElementById('progressBar');

    // Hide progress bar initially
    progressWrapper.classList.add('hidden');
    progressBar.style.width = '0%';

    // Simple validation for userId (e.g., must be alphanumeric and at least 3 characters long)
    const idPattern = /^[a-zA-Z0-9]{3,}$/;
    if (!idPattern.test(userId)) {
        responseMessage.innerHTML = `<span style="color: #ff0000;">ID Pengguna tidak valid. Harus alphanumeric dan minimal 3 karakter.</span>`;
        return;
    }

    if (amount > 0) {
        // Simulate progress bar animation
        progressWrapper.classList.remove('hidden');
        progressBar.style.width = '100%';

        // Simulate a delay to mimic processing time
        setTimeout(() => {
            responseMessage.innerHTML = `<span style="color: #00ff00;">Berhasil top-up ${amount} diamond untuk ID Pengguna ${userId}!</span>`;
        }, 2000); // Adjust delay as needed

    } else {
        responseMessage.innerHTML = `<span style="color: #ff0000;">Jumlah diamond harus lebih dari 0.</span>`;
    }
});