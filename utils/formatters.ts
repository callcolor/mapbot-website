import { format } from 'date-fns';

export const formatDate = (t: Date | number | undefined) => {
  if (!t) return '';
  return format(t, 'M/dd @ h:mm aaa');
};

export const formatInt = (number: number, maximumFractionDigits = 0) => {
  return number.toLocaleString(undefined, { maximumFractionDigits });
};

export const formatVector = (vectString: string | null): string => {
  if (!vectString) return '';
  let parts: any = vectString.replace('<', '').replace('>', '').split(', ');
  if (parts.length !== 3) return '';
  parts = parts.map((p: any) => (p = Math.round(Number(p))));
  return parts.join('/');
};
