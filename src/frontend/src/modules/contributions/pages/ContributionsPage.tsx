import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IconHeartHandshake, IconExternalLink } from "@tabler/icons-react";
import api from "../../../lib/api";

interface ContributionItem {
  id: number;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
}

export const ContributionsPage: React.FC = () => {
  const { t } = useTranslation();
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const response = await api.get("/contributions/");
      setContributions(response.data);
    } catch (error) {
      console.error("Error fetching contributions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4">
          <IconHeartHandshake size={32} />
        </div>
        <h1 className="text-4xl font-bold text-text-main mb-4">
          {t("contributions.title")}
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          {t("contributions.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-8 text-text-muted">
            {t("contributions.loading")}
          </div>
        ) : contributions.length > 0 ? (
          contributions.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border-soft rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              {item.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-text-main mb-3">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm mb-6 flex-1 leading-relaxed">
                  {item.description}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors w-full"
                  >
                    <span>{t("contributions.more_info")}</span>
                    <IconExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-text-muted">
            {t("contributions.empty")}
          </div>
        )}
      </div>
    </div>
  );
};
