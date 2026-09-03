import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateDemoId(id: string): { isValid: boolean; message?: string } {
  const trimmed = id.trim().toUpperCase();
  if (!trimmed) {
    return { isValid: false, message: 'Please enter a Demo ID (e.g. DEMO-2026-123).' };
  }

  // Permissive yet realistic demo format validation
  const regex = /^DEMO-\d{4}-[A-Z0-9]{3,4}$/i;
  const simpleDemoRegex = /^DEMO-[A-Z0-9]{3,8}$/i;

  if (regex.test(trimmed) || simpleDemoRegex.test(trimmed)) {
    return { isValid: true };
  }

  return {
    isValid: false,
    message: 'Invalid Demo ID format. Format should look like DEMO-2026-123 or DEMO-2026-ABC.',
  };
}

export function generateRandomDemoId(): string {
  const year = 2026;
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `DEMO-${year}-${randomNum}`;
}
