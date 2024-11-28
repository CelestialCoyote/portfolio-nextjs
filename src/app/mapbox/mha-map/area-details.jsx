export default function AreaDetails({ data }) {
    // Set curreny format.
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className="flex flex-col max-h-full overflow-y-scroll">
            <div className="flex items-center mb-2">
                <p className="text-lg font-bold">
                    Zip Code:
                </p>

                <p className="ml-2">
                    {data?.ZCTA5CE20}
                </p>
            </div>

            {/* <div className="mb-4">
                <p className="font-bold">
                    Installation(s):
                </p>

                <div className="flex flex-col ml-4">
                    {data?.installation.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </div> */}

            <div className="flex justify-between">
                <p className="font-bold">
                    Active Listing Count:
                </p>

                <p className="ml-2">
                    {data?.active_listing_count == null ? "No Data" : data?.active_listing_count}
                </p>
            </div>

            <div className="flex justify-between">
                <p className="font-bold">
                    Median Listing Price:
                </p>

                <p className="ml-2">
                    {data?.median_listing_price == null ? "No Data" : USDollar.format(data?.median_listing_price)}
                </p>
            </div>

            <div className="flex justify-between">
                <p className="font-bold">
                    Median Household Income:
                </p>

                <p className="ml-2">
                    {data?.median_household_income == null ? "No Data" : USDollar.format(data?.median_household_income)}
                </p>
            </div>

            <div className="flex justify-between">
                <p className="font-bold">
                    Median Home Value:
                </p>

                <p className="ml-2">
                    {data?.area_median_home_value == null ? "No Data" : USDollar.format(data?.median_home_value)}
                </p>
            </div>

            <div className="flex justify-between">
                <p className="font-bold">
                    Area Wealth Percentile:
                </p>

                <p className="ml-2">
                    {data?.area_wealth_percentile == null ? "No Data" : data?.area_wealth_percentile}
                </p>
            </div>
        </div>
    );
};
