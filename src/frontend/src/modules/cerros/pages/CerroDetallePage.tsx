import React from "react";
import { useRoute, Link } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";
import { CerroDetail } from "../components/CerroDetail";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useCerro } from "@/hooks/useData";

export const CerroDetallePage: React.FC = () => {
  const { t } = useTranslation();
  const [match, params] = useRoute("/cerros/:id");
  const cerroId = match ? params.id : null;

  const { data: cerro, isLoading, error } = useCerro(cerroId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !cerro) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-main mb-4">
          {error ? t("cerros.error") : t("cerros.not_found")}
        </h1>
        <Link href="/cerros">
          <a className="text-primary hover:underline">
            {t("cerros.back_to_list")}
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <Link href="/cerros">
        <motion.a
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-6 transition-colors cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ x: -4 }}
        >
          <IconArrowLeft size={20} />
          {t("cerros.back_to_list")}
        </motion.a>
      </Link>
      <CerroDetail cerro={cerro} />
    </div>
  );
};
