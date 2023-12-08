function quickSort(arr) {
	if (arr.length <= 1) return arr;
	let pivotIndex = arr[Math.floor(arr.length / 2)];
	let left = [];
	let right = [];
	for (let i = 0; i < arr.length; i++) {
		if (i === Math.floor(arr.length / 2)) continue;
		if (arr[i] < pivotIndex) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return [...quickSort(left), pivotIndex, ...quickSort(right)];
}

let arr = [8, 3, 5, 1, 9, 2, 7, 4, 6];

console.log(quickSort(arr));
