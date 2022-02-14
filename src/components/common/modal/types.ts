export interface IModalProps {
	open: boolean;
	onClose: (param: boolean) => void;
	children: JSX.Element;
	height?: string;
}

export interface ISimpleModalProps extends IModalProps {
	footer?: boolean;
	title?: string;
	titleStyle?: React.CSSProperties;
}
export interface IModalContainerCommonProps {
	open: boolean;
	onClose: (param: boolean) => void;
}
