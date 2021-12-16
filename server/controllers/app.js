exports.coinChange = async (req, res) => {
	let coin_awal = req.body.coin_awal;
	let coin_kandidat = req.body.coin_kandidat;

	console.log('coin_awal')
	console.log(coin_awal)
	console.log('coin_kandidat')
	console.log(coin_kandidat)

	const array_string = coin_kandidat.split(/[ ,]+/);
    console.log('array_string')
    console.log(array_string)
    // console.log(array_string.length)

    let array_int = []
    for (let index = 0; index < array_string.length; index++) {

      // console.log(array_string[index])
      array_int.push(parseInt(array_string[index]))

    }
    console.log(array_int) 

	res.status(200).send({
		message: "mungkin ini adalah halaman App"
	});
};
