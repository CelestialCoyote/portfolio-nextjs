import Image from "next/image";
import { technologies } from "./technologies-data.json";


export default function Technologies() {

    return (
        <section className="flex flex-col w-full items-center">
            <div className="text-xl mb-8">
                My Technologies
            </div>

            <div className="flex flex-wrap bg-slate-500 justify-center w-3/4 rounded-xl gap-x-10 gap-y-20 p-6">
                {technologies.map((tech, key) => {
                    return (
                        <div key={key}>
                            <div className="w-[120px] h-[120px]">
                                <Image
                                    className="w-full h-full"
                                    src={tech.src}
                                    alt={tech.alt}
                                    width={500}
                                    height={500}
                                    priority
                                />
                            </div>

                            <div className="flex justify-center text-black mt-2">
                                {tech.title}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
