import { BsPatchCheckFill } from "react-icons/bs";


export default function Home() {
	return (
		<main className="flex flex-col items-center pt-10">
			<div className="flex flex-col items-center mt-10 mb-4 w-full border-2">
				<div className="text-3xl mb-8">Paul Stearns</div>
				<div className="">Full Stack Developer</div>
			</div>

			<div className="w-full text-center border-2">
				<div className="text-2xl mt-4 mb-6">Skills</div>

				<div className="flex w-full">

					<div className="flex flex-col w-1/2 border-2">
						<div className="text-xl">Frontend Development</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>React</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>Next</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>Tailwind CSS</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>JavaScript</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>HTML</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>CSS</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>Bootstrap</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>jQuery</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col w-1/2 border-2">
						<label className="text-xl">Backend Development</label>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>Node JS</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>Express JS</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>MongoDB</p>
							</div>
							<div className="flex justify-center items-center gap-2 p-2">
								<BsPatchCheckFill className="text-purple-400" />
								<p>mySQL</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};