import Image from 'next/image';

const Loading = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<Image
				alt="loading"
				src="/assets/images/logo.svg"
				width={100}
				height={100}
				className="object-contain object-center animate-pulse"
			/>
		</div>
	);
};

export default Loading;
