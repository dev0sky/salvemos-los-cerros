import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  IconUsers,
  IconLeaf,
  IconTarget,
  IconMail,
  IconTrees,
  IconCalendarEvent,
  IconUsersGroup,
} from "@tabler/icons-react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { Card } from "@/components/ui/Card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { TeamMemberModal } from "@/components/TeamMemberModal";
import { useTeam, useStatistics } from "@/hooks/useData";
import type { TeamMemberData } from "@/types";
import {
  PAGE_VARIANTS,
  FADE_UP_ITEM,
  STAGGER_CONTAINER,
} from "@/constants/animations";

export const NosotrosPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: team = [], isLoading: teamLoading } = useTeam();
  const { data: statistics, isLoading: statsLoading } = useStatistics();
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  const isLoading = teamLoading || statsLoading;

  // Datos de las gráficas desde la API
  const monthlyData = statistics?.monthly_activity || [];
  const projectsData = statistics?.project_distribution || [];
  const stats = statistics?.stats || {};

  const displayStats = [
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

      {/* Estadísticas de Impacto */}
      <section className="container mx-auto px-4">
        <motion.div
          className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-3xl p-8 md:p-12 border border-border-soft"
          variants={FADE_UP_ITEM}
        >
          <h2 className="text-3xl font-bold text-text-main mb-8 text-center">
            {t("nosotros_page.impact_title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
            {displayStats.map((stat, index) => (
              <motion.div
                key={index}
                className="space-y-3 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex p-3 bg-primary/10 rounded-full text-primary mb-2">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-text-muted font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gráficas */}
          {monthlyData.length > 0 && projectsData.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Gráfica de Barras - Actividad Mensual */}
              <div className="bg-card rounded-2xl p-6 border border-border-soft">
                <h3 className="text-xl font-bold text-text-main mb-4 text-center">
                  Actividad Mensual 2025
                </h3>
                <div className="h-80">
                  <ResponsiveBar
                    data={monthlyData}
                    keys={["eventos", "voluntarios"]}
                    indexBy="month"
                    margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    colors={["#3A6B35", "#8BC34A"]}
                    borderRadius={6}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Mes",
                      legendPosition: "middle",
                      legendOffset: 40,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Cantidad",
                      legendPosition: "middle",
                      legendOffset: -50,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor="#ffffff"
                    legends={[
                      {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 90,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.85,
                        symbolSize: 12,
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                    role="application"
                    ariaLabel="Gráfica de actividad mensual"
                  />
                </div>
              </div>

              {/* Gráfica de Pie - Distribución de Proyectos */}
              <div className="bg-card rounded-2xl p-6 border border-border-soft">
                <h3 className="text-xl font-bold text-text-main mb-4 text-center">
                  Distribución de Proyectos
                </h3>
                <div className="h-80">
                  <ResponsivePie
                    data={projectsData}
                    margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#4A3B30"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor="#ffffff"
                    legends={[
                      {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: "#4A3B30",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 12,
                        symbolShape: "circle",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Equipo */}
      <section className="container mx-auto px-4 space-y-12">
        <motion.div variants={FADE_UP_ITEM} className="text-center">
          <h2 className="text-3xl font-bold text-text-main mb-4">
            {t("nosotros_page.team_title")}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t("nosotros_page.team_subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={STAGGER_CONTAINER}
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={FADE_UP_ITEM}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl p-6 border border-border-soft hover:border-primary/30 transition-all hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <IconUsers size={28} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-text-main text-lg mb-1 truncate">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-3">
                    {member.bio}
                  </p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconMail size={14} />
                      <span className="truncate">{member.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Modal de Miembro del Equipo */}
      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </motion.div>
  );
};
