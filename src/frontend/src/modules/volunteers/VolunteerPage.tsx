import React from "react";
import { useTranslation } from "react-i18next";
import { VolunteerForm } from "./components/VolunteerForm";

export const VolunteerPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-text-main mb-8">
        {t("volunteer.title")}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-text-muted mb-6">{t("volunteer.intro")}</p>
          <div className="bg-surface rounded-2xl p-6 border border-border-soft">
            <h3 className="text-xl font-semibold text-text-main mb-4">
              {t("volunteer.why_title")}
            </h3>
            <ul className="space-y-3 text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                {t("volunteer.reason_1")}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                {t("volunteer.reason_2")}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                {t("volunteer.reason_3")}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                {t("volunteer.reason_4")}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <VolunteerForm />
        </div>
      </div>
    </div>
  );
};
