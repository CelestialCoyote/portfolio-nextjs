import Image from "next/image";


export default function NASAHome() {
    return (
        <main className="pt-[80px]">
            <h1 className="text-center text-white w-full">
                NASA Home
            </h1>

            <Image
                className="w-auto h-auto"
                src={"/images/NASA-logo.svg"}
                alt="NASA logo"
                width={0}
                height={0}
                priority
            />
        </main>
    );
};
