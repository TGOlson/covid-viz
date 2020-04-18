export const shortDateFormat = (x) => new Date(x).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
export const longDateFormat = (x) => new Date(x).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
