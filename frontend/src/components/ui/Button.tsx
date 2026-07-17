import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-terracota text-paper hover:bg-terracota-dark",
    secondary:
        "bg-transparent text-azulejo border border-azulejo hover:bg-azulejo hover:text-paper",
    ghost: "bg-transparent text-ink hover:bg-line/40",
};

/**
 * Devolve as classes de um botão sem renderizar o elemento.
 * Útil quando precisas do estilo de botão num <Link>, já que
 * um <a> não deve ficar aninhado dentro de um <button>.
 */
export function getButtonClasses(variant: ButtonVariant = "primary", className = "") {
    return [
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5",
        "font-sans text-sm font-medium transition-colors duration-150",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        className,
    ].join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
    return (
        <button className={getButtonClasses(variant, className)} {...props}>
            {children}
        </button>
    );
}