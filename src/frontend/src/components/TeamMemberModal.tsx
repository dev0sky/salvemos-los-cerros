import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import {
  IconX,
  IconMail,
  IconPhone,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconWorld,
  IconCalendar,
  IconStar,
} from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { TeamMemberData } from "@/types";

interface TeamMemberModalProps {
  member: TeamMemberData;
  onClose: () => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  onClose,
}) => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: IconBrandLinkedin,
      url: member.linkedin,
      label: "LinkedIn",
      color: "text-blue-600",
    },
    {
      icon: IconBrandTwitter,
      url: member.twitter,
      label: "Twitter",
      color: "text-sky-500",
    },
    {
      icon: IconBrandFacebook,
      url: member.facebook,
      label: "Facebook",
      color: "text-blue-700",
    },
    {
      icon: IconBrandInstagram,
      url: member.instagram,
      label: "Instagram",
      color: "text-pink-600",
    },
    {
      icon: IconWorld,
      url: member.website,
      label: t("team_member.website"),
      color: "text-primary",
    },
  ].filter((link) => link.url);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="p-0 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-surface/80 backdrop-blur-sm rounded-full hover:bg-surface transition-colors"
            >
              <IconX size={20} className="text-text-main" />
            </button>

            {/* Header with Image */}
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent-green/20 flex items-center justify-center">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent-green rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Name and Role */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-text-main mb-2">
                  {member.name}
                </h2>
                <p className="text-lg text-primary font-medium">
                  {member.role}
                </p>
                {member.joined_date && (
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-text-muted">
                    <IconCalendar size={16} />
                    <span>
                      {t("team_member.joined")}: {member.joined_date}
                    </span>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-xl font-bold text-text-main mb-3">
                  {t("team_member.bio")}
                </h3>
                <p className="text-text-muted leading-relaxed whitespace-pre-line">
                  {member.bio}
                </p>
              </div>

              {/* Specialties */}
              {member.specialties && member.specialties.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IconStar size={20} className="text-accent-green" />
                    <h3 className="text-xl font-bold text-text-main">
                      {t("team_member.specialties")}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, index) => (
                      <Badge key={index} variant="primary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contributions */}
              {member.contributions && (
                <div>
                  <h3 className="text-xl font-bold text-text-main mb-3">
                    {t("team_member.contributions")}
                  </h3>
                  <p className="text-text-muted leading-relaxed whitespace-pre-line">
                    {member.contributions}
                  </p>
                </div>
              )}

              {/* Contact Information */}
              <div className="pt-6 border-t border-border-soft">
                <h3 className="text-xl font-bold text-text-main mb-4">
                  {t("team_member.contact")}
                </h3>
                <div className="space-y-3">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors"
                    >
                      <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <IconMail size={18} />
                      </div>
                      <span className="text-sm">{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors"
                    >
                      <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <IconPhone size={18} />
                      </div>
                      <span className="text-sm">{member.phone}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Social Media Links */}
              {socialLinks.length > 0 && (
                <div className="pt-6 border-t border-border-soft">
                  <h3 className="text-xl font-bold text-text-main mb-4">
                    {t("team_member.social_media")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 bg-surface rounded-xl hover:bg-primary/10 transition-colors ${link.color}`}
                        title={link.label}
                      >
                        <link.icon size={20} />
                        <span className="text-sm font-medium">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
