document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let valid = true;

    // Clear previous errors
    document.querySelectorAll('.feedback').forEach(el => el.style.display = 'none');

    // Validate name
    const name = document.getElementById('name').value;
    if (name.trim() === '') {
        document.getElementById('nameFeedback').style.display = 'block';
        valid = false;
    }

    // Validate email
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailFeedback').style.display = 'block';
        valid = false;
    }

    // Validate password
    const password = document.getElementById('password').value;
    if (password.length < 6) {
        document.getElementById('passwordFeedback').style.display = 'block';
        valid = false;
    }

    if (valid) {
        alert('Pendaftaran berhasil!');
        // Process the form here (e.g., send data to the server)
    }
});