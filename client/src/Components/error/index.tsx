const ErrorComponent = ({ message }: { message: string }) => {
	return (
		<div className="bg-red-500 px-2 rounded-sm">
			<b className="font-semibold">Error</b>: {message}
		</div>
	);
};

export default ErrorComponent;
