import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
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
import { TeamMemberModal } from "@/components/TeamMemberModal";
import { useTeam, useStatistics } from "@/hooks/useData";
import { TeamMemberData } from "@/types";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

const FADE_UP_ITEM: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const NosotrosPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: teamMembers, isLoading: isTeamLoading } = useTeam();
  const { data: rawStatistics, isLoading: isStatsLoading } = useStatistics();
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(
    null
  );

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
    <div className="space-y-12 md:space-y-20 pb-20">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-primary/10 via-surface to-accent-green/5 rounded-3xl p-10 md:p-16 text-center space-y-6 border border-border-soft"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={STAGGER_CONTAINER}
      >
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
      </motion.section>

      {/* Misión y Visión */}
      <section className="container mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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

      {/* Gráficas */}
      <section className="container mx-auto px-4">
        {rawStatistics?.monthly_activity &&
          rawStatistics?.project_distribution && (
            <motion.div
              className="grid md:grid-cols-2 gap-8 mt-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={STAGGER_CONTAINER}
            >
              {/* Gráfica de Barras - Actividad Mensual */}
              <motion.div variants={FADE_UP_ITEM} className="h-full">
                <div className="bg-card rounded-2xl p-6 border border-border-soft h-full">
                  <h3 className="text-xl font-bold text-text-main mb-4 text-center">
                    {t("nosotros_page.monthly_activity_chart_title")}
                  </h3>
                  <div className="h-80">
                    <ResponsiveBar
                      data={rawStatistics.monthly_activity}
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
                        legend: t("nosotros_page.chart_legend_month"),
                        legendPosition: "middle",
                        legendOffset: 40,
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: t("nosotros_page.chart_legend_quantity"),
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
                      ariaLabel={t(
                        "nosotros_page.monthly_activity_chart_aria_label"
                      )}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Gráfica de Pie - Distribución de Proyectos */}
              <motion.div variants={FADE_UP_ITEM} className="h-full">
                <div className="bg-card rounded-2xl p-6 border border-border-soft h-full">
                  <h3 className="text-xl font-bold text-text-main mb-4 text-center">
                    {t("nosotros_page.project_distribution_chart_title")}
                  </h3>
                  <div className="h-80">
                    <ResponsivePie
                      data={rawStatistics.project_distribution}
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
              </motion.div>
            </motion.div>
          )}
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 space-y-10">
        <motion.div
          className="text-center space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP_ITEM}
        >
          <h2 className="text-3xl font-bold text-text-main">
            {t("nosotros_page.team_title")}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t("nosotros_page.team_subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
        >
          {teamMembers?.map((member) => (
            <motion.div key={member.id} variants={FADE_UP_ITEM}>
              <TeamMember
                member={member}
                onClick={() => setSelectedMember(member)}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Member Modal */}
      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
};
