import Technologies from "@/components/technologies/technologies";


export default function Home() {
	return (
		<main className="flex flex-col items-center mb-12 py-16 gap-y-10">
			<div className="flex flex-col items-center w-full mt-10 mb-4">
				<div className="text-3xl mb-8">
					Paul Stearns
				</div>
				
				<div className="text-2xl">
					Full Stack Developer
				</div>
			</div>

			<Technologies />
		</main>
	);
}