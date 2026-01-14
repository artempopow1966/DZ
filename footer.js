// Custom Footer Component
class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-black bg-opacity-80 border-t-2 border-gray-700 mt-12 py-8">
                <div class="container mx-auto px-4 text-center">
                    <p class="text-gray-400 font-racing">© 2025 Pomodoro Grand Prix. Все права защищены.</p>
                    <p class="text-gray-500 text-sm mt-2">Техника помидоро для повышения продуктивности</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);




