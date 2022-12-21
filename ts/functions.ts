export function bubbleSort(arr: number[]) {
    for (let j = 0; j < arr.length - 1; j++) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
}

export function random(from: number, to: number) {
    return Math.floor(Math.random() * (to - from)) + from;
}