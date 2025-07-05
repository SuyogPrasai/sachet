import NewsletterSignupCard from "./NewsletterSignupCard";

export default async function NewsletterSignup() {
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-center items-center py-12 px-4 sm:px-6 lg:px-8 max-w-[1000px] mx-auto gap-10">
                <div className="lg:w-1/2 flex mt-6 lg:mt-0">
                    <NewsletterSignupCard />
                </div>
                <div className="lg:w-1/2 text-center lg:text-left space-y-8 max-w-xl px-4 lg:pr-10">
                    {/* Heading */}
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 font-oswald leading-tight">
                        Discover <span className="text-green-600">More</span> Today!
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-gray-600 font-serif leading-relaxed">
                        Join <span className="font-semibold text-black">thousands of students</span> discovering life-changing opportunities, programs, and events across Nepal. Your journey starts here.
                    </p>

                    {/* Highlighted Stat */}
                    <div className="text-3xl sm:text-4xl font-extrabold text-green-600 drop-shadow-sm">
                        5,000+ Events Listed
                    </div>

                </div>

            </div>
        </>
    );
}