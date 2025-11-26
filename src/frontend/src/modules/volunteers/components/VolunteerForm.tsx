import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>();

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      await api.post("/volunteers/", data);
      toast.success("¡Gracias por registrarte como voluntario!");
      reset();
    } catch (error) {
      console.error("Error registering volunteer:", error);
      toast.error(
        "Error al enviar el formulario. Por favor intenta nuevamente."
      );
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
            Únete como Voluntario
          </h2>
          <p className="text-text-muted">
            Ayúdanos a proteger nuestros cerros.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">
            Nombre Completo
          </label>
          <input
            {...register("name", { required: "Este campo es requerido" })}
            className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder="Tu nombre"
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
              Email
            </label>
            <input
              {...register("email", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="tu@email.com"
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1">
              Teléfono
            </label>
            <input
              {...register("phone")}
              className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="+57 300 123 4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1">
            Intereses
          </label>
          <textarea
            {...register("interests", {
              required: "Cuéntanos qué te interesa",
            })}
            className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors min-h-[100px]"
            placeholder="Ej: Reforestación, educación ambiental, limpieza..."
          />
          {errors.interests && (
            <span className="text-xs text-red-500 mt-1">
              {errors.interests.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1">
            Disponibilidad
          </label>
          <input
            {...register("availability", {
              required: "Indica tu disponibilidad",
            })}
            className="w-full px-4 py-2 rounded-xl bg-surface border border-border-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder="Ej: Fines de semana, mañanas..."
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
          {isSubmitting ? "Enviando..." : "Enviar Registro"}
        </button>
      </form>
    </div>
  );
};
