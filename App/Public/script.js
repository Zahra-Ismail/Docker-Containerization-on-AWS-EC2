document.addEventListener('DOMContentLoaded', () => {
    // === Dark Mode Logic ===
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme or default to light
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
        themeIcon.classList.add('text-warning');
    } else {
        body.setAttribute('data-theme', 'light');
    }

    // Toggle Theme Event
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update Icon
        if (newTheme === 'dark') {
            themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
            themeIcon.classList.add('text-warning');
        } else {
            themeIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
            themeIcon.classList.remove('text-warning');
        }
    });

    // === Copy URL Logic ===
    const copyBtn = document.getElementById('copyBtn');
    const urlInput = document.getElementById('urlInput');

    copyBtn.addEventListener('click', () => {
        const textToCopy = urlInput.value;

        // Use Clipboard API
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Visual Feedback
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
            copyBtn.classList.replace('btn-primary', 'btn-success');

            // Revert after 2 seconds
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.classList.replace('btn-success', 'btn-primary');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            copyBtn.textContent = 'Error';
        });
    });
});
