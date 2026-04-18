import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreatePrayerRequest } from "../hooks/usePrayerRequests";
import { PublicLayout } from "../layouts/PublicLayout";
import type { CreatePrayerRequestInput } from "../types";

interface FormValues {
  name: string;
  message: string;
  anonymous: boolean;
}

export default function Submit() {
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useCreatePrayerRequest();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: "", message: "", anonymous: false },
  });

  const isAnonymous = watch("anonymous");

  const onSubmit = async (values: FormValues) => {
    const input: CreatePrayerRequestInput = {
      name: values.anonymous || !values.name.trim() ? null : values.name.trim(),
      message: values.message.trim(),
      anonymous: values.anonymous,
    };
    try {
      await mutateAsync(input);
      toast.success("Prayer request submitted", {
        description: "We'll be praying for you.",
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong, please try again");
    }
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
  };

  return (
    <PublicLayout>
      <section
        className="min-h-[calc(100vh-8rem)] flex items-start justify-center bg-background py-12 px-4"
        data-ocid="submit.page"
      >
        <div className="w-full max-w-lg">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-8 group"
              data-ocid="submit.back_link"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-smooth group-hover:-translate-x-0.5" />
              Back to Home
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success State ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-card border border-border rounded-2xl p-10 shadow-card text-center flex flex-col items-center gap-5"
                data-ocid="submit.success_state"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </motion.div>
                <div className="space-y-2">
                  <h2 className="font-display font-bold text-2xl text-foreground">
                    Thank you — we're praying for you.
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    Your prayer request has been received by our community. You
                    are not alone.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="mt-1 gap-2 transition-smooth"
                  data-ocid="submit.another_button"
                >
                  Submit Another Request
                </Button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="mb-8">
                  <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                    Submit a Prayer Request
                  </h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Share what's on your heart. Every request is received with
                    love and lifted in prayer.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="bg-card border border-border rounded-2xl p-7 shadow-card space-y-6"
                  data-ocid="submit.form"
                >
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Your Name{" "}
                      <span className="text-muted-foreground font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Sarah M."
                      autoComplete="name"
                      disabled={isAnonymous || isPending}
                      className="transition-smooth disabled:opacity-50"
                      data-ocid="submit.name_input"
                      {...register("name")}
                    />
                    {isAnonymous && (
                      <p className="text-xs text-muted-foreground">
                        Name is hidden when submitting anonymously.
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Your Prayer Request{" "}
                      <span className="text-destructive" aria-hidden="true">
                        *
                      </span>
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Share what's on your heart…"
                      disabled={isPending}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className="transition-smooth resize-none"
                      data-ocid="submit.message_input"
                      {...register("message", {
                        required: "Prayer request is required",
                        minLength: {
                          value: 3,
                          message: "Please share a little more",
                        },
                      })}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className="text-sm text-destructive"
                        data-ocid="submit.message_field_error"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Anonymous toggle */}
                  <div className="flex items-center justify-between gap-4 bg-muted/50 rounded-xl px-4 py-3.5">
                    <div>
                      <Label
                        htmlFor="anonymous"
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        Submit Anonymously
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Your name won't be shown to anyone
                      </p>
                    </div>
                    <Switch
                      id="anonymous"
                      checked={isAnonymous}
                      onCheckedChange={(checked) =>
                        setValue("anonymous", checked)
                      }
                      disabled={isPending}
                      data-ocid="submit.anonymous_switch"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="w-full gap-2 text-base py-6 shadow-card-hover transition-smooth hover:shadow-lg disabled:opacity-70"
                    data-ocid="submit.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Submit Prayer Request"
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PublicLayout>
  );
}
