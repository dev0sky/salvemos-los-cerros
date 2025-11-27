import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  IconUsers,
  IconLeaf,
  IconTarget,
  IconTrees,
  IconCalendarEvent,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { TeamMember } from "@/components/TeamMember";
import { useTeam, useStatistics } from "@/hooks/useData";

const PAGE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FADE_UP_ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const NosotrosPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: teamMembers, isLoading: isTeamLoading } = useTeam();
  const { data: rawStatistics, isLoading: isStatsLoading } = useStatistics();

  const isLoading = isTeamLoading || isStatsLoading;

  const stats = rawStatistics?.stats || {
    total_events: 0,
    total_volunteers: 0,
    trees_planted: 0,
    protected_cerros: 0,
  };

  const impactStats = [
    {
      number: stats.total_events ? `${stats.total_events}+` : "0",
      label: "Eventos Realizados",
      icon: IconCalendarEvent,
    },
    {
      number: stats.total_volunteers ? `${stats.total_volunteers}+` : "0",
      label: "Voluntarios",
      icon: IconUsersGroup,
    },
    {
      number: stats.trees_planted ? `${stats.trees_planted}+` : "0",
      label: "Árboles Plantados",
      icon: IconTrees,
    },
    {
      number: stats.protected_cerros || "0",
      label: "Cerros Protegidos",
      icon: IconLeaf,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-12 md:space-y-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-surface to-accent-green/5 rounded-3xl p-10 md:p-16 text-center space-y-6 border border-border-soft">
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
            <Card className="p-8 h-full flex flex-col items-center text-center space-y-4 hover:border-primary/30 transition-colors hover:shadow-lg">
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
            <Card className="p-8 h-full flex flex-col items-center text-center space-y-4 hover:border-primary/30 transition-colors hover:shadow-lg">
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

      {/* Impact Statistics */}
      <section className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={STAGGER_CONTAINER}
        >
          {impactStats.map((stat, index) => (
            <motion.div key={index} variants={FADE_UP_ITEM}>
              <Card className="p-6 text-center space-y-2 hover:border-primary/30 transition-colors">
                <div className="inline-flex p-2 bg-surface rounded-full text-primary mb-2">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-bold text-text-main">
                  {stat.number}
                </div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 space-y-10">
        <motion.div className="text-center space-y-4" variants={FADE_UP_ITEM}>
          <h2 className="text-3xl font-bold text-text-main">
            {t("nosotros_page.team_title")}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t("nosotros_page.team_subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={STAGGER_CONTAINER}
        >
          {teamMembers?.map((member) => (
            <motion.div key={member.id} variants={FADE_UP_ITEM}>
              <TeamMember member={member} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
};
