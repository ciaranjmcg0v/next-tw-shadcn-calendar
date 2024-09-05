function calculateFizeSize(sizeInBytes: number): string {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    
    // Convert the size to the appropriate unit
    while (sizeInBytes >= 1024 && index < units.length - 1) {
        sizeInBytes /= 1024;
        index++;
    }

    // Return the size with the appropriate unit, formatted to 2 decimal places if necessary
    return `${sizeInBytes.toFixed(index > 0 ? 2 : 0)} ${units[index]}`;
}

export default calculateFizeSize;
