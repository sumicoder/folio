export function resize() {
    let device;
    if (window.innerWidth > 768) {
        device = 1;
    } else {
        device = 0;
    }
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 768 && device == 1) {
            location.reload();
        } else if (window.innerWidth > 768 && device == 0) {
            location.reload();
        }
    })
}