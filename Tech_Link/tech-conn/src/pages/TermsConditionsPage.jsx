export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7 text-gray-800 dark:text-gray-200">
            Terms and Conditions
          </h1>
          <div className="text-md flex flex-col gap-6 text-gray-600 dark:text-gray-400">
            {[
              "By accessing and using Nitin's Blog, you agree to comply with these Terms and Conditions. Please read them carefully before using the website.",
              "All content on this website, including articles, tutorials, and code examples, is provided for informational purposes only. We do not guarantee the accuracy or completeness of any content.",
              "You may not use the content on this site for commercial purposes without prior written consent from the author. Unauthorized reproduction or distribution of content is prohibited.",
              "Nitin's Blog is not responsible for any loss or damage caused by the use of the information provided on this site. Always verify information before relying on it.",
              "We reserve the right to modify or discontinue any part of this website at any time without notice. Continued use of the site after any changes constitutes acceptance of those changes.",
              "By using this site, you agree to our use of cookies and tracking technologies as outlined in our Privacy Policy.",
            ].map((paragraph, index) => (
              <p
                key={index}
                className={`opacity-0 translate-y-5 animate-fadeIn delay-${
                  index * 500
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
