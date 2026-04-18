import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  HandHeart,
  Heart,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { PublicLayout } from "../layouts/PublicLayout";

const STATS = [
  { icon: Heart, label: "Prayers Lifted", value: "1,200+" },
  { icon: Users, label: "Community Members", value: "340+" },
  { icon: Star, label: "Answered Prayers", value: "580+" },
];

const FEATURES = [
  {
    icon: Heart,
    title: "Submit with Love",
    description:
      "Share your heart with our community — every request is held with care and spiritual devotion.",
  },
  {
    icon: Users,
    title: "Community of Faith",
    description:
      "Connect with fellow believers who genuinely lift each other in prayer, day and night.",
  },
  {
    icon: Shield,
    title: "Safe & Anonymous",
    description:
      "Choose to remain anonymous. Your privacy and spiritual safety are our top priority.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    initial: "S",
    quote:
      "I submitted a request during a very difficult season. Knowing the community was praying for me brought so much peace and strength.",
  },
  {
    name: "James T.",
    initial: "J",
    quote:
      "This platform made it so easy to share my heart with the church. The response of love and prayer was overwhelming.",
  },
  {
    name: "Grace O.",
    initial: "G",
    quote:
      "The anonymous option made it easier to share something I was embarrassed about. I felt held without judgment.",
  },
];

const SCRIPTURE = {
  verse:
    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
  reference: "Philippians 4:6",
};

export default function Landing() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative bg-background overflow-hidden min-h-[90vh] flex items-center"
        data-ocid="landing.page"
      >
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 flex flex-col items-start max-w-3xl gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-foreground bg-accent/15 px-3 py-1.5 rounded-full uppercase tracking-wider border border-accent/20">
              <Heart className="w-3 h-3" /> A Community in Prayer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Prayer Request <span className="gradient-heading">Platform</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome. Submit your prayers and lift others up in faith. Your
            requests are held with love and spiritual care by our devoted
            community.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/submit">
              <Button
                size="lg"
                className="gap-2 px-8 py-6 text-base shadow-card-hover transition-smooth hover:shadow-lg"
                data-ocid="hero.submit_button"
              >
                Submit Prayer Request
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#community">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base transition-smooth"
                data-ocid="hero.learn_more_button"
              >
                Learn More
              </Button>
            </a>
          </motion.div>

          {/* Scripture */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="border-l-4 border-accent/50 pl-4 max-w-md mt-2"
          >
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "{SCRIPTURE.verse}"
            </p>
            <cite className="block mt-1 text-xs font-semibold text-accent-foreground not-italic">
              — {SCRIPTURE.reference}
            </cite>
          </motion.blockquote>
        </div>
      </section>

      {/* Stats */}
      <section
        className="bg-card border-y border-border py-14"
        id="community"
        data-ocid="landing.stats_section"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STATS.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center gap-2.5 text-center"
                data-ocid={`landing.stat.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display font-bold text-3xl text-foreground">
                  {value}
                </span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="bg-muted/30 border-b border-border py-20"
        data-ocid="landing.features_section"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Held in Prayer, Together
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              A sacred space for your community to share burdens and celebrate
              blessings through prayer.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover transition-smooth"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                data-ocid={`landing.feature.${i + 1}`}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="bg-background py-20"
        data-ocid="landing.testimonials_section"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Stories of Faith
            </h2>
            <p className="text-muted-foreground text-lg">
              Hear from community members whose prayers were answered.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, initial, quote }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-card flex flex-col gap-4"
                data-ocid={`landing.testimonial.${i + 1}`}
              >
                <p className="text-sm text-muted-foreground italic leading-relaxed flex-1">
                  "{quote}"
                </p>
                <div className="flex items-center gap-2.5 pt-2 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-sm">
                    {initial}
                  </div>
                  <span className="font-medium text-sm text-foreground">
                    {name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section
        className="bg-muted/40 border-t border-border py-20"
        data-ocid="landing.cta_section"
      >
        <div className="container mx-auto px-4 max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="bg-gradient-to-br from-primary/10 via-accent/8 to-primary/5 rounded-2xl p-10 md:p-14 border border-primary/20 space-y-5"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mx-auto">
              <HandHeart className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              You Are Not Alone
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Whatever you're going through, our community stands with you. Let
              us pray for you today.
            </p>
            <Link to="/submit">
              <Button
                size="lg"
                className="gap-2 px-8 py-6 text-base shadow-card-hover transition-smooth hover:shadow-lg mt-2"
                data-ocid="cta.submit_button"
              >
                Submit Your Prayer Request
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
