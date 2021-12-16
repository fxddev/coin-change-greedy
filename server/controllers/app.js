exports.coinChange = async (req, res) => {
	let coin_awal = req.body.coin_awal;
	let coin_kandidat = req.body.coin_kandidat;

	// console.log('coin_awal')
	// console.log(coin_awal)
	// console.log('coin_kandidat')
	// console.log(coin_kandidat)

	const array_string = coin_kandidat.split(/[ ,]+/);
	// console.log('array_string')
	// console.log(array_string)
	// console.log(array_string.length)

	let array_int = []
	for (let index = 0; index < array_string.length; index++) {

		// console.log(array_string[index])
		array_int.push(parseInt(array_string[index]))

	}
	// console.log(array_int)

	class Change {
		// Find minimum coins whose sum make a given value
		minNoOfCoins(coins, n, value) {
			if (value <= 0) {
				return;
			}
			// Sort the given coins
			coins.sort(function (a, b) {
				return a - b;
			});
			// Use to collect coins
			var record = [];
			// Auxiliary variables
			var sum = 0;
			var i = n - 1;
			var c = 0;
			//  Find the change coins by given value
			while (i >= 0 && sum < value) {
				// Get coin
				c = coins[i];
				while (c + sum <= value) {
					// Add coin
					record.push(c);
					// Update sum
					sum += c;
				}
				// Reduce position of element
				i--;
			}
			// console.log("\n Given value is " + value);

			if (sum == value) {
				// When change are possible.
				// Display resultant coins.
				let hasil = [];
				for (var v = 0; v < record.length; ++v) {
					// process.stdout.write("  " + record[v]);
					hasil.push(record[v]);
				}
				res.status(200).send({
					coin_awal: value,
					coin_kandidat: coins,
					solusi: hasil,
					message: `Uang Yang Ditukar: ${value}
	  \nHimpunan Kandidat ${coins}
	  \nSolusi Greedy: ${hasil} = ${value}`,
				});
			} else {
				console.log(" Full change are not possible");

				res.status(200).send({
					message: `Masukkan nilai coin yang tepat`,
				});
			}
		}
	}

	function main(coin_awal, array_int) {
		var task = new Change();

		var n = array_int.length;
		task.minNoOfCoins(array_int, n, coin_awal);
	}
	// Start program execution
	main(coin_awal, array_int);

	// https://kalkicode.com/coin-change-using-greedy-algorithm-in-js
};
