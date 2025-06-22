export function convertNumberToDuration(duration: any): string {
    if (Number.isInteger(duration)) {
        return `${duration}'`;
    } else {
        const wholeMinutes = Math.floor(duration);
        const seconds = Math.round((duration - wholeMinutes) * 60);
        return `${wholeMinutes}' ${seconds.toString().padStart(2, '0')}"`;
    }
}

export function formatDuration(length: any): string {
    // If there's a default value, use it
    if (length.default !== undefined) {
        return convertNumberToDuration(length.default);
    } 
    
    // If no default but min and max exist
    if (length.min !== undefined && length.max !== undefined) {
        return `${convertNumberToDuration(length.min)} - ${convertNumberToDuration(length.max)}`;
    }
    
    // Fallback
    return "_' _\"";
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
} 