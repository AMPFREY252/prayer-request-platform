import { a as useAuth, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-YOSDJLv_.js";
import { H as HandHeart, B as Button, X, M as Menu } from "./proxy-C6S_XRyR.js";
function PublicLayout({ children }) {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : ""
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 bg-card border-b border-border shadow-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2.5 group",
            "data-ocid": "nav.link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-smooth group-hover:bg-primary/90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-4.5 h-4.5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-lg tracking-tight", children: "Prayer Request Platform" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", size: "sm", "data-ocid": "nav.submit_button", children: "Submit Prayer Request" }) }),
          isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "nav.dashboard_link",
              children: "Dashboard"
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", "data-ocid": "nav.login_link", children: "Admin Login" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-smooth",
            onClick: () => setMobileMenuOpen((o) => !o),
            "aria-label": "Toggle menu",
            "data-ocid": "nav.toggle",
            children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
          }
        )
      ] }),
      mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/submit", onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "default",
            className: "w-full",
            "data-ocid": "mobile_nav.submit_button",
            children: "Submit Prayer Request"
          }
        ) }),
        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full",
            "data-ocid": "mobile_nav.dashboard_link",
            children: "Dashboard"
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            className: "w-full",
            "data-ocid": "mobile_nav.login_link",
            children: "Admin Login"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center text-sm text-muted-foreground", children: [
      "© ",
      year,
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline transition-smooth",
          children: "caffeine.ai"
        }
      )
    ] }) })
  ] });
}
export {
  PublicLayout as P
};
