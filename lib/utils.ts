import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};

export const calculatePercentageChange = (a: number, b: number) => {
    const response = parseFloat((((b - a) / a) * 100).toFixed(2));
    return response > 0 ? `+${response}%` : `${response}%`;
};

export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export function getUrlName(type: string) {
    switch (type) {
        case "Item":
            return "items";
        case "Offer":
            return "offers";
        default:
            return "products";
    }
}

export function formatDateToLocalInputString(date: Date | undefined): string | undefined {
    if (!date) {
        return undefined;
    }
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('.')[0];
}

export function convertToCents(price: number) {
    return Math.round(price * 100)
}

export function convertFromCents(cents: number) {
    return (cents / 100)
}