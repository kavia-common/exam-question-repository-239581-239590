import React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border border-black/10 bg-white/70 backdrop-blur",
        "shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        "transition-colors motion-reduce:transition-none",
        props.className
      )}
    />
  );
}

export function SubtleButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }
) {
  const variant = props.variant ?? "ghost";
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm",
        "transition transform-gpu motion-reduce:transition-none motion-reduce:transform-none",
        "active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
        variant === "primary" &&
          "bg-black text-white hover:bg-black/90 border border-black/10 shadow-sm",
        variant === "ghost" && "bg-transparent hover:bg-black/5 border border-black/10",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700 border border-red-700/30",
        props.disabled && "opacity-50 cursor-not-allowed hover:bg-inherit",
        props.className
      )}
    />
  );
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }
) {
  const { label, hint, id, ...rest } = props;

  // Hooks must not be conditional; always call useId, then prefer user-supplied id.
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <label className="block">
      {label ? <span className="mb-2 block text-sm text-black/70">{label}</span> : null}
      <input
        id={inputId}
        {...rest}
        className={cn(
          "w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm",
          "placeholder:text-black/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
          "transition motion-reduce:transition-none",
          props.className
        )}
      />
      {hint ? <span className="mt-2 block text-xs text-black/55">{hint}</span> : null}
    </label>
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; hint?: string }
) {
  const { label, hint, id, children, ...rest } = props;

  // Hooks must not be conditional; always call useId, then prefer user-supplied id.
  const generatedId = React.useId();
  const selectId = id ?? generatedId;

  return (
    <label className="block">
      {label ? <span className="mb-2 block text-sm text-black/70">{label}</span> : null}
      <select
        id={selectId}
        {...rest}
        className={cn(
          "w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
          "transition motion-reduce:transition-none",
          props.className
        )}
      >
        {children}
      </select>
      {hint ? <span className="mt-2 block text-xs text-black/55">{hint}</span> : null}
    </label>
  );
}

export function Skeleton(props: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse motion-reduce:animate-none rounded-xl bg-black/5",
        props.className
      )}
      aria-hidden="true"
    />
  );
}
