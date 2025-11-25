import React from 'react';
import { motion } from 'framer-motion';
import { IconTarget, IconEye, IconTrophy } from '@tabler/icons-react';
import { TeamMember } from '@/components/TeamMember';
import { PieChart } from '@/components/StatsChart';
import { Card } from '@/components/ui/Card';
import { STRINGS } from '@/constants/strings';
import { MOCK_TEAM_MEMBERS, IMPACT_DATA } from '@/data/team';

export const NosotrosPage: React.FC = () => {
  return (
    <div className="space-y-12 md:space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-surface rounded-b-3xl p-10 md:p-20 border-b border-border-soft">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              {STRINGS.NOSOTROS_TITLE}
            </h1>
            <p className="text-text-muted text-lg">
              {STRINGS.NOSOTROS_SUBTITLE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <IconTarget size={24} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-3">
                {STRINGS.MISSION_TITLE}
              </h2>
              <p className="text-text-muted">
                {STRINGS.MISSION_TEXT}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                <IconEye size={24} className="text-text-main" />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-3">
                {STRINGS.VISION_TITLE}
              </h2>
              <p className="text-text-muted">
                {STRINGS.VISION_TEXT}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="container mx-auto px-4">
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <IconTrophy size={24} className="text-primary" />
            <h2 className="text-2xl font-bold text-text-main">Nuestro Impacto</h2>
          </div>
          <PieChart data={IMPACT_DATA} />
        </Card>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-main mb-4">Nuestro Equipo</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Conoce a las personas dedicadas que hacen posible nuestra misión de conservación.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <TeamMember member={member} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
