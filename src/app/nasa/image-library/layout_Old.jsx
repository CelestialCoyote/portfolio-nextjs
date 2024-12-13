import NASALibrarySearch from "@/app/components/NASALibrarySearch";


export default function NASALibraryLayout({ children }) {

	return (
		<div className="flex flex-col h-[calc(100vh-5rem)] w-full items-center">
			<NASALibrarySearch />
			{children}
		</div>
	);
};