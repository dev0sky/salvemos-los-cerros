import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useComments, useCreateComment } from "@/hooks/useData";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  IconUser,
  IconMessage,
  IconCornerDownRight,
} from "@tabler/icons-react";
import { Comment } from "@/types";

interface CommentsSectionProps {
  type: "project" | "event" | "news";
  id: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  type,
  id,
}) => {
  const { t } = useTranslation();
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const params = {
    [type === "news" ? "news" : type]: id,
  };

  const { data: comments = [], isLoading } = useComments(params);
  const createCommentMutation = useCreateComment();

  const handleSubmit = (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();

    if (!authorName || !authorEmail || !content) return;

    createCommentMutation.mutate(
      {
        [type === "news" ? "news_article" : type]: id,
        author_name: authorName,
        author_email: authorEmail,
        content,
        parent: parentId,
        approved: true, // Auto-approve for demo purposes
      },
      {
        onSuccess: () => {
          setContent("");
          if (parentId) {
            setReplyTo(null);
          } else {
            // Keep name/email for convenience? Or clear? Let's keep them.
          }
        },
      }
    );
  };

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: Comment;
    isReply?: boolean;
  }) => (
    <div
      className={`space-y-4 ${
        isReply ? "ml-8 md:ml-12 border-l-2 border-border-soft pl-4" : ""
      }`}
    >
      <div className="bg-surface/50 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <IconUser size={16} />
            </div>
            <span className="font-semibold text-text-main">
              {comment.author_name}
            </span>
          </div>
          <span className="text-xs text-text-muted">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-text-muted text-sm leading-relaxed">
          {comment.content}
        </p>

        {!isReply && (
          <button
            onClick={() =>
              setReplyTo(replyTo === comment.id ? null : comment.id)
            }
            className="text-xs font-medium text-primary flex items-center gap-1 hover:underline mt-2"
          >
            <IconCornerDownRight size={14} />
            {t("comments.reply") || "Responder"}
          </button>
        )}
      </div>

      {/* Reply Form */}
      {replyTo === comment.id && (
        <div className="ml-8 md:ml-12">
          <form
            onSubmit={(e) => handleSubmit(e, comment.id)}
            className="space-y-4 bg-card p-4 rounded-xl border border-border-soft"
          >
            <h4 className="text-sm font-semibold text-text-main">
              {t("comments.replying_to") || "Respondiendo a"}{" "}
              {comment.author_name}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-text-muted">
                  {t("comments.name") || "Nombre"}
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border-soft bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-text-muted">
                  {t("comments.email") || "Email"}
                </label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border-soft bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">
                {t("comments.message") || "Mensaje"}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border-soft bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setReplyTo(null)}
              >
                {t("common.cancel") || "Cancelar"}
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={createCommentMutation.isPending}
              >
                {createCommentMutation.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  t("common.send") || "Enviar"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4 mt-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-secondary/10 rounded-full text-secondary">
          <IconMessage size={24} />
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          {t("comments.title") || "Comentarios"}
        </h2>
      </div>

      {/* Main Comment Form */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-main mb-4">
          {t("comments.leave_comment") || "Deja un comentario"}
        </h3>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-muted">
                {t("comments.name") || "Nombre"}
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-border-soft bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-muted">
                {t("comments.email") || "Email"}
              </label>
              <input
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-border-soft bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-text-muted">
              {t("comments.message") || "Mensaje"}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-border-soft bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] transition-all"
              placeholder="Escribe tu comentario aquí..."
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={createCommentMutation.isPending}>
              {createCommentMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>{t("common.sending") || "Enviando..."}</span>
                </div>
              ) : (
                t("common.send") || "Enviar Comentario"
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-text-muted bg-surface/30 rounded-xl border border-dashed border-border-soft">
          <p>
            {t("comments.no_comments") ||
              "No hay comentarios aún. ¡Sé el primero en comentar!"}
          </p>
        </div>
      )}
    </section>
  );
};
