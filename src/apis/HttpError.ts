export class HttpError extends Error {
	status: number;

	content: null;

	constructor(status: number, message: string) {
		super(message);

		this.name = "HttpError";
		this.status = status;
		this.content = null;

		Object.setPrototypeOf(this, HttpError.prototype);
	}
}
