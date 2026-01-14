// Custom Navbar Component
class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="bg-black bg-opacity-80 border-b-2 border-gray-700 sticky top-0 z-50 backdrop-blur-sm">
                <div class="container mx-auto px-4 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <h1 class="text-2xl font-racing text-red-600">🏁 Pomidoro Grand Prix</h1>
                        </div>
                        <div class="flex items-center space-x-6">
                            <a href="#" class="text-gray-300 hover:text-white transition-colors">Главная</a>
                            <a href="#" class="text-gray-300 hover:text-white transition-colors">О проекте</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);




