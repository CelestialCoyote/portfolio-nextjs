export default function FooterOld() {
	const today = new Date();

	return (
		<footer className="fixed bottom-0 left-0 flex items-center justify-between bg-black text-white w-full p-2">
			<div className="flex justify-center items-center w-full">
					<p className="text-center">
						Copyright
					</p>

					<p className="text-center">
						&copy; {today.getFullYear()}
					</p>
			</div>
		</footer>
	);
};
