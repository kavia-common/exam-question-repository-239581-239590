import React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        // Premium surface: soft border + subtle gradient + blur for “Spotify-like” depth
        "rounded-2xl border border-black/10",
        "bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.60))] backdrop-blur",
        "shadow-[var(--shadow-sm)]",
        "transition-colors duration-200 motion-reduce:transition-none",
        props.className
      )}
    />
  );
}

export function SubtleButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "danger";
  }
) {
  const variant = props.variant ?? "ghost";
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm",
        "border",
        "transition duration-200 transform-gpu motion-reduce:transition-none motion-reduce:transform-none",
        "active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
        variant === "primary" &&
          [
            "border-black/10",
            "bg-black text-white",
            "hover:bg-black/92",
            "shadow-sm",
          ].join(" "),
        variant === "ghost" &&
          [
            "border-black/10",
            "bg-white/40",
            "hover:bg-black/5",
            "backdrop-blur",
          ].join(" "),
        variant === "danger" &&
          "border-red-700/30 bg-red-600 text-white hover:bg-red-700",
        props.disabled && "opacity-50 cursor-not-allowed hover:bg-inherit",
        props.className
      )}
    />
  );
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    hint?: string;
  }
) {
  const { label, hint, id, ...rest } = props;

  // Hooks must not be conditional; always call useId, then prefer user-supplied id.
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm text-black/70">{label}</span>
      ) : null}
      <input
        id={inputId}
        {...rest}
        className={cn(
          "w-full rounded-xl border border-black/15",
          "bg-white/70 backdrop-blur",
          "px-3 py-2 text-sm",
          "placeholder:text-black/40",
          "shadow-[0_1px_0_rgba(17,18,20,0.03)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
          "transition duration-200 motion-reduce:transition-none",
          props.className
        )}
      />
      {hint ? <span className="mt-2 block text-xs text-black/55">{hint}</span> : null}
    </label>
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    hint?: string;
  }
) {
  const { label, hint, id, children, ...rest } = props;

  // Hooks must not be conditional; always call useId, then prefer user-supplied id.
  const generatedId = React.useId();
  const selectId = id ?? generatedId;

  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm text-black/70">{label}</span>
      ) : null}
      <select
        id={selectId}
        {...rest}
        className={cn(
          "w-full rounded-xl border border-black/15",
          "bg-white/70 backdrop-blur",
          "px-3 py-2 text-sm",
          "shadow-[0_1px_0_rgba(17,18,20,0.03)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
          "transition duration-200 motion-reduce:transition-none",
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
