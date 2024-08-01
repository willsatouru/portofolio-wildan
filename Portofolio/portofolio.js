document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil data dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Tampilkan notifikasi
    alert(`Maaciii, ${name}! Pesan Anda telah terkirim.`);

    // Reset form
    e.target.reset();
});