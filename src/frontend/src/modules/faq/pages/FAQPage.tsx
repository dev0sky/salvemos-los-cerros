import React, { useState, useEffect } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconHelpCircle,
} from "@tabler/icons-react";
import api from "../../../lib/api";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await api.get("/faqs/");
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4">
          <IconHelpCircle size={32} />
        </div>
        <h1 className="text-4xl font-bold text-text-main mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          Encuentra respuestas a las dudas más comunes sobre nuestra
          organización y cómo puedes ayudar.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {loading ? (
          <div className="text-center py-8 text-text-muted">
            Cargando preguntas...
          </div>
        ) : faqs.length > 0 ? (
          faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-card border border-border-soft rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-text-main text-lg">
                  {faq.question}
                </span>
                {openId === faq.id ? (
                  <IconChevronUp className="text-primary" />
                ) : (
                  <IconChevronDown className="text-text-muted" />
                )}
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-6 text-text-muted leading-relaxed border-t border-border-soft pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-text-muted">
            No hay preguntas frecuentes disponibles por el momento.
          </div>
        )}
      </div>
    </div>
  );
};
