import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();

  const project = projects.find((p) => p.slug === slug);

  // Project not found
  if (!project) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Project Not Found
          </h1>

          <p className="text-gray-600 mt-3">
            The project you are looking for does not exist.
          </p>

          <Link
            to="/projects"
            className="inline-block mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* BACK TO PROJECTS */}
        <Link
          to="/projects"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition"
        >
          ← Back to Projects
        </Link>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 md:h-96 object-cover"
          />

          <div className="p-6 md:p-10">

            {/* TITLE */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              {project.title}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              {project.description}
            </p>

            {/* TECHNOLOGIES */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Technologies
              </h2>

              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT OVERVIEW */}
        {project.overview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow p-6 md:p-8 mt-10"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Project Overview
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {project.overview}
            </p>
          </motion.div>
        )}

        {/* KEY FEATURES */}
        {project.features?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow p-6 md:p-8 mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Key Features
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <span className="text-blue-600 font-bold text-lg">
                    ✓
                  </span>

                  <p className="text-gray-600">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ENGINEERING FOCUS */}
        {project.engineeringFocus?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow p-6 md:p-8 mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Engineering Focus
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {project.engineeringFocus.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
                >
                  <p className="font-medium text-gray-800">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* PROJECT LINKS */}
        <div className="flex flex-wrap gap-4 mt-10 mb-10">

          {/* GitHub */}
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              View GitHub →
            </a>
          )}

          {/* Live Demo */}
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Live Demo →
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
