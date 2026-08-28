import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import SkillsPage from '@/pages/SkillsPage';
import RoadmapPage from '@/pages/RoadmapPage';
import ProjectsPage from '@/pages/ProjectsPage';
import GitHubPage from '@/pages/GitHubPage';
import BlogPage from '@/pages/BlogPage';
import InterviewPage from '@/pages/InterviewPage';
import FreelancePage from '@/pages/FreelancePage';
import DashboardPage from '@/pages/DashboardPage';
import ContactPage from '@/pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/github" element={<GitHubPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/freelance" element={<FreelancePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
