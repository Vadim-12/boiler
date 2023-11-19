interface Props {
	text: string;
}

const AlertModalWindow: React.FC<Props> = ({ text }) => {
	return (
		<div className='modal-window-wrapper'>
			<form className='modal-window-form'>
				<h1 className='text-3xl text-center font-bold'>{text}</h1>
			</form>
		</div>
	);
};

export default AlertModalWindow;
