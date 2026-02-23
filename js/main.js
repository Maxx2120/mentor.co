let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadConfig();
        await loadMentors();
        await loadCareers();
        setupFilters();
    } catch (error) {
        console.error("Failed to initialize Dashboard:", error);
    }
});

async function loadConfig() {
    const res = await fetch('/api/config');
    const config = await res.json();

    // Set Config Items
    document.getElementById('app-title').textContent = config.app_title;
    document.getElementById('search-input').placeholder = config.search_placeholder;
    document.getElementById('mentors-title').textContent = config.mentors_section_title;
    document.getElementById('careers-title').textContent = config.careers_section_title;

    // Apply styling from config
    document.body.style.fontFamily = `${config.font_family}, sans-serif`;
    document.documentElement.style.fontSize = `${config.font_size}px`;
    document.body.style.backgroundColor = config.background_color;
}

async function loadMentors() {
    const res = await fetch('/api/mentors');
    const mentors = await res.json();

    const container = document.getElementById('mentor-container');
    const mentorCardsHTML = mentors.map((m, index) => `
        <div class="mentor-card flex-shrink-0 w-44 bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer" style="box-shadow: 0 4px 20px -4px rgba(0,0,0,0.08);">
            <!-- Video Layer -->
            <div class="video-layer relative w-full bg-slate-100 flex items-center justify-center overflow-hidden group">
                ${m.videoSrc ? `
                    <video class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="${m.videoSrc}" loop muted playsinline onmouseenter="this.play(); this.muted = false;" onmouseleave="this.pause(); this.muted = true;"></video>
                ` : `
                    <div class="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-300"></div>
                `}
                <div class="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-lg z-10">
                    ${m.duration}
                </div>
            </div>
            <!-- Details Layer -->
            <div class="p-4 border-t border-gray-100 bg-white relative z-10 flex flex-col justify-between" style="min-height: 104px;">
                <div class="mb-3">
                    <h3 class="font-semibold text-gray-900 truncate text-sm">${m.name}</h3>
                    <p class="text-xs text-gray-500">${m.role}</p>
                </div>
                <div class="flex items-center justify-between mt-auto">
                    <div class="flex items-center gap-1">
                        <svg class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewbox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="text-xs font-medium text-gray-700">${m.rating}</span>
                    </div>
                    <span class="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">${m.experience}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Setup seamless scrolling marquee
    container.className = "flex overflow-hidden pb-4 relative w-full group [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]";
    container.innerHTML = `
        <div class="flex gap-5 animate-slide hover:pause-slide w-max px-2">
            ${mentorCardsHTML}
            ${mentorCardsHTML}
        </div>
    `;
}

async function loadCareers() {
    const res = await fetch('/api/careers');
    const careers = await res.json();

    const container = document.getElementById('career-grid');
    container.innerHTML = careers.map(c => `
        <div class="career-card hover-lift bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer" style="box-shadow: 0 4px 20px -4px rgba(0,0,0,0.08);" data-category="${c.category}">
            <div class="w-12 h-12 rounded-xl bg-${c.iconColor}-50 flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-${c.iconColor}-600" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${c.iconPath}"></path>
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${c.title}</h3>
            <p class="text-sm text-gray-500 mb-4 line-clamp-2">${c.desc}</p>
            <button class="w-full py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"> View Roadmap </button>
        </div>
    `).join('');
}

function setupFilters() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.dataset.category;
            activeCategory = category;

            // Update button styles
            buttons.forEach(b => {
                if (b.dataset.category === category) {
                    b.className = 'category-btn px-5 py-2.5 text-sm font-medium rounded-xl transition-all bg-slate-800 text-white';
                } else {
                    b.className = 'category-btn px-5 py-2.5 text-sm font-medium rounded-xl transition-all bg-white text-gray-600 border border-gray-200 hover:bg-gray-50';
                }
            });

            // Filter career cards
            document.querySelectorAll('.career-card').forEach(card => {
                const cardCategory = card.dataset.category;
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
