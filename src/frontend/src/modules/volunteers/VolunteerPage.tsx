import React from "react";
import { VolunteerForm } from "./components/VolunteerForm";

export const VolunteerPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-text-main mb-8">Voluntariado</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-text-muted mb-6">
            Únete a nuestra comunidad de voluntarios y ayúdanos a preservar los
            cerros de nuestra ciudad. Tu participación es fundamental para
            lograr un impacto positivo en nuestro entorno.
          </p>
          <div className="bg-surface rounded-2xl p-6 border border-border-soft">
            <h3 className="text-xl font-semibold text-text-main mb-4">
              ¿Por qué ser voluntario?
            </h3>
            <ul className="space-y-3 text-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Contribuye a la conservación del medio ambiente.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Aprende sobre la flora y fauna local.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Conoce personas con tus mismos intereses.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Participa en eventos exclusivos para voluntarios.
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
