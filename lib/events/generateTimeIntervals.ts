export function generateTimeIntervals(): { label: string, value: string }[] {
    const intervals: { label: string, value: string }[] = [];
    intervals.push({ label: "Set Reminder", value: "Set Reminder" });

    // Add minute intervals
    intervals.push({ label: "Minutes", value: "" });
    [15, 30, 45].forEach(min => {
        const minuteLabel = min === 1 ? `${min} Minute before` : `${min} Minutes before`;
        intervals.push({ label: minuteLabel, value: `${min} minutes` });
    });

    // Add hour intervals
    intervals.push({ label: "Hours", value: "" });
    for (let i = 1; i < 24; i++) {
        const hourLabel = i === 1 ? `${i} Hour before` : `${i} Hours before`;
        intervals.push({ label: hourLabel, value: `${i} hours` });
    }

    // Add day intervals
    intervals.push({ label: "Days", value: "" });
    for (let i = 1; i < 7; i++) {
        const dayLabel = i === 1 ? `${i} Day before` : `${i} Days before`;
        intervals.push({ label: dayLabel, value: `${i} days` });
    }

    // Add week intervals
    intervals.push({ label: "Weeks", value: "" });
    for (let i = 1; i < 4; i++) {
        const weekLabel = i === 1 ? `${i} Week before` : `${i} Weeks before`;
        intervals.push({ label: weekLabel, value: `${i} weeks` });
    }

    // Add month intervals
    intervals.push({ label: "Months", value: "" });
    for (let i = 1; i < 12; i++) {
        const monthLabel = i === 1 ? `${i} Month before` : `${i} Months before`;
        intervals.push({ label: monthLabel, value: `${i} months` });
    }

    return intervals;
}
