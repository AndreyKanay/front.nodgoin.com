export const getPercentage = (value:number, lvl: number, percentage: number): number =>  {
    let result = value;
    for (let i = 0; i < lvl; i++) {
        result += value * (percentage / 100)
    }

    return result;
}