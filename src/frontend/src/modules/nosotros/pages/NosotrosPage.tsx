import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { IconUsers, IconLeaf, IconTarget } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import {
  PAGE_VARIANTS,
  FADE_UP_ITEM,
  STAGGER_CONTAINER,
} from "@/constants/animations";

export const NosotrosPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="space-y-12 md:space-y-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      {/* Hero Section */}
      <section className="bg-surface rounded-3xl p-10 md:p-16 text-center space-y-6">
        <motion.div
          className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4"
          variants={FADE_UP_ITEM}
        >
          <IconUsers size={32} />
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-text-main"
          variants={FADE_UP_ITEM}
        >
          {t("nosotros_page.title")}
        </motion.h1>
        <motion.p
          className="text-lg text-text-muted max-w-2xl mx-auto"
          variants={FADE_UP_ITEM}
        >
          {t("nosotros_page.subtitle")}
        </motion.p>
      </section>

      {/* Misión y Visión */}
      <section className="container mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={STAGGER_CONTAINER}
        >
          <motion.div variants={FADE_UP_ITEM} className="h-full">
            <Card className="p-8 h-full flex flex-col items-center text-center space-y-4 hover:border-primary/30 transition-colors">
              <div className="p-3 bg-accent-green/10 rounded-full text-accent-green">
                <IconTarget size={32} />
              </div>
              <h2 className="text-2xl font-bold text-text-main">
                {t("nosotros_page.mission_title")}
              </h2>
              <p className="text-text-muted leading-relaxed">
                {t("nosotros_page.mission_text")}
              </p>
            </Card>
          </motion.div>

          <motion.div variants={FADE_UP_ITEM} className="h-full">
            <Card className="p-8 h-full flex flex-col items-center text-center space-y-4 hover:border-primary/30 transition-colors">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <IconLeaf size={32} />
              </div>
              <h2 className="text-2xl font-bold text-text-main">
                {t("nosotros_page.vision_title")}
              </h2>
              <p className="text-text-muted leading-relaxed">
                {t("nosotros_page.vision_text")}
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Impacto (Placeholder) */}
      <section className="container mx-auto px-4">
        <motion.div
          className="bg-secondary/5 rounded-3xl p-8 md:p-12 text-center"
          variants={FADE_UP_ITEM}
        >
          <h2 className="text-3xl font-bold text-text-main mb-8">
            {t("nosotros_page.impact_title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Eventos" },
              { number: "1000+", label: "Voluntarios" },
              { number: "5", label: "Cerros Protegidos" },
              { number: "20+", label: "Aliados" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-text-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Equipo (Placeholder) */}
      <section className="container mx-auto px-4 text-center space-y-12">
        <motion.div variants={FADE_UP_ITEM}>
          <h2 className="text-3xl font-bold text-text-main mb-4">
            {t("nosotros_page.team_title")}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t("nosotros_page.team_subtitle")}
          </p>
        </motion.div>

        {/* Aquí iría el grid de miembros del equipo cuando haya datos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Placeholder cards */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              variants={FADE_UP_ITEM}
              className="bg-card rounded-2xl p-6 border border-border-soft space-y-4"
            >
              <div className="w-24 h-24 bg-secondary/20 rounded-full mx-auto" />
              <div>
                <h3 className="font-semibold text-text-main">Miembro {i}</h3>
                <p className="text-sm text-text-muted">
                  Rol en la organización
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
