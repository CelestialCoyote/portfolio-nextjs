export default function BaseDetails({ data }) {

    return (
        <div className="flex items-center">
            <p className="text-lg font-bold">
                Installation:
            </p>

            <p className="ml-2">
                {data.installation}
            </p>
        </div>
    );
};
