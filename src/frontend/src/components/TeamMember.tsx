import React from "react";
import { motion } from "framer-motion";
import { IconMail, IconUsers } from "@tabler/icons-react";
import type { TeamMemberData } from "@/types";

interface TeamMemberProps {
  member: TeamMemberData;
  onClick?: () => void;
}

export const TeamMember: React.FC<TeamMemberProps> = ({ member, onClick }) => {
  return (
    <motion.div
      className="bg-card rounded-2xl p-6 border-2 border-border-soft hover:border-primary/30 transition-all duration-300 hover:shadow-2xl cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <IconUsers size={28} className="text-primary" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-text-main text-lg mb-1 truncate">
            {member.name}
          </h3>

          <p className="text-sm text-primary font-medium mb-3">{member.role}</p>

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
  );
};
