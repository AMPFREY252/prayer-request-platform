import { j as jsxRuntimeExports, c as cn, a as useAuth, b as useNavigate, r as reactExports } from "./index-YOSDJLv_.js";
import { c as createLucideIcon, a as cva, m as motion, H as HandHeart, B as Button } from "./proxy-C6S_XRyR.js";
import { I as Input } from "./index-BO0uOiFs.js";
import { L as Label } from "./label-BfZkcveg.js";
import { P as PublicLayout } from "./PublicLayout-BQQMxj6Y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}
function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loginError, setLoginError] = reactExports.useState(null);
  const [loginAttempted, setLoginAttempted] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginAttempted(true);
    setLoginError(null);
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 300));
    const success = login(username, password);
    if (!success) {
      setLoginError("Invalid username or password. Please try again.");
    }
    setIsSubmitting(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "w-full max-w-md",
      initial: { opacity: 0, y: 28 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5",
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.35, delay: 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-8 h-8 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground tracking-tight", children: "Admin Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mt-2 leading-relaxed", children: "Sign in to manage prayer requests" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-card rounded-2xl shadow-card border border-border p-7",
            "data-ocid": "login.card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "space-y-2",
                  initial: { opacity: 0, x: -12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.3, delay: 0.2 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", className: "text-sm font-medium", children: "Username" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "username",
                          type: "text",
                          placeholder: "Enter username",
                          className: "pl-10",
                          value: username,
                          onChange: (e) => setUsername(e.target.value),
                          autoComplete: "username",
                          required: true,
                          "data-ocid": "login.username.input"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "space-y-2",
                  initial: { opacity: 0, x: -12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.3, delay: 0.28 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "password",
                          type: "password",
                          placeholder: "Enter password",
                          className: "pl-10",
                          value: password,
                          onChange: (e) => setPassword(e.target.value),
                          autoComplete: "current-password",
                          required: true,
                          "data-ocid": "login.password.input"
                        }
                      )
                    ] })
                  ]
                }
              ),
              loginAttempted && loginError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: -8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.25 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", "data-ocid": "login.error_state", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: loginError })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full gap-2.5 h-12 text-base font-semibold",
                  size: "lg",
                  disabled: isSubmitting,
                  "data-ocid": "login.submit_button",
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" }),
                    "Signing in…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
                    "Sign In"
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  ) }) });
}
export {
  Login as default
};
