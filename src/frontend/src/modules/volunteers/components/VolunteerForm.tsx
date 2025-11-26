import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import api from "../../../lib/api";
import { IconHeartHandshake } from "@tabler/icons-react";

interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  interests: string;
  availability: string;
}

export const VolunteerForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>();

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      await api.post("/volunteers/", data);
      toast.success(t("volunteer.success_message"));
      reset();
    } catch (error) {
      console.error("Error registering volunteer:", error);
      toast.error(t("volunteer.error_message"));
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border-soft p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          <IconHeartHandshake size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-main">
            {t("volunteer.form_title")}
          </h2>
          <p className="text-text-muted">{t("volunteer.form_subtitle")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">
            {t("volunteer.name_label")}
          </label>
          <input
            {...register("name", { required: t("volunteer.required_field") })}
            className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder={t("volunteer.name_placeholder")}
          />
          {errors.name && (
            <span className="text-xs text-red-500 mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">
              {t("volunteer.email_label")}
            </label>
            <input
              {...register("email", {
                required: t("volunteer.required_field"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("volunteer.invalid_email"),
                },
              })}
              className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder={t("volunteer.email_placeholder")}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1">
              {t("volunteer.phone_label")}
            </label>
            <input
              {...register("phone")}
              className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder={t("volunteer.phone_placeholder")}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1">
            {t("volunteer.interests_label")}
          </label>
          <textarea
            {...register("interests", {
              required: t("volunteer.interests_required"),
            })}
            className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors min-h-[100px]"
            placeholder={t("volunteer.interests_placeholder")}
          />
          {errors.interests && (
            <span className="text-xs text-red-500 mt-1">
              {errors.interests.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1">
            {t("volunteer.availability_label")}
          </label>
          <input
            {...register("availability", {
              required: t("volunteer.availability_required"),
            })}
            className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder={t("volunteer.availability_placeholder")}
          />
          {errors.availability && (
            <span className="text-xs text-red-500 mt-1">
              {errors.availability.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting
            ? t("volunteer.submitting_btn")
            : t("volunteer.submit_btn")}
        </button>
      </form>
    </div>
  );
};
