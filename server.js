import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Content Config API
app.get('/api/config', (req, res) => {
    res.json({
        app_title: 'Mentor Bridge',
        search_placeholder: 'Search mentors, careers, skills...',
        mentors_section_title: 'Top Rated Mentors',
        careers_section_title: 'Career Suggestions',
        background_color: '#FFFFFF',
        text_color: '#111827',
        secondary_text_color: '#6B7280',
        accent_color: '#1E293B',
        border_color: '#E5E7EB',
        font_family: 'Plus Jakarta Sans',
        font_size: 16
    });
});

// Mentors API
app.get('/api/mentors', (req, res) => {
    res.json([
        { id: '1', initials: 'DS', name: 'Dr. Sharma', role: 'AI Professor', rating: 4.9, experience: '12y', duration: '3:24', colors: 'from-blue-500 to-indigo-600', bgColors: 'from-blue-100 to-indigo-100', textColors: 'text-blue-600', videoSrc: '/videos/mentor5.mp4' },
        { id: '2', initials: 'SP', name: 'Sarah Patel', role: 'UX Director', rating: 4.8, experience: '8y', duration: '5:12', colors: 'from-purple-500 to-pink-600', bgColors: 'from-purple-100 to-pink-100', textColors: 'text-purple-600', videoSrc: '/videos/mentor1.mp4' },
        { id: '3', initials: 'MC', name: 'Michael Chen', role: 'Tech Lead', rating: 4.9, experience: '15y', duration: '4:18', colors: 'from-cyan-500 to-blue-600', bgColors: 'from-cyan-100 to-blue-100', textColors: 'text-cyan-600', videoSrc: '/videos/mentor3.mp4' },
        { id: '4', initials: 'EJ', name: 'Emily Johnson', role: 'Business Coach', rating: 4.7, experience: '10y', duration: '6:45', colors: 'from-orange-500 to-red-600', bgColors: 'from-orange-100 to-red-100', textColors: 'text-orange-600', videoSrc: '/videos/mentor2.mp4' },
        { id: '5', initials: 'AK', name: 'Alex Kumar', role: 'ML Engineer', rating: 4.9, experience: '7y', duration: '7:02', colors: 'from-emerald-500 to-teal-600', bgColors: 'from-emerald-100 to-teal-100', textColors: 'text-emerald-600', videoSrc: '/videos/mentor4.mp4' }
    ]);
});

// Careers API
app.get('/api/careers', (req, res) => {
    res.json([
        { id: '1', category: 'ai', title: 'Machine Learning Engineer', iconColor: 'blue', desc: 'Build and deploy ML models to solve complex problems. High demand in tech industry.', iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { id: '2', category: 'design', title: 'UX/UI Designer', iconColor: 'purple', desc: 'Create beautiful, user-centered digital experiences. Blend creativity with psychology.', iconPath: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
        { id: '3', category: 'technology', title: 'Full Stack Developer', iconColor: 'cyan', desc: 'Master both frontend and backend development. Build complete web applications.', iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
        { id: '4', category: 'business', title: 'Product Manager', iconColor: 'orange', desc: 'Lead product strategy and development. Bridge business goals with user needs.', iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { id: '5', category: 'ai', title: 'Data Scientist', iconColor: 'indigo', desc: 'Extract insights from data using statistics and ML. Drive data-informed decisions.', iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
        { id: '6', category: 'technology', title: 'Cybersecurity Analyst', iconColor: 'pink', desc: 'Protect systems and data from cyber threats. High demand across all industries.', iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
    ]);
});

app.listen(PORT, () => {
    console.log(`Mentor Bridge Server running on http://localhost:${PORT}`);
});
