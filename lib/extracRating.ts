export const extractRating = (text: string | null): string => {
    if (text) {
      return text.split('|')[0];
    }
    return '';
  };