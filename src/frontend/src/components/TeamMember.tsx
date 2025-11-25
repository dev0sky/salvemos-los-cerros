import React from 'react';
import { motion } from 'framer-motion';
import { IconMail } from '@tabler/icons-react';
import { Card } from './ui/Card';
import type { TeamMemberData } from '@/types';

interface TeamMemberProps {
  member: TeamMemberData;
}

export const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-primary">
              {member.name.charAt(0)}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-text-main mb-1">
          {member.name}
        </h3>

        <p className="text-sm text-primary font-medium mb-3">
          {member.role}
        </p>

        <p className="text-sm text-text-muted mb-4">
          {member.bio}
        </p>

        {member.email && (
          <a 
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <IconMail size={16} />
            Contactar
          </a>
        )}
      </Card>
    </motion.div>
  );
};
