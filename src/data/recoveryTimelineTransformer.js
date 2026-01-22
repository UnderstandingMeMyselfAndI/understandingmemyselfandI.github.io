// src/data/recoveryTimelineTransformer.js

export const transformTimelineData = (originalData) => {
    if (!originalData || !originalData.timeline) {
        return null;
    }

    const transformed = {
        title: "Your Recovery Journey", // You can customize this or pass it from config
        description: "A timeline of the positive changes you can expect.", // You can customize this
        timePeriods: originalData.timeline.map(period => ({
            id: period.id,
            header: period.timePeriod,
            offset: period.offset,
            categories: [
                ...period.physical.map(item => ({ id: `${period.id}-phys-${item.slice(0, 10)}`, type: "physical", title: item, description: "" })),
                ...period.lifestyle.map(item => ({ id: `${period.id}-life-${item.slice(0, 10)}`, type: "lifestyle", title: item, description: "" })),
                ...period.mentalEmotional.map(item => ({ id: `${period.id}-ment-${item.slice(0, 10)}`, type: "mental", title: item, description: "" })),
            ]
        }))
    };

    return transformed;
};
