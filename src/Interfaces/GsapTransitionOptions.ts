interface IStyleParams {
	opacity?: number,
	transform?: string,
	position?: string
}

interface ITransitionParams {
	delay?: number;
	duration?: number;
}

export interface IOptions {
	beforeEnter?: IStyleParams
	enter?: IStyleParams & ITransitionParams
	leave?: IStyleParams & ITransitionParams
}