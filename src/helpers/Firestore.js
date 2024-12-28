
export const parseDocs = (docs) => {
    if(docs.empty) return [];
    const result = [];
    docs.forEach(doc => {
        result.push({
            id: doc.id,
            ...doc.data()
        });
    });
    return result;
}