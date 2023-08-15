class AppError extends Error {
	constructor(
		public message: string,
		public code = 400
	) {
		super(message)
		Object.setPrototypeOf(this, AppError.prototype)
	}
}


export default AppError
