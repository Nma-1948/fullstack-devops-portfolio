import { useState } from "react";
import axios from "axios";

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      await axios.post("/api/contact", form);

      setForm(INITIAL_FORM);
      setStatus({
        type: "success",
        message: "Message sent successfully.",
      });
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Contact Me
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4" >
          <div>
            <label htmlFor="contact-name" className="sr-only">
              Your Name
            </label>

            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="sr-only">
              Your Email
            </label>

            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="sr-only">
              Your Message
            </label>

            <textarea
              id="contact-message"
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status.message && (
          <div
            role="alert"
            aria-live="polite"
            className={
              status.type === "success"
                ? "text-green-600 text-center"
                : "text-red-600 text-center"
            }
          >
            {status.message}
          </div>
        )}

        <div className="text-center space-y-4 mt-6">
          <h2 className="text-xl font-semibold">
            Connect with me
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/2347032951395"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              WhatsApp
            </a>

            <a
              href="https://www.facebook.com/ikenna.ndumele.2025"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Facebook
            </a>

            <a
              href="https://www.instagram.com/ndumeleikenna"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
            >
              Instagram
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 mt-8 text-center">
          <h3 className="text-xl font-semibold mb-3">
            Get in Touch
          </h3>

          <p className="text-gray-600 mb-2">
            📍 Nigeria | Open to Remote Work
          </p>

          <p className="text-gray-600">
            📧{" "}
            <a
              href="mailto:ndumeleikenna@gmail.com"
              className="text-blue-500 hover:underline"
            >
              ndumeleikenna@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
