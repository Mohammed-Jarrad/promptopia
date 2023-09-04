import mongoose from 'mongoose'

let isConnected = false

const connectDB = async () => {
	if (isConnected) {
		console.log('already connected')
		return
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: 'shared_prompots',
		})
		isConnected = true
		console.log('Connected Successfully')
	} catch (err) {
		console.log('fail: ' + err)
	}
}

export { connectDB }
